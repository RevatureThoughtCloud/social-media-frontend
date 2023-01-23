import {
    Follow,
    FOLLOW,
    UnFollow,
    UNFOLLOW,
    ResetState,
    RESET_FOLLOW,
    FollowSuccess,
    FOLLOW_SUCCESS,
    FollowFailed,
    FOLLOW_FAILED,
    UnFollowSuccess,
    UNFOLLOW_SUCCESS,
    UnFollowFailed,
    UNFOLLOW_FAILED,
} from './follows.actions';

describe('Follows Actions', () => {
    let username: string;
    let message: string;
    let error: any;

    beforeEach(() => {
        username = 'test-user';
        message = 'Followed successfully';
        error = { message: 'Error occurred' };
    });

    describe('Follow', () => {
        it('should create an action', () => {
            const action = new Follow(username);
            expect(action.type).toEqual(FOLLOW);
            expect(action.username).toEqual(username);
        });
    });

    describe('UnFollow', () => {
        it('should create an action', () => {
            const action = new UnFollow(username);
            expect(action.type).toEqual(UNFOLLOW);
            expect(action.username).toEqual(username);
        });
    });

    describe('ResetState', () => {
        it('should create an action', () => {
            const action = new ResetState();
            expect(action.type).toEqual(RESET_FOLLOW);
        });
    });

    describe('FollowSuccess', () => {
        it('should create an action', () => {
            const action = new FollowSuccess(message);
            expect(action.type).toEqual(FOLLOW_SUCCESS);
            expect(action.message).toEqual(message);
        });
    });

    describe('FollowFailed', () => {
        it('should create an action', () => {
            const action = new FollowFailed(error);
            expect(action.type).toEqual(FOLLOW_FAILED);
            expect(action.error).toEqual(error);
        });
    });

    describe('UnFollowSuccess', () => {
        it('should create an action', () => {
            const action = new UnFollowSuccess(message);
            expect(action.type).toEqual(UNFOLLOW_SUCCESS);
            expect(action.message).toEqual(message);
        });
    });

    describe('UnFollowFailed', () => {
        it('should create an action', () => {
            const action = new UnFollowFailed(error);
            expect(action.type).toEqual(UNFOLLOW_FAILED);
            expect(action.error).toEqual(error);
        });
    });
});
