import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementsService } from '../elements.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  @Input() element;
  @Output() priceChange = new EventEmitter();
    
  loading: boolean = false;

  constructor(private elementsService: ElementsService) { }

  ngOnInit() {
    if(!this.element.ingredients){
      this.getRecipe(this.element.id);
      this.getFirstBuild(this.element);
    } else {
      this.loading = true;
    }
  }

  showIngredients(ingredient) {
    if(ingredient.ingredients.length > 3) {
      if(ingredient.showRecipe) {
        if(ingredient.showRecipe==false) {
          ingredient.showRecipe = true;
        } else {
          ingredient.showRecipe = false;
        }
      } else {
        ingredient.showRecipe = true;
      }
    }
  }

  changeSellPrice(ingredient,ingredientPrice) {
    ingredient.resultPrice = +ingredientPrice;

    this.element.recipe.sumPrise = 0;
    this.element.recipe.ingredients.forEach(ingredientItem => {
      this.element.recipe.sumPrise = this.element.recipe.sumPrise + ingredientItem.resultPrice;
    });

    this.priceChange.emit(this.element.recipe.sumPrise);
  }

  getFirstBuild(ingredient) {
    console.log(ingredient);
  }

  private getRecipe(elementId) {
    this.elementsService.getRecipe(elementId)
    .subscribe((recipe) => {
      this.element.ingredients = recipe['recipe']['recipe']['ingredients'];
      // this.element.recipe.sumPrise = 0;
      this.element.ingredients.forEach(ingredient => {
        // ingredient.resultPrice = +ingredient.formatSellPriceTimesNumber;

        // if(ingredient.ingredients.length > 3) {
        //   ingredient.showRecipe = false;
        // }

        // this.element.recipe.sumPrise = this.element.recipe.sumPrise + ingredient.resultPrice;
      });
      // console.log(this.element);
      this.loading = true;
    });
  }
}
