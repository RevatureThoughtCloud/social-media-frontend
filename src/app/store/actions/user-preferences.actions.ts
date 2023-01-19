import { Action } from '@ngrx/store';
import User from 'src/app/models/User';

export const CHANGE_THEME = '[Preference] Changing theme';
export const CHANGE_THEME_SUCCESS = '[Preference] Changing theme success';
export const CHANGE_THEME_FAILED = '[Preference] Changing theme failed';
export const RESET_REQ_STATE = '[Preference] Resetting request state';

export class ChangeTheme implements Action {
  constructor(public theme: string) {}
  type = CHANGE_THEME;
}

export class ChangeThemeSuccess implements Action {
  type = CHANGE_THEME_SUCCESS;
}

export class ChangeThemeFailed implements Action {
  type = CHANGE_THEME_FAILED;
}

export class ResetState implements Action {
  type = RESET_REQ_STATE;
}
