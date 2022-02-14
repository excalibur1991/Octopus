/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text, Image, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {styles} from '../styles/loading';
import {LoginProc} from '../functions/loading';
import {withTranslation} from 'react-i18next';
const logo = require('../assets/icon.png');
const oceanIcon = require('../assets/ocean_white.png');

const Loading = ({navigation, t}) => {
  const web3 = useSelector((state) => state.web3);
  useEffect(() => {
    LoginProc(web3).then(() =>
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      ),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="stretch" />
      <View style={styles.creatingWallet}>
        <Text style={styles.text}>{t('loading.poweredBy')}</Text>
      </View>
      <Image source={oceanIcon} style={styles.image} resizeMode="contain" />
    </View>
  );
};

export default withTranslation()(Loading);
