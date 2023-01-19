import { NgModule } from '@angular/core';
import { ActionReducer, ActionReducerMap, StoreModule } from '@ngrx/store';

import { localStorageSync } from 'ngrx-store-localstorage';

import { authReducer } from './reducers/auth.reducer';
import { followReducer } from './reducers/follows.reducer';
import { preferencesReducer } from './reducers/user-preferences.reducers';

export const appReducers = {
  auth: authReducer,
  follow: followReducer,
  preferences: preferencesReducer,
} as ActionReducerMap<{}>;

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth', 'preferences'],
    rehydrate: true,
  })(reducer);
}
const metaReducers = [localStorageSyncReducer];

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
