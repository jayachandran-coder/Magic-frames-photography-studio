import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

export default function SaaSHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={ref} className="relative min-h-screen bg-neutral-950 overflow-hidden font-sans text-neutral-200 selection:bg-primary/30 selection:text-white">
      {/* Background Parallax Image */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ 
          y: backgroundY, 
          // Using a high quality abstract architecture or gradient image for background
          backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" 
        }}
      />
      
      {/* Left to Right Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
      
      {/* Subtle Background Motion Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] z-0 pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] z-0 pointer-events-none"
      />

      {/* Header/Navbar */}
      <header className="absolute top-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-black/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo on top-left */}
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white cursor-pointer">
            <Sparkles className="text-primary w-7 h-7" />
            <span>SaaS<span className="text-primary text-3xl leading-none">.</span></span>
          </div>
          
          {/* Navigation Links on top */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</a>
            <a href="#resources" className="hover:text-white transition-colors duration-300">Resources</a>
            <a href="#about" className="hover:text-white transition-colors duration-300">Company</a>
          </nav>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-6">
            <button className="hidden md:block text-sm font-medium hover:text-white transition-colors">Log in</button>
            <button className="text-sm font-semibold bg-white text-black px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col justify-center min-h-screen px-6 pt-24 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* New feature badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 text-sm text-primary font-medium w-fit">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Announcing our new AI capabilities
            </div>
            
            {/* Hero Headline */}
            <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Elevate your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-white">
                workflow today.
              </span>
            </h2>
            
            {/* Description Text */}
            <p className="text-xl text-neutral-400 mb-10 max-w-xl leading-relaxed">
              Experience the pinnacle of creative productivity. Our intelligent platform streamlines your complex processes into seamless actions.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300 group">
                <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                </div>
                Watch Demo
              </button>
            </div>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center gap-12"
          >
            <div>
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm font-medium text-neutral-500 mt-1">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">10x</div>
              <div className="text-sm font-medium text-neutral-500 mt-1">Faster Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm font-medium text-neutral-500 mt-1">Premium Support</div>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Decorative gradient line at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50 z-10" />
    </div>
  );
}
