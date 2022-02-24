
import {
    createSelector,
    createFeatureSelector,
    Action,
    combineReducers,
  } from '@ngrx/store';
  
  import * as fromRoot from '../../../core/store/reducers';
  import * as fromIpfs from './ipfs-product-image.reducers';
   
  
  export interface ContractState {
    ipfs: fromIpfs.State;
  }
  
  
  export interface AppState extends fromRoot.AppState {
    contract: ContractState;
  }
  
  export function reducers(state: ContractState | undefined, action: Action) {
    return combineReducers({
      ipfs: fromIpfs.reducer
    })(state, action);
  }
  
  
  export const selectContractState = createFeatureSelector<AppState, ContractState>(
    'contract'
  );
  
  export const selectIpfsState = createSelector(selectContractState, state => state.ipfs);
  
  export const getImageBlob = createSelector(selectIpfsState, fromIpfs.getImageBlob);
  
  
 
  
  