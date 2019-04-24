import { applyMiddleware, createStore } from 'redux'
import rootReducer from 'shared/reducers'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

let store

if (__isBrowser__) { /* eslint-disable-line */
  store = createStore(rootReducer, window.INITIAL_STATE, composeWithDevTools(applyMiddleware(reduxThunk)))
} else {
  store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(reduxThunk)))
}

export default store

// export default createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(reduxThunk)))

// export function clientStore (val = {}) {
//   return createStore(rootReducer, val, composeWithDevTools(applyMiddleware(reduxThunk)))
// }
