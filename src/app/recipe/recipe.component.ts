import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementsService } from '../elements.service';
import { Recipe } from '../recipe'

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  @Input() element;
  @Output() priceChange = new EventEmitter();
    
  loading: boolean = false;
  showRecipe: boolean = false;

  constructor(private elementsService: ElementsService) { }

  ngOnInit() {
    if(!this.element.recipe){
      this.getRecipe(this.element.id);
    } else {
      this.loading = true;
    }
  }

  showSubRecipe(item) {
    if(item.ingredients.length > 3) {
      console.log(item);
      if(item.showRecipe==false) {
        item.showRecipe = true;
        this.showRecipe = true;
      } else {
        item.showRecipe = false;
        this.showRecipe = false;
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

  private getRecipe(elementId) {
    this.elementsService.getRecipe(elementId)
    .subscribe((recipe) => {
      this.element.recipe = new Recipe(recipe['recipe']['recipe']) ;
      this.element.recipe.sumPrise = 0;
      this.element.recipe.ingredients.forEach(ingredient => {
        ingredient.resultPrice = +ingredient.formatSellPriceTimesNumber;
        if(ingredient.ingredients.length > 3) {
          ingredient.showRecipe = false;
        }
        this.element.recipe.sumPrise = this.element.recipe.sumPrise + ingredient.resultPrice;
      });
      console.log(this.element.recipe);
      this.loading = true;
    });
  }
}
