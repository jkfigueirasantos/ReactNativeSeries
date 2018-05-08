import { StackNavigator } from 'react-navigation'

import LoginPage from './src/pages/LoginPage'

export default StackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
      title: 'Bem vindo(a)!'
    }
  }
}, {
  navigationOptions: {
    title: "Series",
    headerStyle: {
      backgroundColor: '#263238',
      borderBottomColor: '#ff7043',
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 20,
    },
    headerTintTitle: {
      color: '#FFF'
    }
  }
})