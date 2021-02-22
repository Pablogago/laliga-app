import { getUser } from '../utils/api';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const GET_AUTHED_USER = 'GET_AUTHED_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function setAuthedUser(user) {
  return {
    type: SET_AUTHED_USER,
    user
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  }
}

function getAuthedUser(user) {
  return {
    type: GET_AUTHED_USER,
    user
  }
}

export function handleGetAuthedUser(user) {
  return (dispatch) => {
    return getUser(user).then((user) => dispatch(getAuthedUser(user)));
  }
}