import React, { useState } from 'react';

export default function CategoryUploadForm() {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setStatus({ loading: false, error: 'Please provide a category name', success: false });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    if (file) {
      formData.append('coverImage', file);
    }

    setStatus({ loading: true, error: null, success: false });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, error: null, success: true });
        setName('');
        setFile(null);
        if (document.getElementById('categoryFileInput')) {
            document.getElementById('categoryFileInput').value = '';
        }
        // Force reload to show new category (or could use Context/prop callback)
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setStatus({ loading: false, error: data.message || 'Error creating category', success: false });
      }
    } catch (err) {
      setStatus({ loading: false, error: 'Network error.', success: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status.error && <div className="text-red-500 bg-red-500/10 p-2 border border-red-500/20 text-sm">{status.error}</div>}
      {status.success && <div className="text-primary bg-primary/10 p-2 border border-primary/20 text-sm">Category created successfully!</div>}

      <div>
        <label className="block text-sm font-medium text-neutral-400 mb-1">Category Name</label>
        <input
          type="text" required
          value={name} onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Wedding, Maternity, Baby Shower"
          className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-white focus:border-primary outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-400 mb-1">Cover Image (Optional)</label>
        <input
          id="categoryFileInput"
          type="file" accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-neutral-400 file:bg-primary file:text-black file:border-0 file:py-1 file:px-3 file:mr-4 file:font-semibold transition-colors focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status.loading}
        className="w-full mt-4 bg-primary text-black font-semibold py-3 uppercase tracking-widest text-sm hover:bg-white transition-colors disabled:opacity-50"
      >
        {status.loading ? 'Creating...' : 'Create Category'}
      </button>
    </form>
  );
}
