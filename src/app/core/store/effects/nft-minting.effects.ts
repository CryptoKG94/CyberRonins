
import { Injectable } from '@angular/core';
import { serializeError } from 'serialize-error';
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



@Injectable()
export class NftMintingEffects {
  constructor(
    private store$: Store<fromStore.AppState>,
    private nftMintingContractService: NftMintingContractService,
    private actions$: Actions,
    private router: Router,
  ) { }

  getTokenSupply$ = createEffect(
    () => this.actions$.pipe(
      ofType(NftMintingActions.getTokenSupply),
      map(action => action.id),
      switchMap(id => {

        return this.nftMintingContractService.getTokenSupply(id).pipe(
          map(supply =>
            NftMintingActions.getTokenSupplySuccess({ supply,id })),
          catchError((err: Error) => of(this.handleError(err)))
        );
      })

    ));




  private handleError(error: Error) {
    const friendlyErrorMessage = serializeError(error).message as string;
    console.log(friendlyErrorMessage)
    return ErrorActions.errorMessage({ errorMsg: friendlyErrorMessage });
  }
}
