
import { createAction, props} from '@ngrx/store';

export const mintToken = createAction('[NFTMinting/API] Mint Token', props<{ id:string,etherValue:string}>());

export const mintTokenSuccess =
createAction('[NFTMinting/Command] Mint Token Success', props<{ id: string }>());

export const getTokenSupply = createAction('[NFTMinting/API] Get Token Supply', props<{ id: string }>());
export const getTokenSupplySuccess =
createAction('[NFTMinting/Command] Get Token Supply Success', props<{ id:string,supply: string }>());

export const getTokenPrice = createAction('[NFTMinting/API] Get Token Price');
export const getTokenPriceSuccess =
createAction('[NFTMinting/Command] Get Token Price Success', props<{ price: string }>());