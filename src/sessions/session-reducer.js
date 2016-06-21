import * as types from './session-actions'

const initialState = {
  isFetching:   false,
  errorMessage: null,
  isLoggedIn:   false,
  currentUser:  null
}

export function session(state = initialState, action) {
  switch (action.type) {
  case types.VALIDATE_TOKEN_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: null,
      isLoggedIn: true
    })
  case types.CURRENT_USER_LOADED:
    return Object.assign({}, state, {
      currentUser: action.user
    })
  case types.LOGOUT_SUCCESS:
    return initialState
  default:
    return state
  }
}
