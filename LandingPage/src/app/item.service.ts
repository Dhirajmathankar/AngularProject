import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {}

  private BackendUrl = "http://localhost:3000/"
  private LandingPageObjectId = "66abc27184cd664805512fa2";

  getlandingPageObject() : Observable<any[]>{
      return this.http.get<any[]>(`${this.BackendUrl}${this.LandingPageObjectId}`)
  }
}
