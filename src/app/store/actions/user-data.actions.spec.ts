import User from 'src/app/models/User';
import {
    GetFollowers,
    GET_FOLLOWERS,
    GetFollowings,
    GET_FOLLOWINGS,
    GetUserFollowersSuccess,
    GET_USER_FOLLOWERS_SUCCESS,
    GetUserFollowingsSuccess,
    GET_USER_FOLLOWINGS_SUCCESS,
    GetUserDataFailed,
    GET_USER_DATA_FAILED,
    GetUserDataReset,
    GET_USER_DATA_RESET,
} from './user-data.actions';

describe('User Data Actions', () => {
    let username: string;
    let followers: User[];
    let followings: User[];

    beforeEach(() => {
        username = 'test-user';
        followers = [
            new User(
                1,
                'follower1@example.com',
                'Follower1',
                'LastName1',
                'follower1',
                0,
                0,
                'About Me',
                false
            ),
            new User(
                2,
                'follower2@example.com',
                'Follower2',
                'LastName2',
                'follower2',
                0,
                0,
                'About Me',
                false
            ),
        ];
        followings = [
            new User(
                1,
                'following1@example.com',
                'Following1',
                'LastName1',
                'following1',
                0,
                0,
                'About Me',
                true
            ),
            new User(
                2,
                'following2@example.com',
                'Following2',
                'LastName2',
                'following2',
                0,
                0,
                'About Me',
                true
            ),
        ];
    });

    describe('GetFollowers', () => {
        it('should create an action', () => {
            const action = new GetFollowers(username);
            expect(action.type).toEqual(GET_FOLLOWERS);
            expect(action.username).toEqual(username);
        });
    });

    describe('GetFollowings', () => {
        it('should create an action', () => {
            const action = new GetFollowings(username);
            expect(action.type).toEqual(GET_FOLLOWINGS);
            expect(action.username).toEqual(username);
        });
    });

    describe('GetUserFollowersSuccess', () => {
        it('should create an action', () => {
            const action = new GetUserFollowersSuccess(followers);
            expect(action.type).toEqual(GET_USER_FOLLOWERS_SUCCESS);
            expect(action.followers).toEqual(followers);
        });
    });

    describe('GetUserFollowingsSuccess', () => {
        it('should create an action', () => {
            const action = new GetUserFollowingsSuccess(followings);
            expect(action.type).toEqual(GET_USER_FOLLOWINGS_SUCCESS);
            expect(action.followings).toEqual(followings);
        });
    });

    describe('GetUserDataFailed', () => {
        it('should create an action', () => {
            const action = new GetUserDataFailed(username);
            expect(action.type).toEqual(GET_USER_DATA_FAILED);
            expect(action.username).toEqual(username);
        });
    });

    describe('GetUserDataReset', () => {
        it('should create an action', () => {
            const action = new GetUserDataReset(username);
            expect(action.type).toEqual(GET_USER_DATA_RESET);
            expect(action.username).toEqual(username);
        });
    });
});
