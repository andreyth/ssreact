import React from 'react'
import ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom'

import LoadRoutes from 'components/route/LoadRoutes'

let exec = ReactDOM.render

if (process.env.NODE_ENV !== 'production') {
  exec = ReactDOM.hydrate
}

loadableReady(() => {
  exec(
    <BrowserRouter>
      <LoadRoutes />
    </BrowserRouter>,
    document.getElementById('root')
  )
})
