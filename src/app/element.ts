export class Element {

  name: string;
  id: number;
  image: string;
  rarityName: string;
  formatSellPrice: number;
  formatBuyPrice: number;
  firstBuild: number;
  isFirstBuild: boolean;
  formatCraftingSellSum: number;
  income: number;
  number: number;
  faction: string;
  resultPrice: number;
  constructionTime: number;
  resultConstructionTime: number;

  constructor(dataElement) {
    Object.assign(this, dataElement);
    // this.name = dataElement['name'];
    // this.id = dataElement["id"];
    // this.image = dataElement["image"];
    // this.rarityName = dataElement["rarityName"];
    // this.formatSellPrice = +dataElement["formatSellPrice"];
    // this.formatBuyPrice = +dataElement["formatBuyPrice"];
    // this.formatCraftingSellSum = +dataElement["formatCraftingSellSum"];
    this.isFirstBuild = false;
    this.setSettings();
    this.resultConstructionTime = this.constructionTime;
    this.number = 1;
    this.resultPrice = +dataElement["formatCraftingSellSum"];
    this.faction = dataElement["faction"];
    this.income = (this.formatSellPrice - (this.formatSellPrice * 0.1)) - this.formatCraftingSellSum;
  }
  
  private setSettings() {
    // console.log(this.rarityName);
    switch (this.rarityName) {
      case "Rare":
        this.firstBuild = 5
        this.constructionTime = 1;
        break;
      case "Epic":
        this.firstBuild = 20
        this.constructionTime = 6;
        break;
      case "Legendary":
        this.firstBuild = 80
        this.constructionTime = 21;
        break;
      default:
        break;
    }
  }
}
