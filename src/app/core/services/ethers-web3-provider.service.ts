import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { ethers, utils, Signer } from 'ethers';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { EthereumProviderToken } from '../services/tokens';

@Injectable({ providedIn: 'root' })
export class EthersWeb3ProviderService {

  constructor(
    @Inject(EthereumProviderToken) private ethProvider:any,
    @Inject(DOCUMENT) private document: Document,
  ) {
    
  }

  

  // There is only ever up to one account in MetaMask exposed
  public getSelectedAddress(): Observable<string> {

    const web3Provider:ethers.providers.JsonRpcProvider = new ethers.providers.Web3Provider(this.ethProvider);
    const signer:Signer = web3Provider.getSigner();

    return from(signer.getAddress()).pipe(
      tap(address => console.log('account address', address))
    );
  }
  

  public getNetwork(): Observable<string> {

    const web3Provider: ethers.providers.JsonRpcProvider = new ethers.providers.Web3Provider(this.ethProvider);
    
    return from(web3Provider.getNetwork()).pipe(
      map(network => network.name),

      tap(name => {
        const provider = new ethers.providers.Web3Provider(this.ethProvider);
        this.ethProvider.on('chainChanged',(chain:string)=>{
          if(chain!='0x4'){
            from(
          
              this.ethProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
              })
              ).subscribe(()=>{
                this.document.location.reload();
              })
          }
        })
        if(name!='rinkeby'){
          from(
          
            this.ethProvider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
            })
            ).subscribe(()=>{
              this.document.location.reload();
            })

            
        }
        
      })
    );
  }

  public getBalance(): Observable<string> {

    const web3Provider: ethers.providers.JsonRpcProvider = new ethers.providers.Web3Provider(this.ethProvider);
    const signer: Signer = web3Provider.getSigner();

    // getBalance(addressOrName: string | Promise<string>, blockTag?: BlockTag | Promise<BlockTag>): Promise<BigNumber>;
    return from(web3Provider.getBalance(signer.getAddress())).pipe(
      tap(weiBalance => console.log('wei balance', weiBalance)),

      map(weiBalance => utils.formatEther(weiBalance)),
      tap(balance => console.log('eth balance', balance)),

    );
  }

}
