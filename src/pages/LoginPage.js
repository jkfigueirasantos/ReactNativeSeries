import React, { Component } from 'react';
import {
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import firebase from 'firebase';

import FormRow from '../components/FormRow';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      message: ''
    }
  }

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyBt7d2eL4kTM4U229Jsuezn0mrbt3N3DLs",
      authDomain: "appseriesudemy.firebaseapp.com",
      databaseURL: "https://appseriesudemy.firebaseio.com",
      projectId: "appseriesudemy",
      storageBucket: "appseriesudemy.appspot.com",
      messagingSenderId: "659908333510"
    };
    firebase.initializeApp(config);
  }

  onChangeHandler(field, value) {
    /* 
     * O "field" se refere ao valor, que deve ser do tipo texto, passado na função no componente de TextInput, que neste caso deve ser 
     * igual ao seu state. O value vai receber o valor digitado neste mesmo campo, fornecido pelo onChangeText.
     */
    this.setState({
      [field]: value 
    })
    /*
     * O "field" cercado pelos conchetes é a funcionalidade de Computed Properties do ES6, facilitando para que não tenha que fazer um 
     * processo mais longo e que é interpretado como "chave: valor" de um array de opções fornecidas para a função.
     * 
     * Podemos assim escrever uma pequena função para servir como envio das identificações e valores dos input sem necessidade de fazer 
     * um pequena função para cada campo presente no formulário, sendo reusavél.
     */
  }

  tryLogin(){
    this.setState({
      isLoading: true,
      message: ''
    })
    const { email, password } = this.state;

    const loginUserSuccess = user => {
      this.setState({ message: 'Logado com sucesso !'})
    }

    const loginUserFailed = error => {
      this.setState({ message: this.getMessageByErrorCode(error.code) })
    }
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then( loginUserSuccess )
      .catch( error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'Usuário não encontrado',
            'Deseja criar uma conta com essas informações?',
            [{
              text: 'Não',
              onPress: () => console.log('Usuário não fez cadastro')
            }, {
              text: 'Sim',
              onPress: () => {
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then( loginUserSuccess )
                  .catch(loginUserFailed)
              }
            }],
            {
              cancelable: false /* Funciona somente no Android, impede de fechar o modal clicando fora da caixa */
            } 
          )
        } else {
          loginUserFailed(error)
        }
      })
      .then( () => this.setState({ isLoading: false}))    
    
  }

  getMessageByErrorCode( errorCode ) {
    /* 
     * Trata a messagem de erro ao logar adaptando para o idioma 
     * e palavras personalizadas. As strings passadas na chave "case" 
     * são fornecidas pelo objeto error.code do firebase
     */
    switch (errorCode) {
      case 'auth/wrong-password':
        return 'Ops! Há algo de errado na sua senha. Você digitou certo? Tente novamente :)'
      case 'auth/user-not-found':
        return 'Ops! Não encontramos ninguém da nossa patota com este e-mail. Você digitou certo? Tente novamente :)'
      default:
        return 'Ah não! Houve um erro inesperado :( Verifique se os campos de email e senha estão preenchidos corretamente!'
    }
  }

  renderButton() {
    if (this.state.isLoading)
      return <ActivityIndicator />

    return (
      <TouchableOpacity style={styles.button} onPress={() => this.tryLogin() }>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    )
  }

  renderFeedback() {
    const { message } = this.state
    if (!message)
      return null;
    return (
      <View style={styles.feedbackLogin}>
        <Text style={styles.feedbackLoginText}>{message}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Faça seu Login</Text>
        <FormRow>
          <TextInput 
            style={styles.input}
            value={this.state.email}
            onChangeText={value => this.onChangeHandler('email', value)}
            placeholder="seuemail@email.com" />
        </FormRow>
        <FormRow>
          <TextInput 
            style={styles.input}
            value={this.state.password}
            onChangeText={value => this.onChangeHandler('password', value)}
            placeholder="*********"
            secureTextEntry />
        </FormRow>
        <FormRow>
          { this.renderButton() }
          { this.renderFeedback() }
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
  },
  feedbackLogin: {
    alignSelf: 'center',
    marginTop: 16,
  },
  feedbackLoginText: {
    textAlign: 'center',
    fontSize: 16,
  }
})