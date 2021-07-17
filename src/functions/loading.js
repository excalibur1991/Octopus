import '../../global';
import '../../shim';
import {Alert} from 'react-native';
import i18n from '../languages/i18n';
import {setAuthToken, getWalletData} from '../services/DataManager';
import {userLogin, userRegister, getNounce} from '../services/API/APIManager';

export const LoginProc = async (web3) => {
  try {
    //register to check account
    var nounce = '';
    var signature = '';
    var access_token = '';
    var refresh_token = '';
    //check wallet
    let walletInfo = await getWalletData();
//    if (walletInfo == null) {
      
//      Alert.alert(
//        i18n.t('messages.alert'),
//        i18n.t('messages.walletNotCreated'),
//      );
//      return;
//    }
    let Web3 = web3.web3Instance
    var publicKey = ""
    var privateKey = ""
    var seedPhrase = ""


    if(walletInfo == null || walletInfo.publicKey == "") {
      //create new wallet

      const wallet = ethers.Wallet.createRandom();
      privateKey = wallet.privateKey;
      publicKey = wallet.address;
      seedPhrase = wallet.mnemonic.phrase;

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
//=======
//      alert('Wallet not created!');
//      return;
//>>>>>>> origin/fix-staking2
    }

    let registerResponse = await userRegister(walletInfo.publicKey);
    if (registerResponse && registerResponse.status == 'success') {
      //first time register
      nounce = registerResponse.nonce;
    } else {
      //already registered
      let nonceResponse = await getNounce(walletInfo.publicKey);
      nounce = nonceResponse.nonce;
    }

    let sign = await Web3.eth.accounts.sign(Web3.utils.utf8ToHex(nounce.toString()), privateKey)
    if(sign && sign.signature) {
/*=======
    //web3 initialization - currently redux weird implementation
    //let web3 = new Web3(new Web3.providers.HttpProvider(rinkeby))

    let Web3 = web3.web3Instance;
    let sign = Web3.eth.accounts.sign(
      Web3.utils.utf8ToHex(nounce.toString()),
      walletInfo.privateKey,
    );
    if (sign && sign.signature) {
>>>>>>> origin/fix-staking2 */
      signature = sign.signature;

      let loginResponse = await userLogin(walletInfo.publicKey, signature);

      if (
        loginResponse &&
        loginResponse.access_token &&
        loginResponse.refresh_token
      ) {
        if (loginResponse) {
          await setAuthToken({
            refresh_token: loginResponse.refresh_token,
            access_token: loginResponse.access_token,
          });
        }
        return loginResponse;
      }
    }
  } catch (err) {
    console.log('err LoginProc', err);
  }
  return null;
};
