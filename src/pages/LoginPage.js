import React, { Component } from 'react';
import {
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native'

import FormRow from '../components/FormRow'

export default class LoginPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Faça seu Login</Text>
        <FormRow>
          <TextInput 
            style={styles.input}
            placeholder="seuemail@email.com" />
        </FormRow>
        <FormRow>
          <TextInput 
            style={styles.input}
            placeholder="*********"
            secureTextEntry />
        </FormRow>
        <FormRow>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {}}
            >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </FormRow>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 16,
    alignSelf: 'center',
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    borderRadius: 4,
    fontSize: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: '#ff7043',
    borderRadius: 4,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  }
})