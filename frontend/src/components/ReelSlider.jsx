import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import BookingModal from './BookingModal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ReelSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/offers`);
        if (res.ok) {
          const data = await res.json();
          setOffers(data);
        }
      } catch (err) {
        console.error("Failed to fetch offers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  // Fallback if no offers yet
  const displayOffers = offers.length > 0 ? offers : [
    {
      _id: 'default',
      title: "Welcome to Magic Frames",
      description: "No offers available. Please check back later or set up offers in the Admin Dashboard.",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
      buttonText: "Stay Tuned",
    }
  ];

  const activeOffer = displayOffers[activeIndex] || displayOffers[0];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Blurred Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeOffer._id}
            src={activeOffer.imageUrl || activeOffer.videoUrl}
            alt="Background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover filter blur-3xl scale-110"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
      </div>

      {/* Main Slider Content */}
      <div className="w-full h-screen z-10 relative">
        <Swiper
          effect={'fade'}
          grabCursor={true}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectFade, Pagination, Navigation, Autoplay]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="w-full h-full"
        >
          {displayOffers.map((offer) => (
            <SwiperSlide key={offer._id} className="w-full h-full relative">
              {({ isActive }) => (
                <div className={`relative w-full h-full overflow-hidden transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>

                  {/* Media Content */}
                  {offer.videoUrl ? (
                    <video
                      src={offer.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Gradient Overlay for Text Readability - Premium SaaS Style */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>

                  {/* Text Overlay for Active Slide */}
                  {isActive && (
                    <div className="absolute inset-0 flex flex-col justify-center w-full px-8 md:px-16 lg:px-24 pt-20">
                      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-start text-left">
                        <motion.h1
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1] drop-shadow-xl"
                        >
                          {offer.title}
                        </motion.h1>

                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                          className="text-neutral-300 text-lg md:text-2xl mb-10 drop-shadow-md leading-relaxed"
                        >
                          {offer.description}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        >
                          <button
                            onClick={() => setSelectedOffer(offer)}
                            className="bg-primary hover:bg-white text-black font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                          >
                            {offer.buttonText}
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Booking Modal */}
      {selectedOffer && (
        <BookingModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
}
