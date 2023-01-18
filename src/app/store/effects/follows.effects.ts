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
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  Follow,
  FollowSuccess,
  FollowFailed,
  UnFollowSuccess,
  UnFollowFailed,
  UNFOLLOW,
} from '../actions/follows.actions';

import { FollowReqOnlyAppState } from '../app.state';

import { environment } from 'src/environments/environment';

@Injectable()
export class FollowEffect {
  baseUrl: string = `${environment.baseUrl}`;
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<FollowReqOnlyAppState>
  ) {}

  followRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Follow>(FOLLOW),
      switchMap(({ username }) => {
        const headers = {
          headers: environment.headers,
          withCredentials: environment.withCredentials,
        };

        return this.http
          .post(this.baseUrl + '/user/follow/' + username, {
            headers,
          })
          .pipe(
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
}
