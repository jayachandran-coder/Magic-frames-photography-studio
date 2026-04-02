import React, { useState } from 'react';

export default function ServiceUploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
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
      const res = await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (res.ok) {
        setTitle('');
        setDescription('');
        setPrice('');
        setFile(null);
        window.location.reload(); // Simple reload to refresh the list alongside
      } else {
        alert('Error creating service');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-neutral-500 uppercase tracking-widest mb-1">Service Title</label>
        <input 
          type="text" required 
          value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-black/50 border border-neutral-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
          placeholder="e.g. Wedding Photography"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 uppercase tracking-widest mb-1">Description</label>
        <textarea 
          required rows="4"
          value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-black/50 border border-neutral-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="Brief details..."
        ></textarea>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 uppercase tracking-widest mb-1">Price Tag</label>
        <input 
          type="text" required 
          value={price} onChange={(e) => setPrice(e.target.value)}
          className="w-full bg-black/50 border border-neutral-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
          placeholder="e.g. $1500 or Custom"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 uppercase tracking-widest mb-1">Background Image</label>
        <input 
          type="file" accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full bg-black/50 border border-neutral-800 text-neutral-400 py-2 px-3 text-sm file:bg-neutral-800 file:text-white file:border-0 file:py-1 file:px-3 file:mr-4 file:font-medium transition-colors focus:outline-none focus:border-primary"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-primary text-black font-semibold py-3 text-sm tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50 mt-2"
      >
        {loading ? 'Creating...' : 'Create Service'}
      </button>
    </form>
  );
}
