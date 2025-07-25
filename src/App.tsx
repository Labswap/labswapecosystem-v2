import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import Liquidity from './pages/Liquidity';
import Farms from './pages/Farms';
import Staking from './pages/Staking';
import NFTMarket from './pages/NFTMarket';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/liquidity" element={<Liquidity />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/nft" element={<NFTMarket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;