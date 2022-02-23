import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { windowRefToken } from '../core/services/tokens';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  /** Based on the screen size, switch from standard to one column per row */
  cards$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '1', cols: 1, rows: 1 ,content:"content" ,image:""},
          { title: '2', cols: 1, rows: 1 ,content:"content" ,image:""},
          { title: '3', cols: 1, rows: 1 ,content:"content" ,image:""},
          { title: '4', cols: 1, rows: 1 ,content:"content" ,image:""}
        ];
      }

      return [
        { title: '1', cols: 1, rows: 1 ,content:"content" ,image:""},
        { title: '2', cols: 1, rows: 1 ,content:"content" ,image:""},
        { title: '3', cols: 1, rows: 2 ,content:"content" ,image:""},
        { title: '4', cols: 1, rows: 1 ,content:"content" ,image:""}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,@Inject(windowRefToken) private windowRef: Window) {}
}
