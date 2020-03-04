import { Component, OnInit } from '@angular/core';

declare function init_calendar();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit() {

    init_calendar();
  }

}
