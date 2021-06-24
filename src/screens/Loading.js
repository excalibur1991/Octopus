import React, {useEffect} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';
import {CommonActions} from '@react-navigation/native';
import {useStateValue} from '../services/State/State';
import {reducer, actions} from '../services/State/Reducer';
import { useSelector, useDispatch } from 'react-redux';
import '../../global';
import '../../shim';
import { setAuthToken, getAuthToken, getWalletData, setWalletData } from '../services/DataManager';
import * as Utils from '../web3/utils';
import bip39 from 'react-native-bip39';
//import HDWalletProvider from '@truffle/hdwallet-provider';
import {ethers} from 'ethers';

import {
  userLogin,
  userRegister,
  getNounce

} from '../services/API/APIManager';


const Loading = ({navigation}) => {
  const web3 = useSelector(state=>state.web3);
  const [{authInfo}, dispatch] = useStateValue();

  

  const LoginProc = async () => {
    try {
      //register to check account
      var nounce = "";
      var signature = "";
      var access_token = "";
      var refresh_token = "";
      //check wallet
      let walletInfo = await getWalletData();
      let Web3 = web3.web3Instance
      var publicKey = ""
      var privateKey = ""
      var seedPhrase = ""

      if(walletInfo == null || walletInfo.publicKey == "") {
        //create new wallet

        const wallet = ethers.Wallet.createRandom();
        const privateKey = wallet.privateKey;
        const publicKey = wallet.address;
        const seedPhrase = wallet.mnemonic.phrase;

        let arr = new Uint8Array(20);
        crypto.getRandomValues(arr);
  
        let password = btoa(String.fromCharCode(...arr)).split('').filter(value => {
            return !['+', '/' ,'='].includes(value);
          }).slice(0,10).join('');

        await setWalletData({
          privateKey: privateKey, 
          publicKey:publicKey,
          seedPhrase: seedPhrase,
          password: password
        });
      }else
      {
        privateKey = walletInfo.privateKey;
        publicKey = walletInfo.publicKey;
      }
      let registerResponse = await userRegister(publicKey);
      if (registerResponse && registerResponse.status == "success"){
        //first time register
        nounce = registerResponse.nonce;
      }else {
        //already registered
        let nonceResponse = await getNounce(publicKey);
        nounce = nonceResponse.nonce; 
      }

      let sign = Web3.eth.accounts.sign(Web3.utils.utf8ToHex(nounce.toString()), privateKey)
      if(sign && sign.signature) {
        signature = sign.signature;

        let loginResponse = await userLogin(publicKey, signature);

        if (loginResponse && loginResponse.access_token && loginResponse.refresh_token) {
          if(loginResponse) {
            await setAuthToken({
              refresh_token: loginResponse.refresh_token,
              access_token: loginResponse.access_token
            });
          }
      
          return loginResponse;
        }
      }
    }catch(err) {
    }
    return null;
  }

  
  
  useEffect(() => {
    LoginProc();

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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={styles.image}
        resizeMode="stretch"
        source={require('../assets/icon.png')}
      />
      <View style={styles.creatingWallet}>
        <Text
          style={{
            color: theme.APP_COLOR,
            fontFamily: 'Inter-Regular',
            fontSize: 19,
            fontWeight: '600',
          }}>
          Creating wallet...
        </Text>
      </View>
      <Text
        style={{
          color: theme.COLORS.WHITE,
          fontFamily: 'Inter-Regular',
          fontSize: 18,
          fontWeight: '300',
        }}>
        free. quickly. automatically.
      </Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 110,
  },
  creatingWallet: {
    marginTop: 70,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#F3F0F3',
  },
});
