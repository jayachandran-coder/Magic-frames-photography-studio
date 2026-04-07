import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GalleryGrid from '../components/GalleryGrid';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GalleryPage() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [worksData, setWorksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
    const fetchMedia = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/media`);
        if (res.ok) {
          const data = await res.json();
          // Map backend data to compute proper thumbnails for videos
          const processedData = data.map(item => ({
            ...item,
            thumbnail: item.type === 'video' ? item.url.replace(/\.(mp4|mov|webm)$/i, '.jpg') : item.url
          }));
          setWorksData(processedData);
        }
      } catch (err) {
        console.error("Failed to fetch media:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark pt-32 pb-24 px-6 relative">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header & Back Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               className="relative z-50 pointer-events-auto block"
            >
              <Link to="/" className="inline-flex items-center text-neutral-400 hover:text-primary transition-colors mb-6 group cursor-pointer">
                <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                <span className="uppercase tracking-widest text-sm font-medium">Back to Site</span>
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white tracking-tight">Complete Gallery</h1>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="text-primary font-medium tracking-widest uppercase text-sm"
            >
              // All {worksData.length} records //
            </motion.div>
          </div>

          {/* Gallery Content */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <GalleryGrid items={worksData} onMediaClick={setSelectedMedia} />
            </motion.div>
          )}

          {/* Modular Fullscreen Viewer identical to homepage */}
          <Modal isOpen={!!selectedMedia} onClose={() => setSelectedMedia(null)}>
            {selectedMedia?.type === 'video' ? (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="w-full h-auto max-h-[85vh] outline-none"
              />
            ) : (
              <img
                src={selectedMedia?.url}
                alt={selectedMedia?.title}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            )}
          </Modal>

        </div>
      </main>
      <Footer />
    </>
  );
}
