import React from 'react';
import { ExternalLink } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Banner Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/BannerWEB.jpg" 
          alt="Labswap Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent"></div>
      </div>

      {/* Action Buttons - Bottom Right */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-4">
        <a
          href="https://labswap.finance/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
        >
          LAUNCH DAPP
          <ExternalLink size={18} />
        </a>
      </div>
    </section>
  );
};

export default Hero;