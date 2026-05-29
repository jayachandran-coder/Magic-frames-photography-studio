import React, { useState, useEffect } from 'react';
import { PlayCircle } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import CategoryNav from './CategoryNav';

export default function MyWorks() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [worksData, setWorksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/media?t=${Date.now()}`); // cache busting
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

  const showcasedWorks = worksData.filter(item => {
    return item.showInWorks === true || item.showInWorks === 'true';
  });

  return (
    <SectionWrapper id="works" title="My Works" subtitle="Selected Works" className="bg-dark">

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {showcasedWorks.slice(0, 8).map((item) => (
              <div 
                key={item._id} 
                onClick={() => {
                  if (item.type === 'video' && item.videoLink) {
                    window.open(item.videoLink, '_blank', 'noopener,noreferrer');
                  } else {
                    setSelectedMedia(item);
                  }
                }}
                className="group relative aspect-square bg-neutral-900 overflow-hidden rounded-lg border border-neutral-800 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300"
                />
                
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity z-10">
                    <PlayCircle size={48} className="text-white drop-shadow-lg" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
                  <span className="text-primary text-xs uppercase tracking-widest font-medium mb-1 drop-shadow-md">
                    {item.category ? `${item.category} • ` : ''}{item.type}
                  </span>
                  <h3 className="text-white text-xl font-heading tracking-tight drop-shadow-lg leading-tight line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          
          {showcasedWorks.length === 0 && (
            <div className="text-center py-20 text-neutral-500 w-full">
               No works selected for showcase yet.
            </div>
          )}
          
          <Link 
            to="/gallery" 
            className="mt-12 inline-flex items-center text-sm font-medium uppercase tracking-widest text-white border border-neutral-700 hover:border-primary px-8 py-4 transition-colors duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10 group-hover:text-primary transition-colors">View Full Gallery</span>
            <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
          </Link>
        </div>
      )}

      {/* Media Modal for Fullscreen View */}
      <Modal isOpen={!!selectedMedia} onClose={() => setSelectedMedia(null)}>
        {/* We only show modal for photos now since videos navigate out */}
        <img
          src={selectedMedia?.url}
          alt={selectedMedia?.title}
          className="w-full h-auto max-h-[90vh] object-contain"
        />
      </Modal>

    </SectionWrapper>
  );
}
