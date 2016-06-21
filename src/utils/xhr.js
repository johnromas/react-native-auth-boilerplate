import axios from 'axios'
import * as SessionFns from '../sessions/session-functions'
import { connect } from 'react-redux'

var xhr = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {}
})

xhr.interceptors.response.use(function (response) {
  const sessionData = SessionFns.parseSessionDataFromResponse(response.headers)
  xhr.defaults.headers = sessionData
  SessionFns.saveSessionToStorage(sessionData)
  return response;
}, function (error) {
  return Promise.reject(error);
});


export default xhr
