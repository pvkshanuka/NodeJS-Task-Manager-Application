import { Injectable } from '@angular/core';
import { WebService } from './web.service';

import {Task} from './modles/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webService: WebService) {}

  public getLists() {
    return this.webService.get('lists');
  }

  public createList(title: string) {
    return this.webService.post('lists', { title });
  }

  public getTasks() {
    return this.webService.get(`tasks`);
  }

  public getTasksOfList(listId: string) {
    return this.webService.get(`tasks/list/${listId}`);
  }

  public createTask(listId: string, title: string) {
    return this.webService.post(`lists/${listId}/tasks`, { title });
  }

  public deleteList(listId: string) {
    return this.webService.delete(`lists/${listId}`);
  }

  public deleteTask(taskId: string) {
    return this.webService.delete(`tasks/${taskId}`);
  }

  public setCompleted(task: Task){
    return this.webService.patch(`tasks/${task._id}`, {completed: !task.completed});
  }

}
