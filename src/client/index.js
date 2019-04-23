import React from 'react'
import ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { clientStore } from 'shared/store'
import LoadRoutes from 'components/route/LoadRoutes'

let exec = ReactDOM.render

if (process.env.NODE_ENV !== 'production') {
  exec = ReactDOM.hydrate
}

let store = clientStore(window.INITIAL_STATE)

loadableReady(() => {
  exec(
    <Provider store={store}>
      <BrowserRouter>
        <LoadRoutes />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
})
