import { AsyncStorage } from 'react-native'

export function parseSessionDataFromResponse(headers) {
  return _.pick(headers, 'access-token', 'client', 'uid', 'token-type', 'expiry')
}

export function getAuthHeaderKeys() {
  return ['access-token', 'client', 'uid', 'token-type', 'expiry']
}

export function parseSessionDataFromCache(cache) {
  return _.fromPairs(cache)
}

export function saveSessionToStorage(sessionData) {
  AsyncStorage.multiSet(_.toPairs(sessionData))
}
