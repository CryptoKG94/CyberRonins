
import { createReducer, on } from '@ngrx/store';
import * as IpfsUploadActions from '../actions/ipfs-image.actions';

export enum FileUploadStatus {
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error',
  Progress = 'Progress',
}

export interface State {
    status: FileUploadStatus;
    images:{
        [ipfsHash:string]:Blob|null
    }
}

const initialState: State = {
    status: FileUploadStatus.Pending,
    images:{}
};

export const reducer = createReducer(
  initialState,
  on(IpfsUploadActions.downloadImageSuccess, (state, { image ,ipfsHash}) => ({
    ...state,
    images: {...state.images,[ipfsHash]:image}
  })),

);

export const getImages =  (state: State) => state.images;
