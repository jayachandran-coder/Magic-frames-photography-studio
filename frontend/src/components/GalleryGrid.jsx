import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import CategoryNav from './CategoryNav';

const ProgressiveImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-neutral-800/50 overflow-hidden">
      {/* Skeleton / Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
      )}
      
      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default function GalleryGrid({ items = [], onMediaClick }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = items.filter(item => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Videos') return item.type === 'video' || (item.category && item.category.trim().toLowerCase() === 'videos');
    
    const itemCat = item.category ? item.category.trim().toLowerCase() : '';
    const activeCat = activeCategory ? activeCategory.trim().toLowerCase() : '';
    return itemCat === activeCat;
  });

  return (
    <div className="w-full">
      <CategoryNav activeCategory={activeCategory} onCategoryChange={setActiveCategory} items={items} sticky={true} />

      {/* Masonry Grid (CSS Columns) */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item._id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => {
                if (item.type === 'video' && item.videoLink) {
                  window.open(item.videoLink, '_blank', 'noopener,noreferrer');
                } else if (onMediaClick) {
                  onMediaClick(item);
                }
              }}
              className="break-inside-avoid relative group overflow-hidden bg-neutral-900 rounded-xl cursor-pointer block w-full mb-4 shadow-lg hover:shadow-2xl transition-all"
            >
              <ProgressiveImage
                src={item.url}
                alt={item.title}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity z-10">
                  <PlayCircle size={48} className="text-white drop-shadow-lg" />
                </div>
              )}

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 pointer-events-none">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                >
                  <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-2 inline-block drop-shadow-md bg-black/40 px-2 py-1 rounded-sm backdrop-blur-md border border-white/10">
                    {item.category ? `${item.category} • ` : ''}{item.type}
                  </span>
                  <h3 className="text-white text-lg md:text-xl font-heading tracking-tight drop-shadow-lg leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                </motion.div>
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
