import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import {
  CHANGE_THEME,
  ChangeTheme,
  ToggleSidebar,
  SIDEBAR_EXPANDED,
} from '../actions/user-preferences.actions';

import { PreferencesOnlyAppState } from '../app.state';

@Injectable()
export class PreferencesEffect {
  constructor(
    private actions$: Actions,
    private store: Store<PreferencesOnlyAppState>
  ) {}

  changeThemeRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ChangeTheme>(CHANGE_THEME),
        map((action) => {
          return [];
        })
      ),
    { dispatch: false }
  );

  sideBarExpanded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ToggleSidebar>(SIDEBAR_EXPANDED),
        map((action) => {
          return [];
        })
      ),
    { dispatch: false }
  );

  /*
  followSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ChangeThemeSuccess>(CHANGE_THEME_SUCCESS),
      map((action) => {
        return new ResetState();
      })
    )
  );

  followFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ChangeThemeFailed>(CHANGE_THEME_FAILED),
      map((action) => {
        return new ResetState();
      })
    )
  );*/
}
