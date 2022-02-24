
import {
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
    Action,
    ActionReducerMap,
  } from '@ngrx/store';
  import { InjectionToken } from '@angular/core';
  import * as fromRouter from '@ngrx/router-store';
  
  import { environment } from '../../../../environments/environment';
  import * as fromError from './error.reducer';
  import * as fromWeb3Gateway from './web3-gateway.reducer';
  import * as fromIpfsDaemon from './ipfs-daemon.reducer';
  import * as fromIpfs from './ipfs-image.reducers';
  import * as fromNftMinting from './nft-minting.reducers';
  

  export interface AppState {
    router: fromRouter.RouterReducerState<any>;
    error: fromError.ErrorState;
    web3Provider: fromWeb3Gateway.Web3GatewayState;
    ipfsDaemon: fromIpfsDaemon.IpfsDaemonState;
    ipfs: fromIpfs.State;
    nftMinting:fromNftMinting.State;
  
  }
  
 

  export const ROOT_REDUCERS =
    new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers token', {
    factory: () => ({
      router: fromRouter.routerReducer,
      error: fromError.reducer,
      web3Provider: fromWeb3Gateway.reducer,
      ipfsDaemon: fromIpfsDaemon.reducer,
      ipfs:fromIpfs.reducer,
      nftMinting:fromNftMinting.reducer
  
    }),
  });
  
  // console.log all actions
  export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return (state, action) => {
      const result = reducer(state, action);
      console.groupCollapsed(action.type);
      console.log('prev state', state);
      console.log('action', action);
      console.log('next state', result);
      console.groupEnd();
  
      return result;
    };
  }
  
  export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger]
    : [];
  
  export const selectRouterState = createFeatureSelector<AppState,
    fromRouter.RouterReducerState<any>>('router');
  
  export const {
    selectQueryParams,    // select the current route query params
    selectRouteParams,    // select the current route params
    selectRouteData,      // select the current route data
    selectUrl,            // select the current url
  } = fromRouter.getSelectors(selectRouterState);
  
  
  export const selectErrorState = createFeatureSelector<AppState, fromError.ErrorState>(
    'error'
  );
  
  export const getError = createSelector(
    selectErrorState,
    fromError.getError
  );
  
  export const selectWeb3GatewayState = createFeatureSelector<AppState, fromWeb3Gateway.Web3GatewayState>(
    'web3Provider'
  );
  
  export const getEthereumInjected = createSelector(
    selectWeb3GatewayState,
    fromWeb3Gateway.getEthereumInjected
  );
  
  export const getEthereumConnected = createSelector(
    selectWeb3GatewayState,
    fromWeb3Gateway.getEthereumConnected
  );
  
  export const getAccount = createSelector(
    selectWeb3GatewayState,
    fromWeb3Gateway.getAccount
  );
  
  export const getNetwork = createSelector(
    selectWeb3GatewayState,
    fromWeb3Gateway.getNetwork
  );
  
  export const getBalance = createSelector(
    selectWeb3GatewayState,
    fromWeb3Gateway.getBalance
  );
  
  export const selectIpfsDaemonState = createFeatureSelector<AppState, fromIpfsDaemon.IpfsDaemonState>(
    'ipfsDaemon'
  );
  export const getIpfsConnectStatus = createSelector(
    selectIpfsDaemonState,
    fromIpfsDaemon.getIpfsConnectStatus
  );

  export const selectIpfsState = createFeatureSelector<AppState, fromIpfs.State>(
    'ipfs'
  );
  
  export const selectNftMintingState = createFeatureSelector<AppState, fromNftMinting.State>(
    'nftMinting'
  );
  export const getImages = createSelector(selectIpfsState, fromIpfs.getImages);
  export const getTotalSupply = createSelector(selectNftMintingState, fromNftMinting.getTotalSupply);

  export const getNft1TotalSupply = createSelector(selectNftMintingState, fromNftMinting.getNft1TotalSupply);
  export const getNft2TotalSupply = createSelector(selectNftMintingState, fromNftMinting.getNft2TotalSupply);
  export const getNft3TotalSupply = createSelector(selectNftMintingState, fromNftMinting.getNft3TotalSupply);
  export const getNft4TotalSupply = createSelector(selectNftMintingState, fromNftMinting.getNft4TotalSupply);
  export const getNft5TotalSupply = createSelector(selectNftMintingState, fromNftMinting.getNft5TotalSupply);
  
  