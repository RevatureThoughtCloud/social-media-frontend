import {
    ToggleSidebar,
    SIDEBAR_EXPANDED,
    ChangeTheme,
    CHANGE_THEME,
    ChangeThemeSuccess,
    CHANGE_THEME_SUCCESS,
    ChangeThemeFailed,
    CHANGE_THEME_FAILED,
    ResetState,
    RESET_REQ_STATE,
} from './user-preferences.actions';

describe('User Preference Actions', () => {
    let theme: string;

    describe('ToggleSidebar', () => {
        it('should create an action', () => {
            const action = new ToggleSidebar();
            expect(action.type).toEqual(SIDEBAR_EXPANDED);
        });
    });

    describe('ChangeTheme', () => {
        it('should create an action', () => {
            theme = 'dark';
            const action = new ChangeTheme(theme);
            expect(action.type).toEqual(CHANGE_THEME);
            expect(action.theme).toEqual(theme);
        });
    });

    describe('ChangeThemeSuccess', () => {
        it('should create an action', () => {
            const action = new ChangeThemeSuccess();
            expect(action.type).toEqual(CHANGE_THEME_SUCCESS);
        });
    });

    describe('ChangeThemeFailed', () => {
        it('should create an action', () => {
            const action = new ChangeThemeFailed();
            expect(action.type).toEqual(CHANGE_THEME_FAILED);
        });
    });

    describe('ResetState', () => {
        it('should create an action', () => {
            const action = new ResetState();
            expect(action.type).toEqual(RESET_REQ_STATE);
        });
    });
});
