import User from 'src/app/models/User';
import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LoginFailed,
  SESSION_VERIFIED,
  VERIFY_SESSION,
  LoginSuccess,
} from '../actions/auth.actions';
import { AuthOnlyAppState } from '../app.state';

export interface AuthState {
  loggedIn: boolean;
  loggingIn: boolean;
  user?: User;
  error: boolean;
  errorResponse: any;
  verifying: boolean;
  keepAlive?: boolean;
}

const defaultState: AuthState = {
  loggedIn: false,
  loggingIn: false,
  user: undefined,
  error: false,
  errorResponse: '',

  verifying: false,
};

export function authReducer(
  state: AuthState = defaultState,
  action: any
): AuthState {
  console.log(state);
  switch (action.type) {
    case LOGIN:
      return { ...state, loggingIn: true, loggedIn: false, error: false };
    case LOGIN_SUCCESS:
      const loginSuccess = action as LoginSuccess;

      return {
        ...state,
        user: loginSuccess.user,
        loggingIn: false,
        loggedIn: true,
        error: false,
        errorResponse: undefined,
      };
    case LOGIN_FAILED:
      const loginFailed = action as LoginFailed;
      return {
        ...state,
        error: true,
        errorResponse: loginFailed.error,
        loggingIn: false,
        loggedIn: false,
      };
    case VERIFY_SESSION:
      return {
        ...state,
        error: false,
        errorResponse: undefined,
        verifying: true,
      };
    case SESSION_VERIFIED:
      return {
        ...state,
        error: false,
        errorResponse: '',
        verifying: false,
      };
    default:
      return state;
  }
}
