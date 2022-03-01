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
  Platform,
  Alert,
} from 'react-native';
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
import FingerprintScanner from 'react-native-fingerprint-scanner';
import IonIcon from 'react-native-vector-icons/Feather';
import Ripple from '../components/Ripple';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ReadOnlyBoxActionButton = ({
  text,
  onCopied = () => {},
  isProtected = false,
}) => {
  const onCopy = () => {
    if (isProtected) {
      authenticate(() => {
        handleCopy();
      });
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    onCopied();
    Clipboard.setString(text);
    if (Platform.OS === 'ios') {
      Alert.alert('Copied to clipboard');
    } else {
      ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    }
  };

  return (
    <Ripple onPress={onCopy}>
      <MaterialIcon
        size={15}
        name="content-copy"
        color={theme.COLORS.TULIP_TREE}
      />
    </Ripple>
  );
};

const authenticate = (onSuccess) => {
  FingerprintScanner.authenticate({
    description: 'Scan fingerprint or face',
    fallbackEnabled: true,
  }).then((isAuthenticated) => {
    if (isAuthenticated) {
      onSuccess();
    }
    FingerprintScanner.release();
  });
};

const ReadOnlyBox = ({title, value, isFocused, setFocused, type = ''}) => {
  const [showPhrase, setShowPhrase] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOnFocus = () => setFocused(title);

  const handleToggleMnemonicsPhrase = async () => {
    if (showPhrase) {
      setShowPhrase(false);
    } else {
      authenticate(() => {
        setShowPhrase(true);
      });
    }
  };

  const handleTogglePassword = async () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      authenticate(() => {
        setShowPassword(true);
      });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.readOnlyBox, isFocused ? styles.readOnlyBoxShadow : {}]}
      onPressIn={handleOnFocus}>
      <View style={styles.titleCopyButton}>
        <Text style={styles.textBoxTitle}>{title}</Text>
        {type === 'password' ? (
          <Ripple onPress={handleTogglePassword}>
            <IonIcon
              size={15}
              color={theme.COLORS.TULIP_TREE}
              name={showPassword ? 'eye' : 'eye-off'}
            />
          </Ripple>
        ) : (
          <ReadOnlyBoxActionButton
            text={value}
            onCopied={handleOnFocus}
            isProtected={type !== 'publicKey'}
          />
        )}
      </View>
      {type === 'mnemonics' &&
        (showPhrase ? (
          <Text numberOfLines={4} style={styles.textBoxValue}>
            {value}
            {showPhrase}
            <Text
              onPress={handleToggleMnemonicsPhrase}
              style={styles.textBoxPhraseValueAction}>
              {' Click to hide mnemonic phrase'}
            </Text>
          </Text>
        ) : (
          <Text numberOfLines={4} style={styles.textBoxPhraseValue}>
            ALWAYS KEEP YOUR MNEMONIC PHRASE SECRET ! ANYONE WITH THIS PHRASE
            CAN ACCESS YOUR FUNDS AND REMOVE THEM PERMANENTLY
            {showPhrase}
            <Text
              onPress={handleToggleMnemonicsPhrase}
              style={styles.textBoxPhraseValueAction}>
              {' Click to see mnemonic phrase'}
            </Text>
          </Text>
        ))}
      {type === 'password' && (
        <Text numberOfLines={4} style={styles.textBoxValue}>
          {showPassword ? value : '*****************'}
        </Text>
      )}
      {type === 'publicKey' && (
        <Text numberOfLines={4} style={styles.textBoxValue}>
          {value}
        </Text>
      )}
      {type === 'privateKey' && (
        <Text numberOfLines={4} style={styles.textBoxValue}>
          nCight does not have access to your private key
        </Text>
      )}
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
        </View>  */}
        <ReadOnlyBox
          type="mnemonics"
          value={this.state.mnemonics}
          title={t('walletSettings.mnemonicPhrase')}
          setFocused={(val) => this.setState({focused: val})}
          isFocused={this.state.focused === t('walletSettings.mnemonicPhrase')}
        />
        <ReadOnlyBox
          type="password"
          value={this.state.pword}
          title={t('walletSettings.password')}
          setFocused={(val) => this.setState({focused: val})}
          isFocused={this.state.focused === t('walletSettings.password')}
        />
        <ReadOnlyBox
          type="publicKey"
          value={this.state.publicKey}
          title={t('walletSettings.publicKey')}
          setFocused={(val) => this.setState({focused: val})}
          isFocused={this.state.focused === t('walletSettings.publicKey')}
        />
        <ReadOnlyBox
          type="privateKey"
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
