import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { CONTRACT_ADDRESSES } from '../contracts/addresses';
import {
  ERC20_ABI,
  ROUTER_ABI,
  FACTORY_ABI,
  PAIR_ABI,
  MASTERCHEF_ABI,
  SYRUP_BAR_ABI,
  VAULT_ABI
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
    return new this.web3.eth.Contract(MASTERCHEF_ABI as AbiItem[], CONTRACT_ADDRESSES.MASTERCHEF);
  }

  getSyrupBarContract(): Contract {
    return new this.web3.eth.Contract(SYRUP_BAR_ABI as AbiItem[], CONTRACT_ADDRESSES.SYRUP_BAR);
  }

  getVaultContract(): Contract {
    return new this.web3.eth.Contract(VAULT_ABI as AbiItem[], CONTRACT_ADDRESSES.VAULT);
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
  async getPoolInfo(pid: number) {
    const masterChef = this.getMasterChefContract();
    return await masterChef.methods.poolInfo(pid).call();
  }

  async getUserInfo(pid: number, userAddress?: string) {
    const masterChef = this.getMasterChefContract();
    const address = userAddress || this.account;
    return await masterChef.methods.userInfo(pid, address).call();
  }

  async getPendingCake(pid: number, userAddress?: string): Promise<string> {
    const masterChef = this.getMasterChefContract();
    const address = userAddress || this.account;
    return await masterChef.methods.pendingCake(pid, address).call();
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
    return await masterChef.methods.deposit(pid, '0').send({ from: this.account });
  }

  // Staking operations (Syrup Bar)
  async enterStaking(amount: string): Promise<string> {
    const syrupBar = this.getSyrupBarContract();
    return await syrupBar.methods.enter(amount).send({ from: this.account });
  }

  async leaveStaking(shares: string): Promise<string> {
    const syrupBar = this.getSyrupBarContract();
    return await syrupBar.methods.leave(shares).send({ from: this.account });
  }

  async getStakingBalance(userAddress?: string): Promise<string> {
    const syrupBar = this.getSyrupBarContract();
    const address = userAddress || this.account;
    return await syrupBar.methods.balanceOf(address).call();
  }

  // Vault operations
  async depositToVault(amount: string): Promise<string> {
    const vault = this.getVaultContract();
    return await vault.methods.deposit(amount).send({ from: this.account });
  }

  async withdrawFromVault(shares: string): Promise<string> {
    const vault = this.getVaultContract();
    return await vault.methods.withdraw(shares).send({ from: this.account });
  }

  async getVaultBalance(userAddress?: string): Promise<string> {
    const vault = this.getVaultContract();
    const address = userAddress || this.account;
    return await vault.methods.balanceOf(address).call();
  }

  async getPricePerFullShare(): Promise<string> {
    const vault = this.getVaultContract();
    return await vault.methods.getPricePerFullShare(this.account).call();
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
}