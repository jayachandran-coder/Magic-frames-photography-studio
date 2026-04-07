import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import Modal from './Modal';
import { Link } from 'react-router-dom';

export default function MyWorks() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [worksData, setWorksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <SectionWrapper id="works" title="My Works" subtitle="Selected Works" className="bg-dark">

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {worksData.slice(0, 8).map((item) => (
              <div 
                key={item._id} 
                onClick={() => setSelectedMedia(item)}
                className="group relative aspect-square bg-neutral-900 overflow-hidden rounded-lg border border-neutral-800 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              >
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-primary text-xs uppercase tracking-widest font-medium mb-1 drop-shadow-md">
                    {item.type}
                  </span>
                  <h3 className="text-white text-xl font-heading tracking-tight drop-shadow-lg leading-tight line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          {worksData.length > 8 && (
            <Link 
              to="/gallery" 
              className="mt-12 inline-flex items-center text-sm font-medium uppercase tracking-widest text-white border border-neutral-700 hover:border-primary px-8 py-4 transition-colors duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 group-hover:text-primary transition-colors">Load More</span>
              <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
            </Link>
          )}
        </div>
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
