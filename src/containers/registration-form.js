import React, { Component } from 'react';
import { connect }          from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Button from '../components/button'
import InputField from '../components/input-field'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import DismissKeyboard from 'dismissKeyboard'
import Icon from 'react-native-vector-icons/FontAwesome';
import { register }        from '../sessions/session-actions'


class RegistrationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { DismissKeyboard()} }>
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>Header</Text>
            </View>
            <InputField
              onChangeText={(text) => this.setState({email: text})}
              placeholder='username'
              keyboardType='email-address' />
            <InputField
              onChangeText={(text) => this.setState({password: text})}
              placeholder='password'
              password />
            <InputField
              onChangeText={(text) => this.setState({passwordConfirmation: text})}
              placeholder='password'
              password />
          </View>
          <View>
            <Button handlePress={() => this.props.dispatch(register(this.state))} text='Sign Up' />
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

export default connect()(RegistrationForm)
