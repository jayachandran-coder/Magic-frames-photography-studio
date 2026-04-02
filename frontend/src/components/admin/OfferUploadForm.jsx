import React, { useState } from 'react';

export default function OfferUploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [buttonText, setButtonText] = useState('Book Now');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ loading: false, error: 'Please select a background photo/video', success: false });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('buttonText', buttonText);
    formData.append('media', file); // Use 'media' as expected by multer

    setStatus({ loading: true, error: null, success: false });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('${import.meta.env.VITE_API_URL}/api/offers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, error: null, success: true });
        setTitle('');
        setDescription('');
        setButtonText('Book Now');
        setFile(null);
        document.getElementById('offerFileInput').value = '';
      } else {
        setStatus({ loading: false, error: data.message || 'Error creating offer', success: false });
      }
    } catch (err) {
      setStatus({ loading: false, error: 'Network error. Make sure backend is running.', success: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status.error && <div className="text-red-500 bg-red-500/10 p-2 border border-red-500/20 text-sm">{status.error}</div>}
      {status.success && <div className="text-primary bg-primary/10 p-2 border border-primary/20 text-sm">Offer created successfully!</div>}

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-1">Button Text</label>
          <input
            type="text"
            value={buttonText} onChange={(e) => setButtonText(e.target.value)}
            className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-white focus:border-primary outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-1">Background Media</label>
          <input
            id="offerFileInput"
            type="file" required
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full bg-black/50 border border-neutral-700 py-1.5 text-neutral-400 file:bg-primary file:text-black file:border-0 file:py-1 file:px-2 file:mr-2 file:text-xs file:font-semibold text-sm focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status.loading}
        className="w-full mt-4 bg-primary text-black font-semibold py-3 uppercase tracking-widest text-sm hover:bg-white transition-colors disabled:opacity-50"
      >
        {status.loading ? 'Creating...' : 'Create Offer'}
      </button>
    </form>
  );
}
