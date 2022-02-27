
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { NftMintingActions } from '../actions';

export interface State {
    totals:{
        [id:string]: {supply:string,max:string};
    },
    tokenPrice:string
}

const initialState: State = {
    totals:{},
    tokenPrice:''
};

export const reducer = createReducer(
  initialState,
  on(NftMintingActions.getTokenSupplySuccess, (state, { id ,supply}) => ({
    ...state,
    totals: {...state.totals,[id]:{...state.totals[id],supply}}
  })),
  on(NftMintingActions.getTokenPriceSuccess, (state, { price}) => ({
    ...state,
    tokenPrice: price
  })),
 

);




export const getTotalSupply =  (state: State) => state.totals;
export const getNft0TotalSupply=(state:State) =>state.totals['0']
export const getNft1TotalSupply=(state:State) =>state.totals['1']
export const getNft2TotalSupply=(state:State) =>state.totals['2']
export const getNft3TotalSupply=(state:State) =>state.totals['3']
export const getNft4TotalSupply=(state:State) =>state.totals['4']
export const getTokenPrice=(state:State) =>state.tokenPrice

