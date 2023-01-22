import { AuthState } from './reducers/auth.reducer';
import { FollowReqState } from './reducers/follows.reducer';
import { UserDataReqState } from './reducers/user-data.reduces';
import { PreferencesState } from './reducers/user-preferences.reducers';

//add additional states for different data you want to be
//persisted to local storage
export abstract class AppState<T extends Record<string, any> = any> {
  auth: AuthState;
  follow: FollowReqState;
  preferences: PreferencesState;
  userInfo: UserDataReqState;
}
/**
 * Ignore below
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
export interface IRequestTypeState {
  [entityKey: string]: any;
}
export interface IRequestEntityTypeState<T> {
  [guid: string]: T;
}
export type BaseRequestState = Record<string, string>;
export type BaseRequestDataState = Record<string, string>;
export type AuthOnlyState = Pick<AppState, 'auth'>;
export type FollowReqOnlyAppState = Pick<AppState, 'follow'>;
export type PreferencesOnlyAppState = Pick<AppState, 'preferences'>;
export type UserInfoOnlyAppState = Pick<AppState, 'userInfo'>;
export interface GeneralRequestDataState {
  [name: string]: any;
}

export interface GeneralAppRequestDataState extends GeneralRequestDataState {}

export type DispatchOnlyAppState = unknown;

// =======================================================================================
// Internal types below - these should NOT be used outside of the store package
// =======================================================================================

// One stop shop for all of your app state needs

// Care about the catalogue entities? Use this one.
export abstract class GeneralEntityAppState extends AppState<GeneralRequestDataState> {}

// Only care about internal entities? Use this one.
// This should only be used by internal stratos code
export abstract class InternalAppState extends AppState<BaseRequestDataState> {}

// Only care about specific internal entities? Use this one.
// This should only be used by internal stratos code
export type PickedInternalAppState<T extends keyof InternalAppState> = Pick<
  InternalAppState,
  T
>;

// Care about internal entities and catalogue entities? Use this one.
// This should only be used by internal stratos code
export abstract class GeneralAppState extends AppState<GeneralAppRequestDataState> {}
