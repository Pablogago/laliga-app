import { RECEIVE_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS : 
      return {
        ...state,
        ...action.users
      }
    case ADD_USER :
      return {
        ...state,
        data: [...state.data, action.user]
      }
    case UPDATE_USER :
      const userIdx = state.data.findIndex(u => u.id === action.user.id);
      return {
        ...state,
        data: state.data.map((item, index) => {
          return index === userIdx ? action.user : item;
        })
      }
    case DELETE_USER :
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.user)
      }
    default :
      return state
  }
}