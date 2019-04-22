import Teste from 'components/Teste'
import Home from 'components/Home'
import Login from 'components/Login'

const routes = [
  { path: '/', exact: true, component: Home },
  { path: '/teste', exact: true, component: Teste, private: true },
  { path: '/login', exact: true, component: Login }
]

export default routes
