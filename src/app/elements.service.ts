import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Element } from './element';
import { Recipe } from './recipe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class ElementsService {

  constructor(private http: HttpClient) { }

  getElements(): Observable<Element[]> {
    return this.http.get<Element[]>('http://u953420z.beget.tech/');
  }

  getRecipe(elementId:number): Observable<Recipe> {
    return this.http.get<Recipe>('http://u953420z.beget.tech/recipe/?elementId='+elementId);
  }
}
