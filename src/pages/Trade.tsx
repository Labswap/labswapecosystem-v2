import React, { useState } from 'react';
import { ArrowDownUp, Settings, Info } from 'lucide-react';
import { Token } from '../types';

const Trade: React.FC = () => {
  const [fromToken, setFromToken] = useState<Token>({
    address: '0x0000000000000000000000000000000000000000',
    symbol: 'BNB',
    name: 'Binance Coin',
    decimals: 18,
  });
  
  const [toToken, setToToken] = useState<Token>({
    address: '0x15d46b30207991425dca153d91eecaa746d57eb1',
    symbol: 'FLASK',
    name: 'Blue Flask V2',
    decimals: 18,
  });

  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const commonTokens = [
    { symbol: 'BNB', name: 'Binance Coin', address: '0x0000000000000000000000000000000000000000' },
    { symbol: 'BUSD', name: 'Binance USD', address: '0xe9e7cea3dedca5984780bafc599bd69add087d56' },
    { symbol: 'USDT', name: 'Tether USD', address: '0x55d398326f99059ff775485246999027b3197955' },
    { symbol: 'CAKE', name: 'PancakeSwap Token', address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82' },
    { symbol: 'FLASK', name: 'Blue Flask V2', address: '0x15d46b30207991425dca153d91eecaa746d57eb1' },
  ];

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = () => {
    // Implement swap logic here
    console.log('Swapping', fromAmount, fromToken.symbol, 'for', toToken.symbol);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Swap</h1>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Settings size={20} />
            </button>
          </div>

          {/* From Token */}
          <div className="bg-gray-700/50 rounded-xl p-4 mb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">From</span>
              <span className="text-gray-400 text-sm">Balance: 0.00</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent text-white text-2xl font-semibold flex-1 outline-none"
              />
              <div className="flex items-center gap-2 bg-gray-600 px-3 py-2 rounded-lg">
                <span className="text-white font-semibold">{fromToken.symbol}</span>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-1 relative z-10">
            <button
              onClick={swapTokens}
              className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg border-4 border-gray-800 transition-colors"
            >
              <ArrowDownUp className="text-white" size={16} />
            </button>
          </div>

          {/* To Token */}
          <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">To</span>
              <span className="text-gray-400 text-sm">Balance: 0.00</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent text-white text-2xl font-semibold flex-1 outline-none"
              />
              <div className="flex items-center gap-2 bg-gray-600 px-3 py-2 rounded-lg">
                <span className="text-white font-semibold">{toToken.symbol}</span>
              </div>
            </div>
          </div>

          {/* Slippage Settings */}
          <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Info size={16} className="text-blue-400" />
              <span className="text-gray-300 text-sm">Slippage Tolerance: {slippage}%</span>
            </div>
            <div className="flex gap-2">
              {['0.1', '0.5', '1.0'].map((value) => (
                <button
                  key={value}
                  onClick={() => setSlippage(value)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    slippage === value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={!fromAmount || !toAmount}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
          >
            {!fromAmount || !toAmount ? 'Enter an amount' : 'Swap'}
          </button>

          {/* Common Tokens */}
          <div className="mt-6">
            <h3 className="text-gray-400 text-sm mb-3">Common tokens</h3>
            <div className="flex flex-wrap gap-2">
              {commonTokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => setToToken({
                    address: token.address,
                    symbol: token.symbol,
                    name: token.name,
                    decimals: 18,
                  })}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                >
                  {token.symbol}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;