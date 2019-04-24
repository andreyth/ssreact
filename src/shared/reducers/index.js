import { combineReducers } from 'redux'

import teste from 'shared/reducers/testeReducer'
import auth from 'shared/reducers/authReducer'

export default combineReducers({
  teste,
  auth
})
