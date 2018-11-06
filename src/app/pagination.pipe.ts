import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(elements: any[], page:number) {
    var pageSize = 5;
    //Разобраться почему в начале приходит пустой массив elements
    if(!elements) return [];
    return elements = elements.filter((item,index) => {
      var startIndex = pageSize * (page - 1);
      var lastIndex = startIndex + pageSize;
      if(index >= startIndex && index < lastIndex) {
        return true;
      }
    })
  }

}
