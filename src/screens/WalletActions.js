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

const WalletActions = (props) => {
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
          <Text style={styles.bigTextView}>My Address</Text>
          <TextInput
            selectable={true}
            selectTextOnFocus={true}
            placeholder="public address"
            value={newAccount}
          />
          <Text style={styles.bigTextView}>Send to</Text>
          <TextInput
            selectable={true}
            selectTextOnFocus={true}
            placeholder="destination address"
            value={destination}
            onChangeText={(address) => setDestination(address)}
          />
          <Text style={styles.bigTextView}>Amount (ETH)</Text>
          <Text> {tokenBal} ETH Available</Text>
          <TextInput
            selectable={true}
            selectTextOnFocus={true}
            placeholder="amount to send"
            onChangeText={(amount) => setAmount(amount)}
          />
          <Text />
          <Button
            color="#f2f2f2"
            title="Send"
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
          <Text style={styles.bigTextView}>Amount</Text>
          <Text>0.22 Quickra-0 Staked</Text>
          <TextInput
            placeholder="amount to stake"
            onChangeText={(amount) => setAmount(amount)}
          />
          <Button
            color="#f2f2f2"
            title="Stake"
            buttonStyle={styles.button}
            onPress={() => alert('Stake')}
            textStyle={styles.buttonText}
          />
          <Button
            color="#f2f2f2"
            title="UnStake"
            buttonStyle={styles.button}
            onPress={() => alert('Unstake')}
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

export default connect(mapStateToProps, null)(WalletActions);
