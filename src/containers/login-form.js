import React, { Component } from 'react';
import Button from '../components/button'
import InputField from '../components/input-field'
import { Actions } from 'react-native-router-flux'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import DismissKeyboard from 'dismissKeyboard'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginForm extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { DismissKeyboard()} }>
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>Header</Text>
            </View>
            <InputField
              placeholder='username'
              keyboardType='email-address' />
            <InputField
              placeholder='password'
              onBlur={() => console.log('blur')}
              password />
          </View>
          <View>
            <Button handlePress={() => Actions.tabbar()} text='Log In' />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 80,
  },
  headerText: {
    fontSize: 50,
    color: '#29C1D8'
  },
  bullhorn: {
    color: '#FC5277',
    fontSize: 120
  }
})
