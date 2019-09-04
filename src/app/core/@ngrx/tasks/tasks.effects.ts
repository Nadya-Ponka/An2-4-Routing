import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';
import * as TasksActions from './tasks.actions';

// rxjs
import { Observable } from 'rxjs';
import { concatMap, map, pluck, switchMap } from 'rxjs/operators';
import { TaskModel, Task } from '../../../tasks/models/task.model';

import { TaskPromiseService } from './../../../tasks/services';

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private taskPromiseService: TaskPromiseService,
    private router: Router,
  ) {
    console.log('[TASKS EFFECTS]');
  }

  getTasks$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getTasks),
      switchMap(action =>
        this.taskPromiseService
        .getTasks()
        .then(tasks => TasksActions.getTasksSuccess({
          tasks
        }))
        .catch(error => TasksActions.getTasksError({
          error
        }))
      )
    )
  );

  getTask$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getTask),
      pluck('taskID'),
      switchMap(taskID =>
        this.taskPromiseService
        .getTask(taskID)
        .then(task => TasksActions.getTaskSuccess({
          task
        }))
        .catch(error => TasksActions.getTaskError({
          error
        }))
      )
    )
  );

  updateTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      pluck('task'),
      concatMap((task: TaskModel) =>
        this.taskPromiseService
          .updateTask(task)
          .then((updatedTask: Task) => {
            this.router.navigate(['/home']);
            return TasksActions.updateTaskSuccess({ task: updatedTask });
          })
          .catch(error => TasksActions.updateTaskError({ error }))
      )
    )
  );

  createTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      pluck('task'),
      concatMap((task: TaskModel) =>
        this.taskPromiseService
          .createTask(task)
          .then((createdTask: Task) => {
            this.router.navigate(['/home']);
            return TasksActions.createTaskSuccess({ task: createdTask });
          })
          .catch(error => TasksActions.createTaskError({ error }))
      )
    )
  );

}
