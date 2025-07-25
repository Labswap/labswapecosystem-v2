// Smart Contract Addresses for BNB Chain (BSC)
export const CONTRACT_ADDRESSES = {
  // Core PancakeSwap Contracts
  FACTORY: '0x61381c493875cbf48549f05ed8fe5fe696ac98ac',
  ROUTER: '0xF1Bb09517cDcfC9C8268Ff8F550F7E99291fB806',
  
  // Token Contracts
  CAKE_TOKEN: '0x15d46b30207991425dca153d91eecaa746d57eb1', // FLASK Token
  FLASK_TOKEN: '0x15d46b30207991425dca153d91eecaa746d57eb1', // Same as CAKE for this ecosystem
  
  // Staking and Farming
  SYRUP_BAR: '0x75488C20A8B5F8e71E74E7004C9bD75364b5e5c9',
  MASTERCHEF: '0x078103420CDB535bAD73B93532658a51B3C1e644',
  VAULT: '0x16Eb55c77baC03245daA297636AE54a8966e3b5A',
  
  // Common BEP-20 Tokens
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  USDT: '0x55d398326f99059ff775485246999027b3197955',
} as const;

// Network Configuration
export const NETWORK_CONFIG = {
  chainId: 56, // BSC Mainnet
  chainName: 'BNB Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
};

// Contract ABIs will be imported from separate files
export * from './abis';