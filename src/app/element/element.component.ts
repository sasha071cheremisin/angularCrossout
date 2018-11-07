import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

  @Input() element;
  showRecipe: boolean = false;

  constructor() { }

  getPriceTmp(event) {
    console.log(event);
    this.element.formatCraftingSellSum = event;
  }
  ngOnInit() {
  }

  getRecipe(element) {
    // console.log('show recipe - ',element);
    if(this.showRecipe == false) {
      this.showRecipe = true;
    } else {
      this.showRecipe = false;
    }
  }

  getChangeCost(element) {
    if(element.isFirstBuild == false) {
      element.isFirstBuild = true;
      element.formatCraftingSellSum = +element.formatCraftingSellSum + element.firstBuild;
      element.income = element.income - element.firstBuild;
    } else {
      element.isFirstBuild = false;
      element.formatCraftingSellSum = +element.formatCraftingSellSum - element.firstBuild;
      element.income = element.income + element.firstBuild;
    }
  }
}
