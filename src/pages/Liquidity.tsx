import React, { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';

const Liquidity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pools' | 'add'>('pools');

  const userPools = [
    {
      id: '1',
      token0: { symbol: 'BNB', name: 'Binance Coin' },
      token1: { symbol: 'FLASK', name: 'Blue Flask V2' },
      liquidity: '1,234.56',
      share: '0.05',
      fees: '12.34',
    },
    {
      id: '2',
      token0: { symbol: 'BUSD', name: 'Binance USD' },
      token1: { symbol: 'FLASK', name: 'Blue Flask V2' },
      liquidity: '2,567.89',
      share: '0.12',
      fees: '25.67',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Liquidity</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('pools')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'pools'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Your Pools
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'add'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Add Liquidity
              </button>
            </div>
          </div>

          {activeTab === 'pools' ? (
            <div>
              {userPools.length > 0 ? (
                <div className="space-y-4">
                  {userPools.map((pool) => (
                    <div
                      key={pool.id}
                      className="bg-gray-700/50 rounded-xl p-6 border border-gray-600"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold">
                              {pool.token0.symbol.charAt(0)}
                            </div>
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold -ml-2">
                              {pool.token1.symbol.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">
                              {pool.token0.symbol}-{pool.token1.symbol}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {pool.token0.name} / {pool.token1.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">${pool.liquidity}</p>
                          <p className="text-gray-400 text-sm">Your Liquidity</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Pool Share</p>
                          <p className="text-white font-semibold">{pool.share}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Fees Earned</p>
                          <p className="text-green-400 font-semibold">${pool.fees}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                          Add
                        </button>
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="text-gray-400" size={24} />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">No liquidity found</h3>
                  <p className="text-gray-400 mb-6">
                    Don't see a pool you joined? Import it.
                  </p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Add Liquidity
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <button
                  onClick={() => setActiveTab('pools')}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Pools
                </button>
              </div>

              <div className="space-y-4">
                {/* Token A */}
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Token A</span>
                    <span className="text-gray-400 text-sm">Balance: 0.00</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="bg-transparent text-white text-xl font-semibold flex-1 outline-none"
                    />
                    <div className="flex items-center gap-2 bg-gray-600 px-3 py-2 rounded-lg">
                      <span className="text-white font-semibold">Select Token</span>
                    </div>
                  </div>
                </div>

                {/* Plus Icon */}
                <div className="flex justify-center">
                  <div className="bg-gray-700 p-2 rounded-lg">
                    <Plus className="text-white" size={16} />
                  </div>
                </div>

                {/* Token B */}
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Token B</span>
                    <span className="text-gray-400 text-sm">Balance: 0.00</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="bg-transparent text-white text-xl font-semibold flex-1 outline-none"
                    />
                    <div className="flex items-center gap-2 bg-gray-600 px-3 py-2 rounded-lg">
                      <span className="text-white font-semibold">Select Token</span>
                    </div>
                  </div>
                </div>

                {/* Pool Info */}
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">Pool Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pool Share</span>
                      <span className="text-white">0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">LP Tokens</span>
                      <span className="text-white">0</span>
                    </div>
                  </div>
                </div>

                <button
                  disabled
                  className="w-full bg-gray-600 text-gray-400 font-semibold py-4 rounded-xl cursor-not-allowed"
                >
                  Select tokens to add liquidity
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Liquidity;