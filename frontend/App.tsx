import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View,TextInput } from "react-native";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
//import Moralis from "moralis/types";
import Button from './DataUnion/src/components/Button';
import {styles} from './DataUnion/src/styles/wallet'
import CButton from './DataUnion/src/components/CButton';
import {   
  requestTxSig,
  waitForSignedTxs,
  requestAccountAddress,
  waitForAccountAuth,
  FeeCurrency
} from '@celo/dappkit'
import {celoWeb3, kit} from './DataUnion/celoConfig'
import { toTxResult } from "@celo/connect"
import * as Linking from 'expo-linking'
import HelloWorldContract from '../contracts/HelloWorld.json'
import { getWalletData} from './DataUnion/src/services/DataManager';
import * as Utils from './DataUnion/src/web3/utils'
import BigNumber from "bignumber.js";

const styles_ = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
  white: { backgroundColor: "white" },
  margin: { marginBottom: 20 },
  marginLarge: { marginBottom: 35 },
});

function Web3ApiExample(): JSX.Element {
  const { Moralis } = useMoralis();
  const {
    account: { getTokenBalances },
  } = useMoralisWeb3Api();
  const { data, isFetching, error } = useMoralisWeb3ApiCall(getTokenBalances);

  useEffect(() => {
    Moralis.Web3API.account.getTokenBalances({ address: "" }).then(console.log);
  }, []);

  if (isFetching) {
    return (
      <View style={styles_.marginLarge}>
        <Text>Fetching token-balances...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles_.marginLarge}>
        <Text>Error:</Text>
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
  }

  return (
    <View style={styles_.marginLarge}>
      <Text>Tokens</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}

function UserExample(): JSX.Element {
  const { user } = useMoralis();

  return (
    <View style={styles_.marginLarge}>
      <Text>UserName: {user.getUsername()}</Text>
      <Text>Email: {user.getEmail() ?? "-"}</Text>
      <Text>Address: {user.get("ethAddress")}</Text>
    </View>
  );
}


function App(): JSX.Element {
  const connector = useWalletConnect();
  const { authenticate, authError, isAuthenticating, isAuthenticated, logout, Moralis } = useMoralis();
  const [ethAddress, setEthAddress] = useState('')
  const [celoAddress, setCeloAddress] = useState('Not Logged In')
  const [cUSDBalance, setUSDBalance] = useState('Not Logged In')
  const [celoBalance, setCeloBalance] = useState('Not Logged In')
  const [ethBalance, setEthBalance] = useState('0')
  const [phoneNumber, setPhoneNumber] = useState('Not Logged In')
  const [helloWorldContract, setHelloWorldContract] = useState(null)
  const [contractName, setContractName] = useState('')
  const [textInput,setTextInput] = useState('')

  
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
     
     
  
    // this.setState({celoBalance: celoWeb3.utils.fromWei(celoBalance.toString())})
     //this.setState({celoUSDBalance: celoWeb3.utils.fromWei(celoUSDBalance.toString())})
     //this.setState({ethTokenBal: ethBal})
  }

  useEffect(() => {
    const login = async() => {
          // Check the Celo network ID
    const networkId = await celoWeb3.eth.net.getId();
    
    // Get the deployed HelloWorld contract info for the appropriate network ID
    const deployedNetwork = HelloWorldContract.networks[networkId];

   

      // A string you can pass to DAppKit, that you can use to listen to the response for that request
      const requestId = 'login'
    
      // A string that will be displayed to the user, indicating the DApp requesting access/signature
      const dappName = 'Hello Celo'
      
      // The deeplink that the Celo Wallet will use to redirect the user back to the DApp with the appropriate payload.
      //const callback = Linking.makeUrl('/my/path')

      // Ask the Celo Alfajores Wallet for user info
      requestAccountAddress({
        requestId,
        dappName,
        callback: window.location.href,
      })
  
    // Wait for the Celo Wallet response
    const dappkitResponse = await waitForAccountAuth(requestId)

  
    
    
    console.log({ kit:kit})
    // Update state
   // this.setState({ cUSDBalance, 
     //               isLoadingBalance: false,
       //             address: dappkitResponse.address, 
         //           phoneNumber: dappkitResponse.phoneNumber })

   // console.log({networkId:networkId, deployedNetwork:deployedNetwork})
    }
 /**
  *     address: 'Not logged in',
    phoneNumber: 'Not logged in',
    cUSDBalance: 'Not logged in',
    helloWorldContract: {},
    contractName: '',
    textInput: ''
  */
   login();
   fetchBalances();
  },[])

  return (
  <View style={styles.container}>          
    <View>
      <Text style={{ fontFamily: 'Cochin', fontSize: 15, marginBottom: 10, fontWeight: 'bold' }}> 
        Connect to External Wallets and DApps</Text>
    </View>
   
   <View>
      {authError && (
      <>
        <Text>Authentication error:</Text>
        <Text style={styles_.margin}>{authError.message}</Text>
      </>
      )}
      {isAuthenticating && <Text style={styles_.margin}>Authenticating...</Text>}
      {!isAuthenticated && (
        // @ts-ignore

        <View>
        <Button
            color="#f2f2f2"
            title={'WalletConnect'}
            buttonStyle={styles.button}
            onPress={() => authenticate({ connector })}
            textStyle={styles.buttonText}
          />
        </View>
      )}
      {isAuthenticated && (
        <TouchableOpacity onPress={() => logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      )}
   </View>
   <View>
      {isAuthenticated && (
        <View>
          <UserExample />
          <Web3ApiExample />
        </View>
      )}
   </View> 
   <View>
     <Button
            color="#f2f2f2"
            title={'Connect to Valora'}
            buttonStyle={styles.button}
            onPress={() => { }}
            textStyle={styles.buttonText}
      />
   </View>  

</View>
  )
  
}

export default App;
