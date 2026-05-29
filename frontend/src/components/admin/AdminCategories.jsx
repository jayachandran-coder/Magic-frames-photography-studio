import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        setError('Failed to load categories');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category? Media associated with this category will not be deleted but will lose their category tag unless reassigned.')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setCategories(categories.filter(cat => cat._id !== id));
      } else {
        alert('Failed to delete category');
      }
    } catch (err) {
      alert('Error deleting category');
    }
  };

  if (loading) return <div className="text-neutral-400">Loading categories...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category._id} className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden relative group">
          {category.coverImage ? (
            <img src={category.coverImage} alt={category.name} className="w-full h-48 object-cover opacity-80" />
          ) : (
            <div className="w-full h-48 bg-neutral-800 flex items-center justify-center text-neutral-500">
              No Cover
            </div>
          )}
          <div className="p-4 flex justify-between items-center absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-12">
            <h3 className="text-white font-heading tracking-wider uppercase">{category.name}</h3>
            <button
              onClick={() => handleDelete(category._id)}
              className="text-red-500 hover:text-red-400 p-2 bg-black/50 rounded-full transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
      {categories.length === 0 && (
        <div className="col-span-full text-center text-neutral-500 py-12">
          No categories found. Create one above.
        </div>
      )}
    </div>
  );
}
