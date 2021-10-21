/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Button from '../components/Button';
//import { createAlchemyWeb3 } from "@alch/alchemy-web3"
import {getWeb3} from '../web3/getWeb3';
import {styles} from '../styles/walletactions';
import {handleSendSignedTx} from '../functions/walletactions';
import {withTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {theme} from '../services/Common/theme';
import OctIcon from 'react-native-vector-icons/Octicons';

const WalletActions = ({t, navigation, ...props}) => {
  const [destination, setDestination] = useState('');
  //const [password, setPassword] = useState("")
  const [amount, setAmount] = useState(0);
  const [web3, setWeb3] = useState(undefined);
  const [tokenBal, setTokenBal] = useState('0x0');
  const [newAccount, setNewAccount] = useState('');
  const [newPKey, setNewPKey] = useState('');
  const [networkId, setNetworkId] = useState(null);
  const [blocknum, setBlocknum] = useState(null);

  const walletParams = props.route.params;

  useEffect(() => {
    const init = async () => {
      const web3 = getWeb3();
      const newAccount = walletParams.address;
      const newPKey = walletParams.privateKey;
      const tokenBal = await web3.eth
        .getBalance(newAccount)
        .then((bal) => web3.utils.fromWei(bal, 'ether'));

      setWeb3(web3);
      setNewAccount(newAccount);
      setNewPKey(newPKey);
      setDestination(destination);
      setTokenBal(tokenBal);
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Wallet</Text>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.headerActionContainer}>
            <OctIcon size={15} name="settings" color={theme.COLORS.WHITE} />
            <Text style={styles.headerActionText}>Settings</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.contentContainer}>
        <View>
          <View style={styles.quicraContainer}>
            <Text style={styles.quicraText}>1.2 QUICRA-0</Text>
            <View style={styles.oceanPortfolioContainer}>
              <Text style={styles.oceanText}>7.2 Ocean</Text>
              <View>
                <Text style={styles.portfolioText}>24h Portfolio</Text>
                <Text style={styles.percentText}>(+15.53%)</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.bigTextView}>{t('walletActions.sendTo')}</Text>
            <TextInput
              selectable={true}
              selectTextOnFocus={true}
              placeholder={t('walletActions.destinationAddress')}
              value={destination}
              onChangeText={(address) => setDestination(address)}
              placeholderTextColor={theme.COLORS.LIGHT_GREY}
              style={styles.sendToInput}
            />
            <View style={styles.amountSendContainer}>
              <Text style={styles.bigTextView}>
                {t('walletActions.amountEth')}
              </Text>
              <View style={styles.endLabeledInput}>
                <TextInput
                  selectable={true}
                  selectTextOnFocus={true}
                  placeholder={t('walletActions.amountToSend')}
                  onChangeText={(amount) => setAmount(amount)}
                  placeholderTextColor={theme.COLORS.LIGHT_GREY}
                  style={styles.input}
                />
                <Text style={styles.inputEndLabel}>
                  {tokenBal} {t('walletActions.ethAvailable')}
                </Text>
              </View>
            </View>
            <Button
              color={theme.COLORS.LIGHT_GREY}
              title={t('walletActions.send')}
              buttonStyle={styles.button}
              onPress={(amount) =>
                handleSendSignedTx(
                  amount,
                  web3,
                  newAccount,
                  destination,
                  newPKey,
                  tokenBal,
                )
              }
              textStyle={styles.buttonText}
            />
            <View style={styles.amountStakeUnstakeContainer}>
              <Text style={styles.bigTextView}>
                {t('walletActions.amount')}
              </Text>
              <View style={styles.endLabeledInput}>
                <TextInput
                  selectable={true}
                  selectTextOnFocus={true}
                  placeholder={t('walletActions.amountToStake')}
                  onChangeText={(amount) => setAmount(amount)}
                  placeholderTextColor={theme.COLORS.LIGHT_GREY}
                  style={styles.input}
                />
                <Text style={styles.inputEndLabel}>
                  0.22 {t('walletActions.quickraStaked')}
                </Text>
              </View>
              <View style={styles.stakeUnstakeButtons}>
                <Button
                  color={theme.COLORS.LIGHT_GREY}
                  title={t('walletActions.unStake')}
                  buttonStyle={styles.stakeUnstakeButton}
                  onPress={() =>
                    Alert.alert(t('messages.alert'), t('walletActions.unStake'))
                  }
                  textStyle={styles.unStakeButtonText}
                />
                <Button
                  color={theme.COLORS.LIGHT_GREY}
                  title={t('walletActions.stake')}
                  buttonStyle={styles.stakeUnstakeButton}
                  onPress={() =>
                    Alert.alert(t('messages.alert'), t('walletActions.stake'))
                  }
                  textStyle={styles.buttonText}
                />
              </View>
            </View>
          </View>
        </View>
        <Text />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  web3: state.web3,
  account: state.reducers.account,
  seedPhrase: state.reducers.seedPhrase,
  password: state.reducers.password,
});

export default withTranslation()(connect(mapStateToProps, null)(WalletActions));
