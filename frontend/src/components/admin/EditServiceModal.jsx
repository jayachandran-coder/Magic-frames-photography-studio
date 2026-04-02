import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EditServiceModal({ item, onClose, onSuccess }) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    if (file) {
      formData.append('image', file);
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/services/${item._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (res.ok) {
        onSuccess();
      } else {
        alert('Error updating service');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card w-full max-w-md border border-neutral-800 p-8 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors text-2xl leading-none"
        >
          &times;
        </button>

        <h2 className="text-2xl font-heading text-white mb-6 uppercase tracking-wider">Edit Service</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Title</label>
            <input
              type="text" required
              value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-white focus:border-primary outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Description</label>
            <textarea
              required rows="3"
              value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-white focus:border-primary outline-none resize-none transition-colors"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Price Tag</label>
            <input
              type="text" required
              value={price} onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-white focus:border-primary outline-none transition-colors"
              placeholder="e.g. $1500 or Custom Quote"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Replace Image (Optional)</label>
            <input
              type="file" accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-neutral-400 file:bg-neutral-800 file:text-white file:border-0 file:py-1 file:px-3 file:mr-4 file:font-medium transition-colors focus:outline-none focus:border-primary"
            />
            <p className="text-xs text-neutral-500 mt-2">Leave blank to keep existing background.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-black font-semibold py-3 mt-4 uppercase tracking-widest text-sm hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
