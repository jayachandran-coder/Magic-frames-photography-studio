import React, { useState } from 'react';

export default function MediaUploadForm() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('photo');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ loading: false, error: 'Please select a file', success: false });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('file', file); // Use 'file' as expected by multer

    setStatus({ loading: true, error: null, success: false });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/media`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData, // do not set content-type header for FormData, browser does it with boundary
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, error: null, success: true });
        setTitle('');
        setFile(null);
        // Clear file input visually
        document.getElementById('mediaFileInput').value = '';
      } else {
        setStatus({ loading: false, error: data.message || 'Error uploading file', success: false });
      }
    } catch (err) {
      setStatus({ loading: false, error: 'Network error. Make sure backend is running.', success: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status.error && <div className="text-red-500 bg-red-500/10 p-2 border border-red-500/20 text-sm">{status.error}</div>}
      {status.success && <div className="text-primary bg-primary/10 p-2 border border-primary/20 text-sm">Media uploaded successfully!</div>}

      <div>
        <label className="block text-sm font-medium text-neutral-400 mb-1">Title</label>
        <input
          type="text" required
          value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-white focus:border-primary outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-400 mb-1">Category Type</label>
        <select
          value={type} onChange={(e) => setType(e.target.value)}
          className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-white focus:border-primary outline-none transition-colors"
        >
          <option value="photo">Photo</option>
          <option value="video">Video</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-400 mb-1">File</label>
        <input
          id="mediaFileInput"
          type="file" required
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-neutral-400 file:bg-primary file:text-black file:border-0 file:py-1 file:px-3 file:mr-4 file:font-semibold transition-colors focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status.loading}
        className="w-full mt-4 bg-primary text-black font-semibold py-3 uppercase tracking-widest text-sm hover:bg-white transition-colors disabled:opacity-50"
      >
        {status.loading ? 'Uploading...' : 'Upload Media'}
      </button>
    </form>
  );
}
