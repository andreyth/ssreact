import { loadUsers } from 'shared/actions/testeAction'

const loadDatas = {
  loadUsers: (store) => store.dispatch(loadUsers())
}

export default loadDatas
