import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultMockData = [
  { _id: '1', type: "photo", url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop", title: "Urban Fashion" },
  { _id: '2', type: "photo", url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop", title: "Nature Macro" },
  { _id: '3', type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", title: "Cinematic Reel" },
  { _id: '4', type: "photo", url: "https://images.unsplash.com/photo-1516224583901-387b32252a1d?q=80&w=800&auto=format&fit=crop", title: "City Lights" },
  { _id: '5', type: "photo", url: "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=800&auto=format&fit=crop", title: "Studio Product" },
  { _id: '6', type: "photo", url: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?q=80&w=800&auto=format&fit=crop", title: "Adventure" },
];

export default function GalleryGrid({ items = defaultMockData, onMediaClick }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = items.filter(item => activeTab === 'all' || item.type === activeTab);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex justify-center gap-6 md:gap-12 mb-12">
        {['all', 'photo', 'video'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm md:text-lg uppercase tracking-wider font-heading transition-all duration-300 relative ${
              activeTab === tab ? "text-primary" : "text-neutral-500 hover:text-white"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="galleryTabIndicator"
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Masonry Grid (CSS Columns) */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => onMediaClick && onMediaClick(item)}
              className="break-inside-avoid relative group overflow-hidden bg-neutral-900 rounded-sm cursor-pointer block w-full mb-4 shadow-lg"
            >
              {item.type === 'video' ? (
                <video
                  src={item.url}
                  poster={item.thumbnail}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] group-hover:brightness-100"
                />
              )}

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-primary text-xs uppercase tracking-widest font-medium mb-1 drop-shadow-md">
                  {item.type}
                </span>
                <h3 className="text-white text-xl font-heading tracking-tight drop-shadow-lg leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredItems.length === 0 && (
         <div className="text-center py-20 text-neutral-500 w-full col-span-full">
            No items found. Admin needs to upload more content.
         </div>
      )}
    </div>
  );
}
