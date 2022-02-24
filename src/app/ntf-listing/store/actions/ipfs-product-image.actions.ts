import { createAction, props} from '@ngrx/store';

export const downloadImage =
createAction('[IPFS/Image] Download Image', props<{ ipfsHash: string }>()); 

export const downloadImageSuccess = createAction('[IPFS/Image] Download Image Success', props<{ipfsHash:string,image: Blob}>());

export const downloadImageError = createAction('[IPFS/Image] Download Image Error');
