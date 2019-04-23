import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isAuth = true

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      isAuth === true ? <Component {...props} /> : <Redirect to='/login' />
    )} />
  )
}

export default PrivateRoute
