/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
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

const WalletActions = ({t, ...props}) => {
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
  console.log('Wallet Params:', walletParams);

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
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        <View>
          <Text style={styles.bigTextView}>{t('walletActions.myAddress')}</Text>
          <TextInput
            selectable={true}
            selectTextOnFocus={true}
            placeholder={t('walletActions.publicAddress')}
            value={newAccount}
          />
          <Text style={styles.bigTextView}>{t('walletActions.sendTo')}</Text>
          <TextInput
            selectable={true}
            selectTextOnFocus={true}
            placeholder={t('walletActions.destinationAddress')}
            value={destination}
            onChangeText={(address) => setDestination(address)}
          />
          <Text style={styles.bigTextView}>{t('walletActions.amountEth')}</Text>
          <Text>
            {tokenBal} {t('walletActions.ethAvailable')}
          </Text>
          <TextInput
            selectable={true}
            selectTextOnFocus={true}
            placeholder={t('walletActions.amountToSend')}
            onChangeText={(amount) => setAmount(amount)}
          />
          <Text />
          <Button
            color="#f2f2f2"
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
          <Text style={styles.bigTextView}>{t('walletActions.amount')}</Text>
          <Text>0.22 {t('walletActions.quickraStaked')}</Text>
          <TextInput
            placeholder={t('walletActions.amountToStake')}
            onChangeText={(amount) => setAmount(amount)}
          />
          <Button
            color="#f2f2f2"
            title={t('walletActions.stake')}
            buttonStyle={styles.button}
            onPress={() =>
              Alert.alert(i18n.t('messages.alert'), t('walletActions.stake'))
            }
            textStyle={styles.buttonText}
          />
          <Button
            color="#f2f2f2"
            title={t('walletActions.unStake')}
            buttonStyle={styles.button}
            onPress={() =>
              Alert.alert(i18n.t('messages.alert'), t('walletActions.unStake'))
            }
            textStyle={styles.buttonText}
          />
        </View>
        <Text />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  web3: state.web3,
  account: state.reducers.account,
  seedPhrase: state.reducers.seedPhrase,
  password: state.reducers.password,
});

export default withTranslation()(connect(mapStateToProps, null)(WalletActions));
