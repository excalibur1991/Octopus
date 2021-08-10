import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {styles} from '../styles/walletactions';
import {contracts, web3} from '../web3/utils'
import minABI from '../abis/minABI.json'
import jsonpoolABI from '@oceanprotocol/contracts/artifacts/BPool.json'
import {
  readStoredWallet
} from '../functions/walletsettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slippage from '../components/Slippage'

export const OceanBalance = () => {
  const [ethBal, setTokenBal] = useState('');
  const [oceanBal, setOceanBal] = useState('');
  const [newAccount, setNewAccount] = useState('');

  useEffect(() => {

    const init = async () => {
      //const walletParams = props.publicKey;
      const userInfo = JSON.parse(await AsyncStorage.getItem('@saved_Keys'))
      if (userInfo == undefined || userInfo == null) return;
    
      const newAccount = userInfo.publicKey;
      const ethBal = await web3.eth.getBalance(newAccount).then((bal) => web3.utils.fromWei(bal, 'ether'));
      let formattedEthBal = (Math.round((ethBal) * 100)) / 100
      const oceanrinkeby = new web3.eth.Contract(jsonpoolABI.abi, contracts.oceanRinkeby);
    
      oceanrinkeby.methods.balanceOf(newAccount).call((error, balance) => {
        let formattedOceanBal = web3.utils.fromWei(balance )
        let rounded = (Math.round((formattedOceanBal) * 100)) / 100
         setOceanBal(rounded)
      });
     
      setNewAccount(newAccount);
      setTokenBal(formattedEthBal);

    };

    init();

  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        <View style={styles.parent}>
        <Text style={{fontFamily:'Cochin', fontSize: 15,marginBottom: 10}}> Wallet Balances(Maximum to Spend)</Text>
          <View style={styles.topContainer}>
          <View>
         {/**   <Text style={styles.head2}>{phecorBal} PHECOR-0</Text>  */}
           <Text style={styles.head2}> {ethBal} ETH</Text> 
          </View>
          <View style={styles.alignEnd}>
           <Text style={styles.head2}> {oceanBal} OCEAN</Text>
           {/** <Text style={styles.head4}>0 QUICRA-0</Text>  */}
          </View>
        </View>
        </View>
        {/**
        <View>
        <Text style={styles.bigTextView}>Account</Text>
          <View > 
            <TextInput
              placeholder="public address"
              value={newAccount}
              //style={styles.boxText}
              editable={false}
            /> 
          </View>  
        </View>
         */}
      </View>
    </ScrollView>
  );
};

export const PhecorBalance = (props) => {
  const [ethBal, setTokenBal] = useState('');
  const [phecorBal, setPhecorBal] = useState('');
  const [newAccount, setNewAccount] = useState('');

  useEffect(() => {

    const init = async () => {
      //const walletParams = props.publicKey;
      const userInfo = JSON.parse(await AsyncStorage.getItem('@saved_Keys'))
      if (userInfo == undefined || userInfo == null) return;
    
      const newAccount = userInfo.publicKey;
      const ethBal = await web3.eth.getBalance(newAccount).then((bal) => web3.utils.fromWei(bal, 'ether'));
      let formattedEthBal = (Math.round((ethBal) * 100)) / 100
      const phec0rinkeby = new web3.eth.Contract(minABI, contracts.phecorRinkeby);
    
      phec0rinkeby.methods.balanceOf(newAccount).call((error, balance) => {
        let formattedPhecorBal = web3.utils.fromWei(balance )
        let rounded = (Math.round((formattedPhecorBal) * 100)) / 100
        setPhecorBal(rounded);
    });
     
      setNewAccount(newAccount);
      setTokenBal(formattedEthBal);

    };

    init();
    //console.log({props:props})

  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        <View style={styles.parent}>
        <Text style={{fontFamily:'Cochin', fontSize: 15,marginBottom: 10}}> Wallet Balances(Maximum to Spend)</Text>
          <View style={styles.topContainer}>
          <View>
         {/**   <Text style={styles.head2}>{phecorBal} PHECOR-0</Text>  */}
           <Text style={styles.head2}> {ethBal} ETH</Text> 
          </View>
          <View style={styles.alignEnd}>
           <Text style={styles.head2}> {phecorBal} PHECOR-0</Text>
           {/** <Text style={styles.head4}>0 QUICRA-0</Text>  */}
          </View>
        </View>
        </View>
        {/**
        <View>
        <Text style={styles.bigTextView}>Account</Text>
          <View > 
            <TextInput
              placeholder="public address"
              value={newAccount}
              //style={styles.boxText}
              editable={false}
            /> 
          </View>  
        </View>
         */}
      </View>
    </ScrollView>
  );
};

export const EthBalance = async() => {
{/**  const [ethBal, setTokenBal] = useState('');
  const [allBalance, setAllBalance] = useState('');
  const [oceanBal, setOceanBal] = useState('');
  const [phecorBal, setPhecorBal] = useState('');
  const [newAccount, setNewAccount] = useState(''); */}



//const init = async () => {
  //const walletParams = props.publicKey;
  const userInfo = JSON.parse(await AsyncStorage.getItem('@saved_Keys'))
  if (userInfo == undefined || userInfo == null) return;

  const newAccount = userInfo.publicKey;
  const ethBal = await web3.eth.getBalance(newAccount).then((bal) => web3.utils.fromWei(bal, 'ether'));
  let formattedEthBal = (Math.round((ethBal) * 100)) / 100
 
 //setNewAccount(newAccount);
  //setTokenBal(formattedEthBal);

  const balances = {
    account: newAccount,
    ethBalance: formattedEthBal
  }
   //setAllBalance(balances)

   return balances

 // }

};


{/**
const mapStateToProps = (state) => ({
  web3: state.web3,
  account: state.reducers.account,
  seedPhrase: state.reducers.seedPhrase,
  password: state.reducers.password,
});

export default connect(mapStateToProps, null)(WalletActions);
 */}