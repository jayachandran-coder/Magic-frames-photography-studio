import React, { useState, useEffect } from 'react';
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
          setWorksData(data);
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
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-dark pt-8 pb-24 px-4 sm:px-6 md:px-8 relative"
      >
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Immersive Professional Title Banner */}
          <div className="text-center pt-8 pb-12">
            <motion.h1 
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-heading font-light tracking-[0.25em] uppercase text-white"
            >
              MAGIC <span className="font-extrabold text-primary">FRAMES</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-500 text-[10px] md:text-xs uppercase tracking-[0.4em] mt-3"
            >
              The Art of Visual Storytelling
            </motion.p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-12 h-[1px] bg-neutral-800 mx-auto mt-6" 
            />
          </div>

          {/* Gallery Content */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <GalleryGrid items={worksData} onMediaClick={setSelectedMedia} />
            </motion.div>
          )}

          {/* Modular Fullscreen Viewer identical to homepage */}
          <Modal isOpen={!!selectedMedia} onClose={() => setSelectedMedia(null)}>
            <img
              src={selectedMedia?.url}
              alt={selectedMedia?.title}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </Modal>

        </div>
      </motion.main>
    </>
  );
}
