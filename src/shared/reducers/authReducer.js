const initialState = {
  isAuthenticated: false,
  user: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { isAuthenticated: !!Object.keys(action.payload).length, user: action.payload }
    default:
      return state
  }
}

export default authReducer
