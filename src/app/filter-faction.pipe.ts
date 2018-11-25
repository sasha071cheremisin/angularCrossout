import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFaction'
})
export class FilterFactionPipe implements PipeTransform {

  transform(elements: any[], factionName:string) {
    if(factionName=='All') return elements;
    return elements = elements.filter((item,index) => {
      if(item.faction == factionName) {
        return true;
      }
    })
  }

}
