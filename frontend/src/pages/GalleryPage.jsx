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
      <main className="min-h-screen bg-dark pt-12 pb-24 px-6 relative">
        <div className="max-w-7xl mx-auto w-full">
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
            <img
              src={selectedMedia?.url}
              alt={selectedMedia?.title}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </Modal>

        </div>
      </main>
    </>
  );
}
