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
    if (!this.element.ingredients) {
      this.getRecipe(this.element.id);
    } else {
      this.loading = true;
    }
  }

  showIngredients(ingredient) {
    console.log(ingredient);

    if (ingredient.ingredients.length > 3) {
      if (ingredient.showRecipe) {
        if (ingredient.showRecipe == false) {
          ingredient.showRecipe = true;
        } else {
          ingredient.showRecipe = false;
        }
      } else {
        ingredient.showRecipe = true;
      }
    }
  }

  changeFirstBuild(ingredient) {
    if(!ingredient.isFirstBuild || ingredient.isFirstBuild == false) {
      ingredient.resultPrice = ingredient.resultPrice + ingredient.firstBuild * ingredient.number;
      ingredient.isFirstBuild = true;
    } else {
      ingredient.resultPrice = ingredient.resultPrice - ingredient.firstBuild * ingredient.number;
      ingredient.isFirstBuild = false;
    }
    
  }

  changeResultPriceElement(element,formatResultPrice) {
    element.resultPrice = 0;
    if(formatResultPrice == 'sell') {
      element.ingredients.forEach(ingredient => {
        ingredient.resultPrice = +ingredient.formatSellPriceTimesNumber;
        element.resultPrice = element.resultPrice + +ingredient.formatSellPriceTimesNumber;
      });
      element.formatCraftingSellSum = element.resultPrice;
      console.log(element.resultPrice);
    } else {
      element.ingredients.forEach(ingredient => {
        ingredient.resultPrice = +ingredient.formatBuyPriceTimesNumber;
        element.resultPrice = element.resultPrice + +ingredient.formatBuyPriceTimesNumber;
      });
      element.formatCraftingBuySum = element.resultPrice;
      console.log(element.resultPrice);
    }
  }

  changeResultPriceIngredient(ingredient, formatResultPrice) {
    ingredient.formatResultPrice = formatResultPrice;
    if(formatResultPrice == 'sell') {
      ingredient.resultPrice = +ingredient.formatSellPriceTimesNumber;
    } else {
      ingredient.resultPrice = +ingredient.formatBuyPriceTimesNumber;
    }

    // if(ingredient.ingredients.length != 0) {
    //   ingredient.ingredients.forEach(subIngredient => {
    //     subIngredient.formatResultPrice = formatResultPrice;
    //     if(formatResultPrice == 'sell') {
    //       subIngredient.resultPrice = +subIngredient.formatSellPriceTimesNumber;
    //     } else {
    //       subIngredient.resultPrice = +subIngredient.formatBuyPriceTimesNumber;
    //     }
    //   });
    // }
    // this.priceChange.emit(this.element.recipe.sumPrise);
  }

  ingredientSetting(ingredients) {
    ingredients.forEach(ingredient => {
      ingredient.resultPrice = +ingredient.formatSellPriceTimesNumber;
      ingredient.formatResultPrice = 'sell';
      if(ingredient.item.typeName != 'Meta Item') {
        switch (ingredient.item.rarityName) {
          case "Rare":
            ingredient.firstBuild = 5
            break;
          case "Epic":
            ingredient.firstBuild = 20
            break;
          default:
            break;
        }
      }

      // if(ingredient.ingredients.length != 0) {
      //   this.ingredientSetting(ingredient.ingredients);
      // }
    });
  }

  private getRecipe(elementId) {
    this.elementsService.getRecipe(elementId)
      .subscribe((recipe) => {
        this.element.ingredients = recipe['recipe']['recipe']['ingredients'];
        // this.element.recipe.sumPrise = 0;
        this.ingredientSetting(this.element.ingredients);
        console.log(this.element);
        this.loading = true;
      });
  }
}
