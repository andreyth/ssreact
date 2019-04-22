import React from 'react'
import ReactDOM from 'react-dom'
import { loadComponents } from 'loadable-components'

import App from 'shared/App'

let exec = ReactDOM.render

if (process.env.NODE_ENV !== 'production') {
  exec = ReactDOM.hydrate
}

if (process.env.CLIENT) {
  loadComponents().then(() => {
    exec(
      <App />,
      document.getElementById('root')
    )
  })
} else {
  exec(
    <App />,
    document.getElementById('root')
  )
}
