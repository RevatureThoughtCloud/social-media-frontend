import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

import {
  InvalidSession,
  LOGIN,
  Login,
  LoginFailed,
  LoginSuccess,
  LOGOUT,
  Logout,
  LogoutFailed,
  LogoutSuccess,
  RESET_AUTH,
  RESET_SSO_AUTH,
  ResetAuth,
  ResetSSOAuth,
  SESSION_INVALID,
  VERIFY_SESSION,
  VerifySession,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
} from '../actions/auth.actions';

import { AuthOnlyState } from '../app.state';

const SETUP_HEADER = 'stratos-setup-required';
const UPGRADE_HEADER = 'retry-after';
const DOMAIN_HEADER = 'x-stratos-domain';
const SSO_HEADER = 'x-stratos-sso-login';

@Injectable()
export class AuthEffect {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private store: Store<AuthOnlyState>
  ) {}

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Login>(LOGIN),
      switchMap(({ username, password }) => {
        return this.authService.login(username, password).pipe(
          map((data) => new LoginSuccess(data)),
          catchError((err, caught) => [new LoginFailed(err)])
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<LoginSuccess>(LOGIN_SUCCESS),
        mergeMap((action) => {
          return [];
        })
      ),
    { dispatch: false }
  );

  loginFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<LoginFailed>(LOGIN_FAILED),
        mergeMap((action) => {
          return [];
        })
      ),
    { dispatch: false }
  );

  logoutRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<Logout>(LOGOUT),
        map(() => {
          return this.authService.logout();
        })
      ),
    { dispatch: false }
  );
}
