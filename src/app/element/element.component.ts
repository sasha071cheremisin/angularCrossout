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

  priceChangeElement(ingredientResultPrice) {
    this.element.resultPrice = ingredientResultPrice;
    // console.log('mainChange - ',ingredientResultPrice);
    this.setIncomeElement();
  }

  ngOnInit() {
    this.element.resultPrice = this.element.formatCraftingSellSum;
  }

  getRecipe(element) {
    // console.log('show recipe - ',element);
    if (this.showRecipe == false) {
      this.showRecipe = true;
    } else {
      this.showRecipe = false;
    }
  }

  setIncomeElement() {
    let marketBalance = this.element.formatSellPrice - this.element.formatSellPrice * 0.1;
    let firstBuild = 0;
    if (this.element.isFirstBuild) {
      firstBuild = this.element.firstBuild;
    }
    let income = marketBalance - this.element.resultPrice - firstBuild;
    this.element.income = income;
  }

  setFirstBuild() {
    if(this.element.isFirstBuild) {
      this.element.isFirstBuild = false;
    } else {
      this.element.isFirstBuild = true;
    }
    this.setIncomeElement();
  }
}
