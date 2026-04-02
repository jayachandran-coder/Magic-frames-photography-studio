import React, { useState, useEffect } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

export default function AdminAbout() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchAbout = async () => {
    try {
      const res = await fetch('${import.meta.env.VITE_API_URL}/api/about');
      if (res.ok) {
        const data = await res.json();
        setCurrentImage(data.imageUrl);
      }
    } catch (err) {
      console.error('No about config found or network error', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const clearSelection = () => {
    setFile(null);
    setPreviewUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('${import.meta.env.VITE_API_URL}/api/about', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentImage(data.imageUrl);
        clearSelection();
        alert('About image successfully updated!');
      } else {
        alert('Failed to update About Image');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col mb-8">
        <h2 className="text-xl font-heading text-white uppercase tracking-wider mb-2">Manage About Section</h2>
        <p className="text-sm text-neutral-400">Update the large hero image displayed in the public About section.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Active Image Display */}
        <div className="bg-neutral-900/50 border border-neutral-800 p-6 flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-neutral-500 uppercase tracking-widest text-xs font-bold mb-4">Currently Published</h3>
          {fetching ? (
            <Loader2 className="animate-spin text-primary" size={32} />
          ) : currentImage ? (
            <img src={currentImage} alt="Live About" className="w-full h-[300px] object-cover rounded-sm border border-neutral-700 shadow-xl" />
          ) : (
            <div className="text-neutral-500 italic text-sm text-center border border-dashed border-neutral-700 w-full h-[300px] flex items-center justify-center bg-black/50">
              No custom image set.<br />Using system default fallback.
            </div>
          )}
        </div>

        {/* Upload Form */}
        <div className="bg-black/40 border border-neutral-800 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <h3 className="text-neutral-500 uppercase tracking-widest text-xs font-bold mb-2">Upload Replacement</h3>

            {/* Img Preview or Input */}
            {previewUrl ? (
              <div className="relative border border-primary/50 group">
                <img src={previewUrl} alt="Preview" className="w-full h-[200px] object-cover opacity-80" />
                <button
                  type="button"
                  onClick={clearSelection}
                  className="absolute top-2 right-2 bg-black/80 text-white p-2 rounded-full border border-neutral-700 hover:text-red-500 hover:border-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-neutral-700 hover:border-primary/50 transition-colors bg-black/50 w-full h-[200px] flex flex-col items-center justify-center cursor-pointer group rounded-sm relative">
                <Upload className="text-neutral-500 group-hover:text-primary transition-colors mb-4" size={32} />
                <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">Select new image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}

            <button
              type="submit"
              disabled={!file || loading}
              className="w-full py-4 border border-primary/30 bg-primary/10 text-primary font-medium uppercase tracking-widest hover:bg-primary hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              {loading ? 'Uploading...' : 'Publish Image'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
