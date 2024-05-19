// ==============================|| THEME CONSTANT ||============================== //
export const APP_DEFAULT_PATH = '/';
export const DRAWER_WIDTH = 260;
export const MINI_DRAWER_WIDTH = 60;

export let ThemeMode;

(function (ThemeMode) {
  ThemeMode['LIGHT'] = 'light';
  ThemeMode['DARK'] = 'dark';
})(ThemeMode || (ThemeMode = {}));

export let NavActionType;

(function (NavActionType) {
  NavActionType['FUNCTION'] = 'function';
  NavActionType['LINK'] = 'link';
})(NavActionType || (NavActionType = {}));

// ==============================|| THEME CONFIG ||============================== //

const config = {
  fontFamily: `'Inter', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: ThemeMode.DARK,
  presetColor: 'default',
};

export default config;
