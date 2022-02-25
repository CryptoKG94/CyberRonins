import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../core/store/reducers';
import * as fromStore from '../core/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ntf-listing',
  templateUrl: './ntf-listing.component.html',
  styleUrls: ['./ntf-listing.component.scss']
})
export class NtfListingComponent implements OnInit {
  nft1$: Observable<{supply:string,max:string}>;
  nft2$: Observable<{supply:string,max:string}>;
  nft3$: Observable<{supply:string,max:string}>;
  nft4$: Observable<{supply:string,max:string}>;
  nft5$: Observable<{supply:string,max:string}>;

  account:string;

  

  constructor(private store$: Store<fromRoot.AppState>,) {
    this.nft1$ = this.store$.pipe(select(fromRoot.getNft1TotalSupply));
    this.nft2$ = this.store$.pipe(select(fromRoot.getNft2TotalSupply));
    this.nft3$ = this.store$.pipe(select(fromRoot.getNft3TotalSupply));
    this.nft4$ = this.store$.pipe(select(fromRoot.getNft4TotalSupply));
    this.nft4$ = this.store$.pipe(select(fromRoot.getNft5TotalSupply));

    
    
   }

  ngOnInit(): void {
    this.store$.pipe(select(fromRoot.getEthereumInjected)).subscribe((connected)=>{
      if(connected){
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'1'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'2'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'3'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'4'}))
        this.store$.dispatch(fromStore.NftMintingActions.getTokenSupply({id:'5'}))
      
      }
    });
    this.store$.pipe(select(fromRoot.getAccount)).subscribe((account)=>{
      this.account=account
    })
  }
  
  
  mint = (id:string,etherValue:string) => this.store$.dispatch(fromStore.NftMintingActions.mintToken({id,etherValue}));

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
