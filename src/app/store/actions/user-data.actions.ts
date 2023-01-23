import { Action } from '@ngrx/store';
import User from 'src/app/models/User';

export const GET_FOLLOWERS = '[User] Get Followers';
export const GET_FOLLOWINGS = '[User] Get Followings';
export const GET_USER_FOLLOWERS_SUCCESS = '[User] Successful Followers request';
export const GET_USER_FOLLOWINGS_SUCCESS =
  '[User] Successful Followings request';

export const GET_USER_DATA_FAILED = '[User] Failed request';

export const GET_USER_DATA_RESET = '[User] Reset state';

export class GetFollowers implements Action {
  constructor(public username: string) { }
  type = GET_FOLLOWERS;
}

export class GetFollowings implements Action {
  constructor(public username: string) { }
  type = GET_FOLLOWINGS;
}

export class GetUserFollowersSuccess implements Action {
  constructor(public followers: User[]) { }
  type = GET_USER_FOLLOWERS_SUCCESS;
}

export class GetUserFollowingsSuccess implements Action {
  constructor(public followings: User[]) { }
  type = GET_USER_FOLLOWINGS_SUCCESS;
}

export class GetUserDataFailed implements Action {
  constructor(public username: string) { }
  type = GET_USER_DATA_FAILED;
}

export class GetUserDataReset implements Action {
  constructor(public username: string) { }
  type = GET_USER_DATA_RESET;
}
