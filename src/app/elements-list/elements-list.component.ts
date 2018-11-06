import { Component, OnInit } from '@angular/core';
import { Element } from '../element';
import { ElementsService } from '../elements.service';

const elementsPerPage: number = 5;

@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.scss']
})
export class ElementsListComponent implements OnInit {

  elements: Element[] = [];
  page: number;
  collectionSize: number;
  pageSize: number;
  loading: boolean;

  constructor(private elementsService: ElementsService) { }

  ngOnInit() {
    this.page = 1;
    this.pageSize = elementsPerPage;
    this.loading = false;
    this.loadElements();
  }

  private loadElements() {
    //запрос с сервера, элементов
    this.elementsService.getElements()
    .subscribe((elements) => {
      elements.forEach(element => {
        this.elements.push(new Element(element));
      });
      this.collectionSize = elements.length;
      this.loading = true;

      //запрос с сервера, рецептов для каждого элемента
      //пришлось делать внутри запроса элементов, иначе массива элементов не будет
      // this.elements.forEach((element,index) => {
      //   element.recipe = this.elementsService.getRecipe(element.id).subscribe(
      //     (recipe => {
      //       this.elements[index].recipe = recipe['recipe']['ingredients'];
      //     })
      //   );
      // });
      
      // console.log(this.elements);
    });
    
    
  }
}
