/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import './global';
import './shim';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/WalletHome';
import WalletSettings from './src/screens/WalletSettings';
import WalletActions from './src/screens/WalletActions';
import {withTranslation} from 'react-i18next';
import ExtConnections from './src/screens/ExtConnections';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {t} = this.props;
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="WalletHome"
          component={Home}
          options={{title: t('walletSettings.title')}}
        />
        <Stack.Screen
          name="My Wallet"
          component={WalletActions}
          navigation={this.props.navigation}
        />
        <Stack.Screen
          name="Wallet"
          component={WalletSettings}
          navigation={this.props.navigation}
        />
        <Stack.Screen
          name="ExtConnections"
          component={ExtConnections}
          navigation={this.props.navigation}
        />
      </Stack.Navigator>
    );
  }
}

export default withTranslation()(App);
