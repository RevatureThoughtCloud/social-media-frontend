import {
  FOLLOW,
  UNFOLLOW,
  FOLLOW_SUCCESS,
  FOLLOW_FAILED,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILED,
  RESET_FOLLOW,
} from '../actions/follows.actions';
import { followReducer } from './follows.reducer';

describe('followReducer', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      followersUserName: '',
      followingsUserName: '',
      inProgress: false,
      completed: false,
      error: false,
      errorResponse: '',
      successResponse: '',
      isFollowOrUnfollow: true,
    };
  });

  it('should handle FOLLOW action', () => {
    const followUser = { type: FOLLOW, username: 'testuser' };
    const state = followReducer(initialState, followUser);
    expect(state).toEqual({
      ...initialState,
      followersUserName: 'CURRENTUSER',
      inProgress: true,
      followingsUserName: 'testuser',
      isFollowOrUnfollow: true,
    });
  });

  it('should handle UNFOLLOW action', () => {
    const unfollowUser = { type: UNFOLLOW, username: 'testuser' };
    const state = followReducer(initialState, unfollowUser);
    expect(state).toEqual({
      ...initialState,
      followersUserName: 'CURRENTUSER',
      inProgress: true,
      followingsUserName: 'testuser',
      isFollowOrUnfollow: false,
    });
  });

  it('should handle FOLLOW_SUCCESS action', () => {
    const followSuccess = { type: FOLLOW_SUCCESS };
    const state = followReducer(initialState, followSuccess);
    expect(state).toEqual({
      ...initialState,
      error: false,
      inProgress: false,
      completed: true,
      successResponse: 'Successfully followed',
    });
  });

  it('should handle FOLLOW_FAILED action', () => {
    const followFailed = { type: FOLLOW_FAILED };
    const state = followReducer(initialState, followFailed);
    expect(state).toEqual({
      ...initialState,
      error: true,
      inProgress: false,
      completed: true,
      errorResponse: 'Failed followed' + initialState.followersUserName,
    });
  });

  it('should handle UNFOLLOW_SUCCESS action', () => {
    const unfollowSuccess = { type: UNFOLLOW_SUCCESS };
    const state = followReducer(initialState, unfollowSuccess);
    expect(state).toEqual({
      ...initialState,
      error: false,
      inProgress: false,
      completed: true,
      successResponse: 'Successfully UNfollowed' + state.followingsUserName,
    });
  });

  it('should handle UNFOLLOW_FAILED action', () => {
    const unfollowFailed = { type: UNFOLLOW_FAILED };
    const newState = followReducer(initialState, unfollowFailed);
    expect(newState).toEqual({
      ...initialState,
      error: true,
      inProgress: false,
      completed: true,
      errorResponse: 'Failed UNfollowed' + initialState.followingsUserName,
    });
  });

  it('should handle RESET_FOLLOW action', () => {
    const resetFollow = { type: RESET_FOLLOW };
    const newState = followReducer(initialState, resetFollow);
    expect(newState).toEqual({
      followersUserName: '',
      followingsUserName: '',
      inProgress: false,
      completed: false,
      error: false,
      errorResponse: '',
      successResponse: '',
      isFollowOrUnfollow: true,
    });
  });

  it('should return the default state for any unknown action', () => {
    const unknownAction = { type: 'UNKNOWN' };
    const newState = followReducer(initialState, unknownAction);
    expect(newState).toEqual(initialState);
  });
});
