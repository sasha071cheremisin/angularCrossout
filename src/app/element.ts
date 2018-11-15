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
    this.getFirstBuild();
    this.number = 1;
    this.income = (this.formatSellPrice - (this.formatSellPrice * 0.1)) - this.formatCraftingSellSum;
  }
  
  private getFirstBuild() {
    // console.log(this.rarityName);
    switch (this.rarityName) {
      case "Rare":
        this.firstBuild = 5
        break;
      case "Epic":
        this.firstBuild = 20
        break;
      case "Legendary":
        this.firstBuild = 80
        break;
      default:
        break;
    }
  }
}
