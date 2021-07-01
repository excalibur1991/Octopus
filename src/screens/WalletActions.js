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
import {contracts, web3} from '../web3/utils'
import {PRIVATE_KEY2, INFURA_KEY} from '../../env'
import minABI from '../abis/minABI.json'
import jsonpoolABI from '@oceanprotocol/contracts/artifacts/BPool.json'
import {ApproveLiquidity, StakeDT, UnStakeDT} from '../screens/Staking'
import {OceanPool}  from '../components/OceanPool'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CButton from '../components/CButton';

const WalletActions = (props) => {
  const [destination, setDestination] = useState('');
  const [stakingAmount, setStakingAmount] = useState('');
  const [approvalAmount, setApprovalAmount] = useState('');
  const [unstakingAmount, setUnStakingAmount] = useState('');
  const [maxpoolShares, setMaxPoolShares] = useState(0);
  //const [web3, setWeb3] = useState(undefined);
  const [ethBal, setTokenBal] = useState('');
  const [oceanBal, setOceanBal] = useState('');
  const [phecorBal, setPhecorBal] = useState('');
  const [quicraBal, setQuicraBal] = useState('');
  const [newAccount, setNewAccount] = useState('');
  const [newPKey, setNewPKey] = useState('');
  const [approvalHash, setApprovalHash] = useState('')
  const [approvalError, setApprovalError] = useState('')
  const [liquidityHash, setLiquidityHash] = useState('')
  const [liquidityError, setLiquidityError] = useState('')
  const [unStakingHash, setUnStakingHash] = useState('')
  const [unStakingError, setUnStakingError] = useState('')
  const [maxAddLiq, setMaxAddLiq] = useState(0.0)
  const [poolReserve, setPoolReserve] = useState(0.0)
  const [swapFee, setSwapFee] = useState(0.0)
  const [myLiquidity, setMyLiquidity] = useState(0.0)


  const ocean = new OceanPool()

  const walletParams = props.route.params;
  console.log({walletParams: walletParams, privateKey:walletParams.privateKey,
               publicKey:walletParams.publicKey})
               
  const getLiquidityApproval = async() => {
    try{
      const dtAddress = await ocean.getDTAddress(destination)
      const approvalReceipt = await ocean.approve(newAccount,dtAddress,destination,approvalAmount)
      console.log({dtAddress: dtAddress, poolAddress: destination,approvalReceipt: approvalReceipt})

     if( approvalReceipt !== null  ) {
        setApprovalHash(approvalReceipt.transactionHash)
        setApprovalError("")
    } else {
        setApprovalError("Liquidity Approval Failed! ")
      }
    }
    catch(e){
      console.log(`Approval failed! : ${e.message}`)
    }
  }

  const StakeDT = async() =>{
    try {
    const maxAddLiq = await ocean.getDTMaxAddLiquidity(destination)
    const poolReserve = await ocean.getDTReserve(destination)
    const poolDtToken = await ocean.getDTAddress(destination)
    const myLiquidity = await ocean.sharesBalance(newAccount,destination);
    const poolSwapFee = await ocean.getSwapFee(destination)
    console.log({maxAddLiq: maxAddLiq,poolReserve:poolReserve,poolDtToken:poolDtToken,
    myLiquidity:myLiquidity})

    const stakingReceipt = await ocean.addDTLiquidity(newAccount,destination,stakingAmount)
    if( stakingReceipt !== null  ) {
      setLiquidityHash(stakingReceipt.transactionHash)
      setLiquidityError("")
      setMaxAddLiq((Math.round((maxAddLiq) * 100)) / 100)
      setPoolReserve((Math.round((poolReserve) * 100)) / 100)
      setMyLiquidity((Math.round((myLiquidity) * 100)) / 100)
      setSwapFee((Math.round((poolSwapFee) * 100)) / 100)
  } else {
      setLiquidityError("Staking Failed! ")
      setMaxAddLiq((Math.round((maxAddLiq) * 100)) / 100)
      setPoolReserve((Math.round((poolReserve) * 100)) / 100)
      setMyLiquidity((Math.round((myLiquidity) * 100)) / 100)
      setSwapFee((Math.round((poolSwapFee) * 100)) / 100)
    }
    } catch (error) {
      
    }
}

const UnStakeDT = async() => {
  try{
    const myLiquidity = await ocean.sharesBalance(newAccount,destination);
    const unStakeReceipt = await ocean.removeDTLiquidity(newAccount,destination,unstakingAmount,'21')       
   // await ocean.removeDTLiquidity(account, poolAddress, stakingAmount, naximumPoolShares)       
   if (unStakeReceipt !== null) {
      setUnStakingHash(unStakeReceipt.transactionHash)
      setUnStakingError("")
      setMyLiquidity((Math.round((myLiquidity) * 100)) / 100)
   }  else {
      setUnStakingError("Error Removing Liquidity!")
   }
      
  }  catch(error) {    
  }
}

const onSuccess = (url) => {

}
const setApproval = (amount) => {
    setApprovalAmount(amount)
}
  useEffect(() => {
    const init = async () => {

      const newAccount = walletParams.publicKey;
   //   const newPKey = walletParams.privateKey;
      const ethBal = await web3.eth.getBalance(newAccount).then((bal) => web3.utils.fromWei(bal, 'ether'));
      let formattedEthBal = (Math.round((ethBal) * 100)) / 100
      const oceanrinkeby = new web3.eth.Contract(jsonpoolABI.abi, contracts.oceanRinkeby);
      const phec0rinkeby = new web3.eth.Contract(minABI, contracts.phecorRinkeby);
    
      phec0rinkeby.methods.balanceOf(newAccount).call((error, balance) => {
        let formatted = web3.utils.fromWei(balance )
        let rounded = (Math.round((formatted) * 100)) / 100
        setPhecorBal(rounded);
    });
      oceanrinkeby.methods.balanceOf(newAccount).call((error, balance) => {
         setOceanBal(web3.utils.fromWei(balance))
      });
     

      //setWeb3(web3);
      setNewAccount(newAccount);
      //setNewPKey(newPKey);
      //setDestination(destination);
      setTokenBal(formattedEthBal);
    };
    init();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        <View>
          <Text style={styles.bigTextView}>My Address</Text>
          <TextInput
            placeholder="public address"
            value={newAccount}
          />
          <Text style={styles.bigTextView}>Send to</Text>
          <TextInput
            selectable={true}
            selectTextOnFocus={true}
            placeholder="pool address"
           // value={destination}
            onChangeText={(address) => setDestination(address)}
          />
          <TextInput
            placeholder="enter amount for Approval"
            onChangeText={(approvalAmount) => setApprovalAmount(approvalAmount)}
          />
          <View style={styles.topContainer}>
          <View>
            <Text style={styles.head2}>{phecorBal} PHECOR-0</Text>
            <Text style={styles.head2}> {ethBal} ETH</Text>
          </View>
          <View style={styles.alignEnd}>
           <Text style={styles.head2}> {oceanBal} OCEAN</Text>
            <Text style={styles.head4}>0 QUICRA-0</Text>
          </View>
        </View>
        {approvalError?<Text style={{color:'red'}}>{approvalError}</Text>:<Text></Text>}
       {approvalHash?
        <View style={styles.parent}>
          <Text numberOfLines={1} style={{color:'green'}}>APPROVED! Hash: {approvalHash}</Text>
          <CButton text={approvalHash}/>
        </View>
        :<Text></Text>}
          <Button
            color="#f2f2f2"
            title="Get Approval "
            buttonStyle={styles.button}
            onPress={() => getLiquidityApproval()}
            textStyle={styles.buttonText}
          />
          <TextInput
            placeholder="enter amount to Stake"
            onChangeText={(stakingAmount) => setStakingAmount(stakingAmount)}
          />

          {liquidityError?
          <View style={styles.parent}>
            <Text numberOfLines={1} style={{color:'red'}}>{liquidityError}</Text>
            <Text style={styles.head5}>Max AddDTLiquidity: {maxAddLiq} OCEAN</Text>
            <Text style={styles.head5}>Pool Reserve: {poolReserve} OCEAN</Text>
            <Text style={styles.head5}>Pool Swap Fee: {swapFee} OCEAN</Text>
            <Text style={styles.head5}>My Liquidity: {myLiquidity} OCEAN</Text>
          </View>
          :<Text></Text>}

          {liquidityHash?
          <View style={styles.parent}>
            <Text numberOfLines={1} style={{color:'green'}}>JOINED POOL SUCCESSFULLY! Hash: {liquidityHash}</Text>
            <CButton text={liquidityHash}/>
            <Text style={styles.head5}>DT-Token Staked: {stakingAmount} OCEAN</Text>
            <Text style={styles.head5}>Max AddDTLiquidity: {maxAddLiq} OCEAN</Text>
            <Text style={styles.head5}>Pool Reserve: {poolReserve} OCEAN</Text>
            <Text style={styles.head5}>Pool Swap Fee: {swapFee} OCEAN</Text>
            <Text style={styles.head5}>My Liquidity: {myLiquidity} OCEAN</Text>
          </View>
          :<Text></Text>}
          <Button
            color="#f2f2f2"
            title="Stake"
            buttonStyle={styles.button}
            onPress={() => StakeDT()}
            textStyle={styles.buttonText}
          />
          <TextInput
            placeholder="enter amount to UnStake"
            onChangeText={(unstakingAmount) => setUnStakingAmount(unstakingAmount)}
          />
          {unStakingError?
          <View style={styles.parent}>
            <Text numberOfLines={1} style={{color:'red'}}>{unStakingError}</Text>
          </View>
          :<Text></Text>}

          {unStakingHash?
          <View style={styles.parent}>
            <Text numberOfLines={1} style={{color:'green'}}>EXITED POOL SUCCESSFULLY! Hash: {unStakingHash}</Text>
            <CButton text={unStakingHash}/>
            <Text style={styles.head5}>DT-Token UnStaked: {unstakingAmount} OCEAN</Text>
            <Text style={styles.head5}>My Liquidity: {myLiquidity} OCEAN</Text>
          </View>
          :<Text></Text>}
          <Button
            color="#f2f2f2"
            title="UnStake"
            buttonStyle={styles.button}
            onPress={() => UnStakeDT()}
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
