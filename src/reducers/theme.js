import { SET_THEME } from '../actions/theme';

export default function theme(state = {}, action) {
  switch (action.type) {
    case SET_THEME :
      return {
        ...action.theme
      }
    default : 
      return state
  }
}