import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import routes from 'shared/routes'

class LoadRoutes extends PureComponent {
  render () {
    function isPrivate (route, index) {
      if (route.hasOwnProperty('private')) {
        return <PrivateRoute key={index} {...route} />
      }
      return <Route key={index} {...route} />
    }

    return (
      <>
        <Switch>
          {routes.map((route, index) => isPrivate(route, index))}
        </Switch>
      </>
    )
  }
}

export default LoadRoutes
