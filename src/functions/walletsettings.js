import * as Utils from '../web3/utils';
import lightwallet from 'eth-lightwallet';
import bip39 from 'react-native-bip39';
import {hdPathString, localStorageKey} from '../web3/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rinkebyConnect} from '../web3/getWeb3';
import {ropstenConnect} from '../web3/getWeb3';
import {Alert} from 'react-native';
import {kovanConnect} from '../web3/getWeb3';
import {mainConnect} from '../web3/getWeb3';
import {rinkeby} from '../web3/constants';
import {ropsten} from '../web3/constants';
import {web3} from '../web3/getWeb3';
import Web3 from 'web3';
import minABI from '../abis/minABI.json';
import DaiToken from '../abis/DaiToken.json';
import erc20 from '../abis/erc20.json';
import i18n from '../languages/i18n';
import { contextType } from 'react-native/Libraries/Image/ImageBackground';

const STORAGE_KEY = '@save_Keys'
const STORAGE_KEY2 = '@save_Pwd'
const STORAGE_KEY3 = '@save_Phrase'



export const chkNetwork = async (context) => {
    try {
      //this.setState({networktype: await rinkebyConnect().eth.net.getNetworkType()})
      //this.setState({networktype: await kovanConnect().eth.net.getNetworkType()})
      //this.setState({networktype: await ropstenConnect().eth.net.getNetworkType()})
      context.setState({networktype: await mainConnect().eth.net.getNetworkType()})
     // this.rinkebynet =  await rinkebyConnect().eth.net.getNetworkType()
    //  this.kovannet = await kovanConnect().eth.net.getNetworkType()
    //  this.ropstennet = await ropstenConnect().eth.net.getNetworkType()
    //  this.mainnnet = await mainConnect().eth.net.getNetworkType()
      //this.rinkebyCheck = await rinkebyConnect().eth.net.isListening()
      //this.ropstenCheck =  await ropstenConnect().eth.net.isListening()
      //this.kovannetCheck = await kovanConnect().eth.net.isListening()
      context.mainnetCheck = await mainConnect().eth.net.isListening()

    } catch (error) {
    }

 if (context.rinkebyCheck == true || context.ropstenCheck == true || context.kovannetCheck == true || context.mainnetCheck == true ) {
  context.setState({ isConnected: true, })
 }
 //rinkebynet = await rinkebyConnect().eth.net.getNetworkType()
 //this.setState({ rinkebynet: await rinkebyConnect().eth.net.getNetworkType()})
}


export const webThreeReturned = async (context) => {
  if (context.props.web3 != null) {
    context.web3 = context.props.web3.web3Instance;
    // console.log("web3 result:", context.web3)
    Utils.checkNetwork(context.web3).then((res) => {
      console.log('Network:', res);
      // context.networktype = res
      context.setState({networktype: res});
      if (
        res == 'local' ||
        res == 'rinkeby' ||
        res == 'kovan' ||
        res == 'ropsten' ||
        res == 'main'
      ) {
        context.setState({isConnected: true});
      }
    });
    try {
      Utils.checkAccount(context.web3, context.props.STPupdateAccounts);
    } catch (err) {
    }
  }
};

export const createNewAccts = async(context) => {
  let allWallets = []
  const entropy = await Utils.getRandom(16);
  try {
    allWallets = await (web3(contextType.state.networktype)).eth.accounts.wallet.create(1, entropy) 
  } catch (error) {
  }
  return allWallets[0].address
  ? allWallets[0].address
  : allWallets[0].privateKey
  ? allWallets[0].privateKey
  : ''
}

export const handleWalletDelete = async(context) => {
  context.setState({pword: ""});
  context.setState({mnemonics: ""});
  context.setState({publicKey: ""});
  context.setState({privateKey: ""});
  context.setState({ethTokenBal: ""})
  context.setState({oceanERC20TokenBal: ""})
  context.setState({phec0ERC20TokenBal: ""})

  sKeys = {
    password: "",
    seedPhrase: "",
    publicKey: "",
    privateKey: "",
    ethBal: context.state.ethTokenBal,
    oceanBal: context.state.oceanERC20TokenBal,
    phecorBal: context.state.phec0ERC20TokenBal
  }
  context.storeKeys = sKeys;

  context.saveWallet();
}


export const saveWallet = async (context) => {
  
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(context.storeKeys))
   // await AsyncStorage.multiSet(multiSet)

    await AsyncStorage.setItem(
      context.STORAGE_KEY,
      JSON.stringify(context.storeKeys),
    );
    // await AsyncStorage.multiSet(multiSet)
    Alert.alert(
      i18n.t('messages.alert'),
      i18n.t('messages.dataSuccessfullySaved'),
    );
  } catch (e) {
    Alert.alert(i18n.t('messages.alert'), i18n.t('messages.failedToSaveData'));
  }
}

export const readStoredWallet = async (context) => {
  try {
    const userInfo = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))
    //AsyncStorage.getItem('name').then((value) => context.setState({ 'name': value }))

    if (userInfo !== null) {
      //setAge(userAge)
      context.setState({wallet:userInfo})
      context.setState({publicKey: userInfo.publicKey})
      context.setState({privateKey: userInfo.privateKey})
      context.setState({mnemonics: userInfo.seedPhrase})
      context.setState({pword:userInfo.password})
      context.setState({oceanERC20TokenBal: userInfo.oceanBal})
      context.setState({ethTokenBal: userInfo.ethBal})
      context.setState({phec0ERC20TokenBal: userInfo.phecorBal})

    }
  } catch (e) {
    Alert.alert(i18n.t('messages.alert'), i18n.t('messages.failedToFetchData'));
  }
}

export const clearStorage = async (context) => {
  try {
    await AsyncStorage.clear();
    Alert.alert(
      i18n.t('messages.alert'),
      i18n.t('messages.storageSuccessfullyCleared'),
    );
  } catch (e) {
    Alert.alert(
      i18n.t('messages.alert'),
      i18n.t('messages.failedToClearAsyncStorage'),
    );
  }
}


export const onChangeText = (context, userAge) => {
  //setAge(userAge)
  context.setState({age:userAge})
}

export const onSubmitEditing = (context) => {
if (!context.state.age) return

  context.saveData(age)
  // setAge('')
    context.setState({age:" "})
}
