import loadable from '@loadable/component'

import { loadUsers } from 'shared/ducks/teste'

const Home = loadable(() => import('components/Home'))
const Login = loadable(() => import('components/Login'))
const Teste = loadable(() => import('components/Teste'))
// const NotFound = loadable(() => import('components/NotFound'))

const routes = [
  { path: '/', exact: true, component: Home },
  { path: '/teste', exact: true, component: Teste, private: true, loadData: (store) => store.dispatch(loadUsers()) },
  { path: '/login', exact: true, component: Login }
  // { path: '/*', exact: true, component: NotFound }
]

export default routes
