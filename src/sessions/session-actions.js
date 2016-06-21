import { AsyncStorage }        from 'react-native'
import {Actions}               from 'react-native-router-flux'
import * as SessionFns         from './session-functions'
import xhr                     from '../utils/xhr'
import _                       from 'lodash'

export const VALIDATE_TOKEN_SUCCESS = 'VALIDATE_TOKEN_SUCCESS'
export const CURRENT_USER_LOADED    = 'CURRENT_USER_LOADED'
export const LOGOUT                 = 'LOGOUT'
export const LOGOUT_SUCCESS         = 'LOGOUT_SUCCESS'

export function validateTokenSuccess(sessionData) {
  return {
    type        : VALIDATE_TOKEN_SUCCESS,
    sessionData : sessionData
  }
}

//TODO finish login logic
export function register({email, password, passwordConfirmation}) {
  return (dispatch) => {
    return xhr.post('/auth', {
      email,
      password,
      password_confirmation: passwordConfirmation
    }).then((res) => {
      const sessionData = SessionFns.parseSessionDataFromResponse(res.headers)
      dispatch(validateToken(sessionData))
    }).catch(err => console.log({err}))
  }
}
export function logout() {
  return (dispatch, getState) => {
    const sessionData = getState().session.data
    return xhr.delete('/auth/sign_out')
      .then((res) => {
        AsyncStorage.multiRemove(SessionFns.getAuthHeaderKeys())
          .then(() => dispatch(logoutSuccess()))
          .then(() => {
            Actions.welcome()
          })
      })
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function currentUserLoaded(user) {
  return {
    type: CURRENT_USER_LOADED,
    user
  }
}

export function loadCache() {
  return dispatch => {
    return AsyncStorage.multiGet(['access-token', 'client', 'expiry', 'token-type', 'uid']).then((res) => {
      const sessionData = SessionFns.parseSessionDataFromCache(res)
      dispatch(validateToken(sessionData))
    }).catch(err => Actions.welcome())
  }
}

export function saveToken(url) {
  return dispatch => {
    const sessionData = SessionFns.parseOauthResponse(url)
    SessionFns.saveSessionToStorage(sessionData)
    return dispatch(validateToken(sessionData))
  }
}

export function validateToken(sessionData) {
  return dispatch => {
    return xhr.get('/auth/validate_token', { params: sessionData })
    .then((res) => {
      const user = res.data.data
      dispatch(validateTokenSuccess(sessionData))
      dispatch(currentUserLoaded(user))
    }).then(() => Actions.authenticated())
    .catch((err) => {
      Actions.welcome()
    })
  }
}
