// Smart Contract Addresses for Labswap Ecosystem on BNB Chain (BSC)
export const CONTRACT_ADDRESSES = {
  // Labswap Core Contracts
  FACTORY: '0x61381c493875cbf48549f05ed8fe5fe696ac98ac', // Labswap Factory
  ROUTER: '0xF1Bb09517cDcfC9C8268Ff8F550F7E99291fB806', // Labswap Router
  
  // Token Contracts
  FLASK_TOKEN: '0x15d46b30207991425dca153d91eecaa746d57eb1', // Blue Flask V2 Token
  CAKE_TOKEN: '0x15d46b30207991425dca153d91eecaa746d57eb1', // Same as FLASK for this ecosystem
  
  // Staking and Farming Contracts (from labswap-staking-v2)
  SYRUP_BAR: '0x75488C20A8B5F8e71E74E7004C9bD75364b5e5c9', // FLASK Staking Pool
  MASTERCHEF: '0x078103420CDB535bAD73B93532658a51B3C1e644', // Yield Farming Master Chef
  VAULT: '0x16Eb55c77baC03245daA297636AE54a8966e3b5A', // Auto-compounding Vault
  
  // Liquidity Mining Pools
  FLASK_BNB_POOL: '0x1234567890123456789012345678901234567890', // FLASK-BNB LP Pool
  FLASK_BUSD_POOL: '0x2345678901234567890123456789012345678901', // FLASK-BUSD LP Pool
  
  // Common BEP-20 Tokens
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  USDT: '0x55d398326f99059ff775485246999027b3197955',
  USDC: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  
  // Governance and Utility
  TIMELOCK: '0x3456789012345678901234567890123456789012', // Governance Timelock
  MULTICALL: '0x4567890123456789012345678901234567890123', // Multicall Contract
} as const;

// Pool IDs for MasterChef
export const POOL_IDS = {
  FLASK_BNB: 0,
  FLASK_BUSD: 1,
  FLASK_USDT: 2,
  FLASK_USDC: 3,
} as const;

// Staking Pool Configuration
export const STAKING_POOLS = {
  FLASK_SINGLE: {
    id: 0,
    stakingToken: CONTRACT_ADDRESSES.FLASK_TOKEN,
    rewardToken: CONTRACT_ADDRESSES.FLASK_TOKEN,
    isAutoCompound: false,
  },
  FLASK_AUTO: {
    id: 1,
    stakingToken: CONTRACT_ADDRESSES.FLASK_TOKEN,
    rewardToken: CONTRACT_ADDRESSES.FLASK_TOKEN,
    isAutoCompound: true,
  },
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
  rpcUrls: [
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io/',
    'https://bsc-dataseed1.ninicoin.io/',
  ],
  blockExplorerUrls: ['https://bscscan.com/'],
};

// Contract ABIs will be imported from separate files
export * from './abis';