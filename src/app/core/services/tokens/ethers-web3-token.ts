import { Injectable, Inject } from '@angular/core';
import { providers } from 'ethers';
import { EthereumProviderToken } from './ethereum-provider-token';


@Injectable({ providedIn: 'root' })
export class EthersWeb3Token extends providers.Web3Provider {
  constructor(@Inject(EthereumProviderToken) web3Provider:any) {
    super(web3Provider);
  }
}