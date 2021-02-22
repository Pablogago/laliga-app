export const SET_THEME = 'SET_THEME';
/* export const GET_AUTHED_USER = 'GET_AUTHED_USER';
export const LOGOUT_USER = 'LOGOUT_USER'; */

export function setTheme(theme) {
  return {
    type: SET_THEME,
    theme,
  }
}

/* function getAuthedUser(user) {
  return {
    type: GET_AUTHED_USER,
    user
  }
} */
