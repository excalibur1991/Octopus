//import '../../shim.js'
import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity,TouchableHighlight, ToastAndroid} from 'react-native'
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
  readStoredWallet,
} from '../functions/walletsettings';
import {withTranslation} from 'react-i18next';

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
      importedPriv_Key: '',
      importedPub_Key: '',
      accountType: 'main',
      importDialog: false,
      overWriteDialog: false,

    };

   
    this.web3 = null;
    this.mainnet = 'none';
    this.mainnetCheck = 'none';

  }

  componentDidMount() {
    chkNetwork(this);
    webThreeReturned(this);
    readStoredWallet(this)
    this.getImported();
  }

   importedKey = '@imported'

  getImported = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(this.importedKey)
      jsonValue != null ? JSON.parse(jsonValue) : null;

     // console.log('retrieving imported....\n', jsonValue)
      
      if(this.state.importedPriv_Key === "") {
        this.setState({importedPriv_Key: JSON.parse(jsonValue).key})
      } 

      if(this.state.importedPub_Key === "") {
        this.setState({importedPub_Key: JSON.parse(jsonValue).address})
      }
       

    } catch(e) {
      // error reading value
    }
}

 handleOverwriteWallet = async() => {
  console.log("overWriting account...")
  this.setState({ overWriteDialog: true });
 }

  handleImportAccount = () => {
    console.log("importing account...")
    this.setState({ importDialog: true });
  }

  handleImportCancel = () => {
    this.setState({ importDialog: false });
  }

  handleOverwriteCancel = () => {
    this.setState({ overWriteDialog: false });
  }

  handleOverwriteSubmit = async() => {
    this.setState({overWriteDialog: false})
    this.setState({publicKey: ""})
    //this.setState({privateKey: ""})
    //this.setState({mnemonics: ""})
    //this.setState({pword: ""})
    try {
      await AsyncStorage.removeItem('@save_Keys')
      
    } catch (e) {
      
    }
  }
  handleImportSubmit = () => {
    this.setState({ importDialog: false })

    try {
  
      const address = Utils.web3.eth.accounts.privateKeyToAccount(this.state.importedPriv_Key)
      this.setState({importedPub_Key:address.address})
      
      let storedObjs = {
           address: address.address,
           key: this.state.importedPriv_Key
      }

      AsyncStorage.setItem(this.importedKey, JSON.stringify(storedObjs));  
      console.log({pkey:this.state.importedPriv_Key, address: address.address, accountType: this.state.accountType,
      storedObjs:storedObjs})
    } catch (error) {
      
    }

  }

  hand
  render() {
    const {t} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={true}>
          <Picker
            selectedValue={this.state.accountType}
            onValueChange={(itemValue, itemIndex) =>
            this.setState({accountType: itemValue })
          }>
          <Picker.Item label="Main Account" value="main" />
          <Picker.Item label="Imported Account" value="imported" />
        </Picker>
      <View style={styles.container}>
        {
         (this.state.accountType == "main" && this.state.accountType !== '' && this.state.publicKey !== '' ) ? (
          <View>
          <Text style={styles.bigTextView}>
             {t('walletSettings.publicKey')}
           </Text>
           <View style={styles.parent}>
            <Text numberOfLines={1} style={styles.boxText}>
               {this.state.publicKey}
            </Text>
             <CButton text={this.state.publicKey}/>
           </View> 
           <Text style={styles.bigTextView}>
               {t('walletSettings.mnemonicPhrase')}
             </Text>
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
             <Text style={styles.bigTextView}>
               {t('walletSettings.privateKey')}
             </Text>
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
             <Text style={styles.bigTextView}>
               {t('walletSettings.password')}
             </Text>
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
         ):
         <View>
           <Text style={styles.bigTextView}>
             {t('walletSettings.publicKey')}
           </Text>
           <View style={styles.parent}>
            <Text numberOfLines={1} style={styles.boxText}>
               {this.state.importedPub_Key}
            </Text>
             <CButton text={this.state.importedPub_Key}/>
           </View>
           <Text style={styles.bigTextView}>
               {t('walletSettings.privateKey')}
             </Text>
             <View style={styles.parent}>
             <TextInput
                numberOfLines={1} 
                style={styles.boxText}
                value={this.state.importedPriv_Key}
                editable={false}         
                secureTextEntry={this.state.importedPriv_Key? true:false}   
               />
               <CButton text={this.state.importedPriv_Key}/>
             </View>
             <Button
               color="#f2f2f2"
               title="Import Account"
               buttonStyle={styles.button}
               onPress={this.handleImportAccount}
               textStyle={styles.buttonText}
            />
             <Button
               color="#f2f2f2"
               title="Overwrite Wallet"
               buttonStyle={styles.button}
               onPress={this.handleOverwriteWallet}
               textStyle={styles.buttonText}
            />
            <Dialog.Container visible={this.state.importDialog}>
              <Dialog.Title>Enter Private Key to Import Wallet</Dialog.Title>
              <Dialog.Description>
                Pls. remember to safely store your current wallet details!
              </Dialog.Description>
              <Dialog.Input
                wrapperStyle={styles.wrapperStyle}
                onChangeText={(text) => this.setState({importedPriv_Key:text})}
              />
              <Dialog.Button label="Submit" onPress={this.handleImportSubmit} />
              <Dialog.Button label="Cancel" onPress={this.handleImportCancel} />
          </Dialog.Container>
          <Dialog.Container visible={this.state.overWriteDialog}>
              <Dialog.Title>Delete Main Wallet?</Dialog.Title>
              <Dialog.Description>
                Pls. write down your Main Wallet details, as it will be erased!
              </Dialog.Description>
  
              <Dialog.Button label="Delete" onPress={this.handleOverwriteSubmit} />
              <Dialog.Button label="Cancel" onPress={this.handleOverwriteCancel} />
          </Dialog.Container>
         </View>  
           
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
