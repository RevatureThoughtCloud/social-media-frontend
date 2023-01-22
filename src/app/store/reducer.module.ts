import { NgModule } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  StoreModule,
} from '@ngrx/store';

import { localStorageSync } from 'ngrx-store-localstorage';

import { authReducer } from './reducers/auth.reducer';
import { followReducer } from './reducers/follows.reducer';
import { userInfoReducer } from './reducers/user-data.reduces';
import { preferencesReducer } from './reducers/user-preferences.reducers';
export class ActionTypes {
  static LOGOUT = '[App] logout';
}

export class Logout2 implements Action {
  readonly type = ActionTypes.LOGOUT;
}
export function clearState(reducer: any) {
  return function (state: any, action: any) {
    if (action.type === ActionTypes.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}
export const appReducers = {
  auth: authReducer,
  follow: followReducer,
  preferences: preferencesReducer,
  userInfo: userInfoReducer,
} as ActionReducerMap<{}>;

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth', 'preferences', 'userInfo'],
    rehydrate: true,
  })(reducer);
}
const metaReducers = [localStorageSyncReducer, clearState];

const storeModule = StoreModule.forRoot(appReducers, {
  metaReducers,
  runtimeChecks: {
    strictStateImmutability: false,
    strictActionImmutability: false,
  },
});
const imports = [storeModule];
@NgModule({
  imports,
})
export class AppReducersModule {}
