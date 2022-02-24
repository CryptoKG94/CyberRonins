import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './store/reducers';
import * as fromRoot from '../core/store/reducers';

@Component({
  selector: 'app-ntf-listing',
  templateUrl: './ntf-listing.component.html',
  styleUrls: ['./ntf-listing.component.scss']
})
export class NtfListingComponent implements OnInit {

  constructor(private store$: Store<fromStore.AppState>,) { }

  ngOnInit(): void {
  }

}
