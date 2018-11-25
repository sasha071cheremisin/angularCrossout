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

  ngOnInit() {
    if(this.element.income < 0) {
      this.element.craftVsBuy = "Buy";
    }
  }

  getRecipe(element) {
    // console.log('show recipe - ',element);
    if (this.showRecipe == false) {
      this.showRecipe = true;
    } else {
      this.showRecipe = false;
    }
  }

  getResultPrice() {
    let resultPrice = 0;
    if (this.element.ingredients) {
      this.element.ingredients.forEach(ingredient => {
        resultPrice += ingredient.resultPrice;
      });
    } else {
      resultPrice = +this.element.formatCraftingSellSum;
    }
    if (this.element.isFirstBuild) {
      resultPrice += this.element.firstBuild;
    }
    return resultPrice;
  }

  setResultPrice(ingredientResultPrice = 0) {
    if (!ingredientResultPrice) {
      this.element.resultPrice = this.getResultPrice();
    } else {
      this.element.resultPrice = ingredientResultPrice;
    }
    this.setIncomeElement();
  }

  changeResultPriceRecipe(ingredientResultPrice) {
    // console.log('changeResultPriceRecipe');

    this.setResultPrice(ingredientResultPrice);
    this.setСonstructionTime();
  }

  getСonstructionTime(element) {
    let resultTime = 0;
    element.ingredients.forEach(ingredient => {
      if(ingredient.ingredients.length > 3){
        if(!ingredient.isFirstBuild && ingredient.editor) {
          resultTime += (ingredient.constructionTime * ingredient.number);
        }
      }
    });

    return resultTime;
  }

  setСonstructionTime() {
    let resultTime = this.getСonstructionTime(this.element);
    this.element.ingredients.forEach(ingredient => {
      resultTime += this.getСonstructionTime(ingredient);
    });
    this.element.resultConstructionTime = this.element.constructionTime + resultTime;
    // console.log(resultTime);
  } 

  setIncomeElement() {
    let marketBalance = this.element.formatSellPrice - (this.element.formatSellPrice * 0.1);
    let income = marketBalance - this.element.resultPrice;
    this.element.income = income;
  }

  setConstructionTime() {
    if(this.element.isFirstBuild) {
      this.element.resultConstructionTime -= this.element.constructionTime;
    } else {
      this.element.resultConstructionTime = this.element.constructionTime;
    }
  }

  changeFastBuild() {
    if (this.element.isFirstBuild) {
      this.element.isFirstBuild = false;
    } else {
      this.element.isFirstBuild = true;
    }
    this.setResultPrice();
    this.setConstructionTime();
  }
}
