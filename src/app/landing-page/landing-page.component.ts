import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../core/store';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  
  public nftlist: any[] = [
    { name: "ETH", link: "#" },
    { name: "BSC", link: "#" },
    { name: "POL", link: "#" }
  ];
  ethereumInjected$: Observable<boolean>;
  ethereumConnected$: Observable<boolean>;
  account$: Observable<string>;

  constructor(private store$: Store<fromRoot.AppState>) { }

  ngOnInit(): void {
    this.ethereumInjected$ = this.store$.pipe(select(fromRoot.getEthereumInjected));
    this.ethereumConnected$ = this.store$.pipe(select(fromRoot.getEthereumConnected));
    this.account$ = this.store$.pipe(select(fromRoot.getAccount));
  }
  onConnect = () => this.store$.dispatch(fromRoot.Web3GatewayActions.ethereumConnect({}));
  onDisconnect = () => this.store$.dispatch(fromRoot.Web3GatewayActions.ethereumDisconnect());

}
