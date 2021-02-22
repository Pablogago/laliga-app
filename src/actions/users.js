import * as Api from '../utils/api';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}

function updateUser(user) {
  return {
    type: UPDATE_USER,
    user
  }
}

function deleteUser(user) {
  return {
    type: DELETE_USER,
    user
  }
}

function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function handleDeleteUser(user) {
  return (dispatch) => {
    return Api.deleteUser(user).then(user => dispatch(deleteUser(user)))
  }
}

export function handleUpdateUser(user) {
  return (dispatch) => {
    return Api.updateUser(user).then(user => dispatch(updateUser(user)))
  }
}

export function handleReceiveUsers(page) {
  return (dispatch) => {
    return Api.getUsers(page).then(users => dispatch(receiveUsers(users)));
  }
}

export function handleAddUser(user) {
  return (dispatch) => {
    return Api.saveUser(user).then((user) => dispatch(addUser(user)));
  }
}