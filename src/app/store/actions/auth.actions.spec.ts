import User from 'src/app/models/User';
import {
    Login,
    LOGIN,
    LoginSuccess,
    LOGIN_SUCCESS,
    LoginFailed,
    LOGIN_FAILED,
    VerifySession,
    VERIFY_SESSION,
    InvalidSession,
    SESSION_INVALID,
    ResetAuth,
    RESET_AUTH,
    ResetSSOAuth,
    RESET_SSO_AUTH,
    Logout,
    LOGOUT,
    LogoutSuccess,
    LOGOUT_SUCCESS,
    LogoutFailed,
    LOGOUT_FAILED,
} from './auth.actions';

describe('Auth Actions', () => {
    let username: string;
    let password: string;
    let user: User;
    let error: any;

    beforeEach(() => {
        username = 'test-user';
        password = 'test-password';
        user = new User(
            1,
            'user@example.com',
            'John',
            'Doe',
            'johndoe',
            0,
            0,
            'About Me',
            false
        );
        error = { message: 'Error occurred' };
    });

    describe('Login', () => {
        it('should create an action', () => {
            const action = new Login(username, password);
            expect(action.type).toEqual(LOGIN);
            expect(action.username).toEqual(username);
            expect(action.password).toEqual(password);
        });
    });

    describe('LoginSuccess', () => {
        it('should create an action', () => {
            const action = new LoginSuccess(user);
            expect(action.type).toEqual(LOGIN_SUCCESS);
            expect(action.user).toEqual(user);
        });
    });

    describe('LoginFailed', () => {
        it('should create an action', () => {
            const action = new LoginFailed(error);
            expect(action.type).toEqual(LOGIN_FAILED);
            expect(action.error).toEqual(error);
        });
    });

    describe('VerifySession', () => {
        it('should create an action', () => {
            const action = new VerifySession();
            expect(action.type).toEqual(VERIFY_SESSION);
            expect(action.login).toEqual(true);
            expect(action.updateEndpoints).toEqual(true);
        });
    });

    describe('InvalidSession', () => {
        it('should create an action', () => {
            const action = new InvalidSession();
            expect(action.type).toEqual(SESSION_INVALID);
            expect(action.uaaError).toEqual(false);
            expect(action.upgradeInProgress).toEqual(false);
            expect(action.domainMismatch).toEqual(false);
            expect(action.ssoOptions).toEqual('');
        });
    });

    describe('ResetAuth', () => {
        it('should create an action', () => {
            const action = new ResetAuth();
            expect(action.type).toEqual(RESET_AUTH);
        });
    });

    describe('ResetSSOAuth', () => {
        it('should create an action', () => {
            const action = new ResetSSOAuth();
            expect(action.type).toEqual(RESET_SSO_AUTH);
        });
    });

    describe('Logout', () => {
        it('should create an action', () => {
            const action = new Logout();
            expect(action.type).toEqual(LOGOUT);
        });
    });

    describe('LogoutSuccess', () => {
        it('should create an action', () => {
            const action = new LogoutSuccess();
            expect(action.type).toEqual(LOGOUT_SUCCESS);
        });
    });

    describe('LogoutFailed', () => {
        it('should create an action', () => {
            const action = new LogoutFailed(error);
            expect(action.type).toEqual(LOGOUT_FAILED);
            expect(action.error).toEqual(error);
        });
    });
});
