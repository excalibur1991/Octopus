import React, {useEffect} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useStateValue} from '../services/State/State';
import {reducer, actions} from '../services/State/Reducer';
import { useSelector, useDispatch } from 'react-redux';

import {LoginProc} from '../functions/loading'
import {styles} from '../styles/loading'


const Loading = ({navigation}) => {
  const web3 = useSelector(state=>state.web3);
  const [{authInfo}, dispatch] = useStateValue();
  
  useEffect(() => {
    LoginProc(
      web3
    );

    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="stretch"
        source={require('../assets/icon.png')}
      />
      <View style={styles.creatingWallet}>
        <Text
          style={styles.text}>
          Creating wallet...
        </Text>
      </View>
      <Text
        style={styles.text}>
        free. quickly. automatically.
      </Text>
    </View>
  );
};

export default Loading;
