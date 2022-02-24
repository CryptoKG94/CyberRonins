
import contract from '../../contracts/build/NftContract.json';

export const environment = {
  production: true,
  nftMintingAddress: contract.networks['4'].address,
  nftMintingABI:contract.abi
};
