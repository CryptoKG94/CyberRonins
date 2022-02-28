
import { Injectable } from '@angular/core';
import { serializeError } from 'eth-rpc-errors'
import {
  map, mapTo, tap, filter, withLatestFrom,
  switchMap, exhaustMap, catchError, concatMap, concatMapTo
} from 'rxjs/operators';

import { of, concat } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

import { NftMintingContractService } from '../../services/nft-minting-contract.service';

import * as fromStore from '../reducers';
import { Store, select } from '@ngrx/store';
import { ErrorActions, Web3GatewayActions,NftMintingActions } from '../actions';
import { ethers } from 'ethers';
import { NotificationService } from '../../services/notification.service';



@Injectable()
export class NftMintingEffects {
  constructor(
    private store$: Store<fromStore.AppState>,
    private nftMintingContractService: NftMintingContractService,
    private actions$: Actions,
    private router: Router,
    private notifyService : NotificationService
  ) { }

  getTokenSupply$ = createEffect(
    () => this.actions$.pipe(
      ofType(NftMintingActions.getTokenSupply),
      map(action => action.id),
      concatMap(id => {

        return this.nftMintingContractService.getTokenSupply(id).pipe(
          tap(console.log),
          map((supplyBig:ethers.BigNumber) =>{
            let supply=supplyBig.toNumber()+'';
            return NftMintingActions.getTokenSupplySuccess({ supply,id })})
            ,
          catchError((err: Error) => of(this.handleError(err)))
        );
      })

    ));

    getTokenPrice$ = createEffect(
      () => this.actions$.pipe(
        ofType(NftMintingActions.getTokenPrice),

        concatMap(({id}) => {
  
          return this.nftMintingContractService.getTokenPrice(id).pipe(
            tap(()=>console.log("Token Price")),
            tap(console.log),
            map((priceBig:ethers.BigNumber) =>{
              
              let price=ethers.utils.formatEther(priceBig)+'';
              return NftMintingActions.getTokenPriceSuccess({ id,price })})
              ,
            catchError((err: Error) => of(this.handleError(err)))
          );
        })
  
      ));

    mintToken$ = createEffect(
      () => this.actions$.pipe(
        ofType(NftMintingActions.mintToken),
        concatMap(({id,etherValue}) => {
  
          return this.nftMintingContractService.mint(id,etherValue).pipe(
            tap(console.log),
            map(() =>{
              return NftMintingActions.mintTokenSuccess({ id })}),
            catchError((err: Error) => of(this.handleError(err)))
          );
        })
  
      ));

      mintTokenSucccess$=createEffect(
        ()=>this.actions$.pipe(
          ofType(NftMintingActions.mintTokenSuccess),
          map(({id})=>{
            return NftMintingActions.getTokenSupply({id})
          })
        )
      )




  private handleError(error: Error) {
    let friendlyErrorMessage = serializeError(error).message as string;
    if(error.message&&(error.message.indexOf("execution reverted:")>-1)){
      let start=error.message.indexOf("execution reverted:")+"execution reverted:".length;
      let end=error.message.indexOf('","data"');
      friendlyErrorMessage=error.message.substring(start,end);
      this.notifyService.showError(friendlyErrorMessage, "")
    }
    
    
    console.log(friendlyErrorMessage)
    return ErrorActions.errorMessage({ errorMsg: friendlyErrorMessage });
  }
}
