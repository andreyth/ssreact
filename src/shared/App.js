import React from 'react'
import { Route } from 'react-router-dom'
import loadable from '@loadable/component'

const Home = loadable(() => import('components/Home'))
const Login = loadable(() => import('components/Login'))

const App = () => (
  <div>

    <Route exact path='/' component={Home} />
    <Route path='/login' component={Login} />

  </div>
)

export default App
