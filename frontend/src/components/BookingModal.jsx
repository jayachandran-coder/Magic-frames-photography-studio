import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BookingModal({ offer, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save to Database
      await fetch(`${import.meta.env.VITE_API_URL}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          offerTitle: offer.title,
          offerDescription: offer.description
        })
      });

      // 2. Redirect to WhatsApp
      const message = `Hi, I want your service\nName: ${name}\nPhone: ${phone}\nService: ${offer.title}`;
      const encodedMsg = encodeURIComponent(message);
      // Replace with actual business WhatsApp number
      window.open(`https://wa.me/919384346058?text=${encodedMsg}`, '_blank');

      onClose();
    } catch (err) {
      alert('Network error while booking. Redirecting to WhatsApp directly.');
      const message = `Hi, I want your service\nName: ${name}\nPhone: ${phone}\nService: ${offer.title}`;
      window.open(`https://wa.me/919384346058?text=${encodeURIComponent(message)}`, '_blank');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-neutral-900 w-full max-w-md border border-neutral-800 p-8 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors text-2xl leading-none"
        >
          &times;
        </button>

        <h2 className="text-2xl font-heading text-white mb-2 uppercase tracking-wider">Book Session</h2>
        <p className="text-primary text-sm font-bold mb-6">{offer.title}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Your Name</label>
            <input
              type="text" required
              value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-white focus:border-primary outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Phone Number</label>
            <input
              type="tel" required
              value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-black/50 border border-neutral-700 py-2 px-3 text-white focus:border-primary outline-none transition-colors"
              placeholder="+1 234 567 8900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-black font-semibold py-3 mt-4 uppercase tracking-widest text-sm hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Continue to WhatsApp'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
