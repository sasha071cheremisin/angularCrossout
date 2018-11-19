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
    this.elementsService.getElements()
    .subscribe((elements) => {
      elements.forEach(element => {
        this.elements.push(new Element(element));
      });
      this.collectionSize = elements.length;
      this.loading = true;
    });
  }
}
