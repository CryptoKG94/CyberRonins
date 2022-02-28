import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../core/store/reducers';
import * as fromStore from '../core/store';
import { Observable } from 'rxjs';
import { NotificationService } from '../core/services/notification.service'

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
  tokenPrice0$:Observable<string>;
  tokenPrice1$:Observable<string>;
  tokenPrice2$:Observable<string>;
  tokenPrice3$:Observable<string>;

  account:string;
  tokenPrice:any;

  title = 'toaster-not';

  constructor(private store$: Store<fromRoot.AppState>,private notifyService : NotificationService) {
    this.nft0$ = this.store$.pipe(select(fromRoot.getNft0TotalSupply));
    this.nft1$ = this.store$.pipe(select(fromRoot.getNft1TotalSupply));
    this.nft2$ = this.store$.pipe(select(fromRoot.getNft2TotalSupply));
    this.nft3$ = this.store$.pipe(select(fromRoot.getNft3TotalSupply));
    this.tokenPrice0$ = this.store$.pipe(select(fromRoot.getTokenPrice0));
    this.tokenPrice1$ = this.store$.pipe(select(fromRoot.getTokenPrice1));
    this.tokenPrice2$ = this.store$.pipe(select(fromRoot.getTokenPrice2));
    this.tokenPrice3$ = this.store$.pipe(select(fromRoot.getTokenPrice3));

    
  }
  
  showToasterError(){
      this.notifyService.showError("Please connect wallet", "")
  }
  ngOnInit(): void {
    this.store$.dispatch(fromStore.Web3GatewayActions.getNetwork())
    this.tokenPrice={}
    
    this.store$.pipe(select(fromRoot.getNetwork)).subscribe((network:string)=>{
      if((network.length)&&(network!='rinkeby')){
        this.notifyService.showError("Please connect to the rinkeby network", "")
      }
    })
    this.store$.pipe(select(fromRoot.getEthereumInjected)).subscribe((connected)=>{
      if(connected){
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'0'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'1'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'2'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'3'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenPrice({id:'0'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenPrice({id:'1'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenPrice({id:'2'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenPrice({id:'3'}))

      
      }
    });
    this.store$.pipe(select(fromRoot.getAccount)).subscribe((account)=>{
      this.account=account
    })
    this.tokenPrice0$.subscribe((tokenPrice0)=>{
      this.tokenPrice['0']=tokenPrice0;
    })
    this.tokenPrice1$.subscribe((tokenPrice1)=>{
      this.tokenPrice['1']=tokenPrice1;
    })
    this.tokenPrice2$.subscribe((tokenPrice2)=>{
      this.tokenPrice['2']=tokenPrice2;
    })
    this.tokenPrice3$.subscribe((tokenPrice3)=>{
      this.tokenPrice['3']=tokenPrice3;
    })
  }
  
  
  mint = (id:string) => {
    if(this.account&&this.account.length){
      if(this.tokenPrice[id]&&this.tokenPrice[id].length){
        let etherValue=this.tokenPrice[id];
        this.store$.dispatch(fromStore.NftMintingActions.mintToken({id,etherValue}))
      }else{
        this.notifyService.showError("Please wait for token price to be loaded", "")
      }
      
    }else{
      this.showToasterError()
    }
    
  };

}
