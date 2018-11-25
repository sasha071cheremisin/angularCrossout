import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() factionFilter = new EventEmitter();
  @Output() rarityFilter = new EventEmitter();

  factionName = 'All';
  rarityName = 'All';
  constructor() { }

  ngOnInit() {
    
  }

  changeRarity() {
    this.rarityFilter.emit(this.rarityName);
  }
  changeFaction() {
    this.factionFilter.emit(this.factionName);
  }
}
