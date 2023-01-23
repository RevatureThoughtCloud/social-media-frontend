import User from 'src/app/models/User';
import {
  GetFollowers,
  GetFollowings,
  GetUserFollowersSuccess,
  GetUserFollowingsSuccess,
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_RESET,
  GET_USER_FOLLOWERS_SUCCESS,
  GET_USER_FOLLOWINGS_SUCCESS,
} from '../actions/user-data.actions';

export interface UserDataReqState {
  followers: User[];
  followings: User[];
  inProgress: boolean;
  completed: boolean;
  error: boolean;
  errorResponse: any;
  successResponse: any;
}

const defaultState: UserDataReqState = {
  followers: [],
  followings: [],
  inProgress: false,
  completed: false,
  error: false,
  errorResponse: '',
  successResponse: '',
};

export function userInfoReducer(
  state: UserDataReqState = defaultState,
  action: any
): UserDataReqState {
  switch (action.type) {
    case GET_FOLLOWERS:
      return {
        ...state,
        inProgress: true,
      };
    case GET_FOLLOWINGS:
      return {
        ...state,
        inProgress: true,
      };
    case GET_USER_FOLLOWERS_SUCCESS:
      const ac = action as GetUserFollowersSuccess;

      return {
        ...state,
        followers: ac.followers.slice(),
        inProgress: false,
        completed: true,
        successResponse: 'Successfully got followers ',
      };
    case GET_USER_FOLLOWINGS_SUCCESS:
      const fl = action as GetUserFollowingsSuccess;

      return {
        ...state,
        followings: fl.followings.slice(),
        inProgress: false,
        completed: true,
        successResponse: 'Successfully got followings',
      };
    case GET_USER_DATA_FAILED:
      return {
        ...state,
        error: true,
        inProgress: false,
        completed: true,
        errorResponse: 'Failed to get followers or followings',
      };

    default:
      return state;
  }
}
