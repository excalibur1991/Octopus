/* eslint-disable no-lone-blocks */
//import '../../shim.js'
import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {connect} from 'react-redux';
import {STPupdateAccounts, STPupdateSeedPhrase} from '../actions/actions.js';
import * as Utils from '../web3/utils';
import Dialog from 'react-native-dialog';
//import lightwallet from 'eth-lightwallet'
import bip39 from 'react-native-bip39';
import {hdPathString, localStorageKey} from '../web3/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  handleWalletDelete,
} from '../functions/walletsettings';
import {withTranslation} from 'react-i18next';
import {theme} from '../services/Common/theme.js';

const ReadOnlyBox = ({title, value, isFocused, setFocused}) => {
  const handleOnFocus = () => setFocused(title);

  return (
    <TouchableOpacity
      style={[styles.readOnlyBox, isFocused ? styles.readOnlyBoxShadow : {}]}
      onPressIn={handleOnFocus}>
      <View style={styles.titleCopyButton}>
        <Text style={styles.textBoxTitle}>{title}</Text>
        <CButton text={value} onCopied={handleOnFocus} />
      </View>
      <Text numberOfLines={2} style={styles.textBoxValue}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

class WalletSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      publicKey: '',
      privateKey: '',
      pword: '',
      mnemonics: '',
      newdialogVisible: false,
      restoredialogVisible: false,
      selectedLanguage: '',
      networktype: 'none',
      wallet: ' ',
      ethTokenBal: ' ',
      oceanERC20TokenBal: ' ',
      phec0ERC20TokenBal: ' ',
      account: '0x0',
      daiToken: '',
      dappToken: {},
      tokenFarm: {},
      daiTokenBalance: '0',
      dappTokenBalance: '0',
      stakingBalance: '0',
      age: '',
      focused: '',
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
    readStoredWallet(this);
  }

  render() {
    const {t} = this.props;

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* <View style={{display: 'none'}}>
          <Picker
            selectedValue={this.state.networktype}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({networktype: itemValue})
            }>
            <Picker.Item label={t('walletSettings.mainnet')} value="mainnet" />
          </Picker>
          <View style={styles.alignCenter}>
            <Text>
              {this.state.isConnected
                ? `${t('walletSettings.connectedTo')} ${
                    this.state.networktype
                  } ${t('walletSettings.node')}`
                : t('walletSettings.notConnected')}
            </Text>
          </View>
        </View>
        <View>
          <View style={[styles.rows, {display: 'none'}]}>
            <View>
              <Text />
              <Text style={styles.quickra}>0 {t('walletSettings.quicra')}</Text>
              <Text style={styles.ocean}>
                {this.state.ethTokenBal} {t('walletSettings.eth')}
              </Text>
              <Text style={styles.ocean}>
                {this.state.oceanERC20TokenBal} {t('walletSettings.ocean')}
              </Text>
              <Text style={styles.ocean}>
                {this.state.phec0ERC20TokenBal} {t('walletSettings.phecor')}
              </Text>
            </View>
            <View style={styles.alignEnd}>
              <Text style={styles.txtPortfolio}>
                24h {t('walletSettings.portfolio')}
              </Text>
              <Text style={styles.txtOceanDelta}> (+15.53%) </Text>
            </View>
          </View>
          <Text style={styles.bigTextView}>
            {t('walletSettings.info')}
          </Text>
          <Text />
          <View>
            <Text />
            <Text style={styles.quickra}>0 {t('walletSettings.quicra')}</Text>
            <Text style={styles.ocean}>
              {this.state.ethTokenBal} {t('walletSettings.eth')}
            </Text>
            <View style={styles.parent}>
              <Text numberOfLines={1} style={styles.boxText}>
                {this.state.publicKey}
              </Text>
              <CButton text={this.state.publicKey}/>
            </View>
            <Text style={styles.bigTextView}>
              {t('walletSettings.warning')}
            </Text>
            <Text />
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
        </View>  */}
        <ReadOnlyBox
          value={this.state.mnemonics}
          title={t('walletSettings.mnemonicPhrase')}
          setFocused={(val) => this.setState({focused: val})}
          isFocused={this.state.focused === t('walletSettings.mnemonicPhrase')}
        />
        <ReadOnlyBox
          value={this.state.pword}
          title={t('walletSettings.password')}
          setFocused={(val) => this.setState({focused: val})}
          isFocused={this.state.focused === t('walletSettings.password')}
        />
        <ReadOnlyBox
          value={this.state.publicKey}
          title={t('walletSettings.publicKey')}
          setFocused={(val) => this.setState({focused: val})}
          isFocused={this.state.focused === t('walletSettings.publicKey')}
        />
        <ReadOnlyBox
          value={this.state.privateKey}
          title={t('walletSettings.privateKey')}
          setFocused={(val) => this.setState({focused: val})}
          isFocused={this.state.focused === t('walletSettings.privateKey')}
        />
        <Button
          height={60}
          onPress={() => {}}
          title="Delete Info"
          color={theme.APP_COLOR_2}
          textStyle={styles.buttonText}
          buttonStyle={styles.buttonStyle}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3,
  account: state.reducers.account,
  seedPhrase: state.reducers.seedPhrase,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    STPupdateAccounts: (account0) => dispatch(STPupdateAccounts(account0)),
    STPupdateSeedPhrase: (seedPhrase) =>
      dispatch(STPupdateSeedPhrase(seedPhrase)),
  };
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(WalletSettings),
);
