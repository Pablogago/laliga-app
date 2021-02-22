import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import theme from './theme'

export default combineReducers({
  authedUser,
  users,
  theme
});