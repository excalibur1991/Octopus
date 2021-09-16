//import '../../shim.js'
import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, ActivityIndicator} from 'react-native'
import Clipboard from '@react-native-community/clipboard';
import {connect} from "react-redux"
import { STPupdateAccounts, STPupdateSeedPhrase } from '../actions/actions.js'
import * as Utils from '../web3/utils'
import Dialog from "react-native-dialog"
//import lightwallet from 'eth-lightwallet'
import bip39 from 'react-native-bip39'
import { hdPathString, localStorageKey } from '../web3/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button';
import {Picker} from '@react-native-picker/picker';
import CButton from '../components/CButton';
import {styles} from '../styles/walletsettings';
import {
  chkNetwork,
  webThreeReturned,
  handleNewWallet,
  readStoredWallet,
  handleNewAccount,
  handleWalletDelete
} from '../functions/walletsettings';
import {withTranslation} from 'react-i18next';
import {celoWeb3, kit} from '../../celoConfig'
import { getWalletData} from '../services/DataManager';
import { theme } from '../services/Common/theme';

class WalletSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      publicKey: '',
      privateKey: '',
      pword: '',
      mnemonics:'',
      wallet: ' ',
      account: '0x0',
      pword: '',
      accountType: 'main',
      importDialog: false,
      overWriteDialog: false,
      balance: "" ,
      celoPrivateKey: '',
      celoPublicKey: '',
      celoBalance: "",
      celoUSDBalance: "",
      ethTokenBal: ""
    };


    // const [age, setAge] = useState('')

    this.web3 = null;
    this.rinkebynet = 'none';
    this.ropstennet = 'none';
    this.kovannet = 'none';
    this.mainnet = 'none';
    this.rinkebyCheck = 'none';
    this.ropstenCheck = 'none';
    this.kovannetCheck = 'none';
    this.mainnetCheck = 'none';
    //this.wallet = ""
    
  }

  componentDidMount() {
    chkNetwork(this);
    webThreeReturned(this);
    readStoredWallet(this)
    this.fetchCELO()
  }


  fetchCELO = async () => {
    let celoBalance, celoUSDBalance

    let celoAddress =  await getWalletData().then(res =>(res.celoPublicKey))
    let ethAddress =  await getWalletData().then(res =>(res.publicKey))
    console.log({celoAddress: celoAddress, ethAddress:ethAddress})
 
    let goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()

    const ethBal =  await Utils.web3.eth.getBalance(ethAddress)
                    .then((bal) => Utils.web3.utils.fromWei(bal, 'ether'));

     celoBalance = await goldtoken.balanceOf(celoAddress)
     celoUSDBalance = await stabletoken.balanceOf(celoAddress)
     
     console.log({celoBalance:celoBalance, cUSDBalance:celoUSDBalance})

     this.setState({celoBalance: celoWeb3.utils.fromWei(celoBalance.toString())})
     this.setState({celoUSDBalance: celoWeb3.utils.fromWei(celoUSDBalance.toString())})
     this.setState({ethTokenBal: ethBal})

    //return celoBalance
  }


  render() {
    const {t} = this.props;
    return (
      <ScrollView  style={styles.container} showsVerticalScrollIndicator={true}>
          <Picker
            selectedValue={this.state.accountType}
            onValueChange={(itemValue, itemIndex) =>
            this.setState({accountType: itemValue })
          }>
          <Picker.Item label="Eth Account" value="main" />
          <Picker.Item label="Celo Account" value="celomain" />
        </Picker>
        <Text style={styles.bigTextView}> {t('walletSettings.info')}</Text>
        <View style={styles.container}>          
         <View>
             <Text style={{ fontFamily: 'Cochin', fontSize: 15, marginBottom: 10, fontWeight: 'bold' }}> Wallet Balances</Text>
           </View>

        {
          (this.state.accountType == "main" && this.state.accountType !== '' && this.state.publicKey !== '' )
          ? 
          ( 
          <View>
            <View>
                <Text style={styles.quickra}>{`${this.state.ethTokenBal} ETH`}</Text>
            </View>
             <Text style={styles.bigTextView}>{t('walletSettings.publicKey')}</Text>
              <View style={styles.parent}>
                <Text numberOfLines={1} style={styles.boxText}>
                  {this.state.publicKey}
                </Text>
                <CButton text={this.state.publicKey}/>
             </View> 
              <Text style={styles.bigTextView}>{t('walletSettings.warning')}</Text>
             <Text style={styles.bigTextView}>{t('walletSettings.mnemonicPhrase')}</Text>
             <View style={styles.parent}>
                <TextInput
                    numberOfLines={1} 
                    style={styles.boxText}
                    value={this.state.mnemonics}
                    editable={false}         
                    secureTextEntry={this.state.mnemonics? true:false}   
                  />
                <CButton text={this.state.mnemonics}/>
             </View>
             <Text style={styles.bigTextView}>{t('walletSettings.privateKey')}</Text>
             <View style={styles.parent}>
             <TextInput
                numberOfLines={1} 
                style={styles.boxText}
                value={this.state.privateKey}
                editable={false}         
                secureTextEntry={this.state.privateKey? true:false}   
               />
               <CButton text={this.state.privateKey}/>
             </View>
             <Text style={styles.bigTextView}>{t('walletSettings.password')}</Text>
             <View style={styles.parent}>
             <TextInput
                numberOfLines={1} 
                style={styles.boxText}
                value={this.state.pword}
                editable={false}          
                secureTextEntry={this.state.pword? true:false}        
               /> 
               <CButton text={this.state.pword}/>
             </View>
           </View> 
          )
          :
          ( 
          <View >
          <View style={styles.parent}>
           <View style={styles.rows}>
             <View style={styles.alignEnd}>
               <Text style={styles.quickra}>{`${this.state.celoBalance} CELO`}</Text>
             </View>
           </View>
       </View>
        <View style={styles.parent}>
          <Text style={styles.quickra}>{`${this.state.celoUSDBalance} cUSD`}</Text>
        </View>
            <Text style={styles.bigTextView}>{t('walletSettings.publicKey')}</Text>
            <View style={styles.parent}>
              <Text numberOfLines={1} style={styles.boxText}>
              {this.state.celoPublicKey}
              </Text>
              <CButton text={this.state.celoPublicKey}/>
            </View>
            <Text style={styles.bigTextView}>{t('walletSettings.warning')}</Text>
            <Text style={styles.bigTextView}>{t('walletSettings.privateKey')}</Text>
            <View style={styles.parent}>
              <Text numberOfLines={1} style={styles.boxText}>
              {this.state.celoPrivateKey}
              </Text>
              <CButton text={this.state.celoPrivateKey}/>
            </View>   
          </View>
          )
       }
        
      </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  web3: state.web3,
  account: state.reducers.account,
  seedPhrase: state.reducers.seedPhrase,
})

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    STPupdateAccounts: (account0) => dispatch(STPupdateAccounts(account0)),
    STPupdateSeedPhrase: (seedPhrase) => dispatch(STPupdateSeedPhrase(seedPhrase)),
  };
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(WalletSettings),
);
