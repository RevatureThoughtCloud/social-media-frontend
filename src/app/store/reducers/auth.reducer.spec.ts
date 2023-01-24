import User from 'src/app/models/User';
import {
  Login,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  VERIFY_SESSION,
  SESSION_VERIFIED,
} from '../actions/auth.actions';
import { AuthState, authReducer } from './auth.reducer';

const defaultState: AuthState = {
  loggedIn: false,
  loggingIn: false,
  user: new User(0, '', '', '', ''),
  error: false,
  errorResponse: '',
  verifying: false,
};

describe('Auth Reducer', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = authReducer(undefined, action);
    expect(state).toEqual(state);
  });

  it('should handle LOGIN action', () => {
    const action = new Login('username', 'password');
    const state = authReducer(undefined, action);
    expect(state.loggingIn).toEqual(true);
    expect(state.loggedIn).toEqual(false);
    expect(state.error).toEqual(false);
  });

  it('should handle LOGIN_SUCCESS action', () => {
    const action = LOGIN_SUCCESS;
    const state = authReducer(undefined, action);
    expect(state.loggingIn).toEqual(false);
    expect(state.loggedIn).toEqual(false);
    expect(state.error).toEqual(false);
  });

  it('should handle LOGIN_FAILED action', () => {
    const action = LOGIN_FAILED;
    const state = authReducer(undefined, action);
    expect(state.loggingIn).toEqual(false);
    expect(state.loggedIn).toEqual(false);
    expect(state.error).toEqual(false);
  });

  it('should handle VERIFY_SESSION action', () => {
    const action = VERIFY_SESSION;
    const state = authReducer(undefined, action);
    expect(state.verifying).toEqual(false);
    expect(state.error).toEqual(false);
  });

  it('should handle SESSION_VERIFIED action', () => {
    const action = SESSION_VERIFIED;
    const state = authReducer(undefined, action);
    expect(state.verifying).toEqual(false);
    expect(state.error).toEqual(false);
    expect(state.errorResponse).toEqual('');
  });
});
