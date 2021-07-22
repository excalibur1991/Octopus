import React, { FC, ReactElement, useEffect, useState } from 'react'
import {View,TextInput,Text, ScrollView,} from 'react-native'
import Button from '../components/Button';
import Decimal from 'decimal.js'
import {OceanPool}  from '../components/OceanPool'
import {styles} from '../styles/walletactions';
import WalletActions from '../components/WalletActions'
import Slippage from '../components/Slippage'


 const ocean = new OceanPool();

export default function FormSwap(props) {

  const [accountId, setAccountId] = useState("")
  const [destination, setDestination] = useState('');
  const [Amount, setAmount] = useState('');
  const [OceanAmount, setOceanAmount] = useState('');
  const [approvalAmount, setApprovalAmount] = useState('');
  const [DatatokenAmount, setDatatokenAmount] = useState('');
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
  const [SwapInHash, setSwapInHash] = useState('')
  const [SwapInError, setSwapInError] = useState('')
  const [SwapOutHash, setSwapOutHash] = useState('')
  const [SwapOutError, setSwapOutError] = useState('')
  const [maxAddLiq, setMaxAddLiq] = useState(0.0)
  const [poolReserve, setPoolReserve] = useState(0.0)
  const [swapFee, setSwapFee] = useState(0.0)
  const [myLiquidity, setMyLiquidity] = useState(0.0)

  //const impact = new Decimal(100 - Number(values.slippage)).div(100) //values.slippage
  const precision = 15

  //Sell exact OCEAN while buying some Datatoken
  async function SwapOceanIn() {
    
      try {
        const tx =
        await ocean.buyDTWithExactOcean(
            accountId, // account: string,
            destination, //poolAddress: string
            new Decimal(DatatokenAmount) // minimumdtAmountWanted: string (to be supplied)
              .mul(5)// impact
              .toFixed(precision)
              .toString(),
            new Decimal(OceanAmount).toFixed(precision).toString() //oceanAmount: string
          )

        setSwapInHash(tx.transactionHash)
      } catch (error) {
        setSwapInError(error.message)
        console.log({error:error.message})
      }
    }

  //Buy exact OCEAN while selling some Datatoken
  async function SwapOceanOut() {
    
      try {
       
        const tx =
            await ocean.sellDT(
                accountId,//   account: string
                destination, // poolAddress: string,
                new Decimal(DatatokenAmount).toFixed(precision).toString(), // dtAmount: string,
                new Decimal(OceanAmount) //oceanAmountWanted: string
                  .mul(5)//impact
                  .toFixed(precision)
                  .toString()
              )
            
        setSwapOutHash(tx.transactionHash)

      } catch (error) {
        console.log({error:error.message})
        setSwapOutError(error.message)
      }
    }


  useEffect(() => {

    //const impact = new Decimal(100 - Number(values.slippage)).div(100) //values.slippage
    const getUserAccount = (props) => {
      setAccountId(props.route.params.publicKey)
      console.log({accountId:props.route.params.publicKey, props:props.route.params})
    } 
     
     getUserAccount(props);

  },[])

  return (

    <ScrollView showsVerticalScrollIndicator={true}>
    <View style={styles.container}>
     <WalletActions />
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
              onChangeText={(amount) => setOceanAmount(amount)}
            />
         <Text style={styles.sendTo}>Min Datatoken Amount</Text>
            <TextInput
              placeholder="enter amount"
              onChangeText={(amount) => setDatatokenAmount(amount)}
            />
  
            {SwapInError?
            <View style={styles.parent}>
              <Text numberOfLines={1} style={{color:'red'}}>{SwapInError}</Text>
              <Text style={styles.head5}>Pool Reserve: {poolReserve} OCEAN</Text>
              <Text style={styles.head5}>Pool Swap Fee: {swapFee} OCEAN</Text>
              <Text style={styles.head5}>My Liquidity: {myLiquidity} OCEAN</Text>
            </View>
            :<Text></Text>}
  
            {SwapInHash?
            <View style={styles.parent}>
              <Text numberOfLines={1} style={{color:'green'}}>BOUGHT DATATOKEN SUCCESSFULLY! Hash: {SwapInHash}</Text>
              <CButton text={SwapInHash}/>
              <Text style={styles.head5}>OCEAN Swaped: {Amount} OCEAN</Text>
              <Text style={styles.head5}>Pool Reserve: {poolReserve} OCEAN</Text>
              <Text style={styles.head5}>Pool Swap Fee: {swapFee} OCEAN</Text>
              <Text style={styles.head5}>My Liquidity: {myLiquidity} OCEAN</Text>
            </View>
            :<Text></Text>}
            <Button
              color="#f2f2f2"
              title="Approve & SwapIn"
              buttonStyle={styles.button}
              onPress={() => SwapOceanIn()}
              textStyle={styles.buttonText}
            />
              <Button
              color="#f2f2f2"
              title="SwapOut"
              buttonStyle={styles.button}
              onPress={() => SwapOceanOut()}
              textStyle={styles.buttonText}
            />
            {SwapOutError?
            <View style={styles.parent}>
              <Text numberOfLines={1} style={{color:'red'}}>{SwapOutError}</Text>
            </View>
            :<Text></Text>}
  
            {SwapOutHash?
            <View style={styles.parent}>
              <Text numberOfLines={1} style={{color:'green'}}>BOUGHT OCEAN SUCCESSFULLY! Hash: {SwapOutHash}</Text>
              <CButton text={SwapOutHash}/>
              <Text style={styles.head5}>Ocean Sold: {Amount} OCEAN</Text>
              <Text style={styles.head5}>My Liquidity: {myLiquidity} OCEAN</Text>
            </View>
            :<Text></Text>}
          </View> 
    </View>

    </ScrollView>
  )
}
