import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import EditServiceModal from './EditServiceModal';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/services/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          fetchServices();
        } else {
          alert('Failed to delete service');
        }
      } catch (err) {
        alert('Network Error');
      }
    }
  };

  if (loading) return <div className="text-neutral-500 text-sm">Loading services...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading text-white uppercase tracking-wider">Manage Services</h2>
        <button onClick={fetchServices} className="text-sm text-neutral-400 hover:text-primary transition-colors">Refresh</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.length === 0 ? (
          <div className="col-span-1 md:col-span-2 text-center text-neutral-500 py-8 border border-dashed border-neutral-800">
            No services found. Add your first service!
          </div>
        ) : (
          services.map((service) => (
            <div key={service._id} className="bg-neutral-900/50 border border-neutral-800 relative group hover:border-primary/50 transition-colors flex flex-col h-full overflow-hidden">
              {service.imageUrl && (
                <div className="absolute inset-0 z-0">
                  <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                </div>
              )}
              
              <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="absolute top-0 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingService(service)}
                  className="bg-black/50 p-2 text-neutral-400 hover:text-primary rounded border border-neutral-700 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(service._id)}
                  className="bg-black/50 p-2 text-neutral-400 hover:text-red-500 rounded border border-neutral-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <h3 className="text-lg font-heading text-white mb-2 pr-16">{service.title}</h3>
              <p className="text-sm text-neutral-400 mb-4 line-clamp-3 mb-6 flex-grow">{service.description}</p>
              
              <div className="mt-auto inline-block border border-primary/30 px-3 py-1 bg-primary/10 text-primary font-medium text-sm self-start">
                {service.price}
              </div>
             </div>
            </div>
          ))
        )}
      </div>

      {editingService && (
        <EditServiceModal 
          item={editingService} 
          onClose={() => setEditingService(null)} 
          onSuccess={() => {
            setEditingService(null);
            fetchServices();
          }} 
        />
      )}
    </div>
  );
}
