import React, { FC, ReactElement, useEffect, useState, useCallback } from 'react'
import { View, TextInput, Text, ScrollView, ActivityIndicator } from 'react-native'
import Button from '../components/Button';
import Decimal from 'decimal.js'
import { OceanPool } from '../components/OceanPool'
import { styles } from '../styles/walletactions';
//import WalletActions from '../components/WalletActions'
//import {OceanBalance} from '../components/WalletActions'
//import {PhecorBalance} from '../components/WalletActions'
import CButton from '../components/CButton';
import Slippage from '../components/Slippage'
//import  {Buy}  from '../components/Trade'
//import  {EthBalance}  from '../components/WalletActions'
//import { Sell } from '../components/Sell'
//import {ChildComponent} from "../components/Sell";
import * as presets from '../screens/FormTrade'
import { Picker } from '@react-native-picker/picker';
import { theme } from '../services/Common/theme';
//import {CurrencyCashScreen} from './Currency'
import { contracts, web3 } from '../web3/utils'
import minABI from '../abis/minABI.json'
import { Logger, getFairGasPrice } from '../utils'
import { MaxUint256 } from '../components/Pool';


const ocean = new OceanPool();

export default function FormSwap(props) {

  const [accountId, setAccountId] = useState("")
  const [destination, setDestination] = useState('');
  const [sellAmount, setSellAmount] = useState('0.001');
  const [sellAmountWanted, setSellAmountWanted] = useState('0.000');
  const [buyAmountWanted, setBuyAmounWanted] = useState('0.0000');
  const [buyAmount, setBuyAmount] = useState('0.000');
  const [minimumBuyDT, setMinimumBuyDT] = useState('0.000');
  const [minimumBuyOcean, setMinimumBuyOcean] = useState('0.000');
  const [maximumBuyDT, setMaximumBuyDT] = useState('0.000');
  const [maximumBuyOcean, setMaximumBuyOcean] = useState();
  const [dtAmountToReceive, setDTAmtToReceive] = useState('0.000');
  const [oceanAmountToReceive, setOceanAmtToReceive] = useState('0.000');
  const [SwapHash, setSwapHash] = useState('')
  const [SwapError, setSwapError] = useState('')
  const [SwapOutHash, setSwapOutHash] = useState('')
  const [SwapOutError, setSwapOutError] = useState('')
  const [maxOceanBuyQuantity, setmaxOceanBuyQuantity] = useState('0.000')
  const [maxDTBuyQuantity, setmaxDTBuyQuantity] = useState('0.000')
  const [poolReserve, setPoolReserve] = useState('0.000')
  const [swapFeeValue, setSwapFeeValue] = useState('0.000')
  const [myLiquidity, setMyLiquidity] = useState(0.0)
  const [slippageValues, setSlippageValues] = useState([])
  const [firstTitleTokens, setFirstTitleTokens] = useState([])
  const [secondTitleTokens, setSecondTitleTokens] = useState([])
  const [firstTitleText, setFirstTitleText] = useState("SELL");
  const [secondTitleText, setSecondTitleText] = useState("BUY");
  const [ethBal, setEthBal] = useState('0.000');
  const [tokenBal, setTokenBal] = useState('0.000');
  const [oceanBal, setOceanBal] = useState('0.000');
  const [symbolList, setSymbolList] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [approvalGasEst, setApprovalGasEst] = useState('0')
  const [swapGasEst, setSwapGasEst] = useState('0')


  //const impact = new Decimal(100 - Number(values.slippage)).div(100) //values.slippage
  const precision = 15
  const zeroAmountGas = 29021

 

  
  async function Swap() {

    const zeros = '0.000'
    const priceImpact = (slippageValues !== 'undefined' || slippageValues !== 'null') ? slippageValues : '0.001'
    const buyAmount_ = new Decimal(sellAmount).mul(Number(slippageValues)).toFixed(precision).toString()
    const sellAmount_ = new Decimal(sellAmount).toFixed(precision).toString()

    try {
      console.log({
        ethBal: ethBal, oceanBal: oceanBal, tokenBal: tokenBal,
        sellAmount: sellAmount_, buyAmount: buyAmount_
      })

      if (
        ethBal == Number(zeros).toFixed(precision) ||
        oceanBal == Number(zeros).toFixed(precision) ||
        tokenBal == Number(zeros).toFixed(precision) ||
        buyAmount_ == Number(zeros).toFixed(precision) ||
        sellAmount_ == Number(zeros).toFixed(precision)) {

        setSwapError("Insufficient balances. ETH, OCEAN, and Datatoken balances \
           should be more than zero and sufficient!")
        return
      }

      // estimate gas for both approval and swap

      setSwapError("")

      const tx =
        //values.type === 'buy'
        secondTitleText === 'BUY' && symbolList[0] === firstTitleTokens
          ? await ocean.buyDTWithExactOcean(
            accountId, // account: string,
            destination, //poolAddress: string
            buyAmount, // dtAmountWanted: string... from the pool; slippage attached here
            sellAmount //oceanAmount: string       
          )
          : await ocean.sellDT(
            accountId,//   account: string
            destination, // poolAddress: string,
            sellAmount, // dtAmount: string,  
            buyAmount // oceanAmountWanted... from the pool; slippage attached here
          );

      console.log({ tx: tx })
      // tx?.setSwapOutHash(tx.transactionHash)
      setSwapHash(tx?.transactionHash)
      // setOceanMaxAddLiq((Math.round((await ocean.getDTMaxAddLiquidity(destination)) * 100)) / 100)
      setmaxOceanBuyQuantity((Math.round((await ocean.getOceanMaxBuyQuantity(destination,
        await ocean.getDTAddress(destination))) * 100)) / 100)
      setPoolReserve((Math.round((await ocean.getDTReserve(destination)) * 100)) / 100)
      setMyLiquidity((Math.round((await ocean.sharesBalance(accountId, destination)) * 100)) / 100)

      //setDTMaxAddLiq((Math.round((await ocean.getDTMaxAddLiquidity(destination)) * 100)) / 100)
      setmaxDTBuyQuantity((Math.round((await ocean.getDTMaxBuyQuantity(destination,
        await ocean.getDTAddress(destination))) * 100)) / 100)

      // setSwapFee((Math.round((poolSwapFee) * 100)) / 100)
      // setSwapFee(await ocean.getSwapFee(destination))
   //   console.log({
    //    buyAmount: buyAmount_, maxOceanBuyQuantity: maxOceanBuyQuantity,
    //    sellAmount: sellAmount_, maxDTBuyQuantity: maxDTBuyQuantity
     // })
   //   if (buyAmount_ > maxOceanBuyQuantity) {
   //     setSwapError("ERROR: Buy quantity exceeds quantity allowed! \
   //           Buying Ocean (Selling DtToken) failed! ")
   //     setBuyAmount(Math.round((buyAmount_ * 100)) / 100)
    //    return null
     // }

    } catch (error) {

      setSwapError("Swap failed!")
      setmaxOceanBuyQuantity((Math.round((await ocean.getOceanMaxBuyQuantity(destination,
        await ocean.getDTAddress(destination))) * 100)) / 100)
      setPoolReserve((Math.round((await ocean.getDTReserve(destination)) * 100)) / 100)
      setMyLiquidity((Math.round((await ocean.sharesBalance(accountId, destination)) * 100)) / 100)
      console.log({ error: error.message })
    }
  }


  useEffect(() => {
    // Get maximum amount for either OCEAN or datatoken
    async function getMaximum() {
      setAccountId(props.route.params.publicKey)
      if (!accountId || !destination || !sellAmount) return
      //const poolAddress = "0x561af90e8233e924805eAD217De7fdd4BBe41Fd4"
      const oceanAddress = await ocean.getDTAddress(destination)
      const poolTokens = await ocean.getCurrentTokens(destination)
      const dtAddress = poolTokens[0]
      const maxTokensInPool = await ocean.getDTMaxBuyQuantity(destination)
      const dtReserve = await ocean.getReserve(destination, dtAddress)
      const oceanReserve = await ocean.getReserve(destination, oceanAddress)
      const maxBuyDT = await ocean.getMaxBuyQuantity(destination, oceanAddress)
      const maxBuyOcean_ = await ocean.getMaxBuyQuantity(destination, dtAddress)
      const sellAmountWanted = new Decimal(sellAmount).mul(5).toFixed(precision).toString()
      const DTAmount = new Decimal(sellAmount).toFixed(precision).toString()
      const maxBuyOcean = await ocean.getOceanReceived(destination, DTAmount)
      const maxBuyDt = await ocean.getDTReceived(destination, sellAmount)

     // console.log({ maxBuyOcean: maxBuyOcean, maxBuyDt: maxBuyDt, maxBuyOcean_: maxBuyOcean_ })
     // console.log({ buyAmount: DTAmount, sellAmountWanted: sellAmountWanted })
     // console.log({ OceanAvailableFromPool: maxBuyDT, DTAvailableFromPool: maxBuyOcean, maxBuyOcean: maxBuyOcean })
     // console.log({ dtReserve: dtReserve, oceanReserve: oceanReserve, maxOceanInPool_I_can_buy: maxTokensInPool })
     // console.log({ oceanAddress: oceanAddress, dtAddress: dtAddress, maxDTBuy: maxBuyDT, maxOceanBuy: maxBuyOcean })
    }
    getMaximum()
  }, [accountId, destination, sellAmount])

  // Get swap fee
  useEffect(() => {
    setAccountId(props.route.params.publicKey)
    setSwapError('')
    console.log({ accountId: accountId })
    setDestination(contracts.newPool3)

    if (!ocean || !destination || !accountId) return
    async function getSwapFee() {
      const swapFee = await ocean.getSwapFee(destination)
      // swapFee is tricky: to get 0.1% you need to convert from 0.001
      //setSwapFee(`${Number(swapFee) * 100}`)
      const fee = `${Number(swapFee) * 100}`
      const oceanValue = Number(swapFee * sellAmount)
      const dtValue = Number(swapFee * sellAmount)
      const value =
        secondTitleText === 'BUY'
          ? oceanValue
          : dtValue
      setSwapFeeValue(value.toString())

   //   console.log({swapFee: fee, OceanSwapFeeValue: oceanValue.toString(),
     //   DatatokenSwapFeeValue: dtValue.toString(), swapFeeValue: value.toString()})

      //console.log({EthBalance: await EthBalance()})
    }
    getSwapFee()
  }, [ocean, destination, sellAmount, accountId])

  // Get output values
  useEffect(() => {
    if (!ocean || !destination || !accountId) return

    async function getOutput() {
      // Minimum received
      // TODO: check if this here is redundant cause we call some of that already in Swap.tsx
      // const maxBuyDt = await ocean.getDTReceived(destination, sellAmount)
      let tokenInstance, oceanInstance, symbolList_
      const dtAddress = await ocean.getDTAddress(destination)
      const tokens = await ocean.getCurrentTokens(destination)
     // console.log({ dtAddr: dtAddress, tokens: tokens, destination: destination })
      const dtAmountToReceive = await ocean.getDTReceived(destination, sellAmount)
      const oceanAmountToReceive = await ocean.getOceanReceived(destination, sellAmount)
      const maxBuyDT = await ocean.getMaxBuyQuantity(destination, tokens[0]) //max datatoken to buy with available ocean in pool
      const maxBuyOcean = await ocean.getMaxBuyQuantity(destination, dtAddress) //max ocean to buy
      const myMaxBuyOCEAN = await ocean.getOceanMaxBuyQuantity(destination, dtAddress)
      const myMaxBuyDT = await ocean.getDTMaxBuyQuantity(destination, tokens[0])
      const slippage = 5;
      const maxImpact = 1 - Number(slippageValues) / 100
      const minBuyDT = dtAmountToReceive * maxImpact.toString()
      const minBuyOcean = oceanAmountToReceive * maxImpact.toString()
      const OceanMaxPrice = sellAmount * maxImpact.toString()
      const maxPrice =
        secondTitleText === 'BUY' && symbolList[0] === firstTitleTokens
          ? (dtAmountToReceive * maxImpact).toString()
          : (oceanAmountToReceive * maxImpact).toString()

      if (tokens[0] !== dtAddress) {
      //  console.log({ poolTokenAddress: tokens[0], oceanAddress: dtAddress })
        tokenInstance = new web3.eth.Contract(minABI, tokens[0]);
        oceanInstance = new web3.eth.Contract(minABI, dtAddress);

        try {
          const ethBal = await web3.eth.getBalance(accountId).then((bal) => web3.utils.fromWei(bal, 'ether'));
          const oceanBal = await oceanInstance.methods.balanceOf(accountId).call()
          const tokenBal = await tokenInstance.methods.balanceOf(accountId).call()
          const oceanSymbol = await oceanInstance.methods.symbol().call()
          const tokenSymbol = await tokenInstance.methods.symbol().call()

          let formattedOceanBal = web3.utils.fromWei(oceanBal)
          let formattedTokenBal = web3.utils.fromWei(tokenBal)

          symbolList_ = [oceanSymbol, tokenSymbol]
          console.log('symbolList_:', symbolList_)
          setSymbolList(symbolList_);
          setEthBal(Number(ethBal).toFixed(3))
          setTokenBal(Number(formattedTokenBal).toFixed(3))
          setOceanBal(Number(formattedOceanBal).toFixed(3))

       //   console.log({ myMaxBuyOCEAN: myMaxBuyOCEAN, myMaxBuyDT: myMaxBuyDT })
         // console.log({ maxBuyDT: maxBuyDT, maxBuyOcean: maxBuyOcean })
         // console.log({ dtAmountToReceive: dtAmountToReceive, oceanAmountToReceive: oceanAmountToReceive })
         // console.log({
         //   ethBal: `${Number(ethBal).toFixed(3)} ETH`, tokenBal: `${Number(formattedTokenBal).toFixed(3)} ${tokenSymbol}`,
         //   oceanBal: `${Number(formattedOceanBal).toFixed(3)} ${oceanSymbol}`, symbolList: symbolList,
         //   firstSymbol: symbolList[0], secondSymbol: symbolList[1]
         // })

        }
        catch (e) {
          console.log(e)
        }
      }
      if (minBuyDT !== undefined && minBuyOcean !== undefined) {
      setMinimumBuyDT(Number(minBuyDT).toFixed(3))
      setMinimumBuyOcean(Number(minBuyOcean).toFixed(3))
      setMaximumBuyDT(Number(maxBuyDT).toFixed(3))
      setMaximumBuyOcean(Number(maxBuyOcean).toFixed(3))
      sellAmount ? setDTAmtToReceive(Number(dtAmountToReceive).toFixed(3))
        : setDTAmtToReceive('0.000')
      sellAmount ? setOceanAmtToReceive(Number(oceanAmountToReceive).toFixed(3))
        : setOceanAmtToReceive('0.000')
      }
   //   console.log("getting minimum received...")
     // console.log({
     //   maxImpact: maxImpact, minBuyDT: minBuyDT, minBuyOcean: minBuyOcean, OceanMaxPrice: OceanMaxPrice,
     //   maxPrice: maxPrice, maxBuyOcean: maxBuyOcean, maxBuyDT: maxBuyDT
     // })
    }
    getOutput()
  }, [ocean, destination, sellAmount, accountId, ethBal, tokenBal, oceanBal])

  useEffect(() => {

    console.log({ address: accountId, sellAmount: sellAmount, destination: destination })
    if (!sellAmount || !accountId || !destination) return

    const estimateGas = async () => {
      //const gasLimitDefault = ocean.GASLIMIT_DEFAULT
      const token = new web3.eth.Contract(ocean.poolABI, destination, {
        from: accountId
      })


      let oceanAddress = await ocean.getDTAddress(destination)
     // console.log({ rounded: Math.round(Number(sellAmount)) })

      let approvalGasEst, swapGasEst
      try {
        approvalGasEst = await token.methods
          .approve(oceanAddress, Math.round(Number(sellAmount)))
          .estimateGas({ from: accountId }, (err, estGas) => (err ? gasLimitDefault : estGas))
        setApprovalGasEst(approvalGasEst)
       // console.log({ approvalGasEstimate: approvalGasEst, fairGasPrice: await getFairGasPrice(web3) })

        swapGasEst = await pool.methods
          .swapExactAmountIn(
            oceanAddress, //tokenIn (Address)
            web3.utils.toWei(sellAmount), //tokenAmountIn (String)
            tokenOut, //tokenOut(Address)
            web3.utils.toWei('0'), //minAmountOut(String))
            MaxUint256 //maxPrice (Constant,Number)
          )
          .estimateGas({ from: account }, (err, estGas) => (err ? gasLimitDefault : estGas))
        setSwapGasEst(swapGasEst)
        //console.log({ swapGasEstimate: swapGasEst, fairGasPrice: await getFairGasPrice(web3) })

      } catch (e) {
        approvalGasEst = ocean.GASLIMIT_DEFAULT
        swapGasEst = ocean.GASLIMIT_DEFAULT
      }
      // return estGas
    }

    estimateGas()
  }, [accountId, sellAmount, destination])

  const computeBuy = () => {
    let buyResult = 0.00
    buyResult = (firstTitleTokens === symbolList[0]) && (firstTitleText == 'SELL') // SELL OCEAN
      // || (secondTitleTokens === symbolList[1]) && (secondTitleText == 'BUY')// Receive(BUY) Datatoken
      ? dtAmountToReceive
      : oceanAmountToReceive

   // console.log({ buyResult: buyResult })


    return buyResult;

  }

  return (

    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        <Text style={{ fontFamily: 'Cochin', fontSize: 20, fontWeight: 'bold' }}>Destination</Text>
        <View>
          <TextInput
            selectable={true}
            selectTextOnFocus={true}
            // placeholder="pool address"
            value={destination}
            onChangeText={(address) => setDestination(address)}
          />
        </View>
        {destination !== "" ?
          <View style={styles.parent}>
            {firstTitleTokens ?
              <View>
                <Text style={{ fontFamily: 'Cochin', fontSize: 15, marginBottom: 10 }}> Wallet Balances(Maximum to Spend)</Text>
                <Text style={styles.head2}>{`${ethBal} ETH`}</Text>
              </View>
              :
              <View><ActivityIndicator size="small" color={theme.APP_COLOR} /></View>}
            <View style={styles.topContainer}>
              {(firstTitleTokens == symbolList[0]) ?
                <View style={styles.alignEnd}>
                  <Text style={styles.head2}>{`${oceanBal} ${symbolList[0]}`}</Text>
                </View>
                : (firstTitleTokens == symbolList[1]) ?
                  <View style={styles.alignEnd}>
                    <Text style={styles.head2}>{`${tokenBal} ${symbolList[1]}`}</Text>
                  </View>
                  : <View><ActivityIndicator size="small" color={theme.APP_COLOR} /></View>
              }
            </View>
          </View>
          : <View><ActivityIndicator size="small" color={theme.APP_COLOR} /></View>}
        <View >
          <Text style={{ marginBottom: -39, marginTop: 15, fontWeight: 'bold', fontSize: 20, color: 'green' }}
          // onPress={toggleTitle} 
          >
            {firstTitleText}
          </Text>
          <View>
            <Picker
              style={{ height: 50, width: 120, alignSelf: 'flex-end' }}
              mode="dropdown"
              selectedValue={firstTitleTokens}
              onValueChange={(itemValue, itemIndex) => setFirstTitleTokens(itemValue)}>
              {symbolList.map((item, index) => {
                //setSlippageValues(item)
                return (<Picker.Item label={item} value={item} key={index} />)
              })}
            </Picker>
            <TextInput
              //placeholder="amount"
              selectTextOnFocus={true}
              defaultValue={sellAmount}
              onChangeText={(amount) => setSellAmount(amount)}
              style={{ marginTop: -20, fontSize: 15 }}
            //underlineColorAndroid='#ffff'
            />
          </View>
          <Text style={{ marginBottom: -39, marginTop: 15, fontWeight: 'bold', fontSize: 20, color: 'green' }} >
            {secondTitleText}
          </Text>
          <View>
            <Picker
              style={{ height: 50, width: 120, alignSelf: 'flex-end' }}
              mode="dropdown"
              selectedValue={secondTitleTokens}
              onValueChange={(itemValue, itemIndex) => setSecondTitleTokens(itemValue)
              }>
              {symbolList.map((item, index) => {
                return (<Picker.Item label={item} value={item} key={index} />)
              })}
            </Picker>
            <TextInput
              // placeholder="amount"
              // defaultValue='0.000'
              value={(firstTitleTokens !== secondTitleTokens)
                ? computeBuy()
                : 'Warning: You cannot Swap same tokens! '}
              // onChangeText={(amount) => setBuyAmount(amount)}
              style={{ marginTop: -20, fontSize: 15 }}
            />
          </View>
          {destination !== '' ?
            <View style={styles.parent}>
              <Text style={styles.head6}>Available Pool Balance:{
                (firstTitleTokens === symbolList[0]) && (firstTitleText == 'SELL')
                  ? `${maximumBuyDT} ${symbolList[1]}`
                  : `${maximumBuyOcean} ${symbolList[0]}`
              }</Text>
              {/** 
          <Text style={styles.head6}>Maximum to Receive/Buy:{
            (firstTitleTokens === symbolList[0]) && (firstTitleText == 'SELL')
            ? '0'
            : '0'
           }</Text>
           */}
              <Text style={styles.head6}>Minimum to Receive/Buy:{
                (firstTitleTokens === symbolList[0]) && (firstTitleText == 'SELL')
                  ? `${minimumBuyDT} ${symbolList[1]}`
                  : `${minimumBuyOcean} ${symbolList[0]}`
              } </Text>
              <Text style={styles.head6}>Swap Fee:{swapFeeValue}</Text>
              <View>
                <View style={styles.topContainer}>
                  <View>
                    <Text style={styles.head6}> Expected Price Impact(Slippage):{''}</Text>
                  </View>
                  <View style={styles.alignEnd}>
                    <View >
                      <Picker
                        style={styles.picker}
                        mode="dropdown"
                        selectedValue={(slippageValues !== 'undefined' || slippageValues !== 'null') ? slippageValues : '0.001'}
                        onValueChange={(itemValue, itemIndex) => setSlippageValues(itemValue)}>
                        {presets.slippagePresets.map((item, index) => {
                          return (<Picker.Item label={item} value={item} key={index} />)
                        })}
                      </Picker>
                    </View>
                  </View>
                  {SwapHash ?
                  <View style={styles.parent}>
                    <Text numberOfLines={1} style={{ color: 'green' }}>SWAP SUCCESSFUL! Hash: {SwapHash}</Text>
                    <CButton text={SwapHash} />
                    <Text style={styles.head5}>My Liquidity: {myLiquidity} OCEAN</Text>
                  </View>
                : <View></View>}
                </View>
              </View>
            </View>
            : <View><ActivityIndicator size="small" color={theme.APP_COLOR} /></View>
          }

          <View>
          </View>
          {SwapError ?
            <View style={styles.parent}>
              <Text numberOfLines={1} style={{ color: 'red' }}>{SwapError}</Text>
            </View>
            : <Text></Text>}
          <View>
            {sellAmount > 0.001
              ? <Text style={styles.head6}>
                Approval Gas Estimate: {approvalGasEst} WEI ({((web3.utils.fromWei(approvalGasEst.toString(), 'ether')) * 1000000000).toFixed(9)})ETH)</Text>
              : <View></View>
            }
            {swapGasEst > 0
              ? <Text style={styles.head6}>
                Swap Gas Estimate: {swapGasEst} WEI ({((web3.utils.fromWei(swapGasEst.toString(), 'ether')) * 1000000000).toFixed(9)}ETH)</Text>
              : <View></View>
            }
          </View>
          <Button
            color="#f2f2f2"
            title="Approve & Swap"
            buttonStyle={styles.button}
            onPress={() => Swap()}
            textStyle={styles.buttonText}
            disabled={
              destination !== "" && ethBal > 0 &&
                oceanBal > 0 && tokenBal > 0 ? false : true}
          />
        </View>
      </View>

    </ScrollView>
  )
}
