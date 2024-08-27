import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ItemService {

  private tasks: any[] = [];
  private apiUrl = 'http://localhost:3000';
  private ProjectId = '668661dc40d572d41b61a0e8'  
  

  constructor(private http: HttpClient) {
  }

  // ------------------------------------------- for mongodb database
  getItemsTest(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data/${this.ProjectId}`);
  }
  getFormOptions(eventId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/form-options/${eventId}`);
  }
  getBotIdForValidation(BaseBotId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetBotId/${BaseBotId}`);
  }

  body: any = {}
  updateTaskStatus( columnId: string, eventId: string, botId : string) {
    this.body['columnId'] = columnId;
    this.body['eventId'] = eventId;
    this.body['botId'] = botId;
    return this.http.put<any>(`${this.apiUrl}/data/${this.ProjectId}`, this.body);
  }

// --------------------------------------------------------------------------- for localstorage 

// getItemsTest(): Observable<any[]> {
//   const storedTasks : any = localStorage.getItem('projectData');
//   const data = JSON.parse(storedTasks);
//   return (data);
// }

// getItems():Observable< Object>{
//   const storedTasks : any = localStorage.getItem('projectData');
//   const data = JSON.parse(storedTasks);
//   return data;
// }

// getFormOptions(eventId: any): Observable<any> {
//   const storedTasks : any = localStorage.getItem('projectData');
//   const data = JSON.parse(storedTasks);
//   return data;
// }

// updateTaskStatus(columnId: string, eventId: string) {
//   const storedTasks: string | null = localStorage.getItem('projectData');
//   if (!storedTasks) return undefined; // Handle case where there is no data in localStorage

//   const data = JSON.parse(storedTasks);
//   const task: Task | undefined = data.taskList.find((task: Task) => task.eventId === eventId);
  
//   if (task) {
//     task.statusName = columnId; // Assuming columnId corresponds to statusName
//     localStorage.setItem('projectData', JSON.stringify(data));
//   }
  
//   return task;
// }

}
