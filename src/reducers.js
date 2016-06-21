import { combineReducers } from 'redux'
import { session }         from './sessions/session-reducer'


const rootReducer = combineReducers({
  session
})

export default rootReducer
