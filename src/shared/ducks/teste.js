// Types
const Types = {
  USER: 'teste/USER'
}

// Reducers
export const testeReducer = (state = 0, action) => {
  switch (action.type) {
    case Types.USER:
      return action.payload
    default:
      return state
  }
}

// Actions
export const loadUsers = () => {
  return {
    type: Types.USER,
    payload: { user: 'JO' }
  }
}
