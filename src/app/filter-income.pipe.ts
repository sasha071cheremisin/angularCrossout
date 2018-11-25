import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterIncome'
})
export class FilterIncomePipe implements PipeTransform {

  transform(elements: any[]) {
    elements.sort(function(a, b) {
      return  b.income - a.income;
    });
    return elements;
  }

}
