import { Action } from '@ngrx/store';

export const CHANGE_THEME = '[Preference] Changing theme';
export const CHANGE_THEME_SUCCESS = '[Preference] Changing theme success';
export const CHANGE_THEME_FAILED = '[Preference] Changing theme failed';
export const RESET_REQ_STATE = '[Preference] Resetting request state';
export const SIDEBAR_EXPANDED = '[Preference] Toggling sidebar';

export class ToggleSidebar implements Action {
  type = SIDEBAR_EXPANDED;
}

export class ChangeTheme implements Action {
  constructor(public theme: string) { }
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
