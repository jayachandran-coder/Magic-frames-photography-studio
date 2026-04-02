import React, { useState, useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import EditMediaModal from './EditMediaModal';

export default function AdminGallery() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/media`);
      const data = await res.json();
      setMedia(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // We can fetch on mount and expose a method via ref, but for simplicity we rely on re-fetching.
    // Parent should technically trigger, or we just poll/use context. 
    // We'll expose fetching on mount.
    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this media? It will be removed from Cloudinary.')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/api/media/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchMedia();
    } catch (err) {
      alert('Error deleting media');
    }
  };

  const getThumbnail = (item) => {
    if (item.type === 'video') return item.url.replace(/\.(mp4|mov|webm)$/i, '.jpg');
    return item.url;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-neutral-900/50 p-4 border border-neutral-800">
        <h2 className="text-xl font-heading text-white uppercase tracking-wider">Manage My Works</h2>
        <button onClick={fetchMedia} className="text-sm text-neutral-400 hover:text-primary transition-colors">Refresh</button>
      </div>

      {loading ? (
        <div className="text-neutral-500 py-8 text-center">Loading media...</div>
      ) : media.length === 0 ? (
        <div className="text-neutral-500 py-8 text-center border border-dashed border-neutral-800">No media uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <div key={item._id} className="group relative aspect-square bg-neutral-900 overflow-hidden rounded-sm border border-neutral-800">
              <img
                src={getThumbnail(item)}
                alt={item.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity duration-300 transform group-hover:scale-105"
              />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between z-10">
                <div>
                  <span className="text-primary text-xs uppercase tracking-widest font-bold bg-black/60 px-2 py-1 rounded-sm">{item.type}</span>
                  <h3 className="text-white font-medium leading-tight mt-2 drop-shadow-md">{item.title}</h3>
                </div>

                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditingItem(item)} className="p-2 bg-black hover:bg-white hover:text-black text-neutral-300 rounded-sm transition-colors border border-neutral-800 hover:border-white shadow-lg">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-900/80 hover:bg-red-600 text-white rounded-sm transition-colors border border-red-800 shadow-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingItem && (
        <EditMediaModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={() => { setEditingItem(null); fetchMedia(); }}
        />
      )}
    </div>
  );
}
