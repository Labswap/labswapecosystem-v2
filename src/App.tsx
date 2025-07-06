import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Roadmap from './components/Roadmap';
import NFTCollection from './components/NFTCollection';
import MarketingSolutions from './components/MarketingSolutions';
import Whitepaper from './components/Whitepaper';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      <Header />
      <Hero />
      <About />
      <Roadmap />
      <NFTCollection />
      <MarketingSolutions />
      <Whitepaper />
      <Footer />
    </div>
  );
}

export default App;