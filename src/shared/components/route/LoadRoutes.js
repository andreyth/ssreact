import React from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import routes from 'shared/routes'

const LoadRoutes = () => {
  function isPrivate (route, index) {
    if (route.hasOwnProperty('private')) {
      return <PrivateRoute key={index} {...route} />
    }
    return <Route key={index} {...route} />
  }

  return (
    <>
      {routes.map((route, index) => isPrivate(route, index))}
    </>
  )
}

export default LoadRoutes
