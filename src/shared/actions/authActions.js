import axios from 'axios'
import cookieWork from 'shared/utils/cookieWork'

export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user
  }
}

export const login = () => (dispatch) => {
  return axios.get('/api/login').then(res => {
    const token = res.data.token
    cookieWork.setCookie('token', token, 30)
    dispatch(setCurrentUser(res.data))
  })
}

export const logout = () => (dispatch) => {
  cookieWork.deleteCookie('token')
  dispatch(setCurrentUser({}))
}
