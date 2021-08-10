import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, ScrollView, Dimensions} from 'react-native';
import Button from '../components/Button';
import {styles} from '../styles/walletactions';
import {OceanPool}  from '../components/OceanPool'
import CButton from '../components/CButton';
import Decimal from 'decimal.js'
//import WalletActions from '../components/WalletActions'
import AsyncStorage from '@react-native-async-storage/async-storage';


const FormLiquidity = (props) => {
    const [destination, setDestination] = useState('');
    const [Amount, setAmount] = useState('');
    const [newAccount, setNewAccount] = useState('');
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
  
    const StakeDT = async() =>{
     // if(Amount == " " || newAccount == " " || destination || " ") return
      try {
        
      const maxAddLiq = await ocean.getDTMaxAddLiquidity(destination)
      const poolReserve = await ocean.getDTReserve(destination)
      const poolDtToken = await ocean.getDTAddress(destination)
      const myLiquidity = await ocean.sharesBalance(newAccount,destination);
      const poolSwapFee = await ocean.getSwapFee(destination)

      console.log({maxAddLiq: maxAddLiq,poolReserve:poolReserve,poolDtToken:poolDtToken,
      myLiquidity:myLiquidity})
  
      const stakingReceipt = await ocean.addDTLiquidity(newAccount,destination,Amount)

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
      //if(Amount == " " || newAccount == " " || destination || " ") return
      const myLiquidity = await ocean.sharesBalance(newAccount,destination);
      const maxOcean = await ocean.getOceanMaxRemoveLiquidity(destination)
      const unStakeReceipt = await ocean.removeDTLiquidity(newAccount,destination,Amount,maxOcean)       
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
  
  useEffect(() => {
    const init = async() => {
      const userInfo = JSON.parse(await AsyncStorage.getItem('@saved_Keys'))
      if (userInfo == undefined || userInfo == null) return;
    
      const newAccount = userInfo.publicKey;
      console.log({userInfo_:userInfo, newAccount_:newAccount, Amount:Amount, destination:destination})
      setNewAccount(newAccount)

    //  const logs = await ocean.getPoolLogs(destination,0,newAccount);
    //  const details = await ocean.getPoolDetails(destination);
    //  console.log({logs:logs, details:details})
    }
    init();
  })
  
    return (
     
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.container}>
       {/**   <WalletActions />  */}
          <Text style={styles.sendTo}>Destination</Text>
        <View style={styles.parent}>
          <TextInput
            selectable={true}
            selectTextOnFocus={true}
            placeholder="pool address"
            style={styles.boxText}
            onChangeText={(address) => setDestination(address)}
          />
         </View>
         <View >
         <Text style={styles.sendTo}>Ocean Amount</Text>
            <TextInput
              placeholder="enter amount"
              onChangeText={(Amount) => setAmount(Amount)}
            />
  
            {liquidityError?
            <View style={styles.parent}>
              <Text numberOfLines={1} style={{color:'red'}}>{liquidityError}</Text>
              <Text style={styles.head5}>Max DTLiquidity Added: {maxAddLiq} OCEAN</Text>
              <Text style={styles.head5}>Pool Reserve: {poolReserve} OCEAN</Text>
              <Text style={styles.head5}>Pool Swap Fee: {swapFee} OCEAN</Text>
              <Text style={styles.head5}>My Liquidity: {myLiquidity} OCEAN</Text>
            </View>
            :<Text></Text>}
  
            {liquidityHash?
            <View style={styles.parent}>
              <Text numberOfLines={1} style={{color:'green'}}>JOINED POOL SUCCESSFULLY! Hash: {liquidityHash}</Text>
              <CButton text={liquidityHash}/>
              <Text style={styles.head5}>OCEAN Staked: {stakingAmount} OCEAN</Text>
              <Text style={styles.head5}>Max AddDTLiquidity: {maxAddLiq} OCEAN</Text>
              <Text style={styles.head5}>Pool Reserve: {poolReserve} OCEAN</Text>
              <Text style={styles.head5}>Pool Swap Fee: {swapFee} OCEAN</Text>
              <Text style={styles.head5}>My Liquidity: {myLiquidity} OCEAN</Text>
            </View>
            :<Text></Text>}
            <Button
              color="#f2f2f2"
              title="Approve & Stake"
              buttonStyle={styles.button}
              onPress={() => StakeDT()}
              textStyle={styles.buttonText}
            />
              <Button
              color="#f2f2f2"
              title="UnStake"
              buttonStyle={styles.button}
              onPress={() => UnStakeDT()}
              textStyle={styles.buttonText}
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
              <Text style={styles.head5}>DT-Token UnStaked: {Amount} OCEAN</Text>
              <Text style={styles.head5}>My Liquidity: {myLiquidity} OCEAN</Text>
            </View>
            :<Text></Text>}
          </View>
          <Text />
        </View>
      </ScrollView>
    );
  };
 
export default FormLiquidity;  
  