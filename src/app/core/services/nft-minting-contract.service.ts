import { Injectable } from '@angular/core';
import { NftMintingContractToken } from './tokens/nft-minting-token';
import { Observable, from, of, forkJoin } from 'rxjs';
import { map, tap, switchMap, mergeMap, exhaustMap } from 'rxjs/operators';
import { ethers, utils } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class NftMintingContractService {

  constructor(private contractToken: NftMintingContractToken) {
  }

  public mint(id: string,etherValue:string): Observable<string> {

    const wei = utils.parseEther(etherValue);
    console.log(wei.toString(),etherValue,id)
    const token =
      this.contractToken['mint'](id, 1, {
        value: wei
      });
    return from(token)
      .pipe(
        switchMap((tx: any) => {
          console.log('Transaction', tx);
          return from(tx.wait()).pipe(
            tap((txReceipt: any) => console.log('TransactionReceipt: ', txReceipt)),
            map(txReceipt => txReceipt.events.pop()),
            map(txEvent => txEvent.args.contractAddress),
            tap(address => console.log('address: ', address)));
        }));

  }

  public getName(): Observable<string> {

    return from(this.contractToken['contractName']()).pipe(
      map(name => name as string)
    );

  }
  public getUserBalance(account:string,id:number): Observable<string> {
    return from(this.contractToken['balanceOf'](account,id)).pipe(
      map(balance => balance as string)
    );
  }

  public getTokenSupply(id:string): Observable<string> {
    return from(this.contractToken['totalSupply'](parseInt(id))).pipe(
      map(supply => supply as string)
    );
  }

  

}
