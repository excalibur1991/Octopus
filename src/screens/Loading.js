import React, {useEffect} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {styles} from '../styles/loading';
import {LoginProc} from '../functions/loading';
import {withTranslation} from 'react-i18next';

const Loading = ({navigation, t}) => {
  const web3 = useSelector((state) => state.web3);
  useEffect(() => {
    LoginProc(
      web3
    ).then(()=>(
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      )
    ));
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../assets/VT.png')}
      />
      <View style={styles.creatingWallet}>
        <Text style={styles.text}>Powered by:</Text>
      </View>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../assets/icon.png')}
      />
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../assets/ocean.png')}
      />
    </View>
  );
};

export default withTranslation()(Loading);
