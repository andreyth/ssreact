import { applyMiddleware, createStore } from 'redux'
import rootReducer from 'shared/reducers'
import reduxThunk from 'redux-thunk'

export default createStore(rootReducer, {}, applyMiddleware(reduxThunk))

export function clientStore (val = {}) {
  return createStore(rootReducer, val, applyMiddleware(reduxThunk))
}
