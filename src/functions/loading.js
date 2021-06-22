import '../../global';
import '../../shim';
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
    if (walletInfo == null) {
      alert('Wallet not created!');
      return;
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

    //web3 initialization - currently redux weird implementation
    //let web3 = new Web3(new Web3.providers.HttpProvider(rinkeby))

    let Web3 = web3.web3Instance;
    let sign = Web3.eth.accounts.sign(
      Web3.utils.utf8ToHex(nounce.toString()),
      walletInfo.privateKey,
    );
    if (sign && sign.signature) {
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
