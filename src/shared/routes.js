import loadable from '@loadable/component'

import loadDatas from 'shared/loadDatas'

const Home = loadable(() => import('components/Home'))
const Login = loadable(() => import('components/Login'))
const Teste = loadable(() => import('components/Teste'))

const routes = [
  { path: '/', exact: true, component: Home },
  { path: '/teste', exact: true, component: Teste, private: true, loadData: loadDatas.loadUsers },
  { path: '/login', exact: true, component: Login }
]

export default routes
