import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { FollowReqOnlyAppState } from '../app.state';

import { environment } from 'src/environments/environment';
import { FollowsService } from 'src/app/services/follows.service';
import {
  GetFollowers,
  GetFollowings,
  GetUserDataFailed,
  GetUserFollowersSuccess,
  GetUserFollowingsSuccess,
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
} from '../actions/user-data.actions';

@Injectable()
export class UserDataEffect {
  baseUrl: string = `${environment.baseUrl}`;
  constructor(
    private actions$: Actions,

    private followsService: FollowsService
  ) {}

  getFollowersRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetFollowers>(GET_FOLLOWERS),
      switchMap(({ username }) => {
        return this.followsService.getUsersFollowers(username).pipe(
          map((data) => new GetUserFollowersSuccess(data)),
          catchError((err, caught) => [new GetUserDataFailed(err)])
        );
      })
    )
  );

  getFollowingsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetFollowings>(GET_FOLLOWINGS),
      switchMap(({ username }) => {
        return this.followsService.getUsersFollowings(username).pipe(
          map((data) => new GetUserFollowingsSuccess(data)),
          catchError((err, caught) => [new GetUserDataFailed(err)])
        );
      })
    )
  );
}
