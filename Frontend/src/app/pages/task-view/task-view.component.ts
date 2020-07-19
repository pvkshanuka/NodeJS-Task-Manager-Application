import { Component, OnInit } from '@angular/core';

import { List } from 'src/app/modles/list';
import { Task } from 'src/app/modles/task';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: List[] = [];
  tasks: Task[] = [];

  listId = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService
      .getLists()
      .subscribe((lists: List[]) => (this.lists = lists));

    // this.route.params.subscribe((params: Params) => {
    //   const listId = params.listId;
    //   console.log(`listID: ${listId}`);
    //   if (!listId) {
    //     return;
    //   }
    //   this.taskService
    //     .getTasks(listId)
    //     .subscribe((tasks: Task[]) => {
    //       console.log('in getTasks');
    //       console.log(tasks);
    //       this.tasks = tasks;
    //     });
    // });
  }

  getTasksOfList(listId: string) {
    this.taskService.getTasksOfList(listId).subscribe((tasks: Task[]) => {
      console.log(tasks);
      this.tasks = tasks;
    });
  }

  onClickTask(task: Task) {
    this.listId = task._listId;
    this.taskService
      .setCompleted(task)
      .subscribe(() => (task.completed = !task.completed));
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task._id)
      .subscribe(
        (task: Task) =>
          (this.tasks = this.tasks.filter((t) => t._id != task._id))
      );
  }

  deleteList(list: List) {
    this.taskService.deleteList(list._id).subscribe((list: List) => {
      this.tasks = [];
      this.taskService
        .getLists()
        .subscribe((lists: List[]) => (this.lists = lists));
    });
  }
}
