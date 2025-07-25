import React, { useState } from 'react';
import { Lock, Unlock, TrendingUp } from 'lucide-react';
import { useContracts } from '../hooks/useContracts';

const Staking: React.FC = () => {
  const { contracts, isReady } = useContracts();
  const [activePool, setActivePool] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  const stakingPools = [
    {
      id: '1',
      name: 'FLASK Staking Pool',
      stakingToken: 'FLASK',
      rewardToken: 'FLASK',
      apr: 25.5,
      totalStaked: '12,345,678',
      userStaked: '0.0000',
      pendingRewards: '0.0000',
      lockPeriod: '30 days',
      isFlexible: false,
    },
    {
      id: '2',
      name: 'Flexible FLASK Pool',
      stakingToken: 'FLASK',
      rewardToken: 'FLASK',
      apr: 15.2,
      totalStaked: '8,765,432',
      userStaked: '0.0000',
      pendingRewards: '0.0000',
      lockPeriod: 'Flexible',
      isFlexible: true,
    },
    {
      id: '3',
      name: 'BNB Staking Pool',
      stakingToken: 'BNB',
      rewardToken: 'FLASK',
      apr: 18.7,
      totalStaked: '45,678',
      userStaked: '0.0000',
      pendingRewards: '0.0000',
      lockPeriod: '7 days',
      isFlexible: false,
    },
  ];

  const handleStake = async (poolId: string) => {
    if (!contracts || !isReady || !stakeAmount) return;

    try {
      setIsLoading(prev => ({ ...prev, [poolId]: true }));
      
      const amountWei = contracts.toWei(stakeAmount);
      
      // For FLASK staking (Syrup Bar)
      if (poolId === '1' || poolId === '2') {
        await contracts.enterStaking(amountWei);
      } else {
        // For other staking pools (Vault)
        await contracts.depositToVault(amountWei);
      }
      
      setStakeAmount('');
      setActivePool(null);
      alert('Staking successful!');
    } catch (error) {
      console.error('Staking failed:', error);
      alert('Staking failed. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, [poolId]: false }));
    }
  };

  const handleUnstake = async (poolId: string) => {
    if (!contracts || !isReady) return;

    try {
      setIsLoading(prev => ({ ...prev, [poolId]: true }));
      
      // For FLASK staking (Syrup Bar)
      if (poolId === '1' || poolId === '2') {
        const balance = await contracts.getStakingBalance();
        await contracts.leaveStaking(balance);
      } else {
        // For other staking pools (Vault)
        const balance = await contracts.getVaultBalance();
        await contracts.withdrawFromVault(balance);
      }
      
      alert('Unstaking successful!');
    } catch (error) {
      console.error('Unstaking failed:', error);
      alert('Unstaking failed. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, [poolId]: false }));
    }
  };

  const handleHarvest = async (poolId: string) => {
    if (!contracts || !isReady) return;

    try {
      setIsLoading(prev => ({ ...prev, [poolId]: true }));
      
      // Harvest by staking 0 amount
      await contracts.enterStaking('0');
      
      alert('Harvest successful!');
    } catch (error) {
      console.error('Harvest failed:', error);
      alert('Harvest failed. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, [poolId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Staking Pools</h1>
          <p className="text-gray-300">
            Stake your tokens to earn rewards. Choose between flexible or locked staking options.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-blue-400" size={24} />
              <h3 className="text-white font-semibold">Total Staked</h3>
            </div>
            <p className="text-2xl font-bold text-white">21,156,888 FLASK</p>
            <p className="text-blue-400 text-sm">~$2,115,689</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-white font-semibold mb-2">Your Total Staked</h3>
            <p className="text-2xl font-bold text-white">0.0000 FLASK</p>
            <p className="text-gray-400 text-sm">~$0.00</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-white font-semibold mb-2">Pending Rewards</h3>
            <p className="text-2xl font-bold text-white">0.0000 FLASK</p>
            <p className="text-gray-400 text-sm">~$0.00</p>
          </div>
        </div>

        {/* Staking Pools */}
        <div className="space-y-6">
          {stakingPools.map((pool) => (
            <div
              key={pool.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                {/* Pool Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Lock className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{pool.name}</h3>
                      <p className="text-gray-400 text-sm">
                        Stake {pool.stakingToken} • Earn {pool.rewardToken}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pool.isFlexible 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {pool.lockPeriod}
                    </span>
                  </div>
                </div>

                {/* APR */}
                <div>
                  <p className="text-gray-400 text-sm mb-1">APR</p>
                  <p className="text-green-400 font-bold text-xl">{pool.apr}%</p>
                </div>

                {/* Total Staked */}
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Staked</p>
                  <p className="text-white font-semibold">{pool.totalStaked}</p>
                  <p className="text-gray-400 text-sm">{pool.stakingToken}</p>
                </div>

                {/* User Stats & Actions */}
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Your Staked</p>
                    <p className="text-white font-semibold">{pool.userStaked} {pool.stakingToken}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Pending Rewards</p>
                    <p className="text-white font-semibold">{pool.pendingRewards} {pool.rewardToken}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setActivePool(activePool === pool.id ? null : pool.id)}
                      disabled={!isReady}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      {!isReady ? 'Connect Wallet' : 'Stake'}
                    </button>
                    <button
                      onClick={() => handleUnstake(pool.id)}
                      disabled={!isReady || isLoading[pool.id]}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      {isLoading[pool.id] ? 'Unstaking...' : 'Unstake'}
                    </button>
                    <button
                      onClick={() => handleHarvest(pool.id)}
                      disabled={!isReady || isLoading[pool.id]}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      {isLoading[pool.id] ? 'Harvesting...' : 'Harvest'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Stake Input */}
              {activePool === pool.id && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="max-w-md">
                    <div className="bg-gray-700/50 rounded-xl p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Amount to Stake</span>
                        <span className="text-gray-400 text-sm">Balance: 0.00 {pool.stakingToken}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          placeholder="0.0"
                          className="bg-transparent text-white text-xl font-semibold flex-1 outline-none"
                        />
                        <span className="text-white font-semibold">{pool.stakingToken}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStake(pool.id)}
                        disabled={!stakeAmount || !isReady || isLoading[pool.id]}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        {isLoading[pool.id] ? 'Staking...' : 'Confirm Stake'}
                      </button>
                      <button
                        onClick={() => setActivePool(null)}
                        className="px-6 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Staking;