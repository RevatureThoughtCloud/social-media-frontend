import User from 'src/app/models/User';
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
  RESET_FOLLOW,
} from '../actions/follows.actions';

export interface FollowReqState {
  followersUserName: string;
  followingsUserName: string;
  inProgress: boolean;
  completed: boolean;
  error: boolean;
  errorResponse: any;
  successResponse: any;
  isFollowOrUnfollow: boolean;
}

export const defaultState: FollowReqState = {
  followersUserName: '',
  followingsUserName: '',
  inProgress: false,
  completed: false,
  error: false,
  errorResponse: '',
  successResponse: '',
  isFollowOrUnfollow: true,
};

export function followReducer(
  state: FollowReqState = defaultState,
  action: any
): FollowReqState {
  switch (action.type) {
    case FOLLOW:
      const followUser = action as Follow;
      return {
        ...state,
        error: false,
        followersUserName: 'CURRENTUSER',
        inProgress: true,
        followingsUserName: followUser.username,
        completed: false,
        isFollowOrUnfollow: true,
      };
    case UNFOLLOW:
      const unfollowUser = action as UnFollow;
      return {
        ...state,
        error: false,
        followersUserName: 'CURRENTUSER',
        inProgress: true,
        followingsUserName: unfollowUser.username,
        completed: false,
        isFollowOrUnfollow: false,
      };
    case FOLLOW_SUCCESS:
      const followSuccess = action as FollowSuccess;

      return {
        ...state,
        error: false,
        inProgress: false,
        completed: true,
        successResponse: 'Successfully followed' + state.followingsUserName,
      };
    case FOLLOW_FAILED:
      const followFailed = action as FollowFailed;
      return {
        ...state,
        error: true,
        inProgress: false,
        completed: true,
        errorResponse: 'Failed followed' + state.followersUserName,
      };
    case UNFOLLOW_SUCCESS:
      const unfollowSuccess = action as UnFollowSuccess;

      return {
        ...state,
        error: false,
        inProgress: false,
        completed: true,
        successResponse: 'Successfully UNfollowed' + state.followingsUserName,
      };
    case UNFOLLOW_FAILED:
      const unfollowFailed = action as UnFollowFailed;

      return {
        ...state,
        error: true,
        inProgress: false,
        completed: true,
        errorResponse: 'Failed UNfollowed' + state.followingsUserName,
      };

    case RESET_FOLLOW:
      return defaultState;
    default:
      return state;
  }
}
