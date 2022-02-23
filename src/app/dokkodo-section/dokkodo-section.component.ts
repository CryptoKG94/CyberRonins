import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dokkodo-section',
  templateUrl: './dokkodo-section.component.html',
  styleUrls: ['./dokkodo-section.component.scss']
})
export class DokkodoSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  counter(i: number) {
      return new Array(i);
  }
}
