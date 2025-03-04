import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/@ngrx';
// rxjs
import { Observable } from 'rxjs';

import { TaskModel, Task } from './../../models/task.model';
/* import { TaskPromiseService } from './../../services';
 */import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  //tasks: Promise<Array<TaskModel>>;
  tasksState$: Observable<TasksState>;

  constructor(
    private router: Router, 
/*     private taskPromiseService: TaskPromiseService,
 */    private store: Store<AppState>
  ) {}

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasksState$ = this.store.pipe(select('tasks'));
/*     this.tasks = this.taskArrayService.getTasks();
     this.tasks = this.taskPromiseService.getTasks();*/
     this.store.dispatch(TasksActions.getTasks());

  }

  onCompleteTask(task: TaskModel): void {
    //this.updateTask(task).catch(err => console.log(err)); 

    // task is not plain object
    // taskToComplete is a plain object
    const taskToComplete: Task = { ...task };
    this.store.dispatch(TasksActions.completeTask({ task: taskToComplete }));
  }

  onCreateTask() {
      const link = ['/add'];
      this.router.navigate(link);
  }
  
  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onDeleteTask(task: TaskModel) {
/*     this.taskPromiseService
      .deleteTask(task)
      .then(() => (this.tasks = this.taskPromiseService.getTasks()))
      .catch(err => console.log(err));
 */  }

/*   private async updateTask(task: TaskModel) {
    const updatedTask = await this.taskPromiseService.updateTask({
      ...task,
      done: true
    });

    const tasks: TaskModel[] = await this.tasks;
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    tasks[index] = { ...updatedTask };
}
 */
}
