import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminHeader() {
  const navigate = useNavigate();
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('${import.meta.env.VITE_API_URL}/api/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data) setTotalViews(data.count);
        }
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center border-b border-neutral-800 pb-8 mb-12 gap-6 relative z-10">
      <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        <div>
          <h1 className="text-4xl font-heading text-white tracking-widest uppercase mb-2">Admin Dashboard</h1>
          <p className="text-neutral-400">Manage your cinematic portfolio</p>
        </div>

        {/* View Counter Widget */}
        <div className="bg-primary/5 border border-primary/20 px-6 py-3 rounded-sm text-center shadow-lg min-w-[120px]">
          <div className="text-3xl font-heading text-white flex justify-center">{totalViews.toLocaleString()}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">Total Views</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="text-sm font-medium uppercase tracking-widest text-black bg-primary hover:bg-white px-6 py-3 transition-colors rounded-sm shadow-lg shadow-primary/20"
        >
          Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm font-medium uppercase tracking-widest text-neutral-400 hover:text-white border px-6 py-3 border-neutral-800 hover:border-neutral-500 transition-colors rounded-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
