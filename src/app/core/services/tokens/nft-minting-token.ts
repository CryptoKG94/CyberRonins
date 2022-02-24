import { Injectable } from '@angular/core';
import { Contract } from 'ethers';
import { EthersWeb3Token } from './ethers-web3-token';
import { environment } from 'src/environments/environment';

const NFT_MINTING_CONTRACT = environment.nftMintingAddress;
const abi = environment.nftMintingABI


@Injectable({ providedIn: 'root' })
export class NftMintingContractToken extends Contract {
  constructor(provider: EthersWeb3Token) {
    super(NFT_MINTING_CONTRACT, abi, provider.getSigner());
  }

}
