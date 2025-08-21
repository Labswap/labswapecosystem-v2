// Export all contract ABIs
export { default as ERC20_ABI } from './ERC20.json';
export { default as ROUTER_ABI } from './PancakeRouter.json';
export { default as FACTORY_ABI } from './PancakeFactory.json';
export { default as PAIR_ABI } from './PancakePair.json';

// Labswap specific contracts
export { default as LABSWAP_MASTERCHEF_ABI } from './LabswapMasterChef.json';
export { default as LABSWAP_SYRUP_BAR_ABI } from './LabswapSyrupBar.json';
export { default as LABSWAP_VAULT_ABI } from './LabswapVault.json';

// Legacy exports for compatibility
export { default as MASTERCHEF_ABI } from './LabswapMasterChef.json';
export { default as SYRUP_BAR_ABI } from './LabswapSyrupBar.json';
export { default as VAULT_ABI } from './LabswapVault.json';