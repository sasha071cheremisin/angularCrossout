import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ElementsListComponent } from './elements-list/elements-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ElementComponent } from './element/element.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { FilterFactionPipe } from './filter-faction.pipe';
import { FilterRarityPipe } from './filter-rarity.pipe';
import { FilterIncomePipe } from './filter-income.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ElementsListComponent,
    ElementComponent,
    RecipeComponent,
    FilterComponent,
    FilterFactionPipe,
    FilterRarityPipe,
    FilterIncomePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
