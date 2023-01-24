import User from 'src/app/models/User';
import {
    GET_FOLLOWERS,
    GET_FOLLOWINGS,
    GET_USER_FOLLOWERS_SUCCESS,
    GET_USER_FOLLOWINGS_SUCCESS,
    GET_USER_DATA_FAILED,
} from '../actions/user-data.actions';
import { userInfoReducer } from './user-data.reduces';

describe('userInfoReducer', () => {
    let initialState: any;

    beforeEach(() => {
        initialState = {
            followers: [],
            followings: [],
            inProgress: false,
            completed: false,
            error: false,
            errorResponse: '',
            successResponse: '',
        };
    });

    it('should handle GET_FOLLOWERS action', () => {
        const getFollowers = { type: GET_FOLLOWERS };
        const state = userInfoReducer(initialState, getFollowers);
        expect(state).toEqual({
            ...initialState,
            inProgress: true,
        });
    });

    it('should handle GET_FOLLOWINGS action', () => {
        const getFollowings = { type: GET_FOLLOWINGS };
        const state = userInfoReducer(initialState, getFollowings);
        expect(state).toEqual({
            ...initialState,
            inProgress: true,
        });
    });

    it('should handle GET_USER_FOLLOWERS_SUCCESS action', () => {
        const followers = [
            new User(
                1,
                'user1@test.com',
                'User',
                '1',
                'user1',
                100,
                200,
                'About me',
                true
            ),
            new User(
                2,
                'user2@test.com',
                'User',
                '2',
                'user2',
                150,
                250,
                'About me',
                false
            ),
        ];
        const getUserFollowersSuccess = {
            type: GET_USER_FOLLOWERS_SUCCESS,
            followers,
        };
        const state = userInfoReducer(initialState, getUserFollowersSuccess);
        expect(state).toEqual({
            ...initialState,
            followers: followers,
            inProgress: false,
            completed: true,
            successResponse: 'Successfully got followers ',
        });
    });

    it('should handle GET_USER_FOLLOWINGS_SUCCESS action', () => {
        const followings = [
            new User(
                1,
                'user1@test.com',
                'User',
                '1',
                'user1',
                100,
                200,
                'About me',
                true
            ),
            new User(
                2,
                'user2@test.com',
                'User',
                '2',
                'user2',
                150,
                250,
                'About me',
                false
            ),
        ];
        const GetUserFollowingsSuccess = {
            type: GET_USER_FOLLOWINGS_SUCCESS,
            followings,
        };
        const state = userInfoReducer(initialState, GetUserFollowingsSuccess);
        expect(state).toEqual({
            ...initialState,
            followings: followings,
            inProgress: false,
            completed: true,
            successResponse: 'Successfully got followings',
        });
    });

    it('should handle GET_USER_DATA_FAILED action', () => {
        const getUserDataFailed = { type: GET_USER_DATA_FAILED };
        const state = userInfoReducer(initialState, getUserDataFailed);
        expect(state).toEqual({
            ...initialState,
            error: true,
            inProgress: false,
            completed: true,
            errorResponse: 'Failed to get followers or followings',
        });
    });
});
