import React, { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import MediaUploadForm from '../components/admin/MediaUploadForm';
import OfferUploadForm from '../components/admin/OfferUploadForm';
import AdminGallery from '../components/admin/AdminGallery';
import AdminOffers from '../components/admin/AdminOffers';
import AdminBookings from '../components/admin/AdminBookings';
import AdminSettings from '../components/admin/AdminSettings';
import ServiceUploadForm from '../components/admin/ServiceUploadForm';
import AdminServices from '../components/admin/AdminServices';
import AdminAbout from '../components/admin/AdminAbout';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' or 'offers'

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-hidden bg-dark">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <AdminHeader />

        {/* Dashboard Tabs */}
        <div className="flex gap-8 border-b border-neutral-800 mb-8 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide custom-scrollbar pb-2">
          <button 
            className={`pb-4 text-lg font-heading tracking-widest uppercase transition-colors relative ${activeTab === 'portfolio' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
            onClick={() => setActiveTab('portfolio')}
          >
            My Works
            {activeTab === 'portfolio' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
          </button>
          
          <button 
            className={`pb-4 text-lg font-heading tracking-widest uppercase transition-colors relative ${activeTab === 'offers' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
            onClick={() => setActiveTab('offers')}
          >
            Reel Offers
            {activeTab === 'offers' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
          </button>
          
          

          <button 
            className={`pb-4 text-lg font-heading tracking-widest uppercase transition-colors relative ${activeTab === 'services' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
            onClick={() => setActiveTab('services')}
          >
            Services
            {activeTab === 'services' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
          </button>
          <button 
            className={`pb-4 text-lg font-heading tracking-widest uppercase transition-colors relative ${activeTab === 'about' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
            onClick={() => setActiveTab('about')}
          >
            About
            {activeTab === 'about' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
          </button>

          <button 
            className={`pb-4 text-lg font-heading tracking-widest uppercase transition-colors relative ${activeTab === 'bookings' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
            {activeTab === 'bookings' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
          </button>

          <button 
            className={`pb-4 text-lg font-heading tracking-widest uppercase transition-colors relative ${activeTab === 'settings' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
            {activeTab === 'settings' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
          </button>
        </div>

        {/* Portfolio Content */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
            <div className="bg-card/40 border border-neutral-800 p-6 backdrop-blur-sm shadow-xl h-fit">
              <h2 className="text-xl font-heading text-white mb-2 tracking-widest uppercase">Upload Media</h2>
              <p className="text-neutral-400 text-sm mb-6">Add new content to your gallery.</p>
              <MediaUploadForm />
            </div>
            
            <AdminGallery />
          </div>
        )}

        {/* Offers Content */}
        {activeTab === 'offers' && (
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
            <div className="bg-card/40 border border-neutral-800 p-6 backdrop-blur-sm shadow-xl h-fit">
              <h2 className="text-xl font-heading text-white mb-2 tracking-widest uppercase">Create Offer</h2>
              <p className="text-neutral-400 text-sm mb-6">Add a hero slide offer.</p>
              <OfferUploadForm />
            </div>
            
            <AdminOffers />
          </div>
        )}

        {/* Bookings Content */}
        {activeTab === 'bookings' && (
          <div className="bg-card/40 border border-neutral-800 p-6 backdrop-blur-sm shadow-xl">
            <AdminBookings />
          </div>
        )}

        {/* Services Content */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
            <div className="bg-card/40 border border-neutral-800 p-6 backdrop-blur-sm shadow-xl h-fit">
              <h2 className="text-xl font-heading text-white mb-2 tracking-widest uppercase">Create Service</h2>
              <p className="text-neutral-400 text-sm mb-6">Add a new offering.</p>
              <ServiceUploadForm />
            </div>
            
            <AdminServices />
          </div>
        )}

        {/* Settings Content */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1">
            <AdminSettings />
          </div>
        )}

        {/* About UI */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1">
            <AdminAbout />
          </div>
        )}

      </div>
    </div>
  );
}
