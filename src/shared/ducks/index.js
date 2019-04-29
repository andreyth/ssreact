import { combineReducers } from 'redux'

import teste from 'shared/ducks/teste'
import auth from 'shared/ducks/auth'

export default combineReducers({
  teste,
  auth
})
