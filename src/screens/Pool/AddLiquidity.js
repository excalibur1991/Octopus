import React, { ReactElement, useState, useEffect } from 'react'
import {
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator
  } from 'react-native';
import * as Yup from 'yup'
import { Formik } from 'formik'
import FormAddLiquidity from '../../screens/Pool/FormAddLiquiditity';
import { OceanPool } from '../../components/OceanPool';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../../functions/walletsettings';
import { POOL_ADDRESS } from '../../../env';
import { web3 } from '../../web3/utils';
import { calculateTokenBal } from '../../functions/walletactions';
import  minABI from '../../abis/minABI.json'


export const AddLiquidity = ({
  setShowAdd,
  refreshInfo,
  poolAddress,
  totalPoolTokens,
  totalBalance,
  swapFee,
  dtSymbol,
  dtAddress,
  oceanAddress
}) => {

  const [txId, setTxId] = useState()
  const [coin, setCoin] = useState('OCEAN')
  const [dtBalance, setDtBalance] = useState()
  const [amountMax, setAmountMax] = useState()
  const [newPoolTokens, setNewPoolTokens] = useState('0')
  const [newPoolShare, setNewPoolShare] = useState('0')
  const [isWarningAccepted, setIsWarningAccepted] = useState(false)
  const [userInfo, setUserInfo] = useState('')
  const [newAccount, setNewAccount] = useState('')
  const [secondTitleTokens, setSecondTitleTokens] = useState([])
  const [symbolList, setSymbolList] = useState([]);
  const [oceanBal, setOceanBal] = useState('0');
  const [tokenBal, setTokenBal] = useState('0');
  const [maxDt, setMaxDt] = useState(0)
  const [maxOcean, setMaxOcean] = useState(0)
  const [helper] = useState(() => new OceanPool());


    // get stored values 
    useEffect(() => {
        async function getStoredValues() {
        const userInfo = JSON.parse( await AsyncStorage.getItem(STORAGE_KEY))
        //  console.log({info: userInfo})
        if (userInfo !== null) {
        setUserInfo(userInfo);
        setNewAccount(userInfo.publicKey)
          }

        }
     getStoredValues();
    }, [])

     // Get Balances...
    useEffect(() => {
        if (!userInfo && !helper && !POOL_ADDRESS) {return;}
        let tokenInstance, oceanInstance, symbolList_
    
        async function getBalances() { 
        const poolDtToken = await helper.getDTAddress(POOL_ADDRESS) 
        //const oceanAddress = await helper.getDTAddress(destination) 
          const currTokens = await helper.getCurrentTokens(POOL_ADDRESS)
    
          
          let dataToken, oceanAddress
          if (currTokens !== null && poolDtToken !== null) {
          for (dataToken of currTokens) {
            if (dataToken === currTokens[0]) {
                oceanAddress = currTokens[1]
            } 
                oceanAddress = currTokens[0]
          }
               tokenInstance = new web3.eth.Contract(minABI, oceanAddress);
               oceanInstance = new web3.eth.Contract(minABI, poolDtToken);
               const oceanSymbol = await oceanInstance.methods.symbol().call()
               const tokenSymbol = await tokenInstance.methods.symbol().call()
               symbolList_ = [oceanSymbol, tokenSymbol]
               setSymbolList([oceanSymbol, tokenSymbol]);
    
            //    const ethBal =  await web3.eth.getBalance(newAccount).then((bal) =>
            //                    Number(web3.utils.fromWei(bal, 'ether')).toFixed(1));
    
               calculateTokenBal(oceanInstance,newAccount)
                .then((oceanBal) => setOceanBal(Number(web3.utils.fromWei(oceanBal)).toFixed(1)
                ))
               calculateTokenBal(tokenInstance,newAccount)
                .then((tokenBal) => setDtBalance(Number(web3.utils.fromWei(tokenBal)).toFixed(1)
                ))
    
         // setDtAddress(poolDtToken)
          //setDtBalance(poolDtToken)
          //setOceanAddress(oceanAddress) 
          //setEthBal(ethBal)
        } 
      
        // const maxTokensInPool = await helper.getDTMaxBuyQuantity(destination) // OR
            const maxTokensInPool = await helper.getMaxBuyQuantity(POOL_ADDRESS,poolDtToken) //max buy datatoken
            const maxOceanInPool = await helper.getMaxBuyQuantity(POOL_ADDRESS,oceanAddress) //max buy ocean
            setMaxDt(Number(maxTokensInPool))
            setMaxOcean(Number(maxOceanInPool))
    
    //  console.log({poolDtToken:poolDtToken, currTokens:currTokens, dataToken:dataToken})
    //    console.log({oceanAddress:oceanAddress})
      }
        getBalances()
     }, [userInfo,helper])
    

    // Get maximum amount for either OCEAN or datatoken
    useEffect(() => {
        if (!helper || !POOL_ADDRESS) return

    async function getMaximum() {
        const amountMaxPool =
          
            coin === 'OCEAN'
            ? await helper.getMaxBuyQuantity(POOL_ADDRESS, dtAddress)
            : await helper.getMaxBuyQuantity(POOL_ADDRESS, oceanAddress)
        
        const amountMax =
            
            coin === 'OCEAN'
            ? Number(oceanBal) > Number(amountMaxPool)
                ? amountMaxPool
                : oceanBal
            : Number(tokenBal) > Number(amountMaxPool)
            ? amountMaxPool
            : tokenBal

        setAmountMax(amountMax)
        }
        getMaximum()
    }, [helper, POOL_ADDRESS, secondTitleTokens, tokenBal, oceanBal])


     return (

      <View >
        <FormAddLiquidity
          dtBalance={dtBalance}
          oceanBalance={oceanBal}
          dtSymbol={dtSymbol}
          amountMax={amountMax}
          totalPoolTokens={totalPoolTokens}
          totalBalance={totalBalance}
          poolAddress={poolAddress}
          oceanAddress={oceanAddress}
          dtAddress={dtAddress}
          setNewPoolTokens={setNewPoolTokens}
          setNewPoolShare={setNewPoolShare}
        />
      </View>

  )
}
