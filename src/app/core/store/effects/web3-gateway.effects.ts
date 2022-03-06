import { Injectable, Inject } from '@angular/core';
import { serializeError } from 'serialize-error';
import { Router } from '@angular/router';
import { of, from, fromEvent, EMPTY as empty, Observable } from 'rxjs';
import { exhaustMap, switchMap, map, tap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

import { Actions, ofType, createEffect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../reducers';

import { EthereumProviderToken } from '../../services/tokens';
import { EthersWeb3ProviderService } from '../../services/ethers-web3-provider.service';
import { Web3GatewayActions, ErrorActions } from '../actions';
import { utils } from 'ethers';
import { NotificationService } from '../../services/notification.service';
import { LocalStorageProviderToken } from '../../services/tokens/local-storage-token';

@Injectable()
export class Web3GatewayEffects {
  constructor(
    @Inject(EthereumProviderToken) private ethProvider:any,
    private readonly actions$: Actions,
    private store$: Store<fromStore.AppState>,
    private router: Router,
    private web3ProviderSrv: EthersWeb3ProviderService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LocalStorageProviderToken) private localStorageProvider:any,
    private notifyService : NotificationService
  ) { }

  ethereumInject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        if (!this.ethProvider || !this.ethProvider.isMetaMask) {
          return ErrorActions.errorMessage({ errorMsg: `Please install MetaMask.` });
        }
        return Web3GatewayActions.ethereumInjectSuccess();
      })
    )
  );
  ethereumInjectSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Web3GatewayActions.ethereumInjectSuccess),
      map(() => {
        let account=this.localStorageProvider.getItem('account')
        if(account&&account.length){
          return Web3GatewayActions.ethereumConnect();
        }else{
          return Web3GatewayActions.ethereumDisconnect();
        }
        
      })
    )
  );


  ethereumConnect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Web3GatewayActions.ethereumConnect),
      exhaustMap(() => {

        return from<any[]>(this.ethProvider.send('eth_requestAccounts')).pipe(
          map((ethAccounts) => {
            if (ethAccounts.length === 0) {
              return ErrorActions.errorMessage({ errorMsg: `Can't get any user accounts` });
            }
            console.log(`Ethereum provider has been granted access to the following account:`, ethAccounts[0]);
            this.localStorageProvider.setItem("account",ethAccounts[0])
            return Web3GatewayActions.ethereumConnectSuccess();
          }),
          catchError((err: Error) => of(this.handleError(err)) )
        );

      })
    )
  );

  ethereumDisconnect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Web3GatewayActions.ethereumDisconnect),
      map(() => {
        this.localStorageProvider.setItem("account","")
        this.localStorageProvider.setItem("disconnected","true")
        return Web3GatewayActions.ethereumDisconnectSuccess();

      })
    )
  );


  connectRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Web3GatewayActions.ethereumConnectRedirect),
        tap(_ => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  


  getAccountInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Web3GatewayActions.ethereumConnectSuccess),
      switchMap(() => {
        return [Web3GatewayActions.getNetwork(), Web3GatewayActions.getAccount(), Web3GatewayActions.getBalance()];

      })
    )
  );

  getAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Web3GatewayActions.getAccount),
      switchMap(() =>
        this.web3ProviderSrv.getSelectedAddress().pipe(
          map((address: string) => Web3GatewayActions.accountSuccess({ address })),
          catchError((err: Error) => of(this.handleError(err)))
        )
      )
    )
  );

  getBalance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Web3GatewayActions.getBalance),
      switchMap(() =>
        this.web3ProviderSrv.getBalance().pipe(
          map((balance: string) =>
            Web3GatewayActions.balanceSuccess({ balance })
          ),
          catchError((err: Error) => of(this.handleError(err)))
        )
      )
    )
  );
  

  getNetwork$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Web3GatewayActions.getNetwork),
      switchMap(() =>
        this.web3ProviderSrv.getNetwork().pipe(
          tap((network)=>{
            console.log(network)
            
          }),
          map((network: string) =>
            Web3GatewayActions.networkSuccess({ network })
          ),
          catchError((err: Error) => of(this.handleError(err)))
        )
      )
    )
  );

  


  accountWatcher$ = !!this.ethProvider ? fromEvent(this.ethProvider, 'accountsChanged').pipe(
    withLatestFrom(this.store$.pipe(select(fromStore.getAccount))),

   
    filter<any[]>(([accounts, currentAccount]) => {

      if (accounts.length === 0)
        return true;

      const curAdd = currentAccount ? utils.getAddress(currentAccount) : currentAccount;
      const newAdd = accounts[0] ? utils.getAddress(accounts[0]) : accounts[0];

      if (!!curAdd && (curAdd !== newAdd)) {
        return true;
      }

      return false;
    }),
    map(([accounts, currentAccount]) => {
      this.document.location.reload();
    })
  ) : of(1);

  accountChanged$ = createEffect(
    () => this.accountWatcher$,
    { dispatch: false }
  );


  private handleError(error: Error) {
    const friendlyErrorMessage = serializeError(error).message as string;
    return ErrorActions.errorMessage({ errorMsg: friendlyErrorMessage });
  }


}
