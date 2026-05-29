import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoryNav({ activeCategory, onCategoryChange, hideBack = false, items = [], sticky = false }) {
  const [categories, setCategories] = React.useState(['All']);
  const scrollRef = React.useRef(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(false);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
        if (res.ok) {
          const data = await res.json();
          const names = data.map(c => c.name);
          setCategories(['All', ...names]);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      // Allow minor subpixel precision errors (tolerance of 2px)
      setShowRightArrow(scrollWidth - scrollLeft - clientWidth > 2);
    }
  };

  React.useEffect(() => {
    // Check scroll after state update & render
    const timeout = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', checkScroll);
    };
  }, [categories]);

  const handleScroll = () => {
    checkScroll();
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const containerClasses = sticky
    ? "w-full sticky top-0 z-40 bg-dark/85 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
    : "w-full mb-6";

  return (
    <div className={containerClasses}>
      {/* Dynamic Style block to completely hide the scrollbar across all engines */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between gap-4 px-4 sm:px-6">
        
        {/* Back Button (Inline Shrink-0) */}
        {!hideBack && (
          <Link 
            to="/" 
            className="inline-flex items-center text-neutral-400 hover:text-white transition-colors duration-300 group cursor-pointer mr-2 shrink-0"
          >
            <ArrowLeft size={15} className="mr-1.5 transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Home</span>
          </Link>
        )}

        {/* Left Arrow Button (Inline Inline-Flex) */}
        {showLeftArrow ? (
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shrink-0 cursor-pointer"
          >
            <ChevronLeft size={15} />
          </button>
        ) : (
          <div className="w-8 h-8 shrink-0 opacity-0 pointer-events-none hidden md:block" />
        )}

        {/* Scrollable Container (Flex-1 to consume middle space) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-x-auto scroll-smooth no-scrollbar py-2"
        >
          <div className="flex items-center gap-6 md:gap-10 min-w-max px-4 justify-start sm:justify-center">
            {categories.map((category) => {
              let count = 0;
              if (items && items.length > 0) {
                if (category === 'All') {
                  count = items.length;
                } else if (category === 'Videos') {
                  count = items.filter(item => item.type === 'video' || (item.category && item.category.trim().toLowerCase() === 'videos')).length;
                } else {
                  const activeCat = category.trim().toLowerCase();
                  count = items.filter(item => item.category && item.category.trim().toLowerCase() === activeCat).length;
                }
              }

              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className="relative py-2 px-1 whitespace-nowrap transition-colors duration-300 text-[11px] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5 cursor-pointer text-neutral-400 hover:text-white"
                >
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                    {category}
                  </span>
                  
                  {items && items.length > 0 && (
                    <span className={`relative z-10 text-[9px] font-medium tracking-normal transition-colors duration-300 ${isActive ? 'text-primary' : 'text-neutral-500'}`}>
                      {String(count).padStart(2, '0')}
                    </span>
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                      style={{
                        background: 'linear-gradient(90deg, #FF8C00 0%, #FFD700 100%)'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Arrow Button (Inline Inline-Flex) */}
        {showRightArrow ? (
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shrink-0 cursor-pointer"
          >
            <ChevronRight size={15} />
          </button>
        ) : (
          <div className="w-8 h-8 shrink-0 opacity-0 pointer-events-none hidden md:block" />
        )}
      </div>
    </div>
  );
}


