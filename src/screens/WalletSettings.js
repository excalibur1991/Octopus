//import '../../shim.js'
import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {STPupdateAccounts, STPupdateSeedPhrase} from '../actions/actions.js';
import Button from '../components/Button';
//import { Ocean, ConfigHelper } from '@oceanprotocol/lib'
import {Picker} from '@react-native-picker/picker';
import CButton from '../components/CButton';
import {styles} from '../styles/walletsettings';
//import { Ocean, Config, ConfigHelper, Logger } from '@oceanprotocol/lib'
import {
  chkNetwork,
  webThreeReturned,
  handleNewWallet,
  readStoredWallet,
  handleNewAccount,
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

    const checkNetwork = setInterval(() => {
      chkNetwork(this, checkNetwork);
    }, 1000);

    const web3Returned = setInterval(() => {
      webThreeReturned(this, web3Returned);
    }, 1000);
  }

  componentDidMount() {
    readStoredWallet(this);
  }

  STORAGE_KEY = '@save_Keys';
  STORAGE_KEY2 = '@save_Pwd';
  STORAGE_KEY3 = '@save_Phrase';

  render() {
    const {t} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={true}>
        <View>
          <Picker
            selectedValue={this.state.networktype}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({networktype: itemValue})
            }>
            <Picker.Item label={t('walletSettings.mainnet')} value="mainnet" />
            <Picker.Item label={t('walletSettings.rinkeby')} value="rinkeby" />
            <Picker.Item label={t('walletSettings.kovan')} value="kovan" />
            <Picker.Item label={t('walletSettings.ropsten')} value="ropsten" />
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
        <View style={styles.container}>
          <View style={styles.rows}>
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
          <View>
            <Text style={styles.bigTextView}>
              {t('walletSettings.publicKey')}
            </Text>
            <View style={styles.parent}>
              <Text numberOfLines={1} style={styles.boxText}>
                {this.state.publicKey}
              </Text>
              <CButton text={this.state.publicKey} />
            </View>
            <Text style={styles.bigTextView}>
              {t('walletSettings.mnemonicPhrase')}
            </Text>
            <View style={styles.parent}>
              <Text numberOfLines={1} style={styles.boxText}>
                {this.state.mnemonics}
              </Text>
              <CButton text={this.state.mnemonics} />
            </View>
            <Text style={styles.bigTextView}>
              {t('walletSettings.privateKey')}
            </Text>
            <View style={styles.parent}>
              <Text numberOfLines={1} style={styles.boxText}>
                {this.state.privateKey}
              </Text>
              <CButton text={this.state.privateKey} />
            </View>
            <Text style={styles.bigTextView}>
              {t('walletSettings.password')}
            </Text>
            <View style={styles.parent}>
              <Text numberOfLines={1} style={styles.boxText}>
                {this.state.pword}
              </Text>
              <CButton text={this.state.pword} />
            </View>
          </View>
          <Button
            color="#f2f2f2"
            title={t('walletSettings.more')}
            buttonStyle={styles.buttonStyle}
            onPress={() => handleNewAccount(this)}
            textStyle={styles.buttonText}
          />
          <Button
            color="#f2f2f2"
            title={t('walletSettings.deleteWallet')}
            buttonStyle={styles.buttonStyle}
            onPress={this.handleWalletRecovery}
            textStyle={styles.buttonText}
          />
        </View>
        <Button
          color="#f2f2f2"
          title={t('walletSettings.newWallet')}
          buttonStyle={styles.buttonStyle}
          onPress={() => handleNewWallet(this)}
          textStyle={styles.buttonText}
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
