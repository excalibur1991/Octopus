import { actions } from '../../services/State/Reducer';
import i18n from '../../languages/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../../functions/walletsettings';
import { POOL_ADDRESS } from '../../../env';
import { web3 } from '../../web3/utils';
import minABI from '../../abis/minABI.json'
import {
  oceanHelper,
  retrievedCurrTokens,
  retrievedCoins,
  currWalletBals,
  calcSharesBal
} from '../../functions/walletactions';



const calculateAdd = async (
  setUserInfo,
  setOceanAddress,
  setDtAddress,
  setSymbolList,
  setWeightDt,
  setWeightOcean,
  setSwapFee,
  setDtReserve,
  setOceanReserve,
  setTotalPoolTokens


) => {

  const userInfo = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));

  try {
    if (userInfo !== null) {
      setUserInfo(userInfo);

      const poolDtToken = await oceanHelper().getDTAddress(POOL_ADDRESS) //bug, gives oceanAddress instead of dtAddress
      const coins = await retrievedCoins(web3, minABI, POOL_ADDRESS)

      const address = await retrievedCurrTokens(POOL_ADDRESS)

      setSymbolList(coins);
      setDtAddress(address.tokenAddress)
      setOceanAddress(address.oceanAddress)


      // Get everything which is in the pool
      const totalPoolTokens = await oceanHelper().getPoolSharesTotalSupply(
        POOL_ADDRESS //price.address
      )
      setTotalPoolTokens(Number(totalPoolTokens).toFixed(2))


      // Get swap fee
      const swapFee = await oceanHelper().getSwapFee(POOL_ADDRESS)
      setSwapFee(`${Number(swapFee) * 100}`)

      // Get weights
      const weightDt = await oceanHelper().getDenormalizedWeight(
        POOL_ADDRESS, // price.address, 
        address.tokenAddress // ddo.dataToken 
      )
      setWeightDt(`${Number(weightDt) * 10}`)
      setWeightOcean(`${100 - Number(weightDt) * 10}`)

      const dtReserve = await oceanHelper().getReserve(POOL_ADDRESS, address.tokenAddress)
      const oceanReserve = await oceanHelper().getReserve(POOL_ADDRESS, address.oceanAddress)
      setDtReserve(Number(dtReserve).toFixed(2))
      setOceanReserve(Number(oceanReserve).toFixed(2))


    }
  }
  catch (e) {

  }

}

const calcWalletBals = async (
  setEthBal,
  setTokenBal,
  setOceanBal,
  setUserLiquidity,
  setTotalPoolTokens,
) => {
  // const userInfo = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));

  // if (userInfo !== null) {
  //  console.log({oceanHelper: oceanHelper(), retrievedCurrTokens: await retrievedCurrTokens(POOL_ADDRESS)})
  // console.log({retrievedCoins:await retrievedCoins(web3,minABI,POOL_ADDRESS),retrievedContracts:await retrievedContracts(web3,minABI,POOL_ADDRESS)})
  //  console.log({currWalletBals:await currWalletBals(web3, minABI, POOL_ADDRESS)}) 

  try {
    const ethBal = (await currWalletBals(web3, minABI, POOL_ADDRESS)).ethBal
    const oceanBal = (await currWalletBals(web3, minABI, POOL_ADDRESS)).oceanBal
    const tokenBal = (await currWalletBals(web3, minABI, POOL_ADDRESS)).tokenBal
    const userShares = await calcSharesBal(POOL_ADDRESS)
    // console.log({ userShares: userShares })



    if (ethBal && oceanBal && tokenBal || userShares !== null) {
      setEthBal(ethBal);
      setOceanBal(oceanBal);
      setTokenBal(tokenBal)
      setUserLiquidity(userShares)
    }




  }
  catch (error) {
    // console.log(`error:${error}`)
  }

  //  console.log({ethBal:ethBal, oceanBal:oceanBal, tokenBal:tokenBal})



  // }

}

export const getAllAddCalcs = async (
  dispatch,
  setUserInfo,
  setOceanAddress,
  setDtAddress,
  setSymbolList,
  setWeightDt,
  setWeightOcean,
  setSwapFee,
  setDtReserve,
  setOceanReserve,
  setTotalPoolTokens

) => {
  try {
    dispatch({
      type: actions.SET_OVERALL,
    });
    calculateAdd(
      setUserInfo,
      setOceanAddress,
      setDtAddress,
      setSymbolList,
      setWeightDt,
      setWeightOcean,
      setSwapFee,
      setDtReserve,
      setOceanReserve,
      setTotalPoolTokens
    )


  } catch (error) {
    dispatch({
      type: actions.SET_ALERT_SETTINGS,
      alertSettings: {
        show: true,
        type: 'error',
        title: i18n.t('messages.errorOccured'),
        message: i18n.t('messages.tryAgainLater'),
        showConfirmButton: true,
        confirmText: i18n.t('messages.ok'),
      },
    });
  }
};

export const getWalletBalances = async (
  dispatch,
  setEthBal,
  setTokenBal,
  setOceanBal,
  setUserLiquidity

) => {
  try {
    dispatch({
      type: actions.SET_OVERALL,
    });
    calcWalletBals(
      setEthBal,
      setTokenBal,
      setOceanBal,
      setUserLiquidity
    )


  } catch (error) {
    dispatch({
      type: actions.SET_ALERT_SETTINGS,
      alertSettings: {
        show: true,
        type: 'error',
        title: i18n.t('messages.errorOccured'),
        message: i18n.t('messages.tryAgainLater'),
        showConfirmButton: true,
        confirmText: i18n.t('messages.ok'),
      },
    });
  }
};
