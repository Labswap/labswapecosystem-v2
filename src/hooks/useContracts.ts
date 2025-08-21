import { useState, useEffect, useMemo } from 'react';
import { ContractService } from '../services/contractService';
import { useWeb3 } from './useWeb3';

export const useContracts = () => {
  const { web3, account, isConnected } = useWeb3();
  const [contractService, setContractService] = useState<ContractService | null>(null);

  useEffect(() => {
    if (web3 && account && isConnected) {
      const service = new ContractService(web3, account);
      setContractService(service);
    } else {
      setContractService(null);
    }
  }, [web3, account, isConnected]);

  const contracts = useMemo(() => {
    if (!contractService) return null;

    return {
      // Token operations
      getTokenBalance: contractService.getTokenBalance.bind(contractService),
      getTokenInfo: contractService.getTokenInfo.bind(contractService),
      approveToken: contractService.approveToken.bind(contractService),
      getAllowance: contractService.getAllowance.bind(contractService),

      // DEX operations
      getAmountsOut: contractService.getAmountsOut.bind(contractService),
      swapExactTokensForTokens: contractService.swapExactTokensForTokens.bind(contractService),
      swapExactETHForTokens: contractService.swapExactETHForTokens.bind(contractService),

      // Liquidity operations
      addLiquidity: contractService.addLiquidity.bind(contractService),
      getPairAddress: contractService.getPairAddress.bind(contractService),
      getPairReserves: contractService.getPairReserves.bind(contractService),

      // Farming operations
      getPoolInfo: contractService.getPoolInfo.bind(contractService),
      getUserInfo: contractService.getUserInfo.bind(contractService),
      getPendingFlask: contractService.getPendingFlask.bind(contractService),
      getPendingCake: contractService.getPendingCake.bind(contractService), // Legacy compatibility
      depositToFarm: contractService.depositToFarm.bind(contractService),
      withdrawFromFarm: contractService.withdrawFromFarm.bind(contractService),
      harvestFarm: contractService.harvestFarm.bind(contractService),

      // Staking operations
      enterStaking: contractService.enterStaking.bind(contractService),
      leaveStaking: contractService.leaveStaking.bind(contractService),
      getStakingBalance: contractService.getStakingBalance.bind(contractService),

      // Vault operations
      depositToVault: contractService.depositToVault.bind(contractService),
      withdrawFromVault: contractService.withdrawFromVault.bind(contractService),
      withdrawAllFromVault: contractService.withdrawAllFromVault.bind(contractService),
      getVaultUserInfo: contractService.getVaultUserInfo.bind(contractService),
      getVaultBalance: contractService.getVaultBalance.bind(contractService),
      getVaultTotalShares: contractService.getVaultTotalShares.bind(contractService),
      getVaultAvailable: contractService.getVaultAvailable.bind(contractService),
      harvestVault: contractService.harvestVault.bind(contractService),
      getPricePerFullShare: contractService.getPricePerFullShare.bind(contractService),

      // Utility functions
      toWei: contractService.toWei.bind(contractService),
      fromWei: contractService.fromWei.bind(contractService),
      getDeadline: contractService.getDeadline.bind(contractService),
      estimateGas: contractService.estimateGas.bind(contractService),
      getCurrentBlock: contractService.getCurrentBlock.bind(contractService),
      formatTokenAmount: contractService.formatTokenAmount.bind(contractService),
    };
  }, [contractService]);

  return {
    contracts,
    contractService,
    isReady: !!contractService && isConnected,
  };
};