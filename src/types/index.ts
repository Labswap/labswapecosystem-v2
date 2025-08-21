export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

export interface Pool {
  id: string;
  token0: Token;
  token1: Token;
  reserve0: string;
  reserve1: string;
  totalSupply: string;
  apr: number;
}

export interface Farm {
  id: string;
  lpToken: string;
  allocPoint: number;
  lastRewardBlock: number;
  accCakePerShare: string;
  apr: number;
  multiplier: string;
  token0: Token;
  token1: Token;
  totalStaked: string;
}

export interface NFT {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  price: string;
  seller: string;
  collection: string;
}

export interface StakePool {
  id: string;
  stakingToken: Token;
  rewardToken: Token;
  apr: number;
  totalStaked: string;
  userStaked: string;
  pendingRewards: string;
}