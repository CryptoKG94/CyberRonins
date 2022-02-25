import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../core/store/reducers';
import * as fromStore from '../core/store';
import { Observable } from 'rxjs';
import { NotificationService } from '../Services/notification.service'

@Component({
  selector: 'app-ntf-listing',
  templateUrl: './ntf-listing.component.html',
  styleUrls: ['./ntf-listing.component.scss']
})
export class NtfListingComponent implements OnInit {
  nft0$: Observable<{supply:string,max:string}>;
  nft1$: Observable<{supply:string,max:string}>;
  nft2$: Observable<{supply:string,max:string}>;
  nft3$: Observable<{supply:string,max:string}>;
  nft4$: Observable<{supply:string,max:string}>;

  account:string;

  title = 'toaster-not';

  constructor(private store$: Store<fromRoot.AppState>,private notifyService : NotificationService) {
    this.nft0$ = this.store$.pipe(select(fromRoot.getNft0TotalSupply));
    this.nft1$ = this.store$.pipe(select(fromRoot.getNft1TotalSupply));
    this.nft2$ = this.store$.pipe(select(fromRoot.getNft2TotalSupply));
    this.nft3$ = this.store$.pipe(select(fromRoot.getNft3TotalSupply));
    this.nft4$ = this.store$.pipe(select(fromRoot.getNft4TotalSupply));

    
  }
  
  showToasterError(){
      this.notifyService.showError("Please connect wallet", "")
  }
  ngOnInit(): void {
    this.store$.pipe(select(fromRoot.getEthereumInjected)).subscribe((connected)=>{
      if(connected){
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'0'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'1'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'2'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'3'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'4'}))
      
      }
    });
    this.store$.pipe(select(fromRoot.getAccount)).subscribe((account)=>{
      this.account=account
    })
  }
  
  
  mint = (id:string,etherValue:string) => {
    if(this.account&&this.account.length){
      this.store$.dispatch(fromStore.NftMintingActions.mintToken({id,etherValue}))
    }else{
      this.showToasterError()
    }
    
  };

}
