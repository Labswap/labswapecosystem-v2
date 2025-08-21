import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { CONTRACT_ADDRESSES } from '../contracts/addresses';
import {
  ERC20_ABI,
  ROUTER_ABI,
  FACTORY_ABI,
  PAIR_ABI,
  LABSWAP_MASTERCHEF_ABI,
  LABSWAP_SYRUP_BAR_ABI,
  LABSWAP_VAULT_ABI
} from '../contracts/abis';

export class ContractService {
  private web3: Web3;
  private account: string;

  constructor(web3: Web3, account: string) {
    this.web3 = web3;
    this.account = account;
  }

  // Contract instances
  getERC20Contract(tokenAddress: string): Contract {
    return new this.web3.eth.Contract(ERC20_ABI as AbiItem[], tokenAddress);
  }

  getRouterContract(): Contract {
    return new this.web3.eth.Contract(ROUTER_ABI as AbiItem[], CONTRACT_ADDRESSES.ROUTER);
  }

  getFactoryContract(): Contract {
    return new this.web3.eth.Contract(FACTORY_ABI as AbiItem[], CONTRACT_ADDRESSES.FACTORY);
  }

  getPairContract(pairAddress: string): Contract {
    return new this.web3.eth.Contract(PAIR_ABI as AbiItem[], pairAddress);
  }

  getMasterChefContract(): Contract {
    return new this.web3.eth.Contract(LABSWAP_MASTERCHEF_ABI as AbiItem[], CONTRACT_ADDRESSES.MASTERCHEF);
  }

  getSyrupBarContract(): Contract {
    return new this.web3.eth.Contract(LABSWAP_SYRUP_BAR_ABI as AbiItem[], CONTRACT_ADDRESSES.SYRUP_BAR);
  }

  getVaultContract(): Contract {
    return new this.web3.eth.Contract(LABSWAP_VAULT_ABI as AbiItem[], CONTRACT_ADDRESSES.VAULT);
  }

  // Token operations
  async getTokenBalance(tokenAddress: string, userAddress?: string): Promise<string> {
    const contract = this.getERC20Contract(tokenAddress);
    const address = userAddress || this.account;
    return await contract.methods.balanceOf(address).call();
  }

  async getTokenInfo(tokenAddress: string) {
    const contract = this.getERC20Contract(tokenAddress);
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      contract.methods.name().call(),
      contract.methods.symbol().call(),
      contract.methods.decimals().call(),
      contract.methods.totalSupply().call()
    ]);

    return { name, symbol, decimals: parseInt(decimals), totalSupply };
  }

  async approveToken(tokenAddress: string, spenderAddress: string, amount: string): Promise<string> {
    const contract = this.getERC20Contract(tokenAddress);
    return await contract.methods.approve(spenderAddress, amount).send({ from: this.account });
  }

  async getAllowance(tokenAddress: string, spenderAddress: string): Promise<string> {
    const contract = this.getERC20Contract(tokenAddress);
    return await contract.methods.allowance(this.account, spenderAddress).call();
  }

  // DEX operations
  async getAmountsOut(amountIn: string, path: string[]): Promise<string[]> {
    const router = this.getRouterContract();
    return await router.methods.getAmountsOut(amountIn, path).call();
  }

  async swapExactTokensForTokens(
    amountIn: string,
    amountOutMin: string,
    path: string[],
    deadline: number
  ): Promise<string> {
    const router = this.getRouterContract();
    return await router.methods
      .swapExactTokensForTokens(amountIn, amountOutMin, path, this.account, deadline)
      .send({ from: this.account });
  }

  async swapExactETHForTokens(
    amountOutMin: string,
    path: string[],
    deadline: number,
    value: string
  ): Promise<string> {
    const router = this.getRouterContract();
    return await router.methods
      .swapExactETHForTokens(amountOutMin, path, this.account, deadline)
      .send({ from: this.account, value });
  }

  // Liquidity operations
  async addLiquidity(
    tokenA: string,
    tokenB: string,
    amountADesired: string,
    amountBDesired: string,
    amountAMin: string,
    amountBMin: string,
    deadline: number
  ): Promise<string> {
    const router = this.getRouterContract();
    return await router.methods
      .addLiquidity(
        tokenA,
        tokenB,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        this.account,
        deadline
      )
      .send({ from: this.account });
  }

  async getPairAddress(tokenA: string, tokenB: string): Promise<string> {
    const factory = this.getFactoryContract();
    return await factory.methods.getPair(tokenA, tokenB).call();
  }

  async getPairReserves(pairAddress: string) {
    const pair = this.getPairContract(pairAddress);
    const reserves = await pair.methods.getReserves().call();
    return {
      reserve0: reserves._reserve0,
      reserve1: reserves._reserve1,
      blockTimestampLast: reserves._blockTimestampLast
    };
  }

  // Farming operations
  async getPoolInfo(pid: number): Promise<any> {
    const masterChef = this.getMasterChefContract();
    return await masterChef.methods.poolInfo(pid).call();
  }

  async getUserInfo(pid: number, userAddress?: string): Promise<any> {
    const masterChef = this.getMasterChefContract();
    const address = userAddress || this.account;
    return await masterChef.methods.userInfo(pid, address).call();
  }

  async getPendingFlask(pid: number, userAddress?: string): Promise<string> {
    const masterChef = this.getMasterChefContract();
    const address = userAddress || this.account;
    return await masterChef.methods.pendingFlask(pid, address).call();
  }

  // Legacy method for compatibility
  async getPendingCake(pid: number, userAddress?: string): Promise<string> {
    return this.getPendingFlask(pid, userAddress);
  }

  async depositToFarm(pid: number, amount: string): Promise<string> {
    const masterChef = this.getMasterChefContract();
    return await masterChef.methods.deposit(pid, amount).send({ from: this.account });
  }

  async withdrawFromFarm(pid: number, amount: string): Promise<string> {
    const masterChef = this.getMasterChefContract();
    return await masterChef.methods.withdraw(pid, amount).send({ from: this.account });
  }

  async harvestFarm(pid: number): Promise<string> {
    const masterChef = this.getMasterChefContract();
    // Harvest by depositing 0 amount
    return await masterChef.methods.deposit(pid, '0').send({ 
      from: this.account,
      gas: 300000 // Set gas limit for harvest operations
    });
  }

  // Staking operations (Syrup Bar)
  async enterStaking(amount: string): Promise<string> {
    const syrupBar = this.getSyrupBarContract();
    return await syrupBar.methods.enter(amount).send({ 
      from: this.account,
      gas: 200000
    });
  }

  async leaveStaking(shares: string): Promise<string> {
    const syrupBar = this.getSyrupBarContract();
    return await syrupBar.methods.leave(shares).send({ 
      from: this.account,
      gas: 200000
    });
  }

  async getStakingBalance(userAddress?: string): Promise<string> {
    const syrupBar = this.getSyrupBarContract();
    const address = userAddress || this.account;
    return await syrupBar.methods.balanceOf(address).call();
  }

  // Vault operations
  async depositToVault(amount: string): Promise<string> {
    const vault = this.getVaultContract();
    return await vault.methods.deposit(amount).send({ 
      from: this.account,
      gas: 300000
    });
  }

  async withdrawFromVault(shares: string): Promise<string> {
    const vault = this.getVaultContract();
    return await vault.methods.withdraw(shares).send({ 
      from: this.account,
      gas: 300000
    });
  }

  async withdrawAllFromVault(): Promise<string> {
    const vault = this.getVaultContract();
    return await vault.methods.withdrawAll().send({ 
      from: this.account,
      gas: 300000
    });
  }

  async getVaultUserInfo(userAddress?: string): Promise<any> {
    const vault = this.getVaultContract();
    const address = userAddress || this.account;
    return await vault.methods.userInfo(address).call();
  }

  async getVaultBalance(userAddress?: string): Promise<string> {
    const userInfo = await this.getVaultUserInfo(userAddress);
    return userInfo.shares;
  }

  async getVaultTotalShares(): Promise<string> {
    const vault = this.getVaultContract();
    return await vault.methods.totalShares().call();
  }

  async getVaultAvailable(): Promise<string> {
    const vault = this.getVaultContract();
    return await vault.methods.available().call();
  }

  async harvestVault(): Promise<string> {
    const vault = this.getVaultContract();
    return await vault.methods.harvest().send({ 
      from: this.account,
      gas: 400000
    });
  }

  // Legacy method for compatibility  
  async getVaultBalance_Legacy(userAddress?: string): Promise<string> {
    const vault = this.getVaultContract();
    const address = userAddress || this.account;
    return await vault.methods.balanceOf(address).call();
  }

  async getPricePerFullShare(): Promise<string> {
    const vault = this.getVaultContract();
    return await vault.methods.getPricePerFullShare().call();
  }

  // Utility functions
  toWei(amount: string): string {
    return this.web3.utils.toWei(amount, 'ether');
  }

  fromWei(amount: string): string {
    return this.web3.utils.fromWei(amount, 'ether');
  }

  getDeadline(minutes: number = 20): number {
    return Math.floor(Date.now() / 1000) + (minutes * 60);
  }

  // Gas estimation helpers
  async estimateGas(method: any, options: any = {}): Promise<number> {
    try {
      const gasEstimate = await method.estimateGas({ from: this.account, ...options });
      return Math.floor(gasEstimate * 1.2); // Add 20% buffer
    } catch (error) {
      console.warn('Gas estimation failed, using default:', error);
      return 300000; // Default gas limit
    }
  }

  // Helper to get current block number
  async getCurrentBlock(): Promise<number> {
    return await this.web3.eth.getBlockNumber();
  }

  // Helper to format large numbers
  formatTokenAmount(amount: string, decimals: number = 18): string {
    const value = parseFloat(this.fromWei(amount));
    if (value === 0) return '0';
    if (value < 0.0001) return '<0.0001';
    if (value < 1) return value.toFixed(4);
    if (value < 1000) return value.toFixed(2);
    if (value < 1000000) return (value / 1000).toFixed(1) + 'K';
    return (value / 1000000).toFixed(1) + 'M';
  }
}