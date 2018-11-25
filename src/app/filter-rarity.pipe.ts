import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRarity'
})
export class FilterRarityPipe implements PipeTransform {

  transform(elements: any[], rarityName:string) {
    if(rarityName=='All') return elements;
    return elements = elements.filter((item,index) => {
      if(item.rarityName == rarityName) {
        return true;
      }
    })
  }

}
