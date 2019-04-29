// Types
const USER = 'teste/USER'

// Reducers
export default function testeReducer (state = 0, action) {
  switch (action.type) {
    case USER:
      return action.payload
    default:
      return state
  }
}

// Actions
export function loadUsers () {
  return {
    type: USER,
    payload: { user: 'JO' }
  }
}
