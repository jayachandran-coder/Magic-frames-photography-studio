import React, { useState } from 'react';

export default function AdminSettings() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!username && !password) {
      setMessage({ type: 'error', text: 'Please fill in at least one field to update.' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('${import.meta.env.VITE_API_URL}/api/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Credentials updated successfully!' });
        setUsername('');
        setPassword('');
        // Update token if it was refreshed
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update credentials.' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Network error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-neutral-900/50 p-4 border border-neutral-800">
        <h2 className="text-xl font-heading text-white uppercase tracking-wider">Account Settings</h2>
      </div>

      <div className="bg-card/40 border border-neutral-800 p-8 backdrop-blur-sm max-w-2xl">
        <h3 className="text-lg font-heading text-white mb-2 tracking-widest uppercase">Admin Credentials</h3>
        <p className="text-neutral-400 text-sm mb-8">Update your login username or password.</p>

        {message.text && (
          <div className={`mb-6 p-4 border text-sm text-center ${message.type === 'success' ? 'bg-green-900/10 border-green-900/50 text-green-500' : 'bg-red-900/10 border-red-900/50 text-red-500'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-400 uppercase tracking-widest">
              New Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-neutral-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="Leave blank to keep current"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-400 uppercase tracking-widest">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-neutral-800 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="Leave blank to keep current"
              minLength={6}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-black font-medium uppercase tracking-widest py-4 px-8 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
