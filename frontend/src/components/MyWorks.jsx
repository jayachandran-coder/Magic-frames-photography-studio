import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import Modal from './Modal';
import GalleryGrid from './GalleryGrid';

export default function MyWorks() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [worksData, setWorksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch('${import.meta.env.VITE_API_URL}/api/media');
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
    <SectionWrapper id="works" title="My Works" subtitle="Selected Works" className="bg-dark">

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <GalleryGrid items={worksData} onMediaClick={setSelectedMedia} />
      )}

      {/* Media Modal for Fullscreen View */}
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

    </SectionWrapper>
  );
}
