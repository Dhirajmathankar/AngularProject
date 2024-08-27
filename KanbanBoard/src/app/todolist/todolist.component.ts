import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {

  ProjectArray:any = [];
  title = "test"
  constructor(private itemService: ItemService) {
    
  }
  ngOnInit() {
    this.itemService.getItems().subscribe(data => {
      this.ProjectArray = data ;
    });
  }
  activeId: string | null = null;
  Active_DeActive(event: Event): void {
    const target = event.target as HTMLElement;
    this.activeId = target.id; 
  }
  
  getBackgroundColor(id: string): string {
    return this.activeId === id ? 'green' : 'rad';
  }
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drag(event: DragEvent, taskId: string) {
    event.dataTransfer?.setData('text', taskId);
  }

  drop(event: DragEvent, column: string) {
    event.preventDefault();
    const taskId = event.dataTransfer?.getData('text');
    if (!taskId) return;

    const task = this.removeTaskFromCurrentColumn(taskId);

    if (task) {
      switch (column) {
        // case 'todo':
        //   this.todoTasks.push(task);
        //   break;
        // case 'in-progress':
        //   this.inProgressTasks.push(task);
        //   break;
        // case 'done':
        //   this.doneTasks.push(task);
        //   break;
      }
    }
  }
  removeTaskFromCurrentColumn(taskId: string) {
    let task;

    // task = this.todoTasks.find(t => t.id === taskId);
    // if (task) {
    //   this.todoTasks = this.todoTasks.filter(t => t.id !== taskId);
    //   return task;
    // }

    // task = this.inProgressTasks.find(t => t.id === taskId);
    // if (task) {
    //   this.inProgressTasks = this.inProgressTasks.filter(t => t.id !== taskId);
    //   return task;
    // }

    // task = this.doneTasks.find(t => t.id === taskId);
    // if (task) {
    //   this.doneTasks = this.doneTasks.filter(t => t.id !== taskId);
    //   return task;
    // }

    return null;
  }

  deleteTask(taskId: string, column: string) {
    switch (column) {
      // case 'todo':
      //   this.todoTasks = this.todoTasks.filter(task => task.id !== taskId);
      //   break;
      // case 'in-progress':
      //   this.inProgressTasks = this.inProgressTasks.filter(task => task.id !== taskId);
      //   break;
      // case 'done':
      //   this.doneTasks = this.doneTasks.filter(task => task.id !== taskId);
      //   break;
    }
  }

  ParseDate(dateTimeString: string) {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }
}
