import axios from 'axios'
import cookieWork from 'shared/utils/cookieWork'

// Types
export const Types = {
  SET_CURRENT_USER: 'teste/SET_CURRENT_USER'
}

// Reducers
const initialState = {
  isAuthenticated: false,
  user: {}
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_CURRENT_USER:
      return { isAuthenticated: !!Object.keys(action.payload).length, user: action.payload }
    default:
      return state
  }
}

// Actions
export const setCurrentUser = (user) => {
  return {
    type: Types.SET_CURRENT_USER,
    payload: user
  }
}

export const login = () => (dispatch) => {
  return axios.get('/api/login').then(res => {
    const token = res.data.token
    cookieWork.setCookie('token', token, 30)
    // window.localStorage.setItem('token', token)
    dispatch(setCurrentUser(res.data))
  })
}

export const logout = () => (dispatch) => {
  cookieWork.deleteCookie('token')
  // window.localStorage.removeItem('token')
  dispatch(setCurrentUser({}))
}
