import { Action } from '@ngrx/store';

export const FOLLOW = '[Follow] FOLLOW';
export const FOLLOW_SUCCESS = '[Follow] FOLLOW success';
export const FOLLOW_FAILED = '[Follow] FOLLOW failed';

export const UNFOLLOW = '[Follow] UNFOLLOW';
export const UNFOLLOW_SUCCESS = '[Follow] UNFOLLOW success';
export const UNFOLLOW_FAILED = '[Follow] UNFOLLOW failed';

export const RESET_FOLLOW = '[Follow] Reseting state';

export class Follow implements Action {
  constructor(public username: string) { }
  type = FOLLOW;
}
export class UnFollow implements Action {
  constructor(public username: string) { }
  type = UNFOLLOW;
}
export class ResetState implements Action {
  type = RESET_FOLLOW;
}
export class FollowSuccess implements Action {
  type = FOLLOW_SUCCESS;
  constructor(public message: string) { }
}

export class FollowFailed implements Action {
  constructor(public error: any) { }
  type = FOLLOW_FAILED;
}

export class UnFollowSuccess implements Action {
  type = UNFOLLOW_SUCCESS;
  constructor(public message: string) { }
}

export class UnFollowFailed implements Action {
  constructor(public error: any) { }
  type = UNFOLLOW_FAILED;
}
