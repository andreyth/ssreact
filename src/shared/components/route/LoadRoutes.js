import React from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'

import PrivateRoute from 'components/route/PrivateRoute'

const Home = loadable(() => import('components/Home'))
const Login = loadable(() => import('components/Login'))
const Teste = loadable(() => import('components/Teste'))

const LoadRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <PrivateRoute exact path='/teste' component={Teste} />
    </Switch>
  )
}

export default LoadRoutes
