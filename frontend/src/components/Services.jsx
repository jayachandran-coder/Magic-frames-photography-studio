import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import BookingModal from './BookingModal';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/services');
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <SectionWrapper
      id="services"
      title="Services"
      subtitle="What We Offer"
    >
      {loading ? (
        <div className="w-full flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center text-neutral-500 py-12 border border-dashed border-neutral-800">
          Services are currently being updated. Please check back later!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service) => (
            <div
              key={service._id}
              className="group relative bg-card/50 backdrop-blur-sm border border-neutral-800 hover:border-primary/50 transition-colors duration-500 overflow-hidden flex flex-col h-full min-h-[400px]"
            >
              {service.imageUrl && (
                <div className="absolute inset-0 z-0">
                  <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40 group-hover:from-black group-hover:via-black/70 group-hover:to-transparent transition-colors duration-700"></div>
                </div>
              )}

              {/* Hover Gradient Background (Base) */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col items-start text-left flex-grow p-8 lg:p-12">
                <h3 className="text-2xl font-heading text-white mb-4 tracking-wide group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-neutral-400 text-lg leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Highlighted Price Tag */}
                <div className="mb-8 inline-block border border-primary/40 px-4 py-1.5 bg-primary/10 text-primary font-bold text-sm tracking-widest shadow-[0_0_15px_rgba(234,179,8,0.15)] rounded-sm group-hover:border-primary transition-colors">
                  {service.price}
                </div>

                {/* Book Now Button */}
                <button 
                  onClick={() => setSelectedService(service)}
                  className="mt-auto inline-flex items-center text-sm font-medium uppercase tracking-widest text-white border border-neutral-700 hover:border-primary px-6 py-3 transition-colors duration-300 group-hover:text-primary relative overflow-hidden"
                >
                  <span className="relative z-10">Book Now</span>
                  <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal for Services */}
      {selectedService && (
        <BookingModal 
          offer={{
            title: selectedService.title,
            description: selectedService.description
          }} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </SectionWrapper>
  );
}
