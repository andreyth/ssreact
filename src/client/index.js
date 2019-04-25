import React from 'react'
import ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from 'shared/store'
import LoadRoutes from 'components/route/LoadRoutes'
import { setCurrentUser } from 'shared/actions/authActions'

// let store = clientStore(window.INITIAL_STATE)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <LoadRoutes />
    </BrowserRouter>
  </Provider>
)

if (__platform__ === 'client') { /* eslint-disable-line */
  if (window.localStorage.getItem('token')) {
    const tokenValue = window.localStorage.getItem('token')
    store.dispatch(setCurrentUser({ token: tokenValue }))
  }
  ReactDOM.render(
    app,
    document.getElementById('root')
  )
} else {
  loadableReady(() => {
    ReactDOM.hydrate(
      app,
      document.getElementById('root')
    )
  })
}
