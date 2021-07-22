/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import './global'
import './shim'
import React, {Component} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/WalletHome'
import WalletSettings from './src/screens/WalletSettings'
import FormLiquidity from './src/screens/FormLiquidity'
import FormSwap from './src/screens/FormSwap'



const Stack = createStackNavigator()



export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <Stack.Navigator>
        <Stack.Screen name="WalletHome" component={Home} options={{ title: 'Wallet Settings' }} />
        <Stack.Screen name="Add Liquidity" component={FormLiquidity} navigation={this.props.navigation} />
        <Stack.Screen name="Swap" component={FormSwap} navigation={this.props.navigation} /> 
        <Stack.Screen name="Wallet" component={WalletSettings} navigation={this.props.navigation} />
      </Stack.Navigator>
)
  }
}
