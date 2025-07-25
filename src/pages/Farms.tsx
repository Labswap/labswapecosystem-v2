import React, { useState } from 'react';
import { TrendingUp, Plus, Minus } from 'lucide-react';
import { useContracts } from '../hooks/useContracts';

const Farms: React.FC = () => {
  const { contracts, isReady } = useContracts();
  const [activeTab, setActiveTab] = useState<'live' | 'finished'>('live');
  const [stakingAmounts, setStakingAmounts] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  const farms = [
    {
      id: '1',
      token0: { symbol: 'BNB', name: 'Binance Coin' },
      token1: { symbol: 'FLASK', name: 'Blue Flask V2' },
      apr: 45.67,
      multiplier: '2X',
      liquidity: '$1,234,567',
      earned: '0.0000',
      staked: '0.0000',
      isActive: true,
    },
    {
      id: '2',
      token0: { symbol: 'BUSD', name: 'Binance USD' },
      token1: { symbol: 'FLASK', name: 'Blue Flask V2' },
      apr: 32.45,
      multiplier: '1.5X',
      liquidity: '$987,654',
      earned: '0.0000',
      staked: '0.0000',
      isActive: true,
    },
    {
      id: '3',
      token0: { symbol: 'CAKE', name: 'PancakeSwap Token' },
      token1: { symbol: 'BNB', name: 'Binance Coin' },
      apr: 28.91,
      multiplier: '1X',
      liquidity: '$2,345,678',
      earned: '0.0000',
      staked: '0.0000',
      isActive: false,
    },
  ];

  const activeFarms = farms.filter(farm => farm.isActive);
  const finishedFarms = farms.filter(farm => !farm.isActive);

  const displayFarms = activeTab === 'live' ? activeFarms : finishedFarms;

  const handleStake = async (farmId: string, pid: number) => {
    if (!contracts || !isReady) return;
    
    const amount = stakingAmounts[farmId];
    if (!amount) return;

    try {
      setIsLoading(prev => ({ ...prev, [farmId]: true }));
      
      const amountWei = contracts.toWei(amount);
      await contracts.depositToFarm(pid, amountWei);
      
      setStakingAmounts(prev => ({ ...prev, [farmId]: '' }));
      alert('Staking successful!');
    } catch (error) {
      console.error('Staking failed:', error);
      alert('Staking failed. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, [farmId]: false }));
    }
  };

  const handleUnstake = async (farmId: string, pid: number) => {
    if (!contracts || !isReady) return;

    try {
      setIsLoading(prev => ({ ...prev, [farmId]: true }));
      
      // Get user info to withdraw all staked amount
      const userInfo = await contracts.getUserInfo(pid);
      await contracts.withdrawFromFarm(pid, userInfo.amount);
      
      alert('Unstaking successful!');
    } catch (error) {
      console.error('Unstaking failed:', error);
      alert('Unstaking failed. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, [farmId]: false }));
    }
  };

  const handleHarvest = async (farmId: string, pid: number) => {
    if (!contracts || !isReady) return;

    try {
      setIsLoading(prev => ({ ...prev, [farmId]: true }));
      
      await contracts.harvestFarm(pid);
      
      alert('Harvest successful!');
    } catch (error) {
      console.error('Harvest failed:', error);
      alert('Harvest failed. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, [farmId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Farms</h1>
          <p className="text-gray-300">
            Stake LP tokens to earn FLASK rewards. Higher APR, higher rewards.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-green-400" size={24} />
              <h3 className="text-white font-semibold">Total Value Locked</h3>
            </div>
            <p className="text-2xl font-bold text-white">$4,567,899</p>
            <p className="text-green-400 text-sm">+12.5% from last week</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-white font-semibold mb-2">FLASK Earned</h3>
            <p className="text-2xl font-bold text-white">0.0000</p>
            <p className="text-gray-400 text-sm">~$0.00</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-white font-semibold mb-2">FLASK in Wallet</h3>
            <p className="text-2xl font-bold text-white">0.0000</p>
            <p className="text-gray-400 text-sm">~$0.00</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'live'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Live ({activeFarms.length})
          </button>
          <button
            onClick={() => setActiveTab('finished')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'finished'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Finished ({finishedFarms.length})
          </button>
        </div>

        {/* Farms List */}
        <div className="space-y-4">
          {displayFarms.map((farm) => (
            <div
              key={farm.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
                {/* Farm Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold">
                        {farm.token0.symbol.charAt(0)}
                      </div>
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold -ml-2">
                        {farm.token1.symbol.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {farm.token0.symbol}-{farm.token1.symbol}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                          {farm.multiplier}
                        </span>
                        {!farm.isActive && (
                          <span className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                            Finished
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* APR */}
                <div>
                  <p className="text-gray-400 text-sm">APR</p>
                  <p className="text-green-400 font-bold text-lg">{farm.apr}%</p>
                </div>

                {/* Liquidity */}
                <div>
                  <p className="text-gray-400 text-sm">Liquidity</p>
                  <p className="text-white font-semibold">{farm.liquidity}</p>
                </div>

                {/* Earned */}
                <div>
                  <p className="text-gray-400 text-sm">FLASK Earned</p>
                  <p className="text-white font-semibold">{farm.earned}</p>
                  <button 
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    onClick={() => handleHarvest(farm.id, parseInt(farm.id) - 1)}
                    disabled={!isReady || isLoading[farm.id]}
                  >
                    {isLoading[farm.id] ? 'Harvesting...' : 'Harvest'}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    onClick={() => handleStake(farm.id, parseInt(farm.id) - 1)}
                    disabled={!isReady || isLoading[farm.id]}
                  >
                    <Plus size={16} />
                    {isLoading[farm.id] ? 'Staking...' : 'Stake'}
                  </button>
                  <button 
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    onClick={() => handleUnstake(farm.id, parseInt(farm.id) - 1)}
                    disabled={!isReady || isLoading[farm.id]}
                  >
                    <Minus size={16} />
                    {isLoading[farm.id] ? 'Unstaking...' : 'Unstake'}
                  </button>
                </div>
              </div>

              {/* Staked Amount */}
              {farm.staked !== '0.0000' && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Staked LP Tokens</span>
                    <span className="text-white font-semibold">{farm.staked}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {displayFarms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-gray-400" size={24} />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">
              No {activeTab} farms found
            </h3>
            <p className="text-gray-400">
              {activeTab === 'live' 
                ? 'Check back later for new farming opportunities.'
                : 'No finished farms at the moment.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Farms;