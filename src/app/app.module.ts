import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ElementsListComponent } from './elements-list/elements-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PaginationPipe } from './pagination.pipe';
import { ElementComponent } from './element/element.component';
import { RecipeComponent } from './recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementsListComponent,
    PaginationPipe,
    ElementComponent,
    RecipeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
