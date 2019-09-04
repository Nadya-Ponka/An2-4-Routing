import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// @NgRx
import { Store, select } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

// rxjs
// import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AutoUnsubscribe } from './../../../core';

import { TaskModel, Task } from './../../models/task.model';
/* import { TaskPromiseService } from './../../services';
 */
@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

@AutoUnsubscribe()
export class TaskFormComponent implements OnInit {
  task: TaskModel;
  tasksState$: Observable < TasksState > ;

  private sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
/*     private taskPromiseService: TaskPromiseService,
 */    private store: Store < AppState >
  ) {}

  ngOnInit(): void {
/*     this.task = new TaskModel();
 */
    // it is not necessary to save subscription to route.paramMap
    // when router destroys this component, it handles subscriptions automatically
    /* this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return params.get('taskID')
            ? this.taskPromiseService.getTask(+params.get('taskID'))
            // when Promise.resolve(null) => task = null => {...null} => {}
            : Promise.resolve(null);
        }))
        .subscribe(
        task => this.task = {...task},
        err => console.log(err)
    ); */

    this.tasksState$ = this.store.pipe(select('tasks'));
    this.sub = this.tasksState$.subscribe(tasksState => {
      if (tasksState.selectedTask) {
        this.task = {...tasksState.selectedTask} as TaskModel;
      } else {
        this.task = new TaskModel();
      }
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('taskID');
      if (id) {
        this.store.dispatch(TasksActions.getTask({ taskID: +id }));
      }
    });


  }

  onSaveTask() {
    const task = { ...this.task } as Task;

/*     const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.onGoBack())
      .catch(err => console.log(err));
 */  
if (task.id) {
  this.store.dispatch(TasksActions.updateTask({ task }));
} else {
  this.store.dispatch(TasksActions.createTask({ task }));
}

}

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
