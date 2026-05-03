import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CATEGORIES = ['All', 'Videos', 'Wedding', 'Birthday', 'Baby Shower', 'Other Events', 'Short Films', 'Decorations'];

export default function CategoryNav({ activeCategory, onCategoryChange }) {
  return (
    <div className="w-full overflow-x-auto pb-4 mb-8 scrollbar-hide sticky top-0 z-40 bg-dark/95 backdrop-blur-sm pt-4">
      <div className="flex items-center gap-4 min-w-max px-4 md:justify-center md:px-0">
        <Link to="/" className="inline-flex items-center text-neutral-400 hover:text-primary transition-colors group cursor-pointer mr-2 md:mr-8">
          <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-sm font-medium hidden sm:inline">Back to Site</span>
          <span className="uppercase tracking-widest text-sm font-medium sm:hidden">Back</span>
        </Link>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-sm font-medium tracking-wide uppercase ${
              activeCategory === category
                ? 'bg-primary text-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
