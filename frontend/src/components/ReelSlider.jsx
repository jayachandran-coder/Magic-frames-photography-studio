import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import BookingModal from './BookingModal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
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
        const res = await fetch('${import.meta.env.VITE_API_URL}/api/offers');
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
      <div className="w-full max-w-[1600px] h-[70vh] z-10 mx-auto px-4 relative mt-16">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="w-full h-full !pb-16"
        >
          {displayOffers.map((offer) => (
            <SwiperSlide key={offer._id} className="w-full sm:w-[500px] md:w-[700px] lg:w-[900px] h-full group">
              {({ isActive }) => (
                <div className={`relative w-full h-full rounded-xl overflow-hidden transition-all duration-700 ${isActive ? 'scale-100 ring-1 ring-primary/40 shadow-2xl shadow-primary/20' : 'scale-[0.85] opacity-50 blur-[2px]'}`}>

                  {/* Media Content */}
                  {offer.videoUrl ? (
                    <video
                      src={offer.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
                    />
                  ) : (
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  {/* Text Overlay for Active Slide */}
                  {isActive && (
                    <div className="absolute bottom-10 left-10 right-10 flex border-l-2 border-primary pl-6 py-2 flex-col items-start text-left">
                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-heading font-medium text-white mb-4 tracking-tight drop-shadow-lg"
                      >
                        {offer.title}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-neutral-300 text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md"
                      >
                        {offer.description}
                      </motion.p>

                      <motion.button
                        initial={{ opacity: 0, mt: 20 }}
                        animate={{ opacity: 1, mt: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        onClick={() => setSelectedOffer(offer)}
                        className="bg-primary/90 hover:bg-white text-black font-semibold px-8 py-3 rounded-sm tracking-wider uppercase transition-all duration-300 hover:shadow-xl hover:shadow-primary/40"
                      >
                        {offer.buttonText}
                      </motion.button>
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
