import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {

  // get data from parent
  @Input() menu; // load list
  @Input() name; // set name vs title
  @Output() onClick = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
    
  }

  click(item){ // call parent click event
    this.onClick.emit(item);
  }

}
