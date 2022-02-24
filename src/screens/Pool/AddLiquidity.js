import { actions } from '../../services/State/Reducer';
import i18n from '../../languages/i18n';
import update from 'immutability-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../../functions/walletsettings';
import { POOL_ADDRESS } from '../../../env';
import { web3 } from '../../web3/utils';
import { calculateTokenBal } from '../../functions/walletactions';
import { OceanPool } from '../../components/OceanPool'
import minABI from '../../abis/minABI.json'


async function calculateValues(
  setUserInfo,
  setEthBal,
  setTokenBal,
  setOceanBal,
  setOceanAddress,
  setDtAddress,
  setSymbolList,
  setUserLiquidity,
  setPoolTokens,
  setTotalPoolTokens,
  setWeightDt,
  setWeightOcean,
  setSwapFee,
  setDtReserve,
  setOceanReserve


) {
  const helper = new OceanPool();
  const userInfo = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
  let oceanBal;
  let tokenBal;
  let oceanBalance;
  let tokenBalance;

try {
  if (userInfo !== null) {
    setUserInfo(userInfo);
    // setOcean(helper)
    //   setNewAccount({...userInfo.publicKey})
    //  console.log({MyNewAccount:userInfo.publicKey})

    const poolDtToken = await helper.getDTAddress(POOL_ADDRESS) //bug, gives oceanAddress instead of dtAddress
    const currTokens = await helper.getCurrentTokens(POOL_ADDRESS)
    // console.log({currTokens:currTokens}) // [dtAddress, oceanAddress]
    const tokenInstance = new web3.eth.Contract(minABI, currTokens[0]);
    const oceanInstance = new web3.eth.Contract(minABI, currTokens[1]);
    const oceanSymbol = await oceanInstance.methods.symbol().call()
    const tokenSymbol = await tokenInstance.methods.symbol().call()
    setSymbolList([oceanSymbol, tokenSymbol]);

    const ethBal = await web3.eth.getBalance(userInfo.publicKey).then((bal) =>
      Number(web3.utils.fromWei(bal, 'ether')).toFixed(2));

    tokenBal = await calculateTokenBal(tokenInstance, userInfo.publicKey)
    tokenBalance = Number(web3.utils.fromWei(tokenBal)).toFixed(2)
    setTokenBal(tokenBalance)

    oceanBal = await calculateTokenBal(oceanInstance, userInfo.publicKey)
    oceanBalance = Number(web3.utils.fromWei(oceanBal)).toFixed(2)
    setOceanBal(oceanBalance)

    setEthBal(ethBal)
    setDtAddress(currTokens[0])
    setOceanAddress(currTokens[1])

    // Get everything the user has put into the pool (My Liquidity)
    const userShares = await helper.sharesBalance(
      userInfo.publicKey, // accountId,
      POOL_ADDRESS //price.address
    )
    setUserLiquidity(userShares)


    // Get everything which is in the pool
    const totalPoolTokens = await helper.getPoolSharesTotalSupply(
      POOL_ADDRESS //price.address
    )
    setTotalPoolTokens(totalPoolTokens)

    // Get everything the user has put into the pool
    const poolTokens = await helper.sharesBalance( //already calc as usershares...
      userInfo.publicKey, // accountId,
      POOL_ADDRESS //price.address
    )
    setPoolTokens(poolTokens)

    // calculate user's provided liquidity based on pool tokens
    const userOceanBalance =
      (Number(poolTokens) / Number(totalPoolTokens))
      * Number(oceanBal) // * price.ocean ???

    const userDtBalance =
      (Number(poolTokens) / Number(totalPoolTokens))
      * Number(tokenBal)// * price.datatoken  ???

    const myLiquidity = {
      ocean: Number(userOceanBalance) / (10**18),
      datatoken: Number(userDtBalance) / (10**18),
    }

    // Get swap fee
    const swapFee = await helper.getSwapFee(POOL_ADDRESS)
    setSwapFee(`${Number(swapFee) * 100}`)

    // Get weights
    const weightDt = await helper.getDenormalizedWeight(
      POOL_ADDRESS, // price.address, 
      currTokens[0] // ddo.dataToken 
    )
    setWeightDt(`${Number(weightDt) * 10}`)
    setWeightOcean(`${100 - Number(weightDt) * 10}`)
   
    const dtReserve = await helper.getReserve(POOL_ADDRESS, currTokens[0])
    const oceanReserve = await helper.getReserve(POOL_ADDRESS, currTokens[1])
    setDtReserve(dtReserve)
    setOceanReserve(oceanReserve)

   
  }
}
catch(e) {

} 

}


export const getAllCalculations = async (
  dispatch,
  setUserInfo,
  setEthBal,
  setTokenBal,
  setOceanBal,
  setOceanAddress,
  setDtAddress,
  setSymbolList,
  setUserLiquidity,
  setTotalTokens,
  setTotalPoolTokens,
  setWeightDt,
  setWeightOcean,
  setSwapFee,
  setDtReserve,
  setOceanReserve

) => {
  try {
    dispatch({
      type: actions.SET_OVERALL,
    });
    calculateValues(
      setUserInfo,
      setEthBal,
      setTokenBal,
      setOceanBal,
      setOceanAddress,
      setDtAddress,
      setSymbolList,
      setUserLiquidity,
      setTotalTokens,
      setTotalPoolTokens,
      setWeightDt,
      setWeightOcean,
      setSwapFee,
      setDtReserve,
      setOceanReserve
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