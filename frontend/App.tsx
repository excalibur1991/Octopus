import { HARDHAT_PORT, HARDHAT_PRIVATE_KEY } from '@env';
import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import localhost from 'react-native-localhost';
import Web3 from 'web3';
import { Platform, LogBox } from 'react-native';
import Hello from '../artifacts/contracts/Hello.sol/Hello.json';
import { default as AsyncStorage } from '@react-native-async-storage/async-storage';
import { styles } from './DataUnion/src/styles/wallet'
import CButton from './DataUnion/src/components/CButton';
import Button from './DataUnion/src/components/Button'
import {   
  requestTxSig,
  waitForSignedTxs,
  requestAccountAddress,
  waitForAccountAuth,
  FeeCurrency
} from '@celo/dappkit'
import {celoWeb3, kit} from './DataUnion/celoConfig'
import { toTxResult } from "@celo/connect"
import { getWalletData} from './DataUnion/src/services/DataManager';
import * as Utils from './DataUnion/src/web3/utils'
import BigNumber from 'bignumber.js';
import * as Linking from 'expo-linking'




const styles_ = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  // eslint-disable-next-line react-native/no-color-literals
  white: { backgroundColor: 'white' },
});


const {  scheme } = require('expo');

export default withWalletConnect(App, {
 
  redirectUrl: Platform.OS === 'web' ? window.location.origin : `${scheme}://`,
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
})


const shouldDeployContract = async (web3: Web3, abi: ({ inputs: any[]; stateMutability: string; type: string; name?: undefined; outputs?: undefined; } | { inputs: { internalType: string; name: string; type: string; }[]; name: string; outputs: { internalType: string; name: string; type: string; }[]; stateMutability: string; type: string; })[], data: string, from: string) => {
  const deployment = new web3.eth.Contract(abi).deploy({ data });
  const gas = await deployment.estimateGas();
  const {
    options: { address: contractAddress },
  } = await deployment.send({ from, gas });
  return new web3.eth.Contract(abi, contractAddress);
};

export function App(): JSX.Element {
  const connector = useWalletConnect();

  const [ethAddress, setEthAddress] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [Address, setAddress] = useState('Not Logged In')
  const [celoAddress, setCeloAddress] = useState('Not Logged In')
  const [cUSDBalance, setUSDBalance] = useState('Not Logged In')
  const [celoBalance, setCeloBalance] = useState('Not Logged In')
  const [ethBalance, setEthBalance] = useState('0')
  const [phoneNumber, setPhoneNumber] = useState('Not Logged In')
  const [helloWorldContract, setHelloWorldContract] = useState(null)
  const [contractName, setContractName] = useState('')
  const [textInput,setTextInput] = useState('')
  const [message, setMessage] = React.useState<string>('Loading...');



  const fetchBalances = async() => {
    let celoBalance: BigNumber, celoUSDBalance: BigNumber
    let balances = {}
    let celoAddress =  await getWalletData().then(res =>(res.celoPublicKey))
    let ethAddress =  await getWalletData().then(res =>(res.publicKey))
    //console.log({celoAddress: celoAddress, ethAddress:ethAddress})
  
    let goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()
  
    const ethBal =  await Utils.web3.eth.getBalance(ethAddress)
                    .then((bal) => Utils.web3.utils.fromWei(bal, 'ether'));
  
     celoBalance = await goldtoken.balanceOf(celoAddress)
     celoUSDBalance = await stabletoken.balanceOf(celoAddress)
     
     setCeloBalance(celoBalance.toString())
     setUSDBalance(cUSDBalance)
     setEthBalance(ethBal)
     setCeloAddress(celoAddress)
     setEthAddress(ethAddress)
     
     balances = {
         celoBalance: celoBalance,
         ethBal:ethBal,
         celoUSDBalance: celoUSDBalance,
         celoAddress:celoAddress,
         ethAddress: ethAddress
         
     }
     console.log({Balances:balances})
     return balances;
     
  }


const login = async () => {
    
  // A string you can pass to DAppKit, that you can use to listen to the response for that request
  const requestId = 'login'
  
  // A string that will be displayed to the user, indicating the DApp requesting access/signature
  const dappName = 'DataUnion'
  
  // The deeplink that the Celo Wallet will use to redirect the user back to the DApp with the appropriate payload.
  const callback = Linking.makeUrl('/my/path')

  // Ask the Celo Alfajores Wallet for user info
  requestAccountAddress({
    requestId,
    dappName,
    callback,
  })

  // Wait for the Celo Wallet response
  const dappkitResponse = await waitForAccountAuth(requestId)
  console.log({dappkitResponse:dappkitResponse,kitDefaultAcct:kit.defaultAccount,
    dappkitResponseAddress:dappkitResponse.address})

  // Set the default account to the account returned from the wallet
  kit.defaultAccount = dappkitResponse.address

  // Get the stabel token contract
  const stableToken = await kit.contracts.getStableToken()

  // Get the user account balance (cUSD)
  const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount)
  
  // Convert from a big number to a string by rounding it to the appropriate number of decimal places
  const ERC20_DECIMALS = 18
  let cUSDBalanceDec = cUSDBalanceBig.shiftedBy(-ERC20_DECIMALS).toFixed(2)
  let cUSDBalance = cUSDBalanceDec.toString()
  
  // Update state
  setUSDBalance(cUSDBalance)
  setIsLoading(false)
  setEthAddress(ethAddress)
  setCeloAddress(dappkitResponse.address)
  setMessage('Connected')
  setEthBalance(ethBalance)
  setPhoneNumber(dappkitResponse.phoneNumber)
/*   this.setState({ cUSDBalance, 
                  isLoadingBalance: false,
                  address: dappkitResponse.address, 
                  phoneNumber: dappkitResponse.phoneNumber })
                   */
}

  useEffect(() => {


   //login();
  // fetchBalances();
  },[])


  const connectWallet = useCallback(async() => {
      let result =  await connector.connect()
      console.log({result})
      if(result) {
        setAddress(result.accounts[0])
        setMessage(`Connected!`)
        
      }

    return connector.connect();
  }, [connector]);
  
  const signTransaction = useCallback(async () => {
    try {
       await connector.signTransaction({
        data: '0x',
        from: '0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3',
        gas: '0x9c40',
        gasPrice: '0x02540be400',
        nonce: '0x0114',
        to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
        value: '0x00',
      });
    } catch (e) {
      console.error(e);
    }
  }, [connector]);

  const killSession = useCallback(() => {
    setIsLoading(true)
    setMessage(`Loading...`)
    return connector.killSession();
  }, [connector]);
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontFamily: 'Cochin', fontSize: 15, marginBottom: 10, fontWeight: 'bold' }}> 
        Connect to External Wallets and DApps</Text>   
    </View>
    <><Text style={styles.bigTextView}>ADDRESS</Text><View style={styles.parent}>
          <Text numberOfLines={1} style={styles.boxText}>
            {Address}
          </Text>
          <CButton text={Address} />
        </View></>
    
        
 
      <Text testID="tid-message">{message}</Text>
      {!connector.connected && (
        <View>
          <Button
              color="#f2f2f2"
              title={'WalletConnect'}
              buttonStyle={styles.button}
              onPress={() => connectWallet()}
              textStyle={styles.buttonText}
            />
        </View>

      )}
      {!!connector.connected && (
        <>
          <Button
            color="#f2f2f2"
            title={'Sign a Transaction'}
            buttonStyle={styles.button}
            onPress={() => signTransaction()}
            textStyle={styles.buttonText}
          />
            <Button
            color="#f2f2f2"
            title={'Kill Session'}
            buttonStyle={styles.button}
            onPress={() => killSession()}
            textStyle={styles.buttonText}
          />
        </>
      )}
    </View>
  );
}