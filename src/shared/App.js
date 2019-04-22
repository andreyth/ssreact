import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import LoadRoutes from 'components/route/LoadRoutes'

const App = () => {
  return (
    <BrowserRouter>
      <LoadRoutes />
    </BrowserRouter>
  )
}

export default App
