import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Element } from './element';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ElementsService {

  constructor(private http: HttpClient) { }

  getElements(): Observable<Element[]> {
    return this.http.get<Element[]>('http://u953420z.beget.tech/');
  }

  getRecipe(elementId:number): Observable<any> {
    return this.http.get<any>('http://u953420z.beget.tech/recipe/?elementId='+elementId);
  }
}
