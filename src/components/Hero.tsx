import React from 'react';
import { ExternalLink } from 'lucide-react';

const Hero = () => {
  return (
    <section className="banner-container">
      {/* Banner Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/BannerWEB.jpg" 
          alt="Labswap Banner" 
          className="banner-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {/* Top spacer for header */}
        <div className="h-20"></div>
        
        {/* Center content area */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 hero-text-shadow">
              Labswap Ecosystem
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 hero-text-shadow max-w-2xl mx-auto">
              DeFi & Web3 Marketing Solutions on BNB Chain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://labswap.finance/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-2xl text-lg backdrop-blur-sm"
              >
                LAUNCH DAPP
                <ExternalLink size={20} />
              </a>
              <a
                href="#about"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 text-lg"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-16"></div>
      </div>
    </section>
  );
};

export default Hero;