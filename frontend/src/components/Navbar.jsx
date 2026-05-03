import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import BookingModal from './BookingModal';

const navLinks = [
  { title: "Home", href: "#" },
  { title: "Services", href: "#services" },
  { title: "About", href: "#about" },
  { title: "My Works", href: "#works" },
  { title: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/70 backdrop-blur-lg " : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 md:px-10 lg:px-20 h-20 flex items-center relative">
        {/* Logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center group z-10">
          <img 
            src="logo.png" 
            alt="Magic Frames Logo" 
            className="h-14 md:h-16 lg:h-18 py-2 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(255,140,0,0.8)]" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 ml-auto z-10">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="text-sm font-medium text-neutral-300 hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.title}
            </a>
          ))}
          <button 
            onClick={() => setShowBookingModal(true)}
            className="bg-primary text-black px-6 py-2.5 rounded-sm font-medium hover:bg-white transition-colors uppercase tracking-wider text-sm"
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-primary transition-colors ml-auto z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <nav className="flex flex-col items-center py-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-neutral-300 hover:text-primary transition-colors uppercase tracking-widest"
                >
                  {link.title}
                </a>
              ))}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowBookingModal(true);
                }}
                className="mt-4 bg-primary text-black px-8 py-3 rounded-sm font-medium uppercase tracking-wider w-3/4 max-w-[200px]"
              >
                Book Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal for Navbar General Booking */}
      {showBookingModal && (
        <BookingModal 
          offer={{
            title: "General Inquiry / Portfolio Booking",
            description: "Not sure which exact service you need? Book a general consultation to discuss your project and options!"
          }} 
          onClose={() => setShowBookingModal(false)} 
        />
      )}
    </header>
  );
}
