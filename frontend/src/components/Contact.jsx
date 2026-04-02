import React from 'react';
import SectionWrapper from './SectionWrapper';

export default function Contact() {
  return (
    <SectionWrapper id="contact" title="Get In Touch" subtitle="Book Your Session" className="bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card/30 border border-neutral-800 p-8 md:p-14 rounded-sm backdrop-blur-md">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 text-left">
                <label className="text-sm text-neutral-400 uppercase tracking-widest font-medium">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-neutral-700 focus:border-primary text-white py-3 outline-none transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="space-y-2 text-left">
                <label className="text-sm text-neutral-400 uppercase tracking-widest font-medium">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-neutral-700 focus:border-primary text-white py-3 outline-none transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-sm text-neutral-400 uppercase tracking-widest font-medium">Event Date</label>
              <input 
                type="date" 
                className="w-full bg-transparent border-b border-neutral-700 focus:border-primary text-white py-3 outline-none transition-colors"
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-sm text-neutral-400 uppercase tracking-widest font-medium">Message</label>
              <textarea 
                rows="4"
                className="w-full bg-transparent border-b border-neutral-700 focus:border-primary text-white py-3 outline-none transition-colors resize-none"
                placeholder="Tell us about your event..."
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-white text-black font-semibold py-4 uppercase tracking-widest transition-colors duration-300 mt-8 rounded-sm"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}
