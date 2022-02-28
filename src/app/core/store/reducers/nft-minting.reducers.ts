
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { NftMintingActions } from '../actions';

export interface State {
    totals:{
        [id:string]: {supply:string,max:string};
    },
    tokenPrices:{[id:string]:string}
}

const initialState: State = {
    totals:{},
    tokenPrices:{}
};

export const reducer = createReducer(
  initialState,
  on(NftMintingActions.getTokenSupplySuccess, (state, { id ,supply}) => ({
    ...state,
    totals: {...state.totals,[id]:{...state.totals[id],supply}}
  })),
  on(NftMintingActions.getTokenPriceSuccess, (state, { id,price}) => ({
    ...state,
    tokenPrices: {...state.tokenPrices,[id]:price}
  })),
 

);




export const getTotalSupply =  (state: State) => state.totals;
export const getNft0TotalSupply=(state:State) =>state.totals['0']
export const getNft1TotalSupply=(state:State) =>state.totals['1']
export const getNft2TotalSupply=(state:State) =>state.totals['2']
export const getNft3TotalSupply=(state:State) =>state.totals['3']
export const getTokenPrice0=(state:State) =>state.tokenPrices['0']
export const getTokenPrice1=(state:State) =>state.tokenPrices['1']
export const getTokenPrice2=(state:State) =>state.tokenPrices['2']
export const getTokenPrice3=(state:State) =>state.tokenPrices['3']
