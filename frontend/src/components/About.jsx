import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

export default function About() {
  const [aboutImage, setAboutImage] = useState('https://images.unsplash.com/photo-1554050857-c84a8abdb5e5?q=80&w=1927&auto=format&fit=crop');

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/about`);
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
        <div className="relative h-[600px] w-full rounded-xl shadow-2xl overflow-hidden group">
          <motion.img
            loading="lazy"
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
            <span>__Our Story</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-3xl lg:text-4xl font-heading text-white tracking-tight leading-[1.1] mb-8"
          >
            <span className="text-primary font-serif"> Where Passion Meets the Lens.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 text-neutral-400 text-lg lg:text-xl leading-relaxed max-w-xl"
          >
            <p>
              Hello! I’m Guhan, a visual storyteller dedicated to capturing life’s most beautiful moments through the art of photography and cinematography. My fascination with cinematic frames didn’t start at a desk—it started as a childhood dream that grew into a lifelong obsession.
            </p>
            <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-3xl lg:text-4xl font-heading text-white tracking-tight leading-[1.1] mb-8"
          >
            <span className="text-primary font-serif"> My Vision.</span>
          </motion.h2>
            <p>
              I believe that every celebration has a rhythm and every couple has a story. My goal is to use my award-winning storytelling background to turn your precious moments into an everlasting visual legacy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
          </motion.div>
        </div>

      </div>
    </SectionWrapper>
  );
}
