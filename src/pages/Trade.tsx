import React, { useState } from 'react';
import { ArrowDownUp, Settings, Info } from 'lucide-react';
import { Token } from '../types';
import { useContracts } from '../hooks/useContracts';
import { CONTRACT_ADDRESSES } from '../contracts/addresses';

const Trade: React.FC = () => {
  const { contracts, isReady } = useContracts();
  const [isSwapping, setIsSwapping] = useState(false);
  
  const [fromToken, setFromToken] = useState<Token>({
    address: CONTRACT_ADDRESSES.WBNB,
    symbol: 'BNB',
    name: 'Binance Coin',
    decimals: 18,
  });
  
  const [toToken, setToToken] = useState<Token>({
    address: CONTRACT_ADDRESSES.FLASK_TOKEN,
    symbol: 'FLASK',
    name: 'Blue Flask V2',
    decimals: 18,
  });

  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const commonTokens = [
    { symbol: 'BNB', name: 'Binance Coin', address: CONTRACT_ADDRESSES.WBNB },
    { symbol: 'BUSD', name: 'Binance USD', address: CONTRACT_ADDRESSES.BUSD },
    { symbol: 'USDT', name: 'Tether USD', address: CONTRACT_ADDRESSES.USDT },
    { symbol: 'FLASK', name: 'Blue Flask V2', address: CONTRACT_ADDRESSES.FLASK_TOKEN },
  ];

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!contracts || !isReady || !fromAmount || !toAmount) return;

    try {
      setIsSwapping(true);
      
      const path = [fromToken.address, toToken.address];
      const amountIn = contracts.toWei(fromAmount);
      const amountOutMin = contracts.toWei((parseFloat(toAmount) * (1 - parseFloat(slippage) / 100)).toString());
      const deadline = contracts.getDeadline();

      // Check if we need to approve tokens first
      if (fromToken.address !== CONTRACT_ADDRESSES.WBNB) {
        const allowance = await contracts.getAllowance(fromToken.address, CONTRACT_ADDRESSES.ROUTER);
        if (parseFloat(contracts.fromWei(allowance)) < parseFloat(fromAmount)) {
          await contracts.approveToken(fromToken.address, CONTRACT_ADDRESSES.ROUTER, amountIn);
        }
      }

      // Execute swap
      if (fromToken.address === CONTRACT_ADDRESSES.WBNB) {
        await contracts.swapExactETHForTokens(amountOutMin, path, deadline, amountIn);
      } else {
        await contracts.swapExactTokensForTokens(amountIn, amountOutMin, path, deadline);
      }

      // Reset form
      setFromAmount('');
      setToAmount('');
      
      alert('Swap completed successfully!');
    } catch (error) {
      console.error('Swap failed:', error);
      alert('Swap failed. Please try again.');
    } finally {
      setIsSwapping(false);
    }
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
            disabled={!fromAmount || !toAmount || !isReady || isSwapping}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
          >
            {!isReady ? 'Connect Wallet' : isSwapping ? 'Swapping...' : !fromAmount || !toAmount ? 'Enter an amount' : 'Swap'}
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