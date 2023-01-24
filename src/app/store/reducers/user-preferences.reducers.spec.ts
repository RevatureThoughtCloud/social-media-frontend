import {
    CHANGE_THEME,
    SIDEBAR_EXPANDED,
} from '../actions/user-preferences.actions';
import { preferencesReducer } from './user-preferences.reducers';

describe('preferencesReducer', () => {
    let initialState: any;

    beforeEach(() => {
        initialState = {
            index: 0,
            theme: 'darkMode mat-app-background root',
            sidebarExpanded: false,
        };
    });

    it('should handle CHANGE_THEME action', () => {
        const changeTheme = { type: CHANGE_THEME };
        let newState = preferencesReducer(initialState, changeTheme);
        expect(newState).toEqual({
            ...initialState,
            index: 1,
            theme: 'mat-pap-background',
        });

        newState = preferencesReducer(newState, changeTheme);
        expect(newState).toEqual({
            ...initialState,
            index: 0,
            theme: 'darkMode mat-app-background',
        });
    });

    it('should handle SIDEBAR_EXPANDED action', () => {
        const sidebarExpanded = { type: SIDEBAR_EXPANDED };
        let newState = preferencesReducer(initialState, sidebarExpanded);
        expect(newState).toEqual({
            ...initialState,
            sidebarExpanded: true,
        });

        newState = preferencesReducer(newState, sidebarExpanded);
        expect(newState).toEqual({
            ...initialState,
            sidebarExpanded: false,
        });
    });

    it('should return the default state for any unknown action', () => {
        const unknownAction = { type: 'UNKNOWN' };
        const newState = preferencesReducer(initialState, unknownAction);
        expect(newState).toEqual(initialState);
    });
});
