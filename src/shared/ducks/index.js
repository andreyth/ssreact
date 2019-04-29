import { combineReducers } from 'redux'

import { testeReducer } from 'shared/ducks/teste'
import { authReducer } from 'shared/ducks/auth'

export default combineReducers({
  teste: testeReducer,
  auth: authReducer
})
