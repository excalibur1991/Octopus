import '../../global';
import '../../shim';
import {userLogin, userRegister, getNounce} from '../services/API/APIManager';
import { setAuthToken, getAuthToken, getWalletData, setWalletData } from '../services/DataManager';
import * as Utils from '../web3/utils';
import bip39 from 'react-native-bip39';
//import HDWalletProvider from '@truffle/hdwallet-provider';
import {ethers} from 'ethers';

export const LoginProc = async (web3) => {
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



