import { SET_AUTHED_USER, GET_AUTHED_USER, LOGOUT_USER } from '../actions/authedUser';

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER :
      return {
        ...state,
        ...action.user
      }
    case GET_AUTHED_USER :
      return {
        ...state,
        data: action.user
      }
    case LOGOUT_USER :
      return null
    default : 
      return state
  }
}