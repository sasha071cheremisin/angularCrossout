import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementsService } from '../elements.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  @Input() element;
  @Output() changeResultPriceRecipe = new EventEmitter();

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
    
    ingredient.isSubRecipe = true;
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
    // console.log('changeFirstBuild');

    ingredient.editor = true;
    if (ingredient.isFirstBuild == false) {
      ingredient.isFirstBuild = true;
    } else {
      ingredient.isFirstBuild = false;
    }

    ingredient.resultPrice = this.getResultPrice(ingredient);
    this.element.resultPrice = this.getResultPrice(this.element);
    this.changeResultPriceRecipe.emit(this.element.resultPrice);
  }

  changeResultPriceAllItems(element, formatResultPrice = '') {
    // console.log('changeResultPriceAllItems');

    element.resultPrice = 0;

    element.ingredients.forEach(ingredient => {
      ingredient.isFirstBuild = false;
      ingredient.editor = false;
      ingredient.ingredients.forEach(subIngredient => {
        subIngredient.editor = false;
      });
      if (formatResultPrice == 'sell') {
        ingredient.resultPrice = +ingredient.formatSellPriceTimesNumber;
        element.resultPrice += +ingredient.formatSellPriceTimesNumber;
        element.formatCraftingSellSum = element.resultPrice;
      } else {
        ingredient.resultPrice = +ingredient.formatBuyPriceTimesNumber;
        element.resultPrice += +ingredient.formatBuyPriceTimesNumber;
        element.formatCraftingBuySum = element.resultPrice;
      }
    });

    element.resultPrice *= element.number;
    element.formatCraftingBuySum *= element.number;
    element.formatCraftingSellSum *= element.number;

    this.element.resultPrice = this.getResultPrice(this.element);
    this.changeResultPriceRecipe.emit(this.element.resultPrice);
    // console.log(element.resultPrice, element.formatCraftingBuySum, element.formatCraftingSellSum);
  }

  changeResultPriceOneItem(ingredient, formatResultPrice) {
    // console.log('changeResultPriceOneItem');

    ingredient.editor = false;
    ingredient.ingredients.forEach(subIngredient => {
      subIngredient.editor = false;
    });
    ingredient.formatResultPrice = formatResultPrice;
    ingredient.isFirstBuild = false;
    if (formatResultPrice == 'sell') {
      ingredient.resultPrice = +ingredient.formatSellPriceTimesNumber;
    } else {
      ingredient.resultPrice = +ingredient.formatBuyPriceTimesNumber;
    }

    this.element.resultPrice = this.getResultPrice(this.element);
    this.changeResultPriceRecipe.emit(this.element.resultPrice);
  }

  changePriceSubElement(ingredient) {
    // console.log('changePriceSubElement');

    ingredient.editor = true;
    this.element.resultPrice = this.getResultPrice(this.element);
    this.changeResultPriceRecipe.emit(this.element.resultPrice);
  }

  getResultPrice(element) {
    // console.log('getResultPrice');

    var resultPrice = 0;
    element.ingredients.forEach(ingredient => {
      resultPrice += +ingredient.resultPrice;
    });
    if (element.isFirstBuild) {
      resultPrice += element.firstBuild;
    }
    return (resultPrice * element.number);
  }

  setCraftVsBuy(ingredient) {
    if (ingredient.ingredients.length > 3) {
      let resultPriseIngredient = 0;
      ingredient.ingredients.forEach(ingredientSub => {
        this.setCraftVsBuy(ingredientSub);
        resultPriseIngredient += +ingredientSub.formatBuyPriceTimesNumber;
      });
      let result = 'Craft';
      if ((+ingredient.item.formatBuyPrice) < resultPriseIngredient) {
        result = 'Buy';
      }
      if (resultPriseIngredient == 0) {
        result = '';
      }
      // console.log(ingredient);
      ingredient.item.craftVsBuy = result;
    }
  }

  setFastBuild(ingredient) {
    ingredient.ingredients.forEach(ingredientSub => {
      this.setFastBuild(ingredientSub);
    });
    ingredient.isFirstBuild = false;
    if (ingredient.item.typeName != 'Meta Item') {
      switch (ingredient.item.rarityName) {
        case "Rare":
          ingredient.firstBuild = 5
          ingredient.constructionTime = 1;
          break;
        case "Epic":
          ingredient.firstBuild = 20
          ingredient.constructionTime = 6;
          break;
        default:
          break;
      }
    }
  }

  ingredientSetting(ingredients) {
    ingredients.forEach(ingredient => {
      this.setFastBuild(ingredient);
      this.setCraftVsBuy(ingredient);
      ingredient.resultPrice = +ingredient.formatSellPriceTimesNumber;
      ingredient.formatResultPrice = 'sell';
    });
  }

  private getRecipe(elementId) {
    this.elementsService.getRecipe(elementId)
      .subscribe((recipe) => {
        this.element.ingredients = recipe['recipe']['recipe']['ingredients'];
        // this.element.recipe.sumPrise = 0;
        this.ingredientSetting(this.element.ingredients);
        this.element.editor = true;
        console.log(this.element);
        this.loading = true;
      });
  }
}
