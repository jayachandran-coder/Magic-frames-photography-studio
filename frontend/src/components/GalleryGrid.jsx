import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryNav from './CategoryNav';

export default function GalleryGrid({ items = defaultMockData, onMediaClick }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = items.filter(item => activeCategory === 'All' || item.category === activeCategory);

  return (
    <div className="w-full">
      <CategoryNav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

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
              className="break-inside-avoid relative group overflow-hidden bg-neutral-900 rounded-xl cursor-pointer block w-full mb-4 shadow-lg hover:shadow-2xl transition-all"
            >
              {item.type === 'video' ? (
                <video
                  src={item.url}
                  poster={item.thumbnail}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto object-cover filter brightness-[0.85] group-hover:brightness-100 transition-all duration-300"
                />
              ) : (
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover filter brightness-[0.85] group-hover:brightness-100 transition-all duration-300"
                />
              )}

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-primary text-xs uppercase tracking-widest font-medium mb-1 drop-shadow-md">
                  {item.category ? `${item.category} • ` : ''}{item.type}
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
