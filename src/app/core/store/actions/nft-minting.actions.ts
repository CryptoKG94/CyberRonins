
import { createAction, props} from '@ngrx/store';

export const mintToken = createAction('[NFTMinting/API] Mint Token', props<{ payload: {id:string,account:string} }>());

export const mintTokenSuccess =
createAction('[NFTMinting/Command] Mint Token Success');

export const getTokenSupply = createAction('[NFTMinting/API] Get Token Supply', props<{ id: string }>());
export const getTokenSupplySuccess =
createAction('[NFTMinting/Command] Get Token Supply Success', props<{ id:string,supply: string }>());

