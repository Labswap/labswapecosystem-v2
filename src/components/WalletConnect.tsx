import React from 'react';
import { Wallet, LogOut, AlertCircle } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';

const WalletConnect: React.FC = () => {
  const { account, chainId, isConnected, isConnecting, connectWallet, disconnectWallet } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isCorrectNetwork = chainId === 56; // BSC Mainnet

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        {!isCorrectNetwork && (
          <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-2 rounded-lg text-sm">
            <AlertCircle size={16} />
            Wrong Network
          </div>
        )}
        <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-white font-mono">{formatAddress(account)}</span>
          <button
            onClick={disconnectWallet}
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
    >
      <Wallet size={18} />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
};

export default WalletConnect;