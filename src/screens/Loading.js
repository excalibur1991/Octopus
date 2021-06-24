/* eslint-disable react-hooks/exhaustive-deps */ import React, {
  useEffect,
} from 'react';
import {Text, Image, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import '../../global';
import '../../shim';
import {styles} from '../styles/loading';
import {LoginProc} from '../functions/loading';
const Loading = ({navigation}) => {
  const web3 = useSelector((state) => state.web3);
  useEffect(() => {
    LoginProc(web3);
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({index: 0, routes: [{name: 'Home'}]}),
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
        <Text style={styles.text}>Powered by:</Text>
      </View>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../assets/ocean.png')}
      />
    </View>
  );
};
export default Loading;
