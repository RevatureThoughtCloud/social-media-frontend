import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import {
  FOLLOW,
  FOLLOW_FAILED,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAILED,
  UNFOLLOW_SUCCESS,
  Follow,
  FollowSuccess,
  FollowFailed,
  UnFollowSuccess,
  UnFollowFailed,
  UNFOLLOW,
  UnFollow,
} from '../actions/follows.actions';

import { FollowReqOnlyAppState } from '../app.state';

import { environment } from 'src/environments/environment';
import { FollowsService } from 'src/app/services/follows.service';

@Injectable()
export class FollowEffect {
  baseUrl: string = `${environment.baseUrl}`;
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<FollowReqOnlyAppState>,
    private followsService: FollowsService
  ) {}

  followRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Follow>(FOLLOW),
      switchMap(({ username }) => {
        return this.followsService.currentUserFollow(username).pipe(
          map((data) => new FollowSuccess('Follow successfull')),
          catchError((err, caught) => [new FollowFailed(err)])
        );
      })
    )
  );

  followSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<FollowSuccess>(FOLLOW_SUCCESS),
        mergeMap((action) => {
          return [];
        })
      ),
    { dispatch: false }
  );

  followFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<FollowFailed>(FOLLOW_FAILED),
        mergeMap((action) => {
          return [];
        })
      ),
    { dispatch: false }
  );

  unFollowRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UnFollow>(UNFOLLOW),
      switchMap(({ username }) => {
        return this.followsService.currentUserUnFollow(username).pipe(
          map((data) => new UnFollowSuccess('UNFollow successfull')),
          catchError((err, caught) => [new UnFollowFailed(err)])
        );
      })
    )
  );

  unFollowSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<UnFollowSuccess>(UNFOLLOW_SUCCESS),
        mergeMap((action) => {
          return [];
        })
      ),
    { dispatch: false }
  );

  unFollowFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<UnFollowFailed>(UNFOLLOW_FAILED),
        mergeMap((action) => {
          return [];
        })
      ),
    { dispatch: false }
  );
}
