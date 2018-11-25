import { Component, OnInit } from '@angular/core';
import { Element } from '../element';
import { ElementsService } from '../elements.service';

@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.scss']
})
export class ElementsListComponent implements OnInit {

  elements: Element[] = [];
  loading: boolean;
  filterFactionName: string;
  filterRarityName: string;

  constructor(private elementsService: ElementsService) { }

  ngOnInit() {
    this.loading = false;
    this.loadElements();
    this.filterFactionName = 'All';
    this.filterRarityName = 'All';
  }

  changeFilterFaction(factionName) {
    this.filterFactionName = factionName;
  }

  changeFilterRarity(rarityName) {
    this.filterRarityName = rarityName;
  }

  private loadElements() {
    this.elementsService.getElements()
    .subscribe((elements) => {
      elements.forEach(element => {
        this.elements.push(new Element(element));
      });
      this.loading = true;
    });
  }
}
