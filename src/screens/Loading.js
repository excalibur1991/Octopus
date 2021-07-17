import React, {useEffect} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import '../../global';
import '../../shim';
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
        resizeMode="stretch"
        source={require('../assets/icon.png')}
      />
      <View style={styles.creatingWallet}>
        <Text style={styles.text}>{t('loading.poweredBy')}</Text>
        <Text
          style={styles.text}>
          {t('loading.creatingWallet')}
        </Text>
      </View>
      <Text
        style={styles.text}>
        free. quickly. automatically.
      </Text>
    </View>
  );
};

export default withTranslation()(Loading);
