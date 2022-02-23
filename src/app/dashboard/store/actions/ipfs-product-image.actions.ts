import { createAction, props} from '@ngrx/store';

export const reset = createAction('[IPFS/Image] Reset');  
export const uploadImage = createAction('[IPFS/Image] Upload', props<{file: File}>());

export const uploadImageSuccess = createAction('[IPFS/Image] Upload Success', props<{ ipfsHash: string }>()); 
export const uploadImageFail = createAction('[IPFS/Image] Upload Fail'); 
export const downloadImage =
createAction('[IPFS/Image] Download Image', props<{ ipfsHash: string }>()); 

export const downloadImageSuccess = createAction('[IPFS/Image] Download Image Success', props<{ipfsHash:string,image: Blob}>());

export const downloadImageError = createAction('[IPFS/Image] Download Image Error');
