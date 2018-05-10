import { StackNavigator } from 'react-navigation'

import LoginPage from './src/pages/LoginPage'
import SeriesPage from './src/pages/SeriesPage'

export default StackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
      title: 'Bem vindo(a)!'
    }
  },
  'Main': {
    screen: SeriesPage,
    title: 'Series'
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