import User from 'src/app/models/User';
import {
  CHANGE_THEME_SUCCESS,
  CHANGE_THEME,
  CHANGE_THEME_FAILED,
  ChangeTheme,
  RESET_REQ_STATE,
  SIDEBAR_EXPANDED,
} from '../actions/user-preferences.actions';

const themes: string[] = [
  'darkMode mat-app-background root',
  'mat-pap-background root',
];

export interface PreferencesState {
  theme: string;
  index: number;
  sidebarExpanded: boolean;
}

const defaultState: PreferencesState = {
  index: 0,
  theme: themes[0],
  sidebarExpanded: false,
};
export function preferencesReducer(
  state: PreferencesState = defaultState,
  action: any
): PreferencesState {
  switch (action.type) {
    case CHANGE_THEME:
      const new_index = ++state.index % themes.length;
      return {
        ...state,
        index: new_index,
        theme: themes[new_index],
      };
    case SIDEBAR_EXPANDED:
      return {
        ...state,
        sidebarExpanded: !state.sidebarExpanded,
      };
    default:
      return state;
  }
}
