import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:3000/calendarData/';
  private Id = '66a321ca56eb0c26dd333bdf'

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addEvent(event: CalendarEvent): Observable<any> {
    return this.http.post<any>(this.apiUrl, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  body : any  = {};
  updateEvent(projectId:string, id: string, updates: any): Observable<any> {
    this.body['update'] = updates;
    this.body['id'] = id ;
    // this.body['projectId'] = projectId;
    return this.http.patch(`${this.apiUrl}${projectId}`, this.body);
  }
}
