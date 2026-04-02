import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

export default function About() {
  const [aboutImage, setAboutImage] = useState('https://images.unsplash.com/photo-1554050857-c84a8abdb5e5?q=80&w=1927&auto=format&fit=crop');

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/about');
        if (res.ok) {
          const data = await res.json();
          if (data && data.imageUrl) {
            setAboutImage(data.imageUrl);
          }
        }
      } catch (error) {
        console.error('Failed to fetch About image', error);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <SectionWrapper id="about" className="bg-black relative overflow-hidden">
      {/* Decorative Blur Orb */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Image Grid Column */}
        <div className="relative h-[600px] w-full rounded-sm overflow-hidden group">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            src={aboutImage} 
            alt="Photographer behind the scenes"
            className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700"
          />
          {/* Aesthetic Border Frame */}
          <div className="absolute inset-4 border border-primary/30 z-10 scale-105 group-hover:scale-100 transition-transform duration-700" />
        </div>

        {/* Text Column */}
        <div className="flex flex-col text-left justify-center">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-primary tracking-widest uppercase text-sm font-medium mb-6 flex items-center gap-4"
          >
            <span className="w-12 h-[1px] bg-primary"></span>
            The Artist
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white tracking-tight leading-[1.1] mb-8"
          >
            We don't just take pictures. <br/>
            <span className="text-primary italic font-serif">We frame magic.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 text-neutral-400 text-lg lg:text-xl leading-relaxed max-w-xl"
          >
            <p>
              Founded in 2018, Magic Frames is a boutique studio specializing in high-end visual storytelling. Whether it's the intimate joy of a wedding, the fast-paced energy of a commercial shoot, or the quiet elegance of an editorial portrait, we bring a cinematic eye to every project.
            </p>
            <p>
              Our philosophy is simple: authentic emotion mixed with uncompromising aesthetic standards. We use state-of-the-art cinema cameras and lighting techniques to ensure your memories don't just look good, they feel real.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Signature_of_John_Hancock.svg/1200px-Signature_of_John_Hancock.svg.png" 
              alt="Signature" 
              className="h-16 opacity-40 invert filter"
            />
          </motion.div>
        </div>
        
      </div>
    </SectionWrapper>
  );
}
