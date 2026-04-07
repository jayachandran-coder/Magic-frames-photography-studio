import React, { useState, useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import EditOfferModal from './EditOfferModal';

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const fetchOffers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/offers`);
      const data = await res.json();
      setOffers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this offer?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/api/offers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchOffers();
    } catch (err) {
      alert('Error deleting offer');
    }
  };

  const getMediaUrl = (offer) => {
    return offer.imageUrl || (offer.videoUrl ? offer.videoUrl.replace(/\.(mp4|mov|webm)$/i, '.jpg') : '');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-neutral-900/50 p-4 border border-neutral-800">
        <h2 className="text-xl font-heading text-white uppercase tracking-wider">Manage Offers</h2>
        <button onClick={fetchOffers} className="text-sm text-neutral-400 hover:text-primary transition-colors">Refresh</button>
      </div>

      {loading ? (
        <div className="text-neutral-500 py-8 text-center">Loading offers...</div>
      ) : offers.length === 0 ? (
        <div className="text-neutral-500 py-8 text-center border border-dashed border-neutral-800">No offers created yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.slice(0, visibleCount).map((offer) => (
            <div key={offer._id} className="group relative aspect-[16/9] bg-neutral-900 overflow-hidden rounded-sm border border-neutral-800">
              <img
                src={getMediaUrl(offer)}
                alt={offer.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-30 transition-opacity duration-300 transform group-hover:scale-105"
              />

              <div className="absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between z-10 bg-black/50 md:bg-transparent">
                <div>
                  <h3 className="text-white font-medium leading-tight drop-shadow-md text-lg">{offer.title}</h3>
                  <p className="text-neutral-300 text-xs mt-1 line-clamp-2">{offer.description}</p>
                </div>

                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditingItem(offer)} className="p-2 bg-black hover:bg-white hover:text-black text-neutral-300 rounded-sm transition-colors border border-neutral-800 shadow-lg">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(offer._id)} className="p-2 bg-red-900/80 hover:bg-red-600 text-white rounded-sm transition-colors border border-red-800 shadow-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && visibleCount < offers.length && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setVisibleCount(prev => prev + 8)}
            className="px-6 py-2 border border-neutral-700 text-neutral-300 hover:text-white hover:border-white transition-colors tracking-widest uppercase text-sm rounded-sm"
          >
            Load More Offers
          </button>
        </div>
      )}

      {editingItem && (
        <EditOfferModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={() => { setEditingItem(null); fetchOffers(); }}
        />
      )}
    </div>
  );
}
