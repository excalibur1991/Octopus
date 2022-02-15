import React, { useEffect, useRef, useState } from 'react';
import {Text, 
  View,
  ScrollView, 
  TextInput, 
  Dimensions, 
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Button from '../components/Button';
import CopyTextBox from '../components/CopyTextBox';
import {theme} from '../services/Common/theme';
import CButton from '../components/CButton';
//import sendOnlyone from '../components/SendTokens'
import ApproveLiquidity from '../components/ApproveLiquidity';
import AddDTLiquidity from '../components/AddDTLiquidity';
import getCurrentTokens from '../components/AddDTLiquidity';
import Joinswap from '../components/Joinswap';
import JoinswapExternAmountIn from '../components/JoinswapExternAmountIn';
import * as StakesUtil from '../components/AddDTLiquidity';
import {contracts, web3} from '../web3/utils';
import {OceanPool} from '../components/OceanPool';
import minABI from '../abis/minABI.json'
import {styles} from '../styles/wallet';
import {withTranslation} from 'react-i18next';
import { WriteTextInput } from '../components/formikYup/TextInput';
import { CustomInput } from '../components/formikYup/TextInput';
import { Picker } from '@react-native-picker/picker';
import { useFormik, Formik, Field } from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker'
import { AddLiquidity } from './Pool/AddLiquidity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../functions/walletsettings';
import { POOL_ADDRESS } from '../../env';
import { MessageBox } from '../components/formikYup/TextInput';
import { calculateTokenBal } from '../functions/walletactions';
//import AddLiquidity from '../formik/screens/AddLiquidity';
import Ripple from '../components/Ripple';


const Wallet = ({t, navigation}) => {
  const [userInfo, setUserInfo] = useState('')
  const [secondTitleTokens, setSecondTitleTokens] = useState([])
  const [symbolList, setSymbolList] = useState([]);
  const [dtAddress, setDtAddress] = useState('');
  const [oceanAddress, setOceanAddress] = useState('');
  const [ethBal, setEthBal] = useState('')
  const [oceanBal, setOceanBal] = useState('');
  const [tokenBal, setTokenBal] = useState('');
  const [newAccount, setNewAccount] = useState('');
  const [helper] = useState(() => new OceanPool());
  const [maxDt, setMaxDt] = useState(0)
  const [maxOcean, setMaxOcean] = useState(0)
  const [poolTokens, setPoolTokens] = useState()
  const [totalPoolTokens, setTotalPoolTokens] = useState()
  const [userLiquidity, setUserLiquidity] = useState()
  const [swapFee, setSwapFee] = useState()
  const [weightOcean, setWeightOcean] = useState()
  const [weightDt, setWeightDt] = useState()
  const [showAdd, setShowAdd] = useState(false)
  const [showRemove, setShowRemove] = useState(false)
  const [isRemoveDisabled, setIsRemoveDisabled] = useState(false)
  const [hasAddedLiquidity, setHasAddedLiquidity] = useState(false)
  const [poolShare, setPoolShare] = useState()
  const [totalUserLiquidityInOcean, setTotalUserLiquidityInOcean] = useState(0)
  const [totalLiquidityInOcean, setTotalLiquidityInOcean] = useState(0)
  const [
    creatorTotalLiquidityInOcean,
    setCreatorTotalLiquidityInOcean
  ] = useState(0)
  const [creatorLiquidity, setCreatorLiquidity] = useState()
  const [creatorPoolTokens, setCreatorPoolTokens] = useState()
  const [creatorPoolShare, setCreatorPoolShare] = useState()
  const [loading, setLoading] = useState(false);
  const [amountMax, setAmountMax] = useState(0)
  const [refreshPool, setRefreshPool] = useState(false)
  const [tab, setTab] = useState('UnStake');

  // get stored values 
  useEffect(() => {
    async function getStoredValues() {
      const userInfo = JSON.parse( await AsyncStorage.getItem(STORAGE_KEY))
    //  console.log({info: userInfo})
    if (userInfo !== null) {
      setUserInfo(userInfo);
      setNewAccount(userInfo.publicKey)
    }

    // if ( values !== null && web3.utils.isAddress(POOL_ADDRESS) === true) {
    //    //do sth with this values
    //    setAmount(values.amount)
    //   }
    }
  getStoredValues();
  }, [])

     // Get Balances...
  useEffect(() => {
    if (!userInfo && !helper && !POOL_ADDRESS) {return;}
    let tokenInstance, oceanInstance, symbolList_
      
     // console.log({dest:destination, newAccount:newAccount, amount:amount})
  
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
           
            //  console.log({oceanAddress:oceanAddress, symbolList:symbolList, symbolList:symbolList,})
             //setOceanAddress(oceanAddress) 
            // console.log({oceanAddress:oceanAddress})
        }
             tokenInstance = new web3.eth.Contract(minABI, oceanAddress);
             oceanInstance = new web3.eth.Contract(minABI, poolDtToken);
             const oceanSymbol = await oceanInstance.methods.symbol().call()
             const tokenSymbol = await tokenInstance.methods.symbol().call()
             symbolList_ = [oceanSymbol, tokenSymbol]
            // console.log('symbolList_:', symbolList_)
             setSymbolList([oceanSymbol, tokenSymbol]);
  
             const ethBal =  await web3.eth.getBalance(newAccount).then((bal) =>
                             Number(web3.utils.fromWei(bal, 'ether')).toFixed(1));
  
             calculateTokenBal(oceanInstance,newAccount)
              .then((oceanBal) => setOceanBal(Number(web3.utils.fromWei(oceanBal)).toFixed(1)
              ))
             calculateTokenBal(tokenInstance,newAccount)
              .then((tokenBal) => setTokenBal(Number(web3.utils.fromWei(tokenBal)).toFixed(1)
              ))
  
        setDtAddress(poolDtToken)
        setOceanAddress(oceanAddress) 
        setEthBal(ethBal)
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
          secondTitleTokens === 'OCEAN'?
          await helper.getMaxBuyQuantity(POOL_ADDRESS, dtAddress):
          await helper.getMaxBuyQuantity(POOL_ADDRESS, oceanAddress)
        //     console.log({symbolList1:symbolList[0], secondTitleTokens:secondTitleTokens})
          //  console.log(`amountMaxPool: ${amountMaxPool } ${secondTitleTokens}`)
        //     console.log({oceanAddress: oceanAddress, dtAddress: dtAddress, secondTitleTokens:secondTitleTokens})
        
       // console.log({tokenBal:tokenBal, oceanBal:oceanBal})
        const amountMax =
          secondTitleTokens === 'OCEAN'
            ? Number(oceanBal) > Number(amountMaxPool)
              ? amountMaxPool
              : oceanBal
            : Number(tokenBal) > Number(amountMaxPool)
            ? amountMaxPool
            : tokenBal

        setAmountMax(amountMax)
      }
      getMaximum()
    }, [helper, POOL_ADDRESS])

  useEffect(() => {
    // if (!ocean || !accountId || !price) return
    if (!helper || !userInfo) return
    async function init() {
      try {
        // Get everything which is in the pool
        const totalPoolTokens = await helper.getPoolSharesTotalSupply(
          POOL_ADDRESS //price.address
        )
        setTotalPoolTokens(totalPoolTokens)
  
        // Get everything the user has put into the pool
        const poolTokens = await helper.sharesBalance(
          newAccount, // accountId,
          POOL_ADDRESS //price.address
        )
        setPoolTokens(poolTokens)
  
        // calculate user's provided liquidity based on pool tokens
        const userOceanBalance =
          (Number(poolTokens) / Number(totalPoolTokens))
          * Number(oceanBal) // * price.ocean
  
        const userDtBalance =
          (Number(poolTokens) / Number(totalPoolTokens))
            * Number(tokenBal)// * price.datatoken
  
        const userLiquidity = {
          ocean: userOceanBalance,
          datatoken: userDtBalance
        }
  
        setUserLiquidity(userLiquidity)
  
        // Get everything the creator put into the pool
        const creatorPoolTokens = await helper.sharesBalance(
          dtAddress,//owner, to be confirmed
          POOL_ADDRESS//price.address
        )
        setCreatorPoolTokens(creatorPoolTokens)
  
        // Calculate creator's provided liquidity based on pool tokens
        const creatorOceanBalance =
          (Number(creatorPoolTokens) / Number(totalPoolTokens)) 
          //* price.ocean
  
        const creatorDtBalance =
          (Number(creatorPoolTokens) / Number(totalPoolTokens)) 
          //* price.datatoken
  
        const creatorLiquidity = {
          ocean: creatorOceanBalance,
          datatoken: creatorDtBalance
        }
        setCreatorLiquidity(creatorLiquidity)
  
        const totalCreatorLiquidityInOcean =
          creatorLiquidity?.ocean + creatorLiquidity?.datatoken 
          //* price?.value
        setCreatorTotalLiquidityInOcean(totalCreatorLiquidityInOcean)
  
        const creatorPoolShare =
          //price?.ocean &&
          //price?.datatoken &&
          creatorLiquidity &&
          ((Number(creatorPoolTokens) / Number(totalPoolTokens)) * 100).toFixed(
            2
          )
        setCreatorPoolShare(creatorPoolShare)
  
        // Get swap fee
        // swapFee is tricky: to get 0.1% you need to convert from 0.001
        const swapFee = await helper.getSwapFee(POOL_ADDRESS)
        setSwapFee(`${Number(swapFee) * 100}`)
  
        // Get weights
        const weightDt = await helper.getDenormalizedWeight(
          POOL_ADDRESS, // price.address,
          dtAddress // ddo.dataToken
        )
        setWeightDt(`${Number(weightDt) * 10}`)
        setWeightOcean(`${100 - Number(weightDt) * 10}`)
      } catch (error) {
        //Logger.error(error.message)
        console.error(error.message)
      }
    }
    init()
  }, [helper, newAccount, dtAddress])
    
    // console.log({swapfee:swapFee,weightDt:weightDt,weightOcean:weightOcean,creatorLiquidity:creatorLiquidity,creatorPoolShare:creatorPoolShare})
    // console.log({creatorPoolTokens:creatorPoolTokens,creatorTotalLiquidityInOcean:creatorTotalLiquidityInOcean})
    // console.log({userLiquidity:userLiquidity, poolTokens:poolTokens, totalPoolTokens:totalPoolTokens})
    // //console.log(`amountMax: ${amountMax} ${secondTitleTokens}`)
    // console.log({ethBal: ethBal, oceanBal:oceanBal, tokenBal:tokenBal})
    //console.log({dtAddress:dtAddress,oceanAddress:oceanAddress})

    const refreshInfo = async () => {
      setRefreshPool(!refreshPool)
      //await refreshPrice()
    }

  const credentials = [
    {
      oneLine: false,
      label: 'Memoric Phrase',
      value:
        'following guitar strings colors rainbow cranial nerves planets hello twitter follow kiss',
    },
  ];

  const UnStakeDT = async () => {
    try {
      const ocean = new OceanPool();
      //console.log('Instance:',
      await ocean.removeDTLiquidity(
        contracts.walletAddress,
        contracts.newPool2,
        '20',
        '0.5',
      );
    } catch (error) {}
  };

  const StakeDT = async () => {
    try {
      //StakesUtil.AddDTLiquidity(contracts.walletAddress, contracts.oceanRinkeby, web3.utils.toHex(1e18))
      // StakesUtil.getCurrentTokens(contracts.oceanRinkeby) // get pool tokens (walletAddress is not accepted)
      // StakesUtil.getDTAddress(contracts.oceanRinkeby)
      // StakesUtil.getReserve( contracts.oceanRinkeby, contracts.phecorRinkeby )
      // StakesUtil.getMaxAddLiquidity(contracts.oceanRinkeby, contracts.phecorRinkeby)
      // StakesUtil.joinswapExternAmountIn(contracts.wallet,contracts.oceanRinkeby,contracts.phecorRinkeby,
      //   web3.Utils.toHex(5e18), web3.Utils.toHex(1e18))

      //  JoinswapExternAmountIn(contracts.walletAddress,contracts.oceanRinkeby,contracts.phecorRinkeby,
      //  web3.utils.toBN(40), web3.utils.toBN(5))

      //AddDTLiquidity(contracts.walletAddress, contracts.oceanRinkeby, web3.utils.toHex(1e18))
      // Joinswap(contracts.walletAddress, contracts.oceanRinkeby,contracts.phecorRinkeby,
      //  '50000000000000000000' , '0')
      // ApproveLiquidity(contracts.walletAddress,contracts.oceanRinkeby,contracts.phecorRinkeby,web3.utils.toHex(1e18))

      /**
       * //invalid pool addresses:
       * 1. contracts.phecorRinkeby: 0xe793...
       * 2. contracts.quicraLiqPool: 0xAAB9...
       * 3. contracts.oceanRinkeby: 0x8967...
       *
       * //valid pool addresses
       * 1. 0xAa5226ACc808112E84249eD625cEB96b45AFD2Ac (pool contract created by newBPool() function)
       * 2: 0xc1d3b57309a066fae7aa170e94c501a4793d01ffe503c437e4a712d719c3483a
       */
      const ocean = new OceanPool();
      //console.log('Instance:',
      await ocean.addDTLiquidity(
        contracts.walletAddress,
        contracts.newPool2,
        '50',
      );
      //)
    } catch (error) {}
  };


  const Tab = ({title, value, isSelected, setTab}) => {
    return (
      <Ripple
        style={([
          styles__.tab,
          isSelected ? styles__.tabActive : {},
        ])}
        onPress={() => setTab(value, title)}>
        <Text style={[styles__.tabText, isSelected ? styles.tabTextActive : {}]}>
          {title}
        </Text>
      </Ripple>
    );
  };

  const onTabChange = (tabVale, tabTitle) => {
    setTab(tabVale);
    navigation.setOptions({title: tabTitle});
    setEthBal(0);
    setTokenBal(0);
    setOceanBal(0)
    //setCurChartdataNew({});
    
  };


  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
       <View style={styles.quicraContainer}>
        {/* <Text style={styles.quicraText}>1.2 QUICRA-0</Text> */}
        <Text style={styles.oceanText}>{ethBal} ETH</Text>
        <Text style={styles.oceanText}>{tokenBal} {symbolList[1]}</Text>
        <View style={styles.oceanPortfolioContainer}>
          <Text style={styles.oceanText}>{oceanBal} {symbolList[0]}</Text>
          <View>
            <Text style={styles.portfolioText}>24h Portfolio</Text>
            <Text style={styles.percentText}>(+15.53%)</Text>
          </View>
        </View>
      </View>
      <View style={styles.sendAmountInputContainer}>
        <Text style={styles.inputLabel}>{t('walletActions.sendTo')}</Text>
        <TextInput
          selectable={true}
          style={styles.input}
          selectTextOnFocus={true}
          placeholderTextColor={theme.COLORS.WHITE}
          placeholder={t('walletActions.destinationAddress')}
        />
        <View style={styles.inputDivider} />
        <Text style={styles.inputLabel}>{t('walletActions.amountEth')}</Text>
        <TextInput
          selectable={true}
          style={styles.input}
          selectTextOnFocus={true}
          placeholderTextColor={theme.COLORS.WHITE}
          placeholder={t('walletActions.amountToSend')}
        />
      </View>
      <Button
        height={55}
        title="Send"
        onPress={() => {}}
        color={theme.APP_COLOR_2}
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonStyle}
      />
      <View style={styles.mainDivider} />
      <View style={styles__.tabs}>
        <Tab
          setTab={onTabChange}
          value="UnStake"
          title="Remove Liquidity"
          isSelected={tab === 'UnStake'}
        />
          <Tab
            setTab={onTabChange}
            value="Stake"
            title="AddLiquidity Liquidity"
            isSelected={tab === 'Stake'}
          />
      </View>
      {/* <View style={styles.stakeUnstakeContainer}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          selectable={true}
          style={styles.input}
          placeholder="Amount"
          selectTextOnFocus={true}
          placeholderTextColor={theme.COLORS.WHITE}
        />
      </View> */}
      {/* <AddLiquidity
        //  setDtAddress={setDtAddress}
        // setOceanAddress={setOceanAddress}
        // setEthBal={setEthBal}
      /> */}
        
        <AddLiquidity
          setShowAdd={setShowAdd}
          refreshInfo={refreshInfo}
          poolAddress={POOL_ADDRESS}
          totalPoolTokens={totalPoolTokens}
          totalBalance={{
            ocean: +oceanBal,
            datatoken: +tokenBal
          }}
          swapFee={swapFee}
          //dtSymbol={dtSymbol}
          dtSymbol={symbolList[1]}
          dtAddress={dtAddress}
          oceanAddress={oceanAddress}

        />
      {/* <View style={styles.stakeUnstakeButtons}>
        <Button
          height={55}
          title="UnStake"
          onPress={() => UnStakeDT()}
          color={theme.APP_COLOR_2}
          textStyle={styles.unstakeButtonText}
          buttonStyle={styles.stakeUnstakeButtonStyle}
        />
        <Button
          height={55}
          title="Stake"
          onPress={() => StakeDT()}
          color={theme.APP_COLOR_2}
          textStyle={styles.stakeButtonText}
          buttonStyle={styles.stakeUnstakeButtonStyle}
        />
      </View> */}
     
    </ScrollView>
  );
};

const styles_ = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  photoButton: {
    backgroundColor: '#c4e0ff',
    elevation: 3,
    width: '70%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
})

export const styles__ = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5.5%',
    paddingHorizontal: '4.2%',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    padding: 10,
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.4,
  },
  tabActive: {
    backgroundColor: theme.APP_COLOR_2,
  },
  tabText: {
    fontSize: 10,
    lineHeight: 11.5,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  tabTextActive: {
    fontSize: 12,
    lineHeight: 13.8,
  },
  statsContainer: {
    borderRadius: 8,
    backgroundColor: theme.APP_COLOR_2,
  },
  uavContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  uavItem: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uavCenterItem: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uavItemDivider: {
    width: 1,
    height: '105%',
    marginTop: -22,
    marginBottom: -45,
    backgroundColor: theme.APP_COLOR_1,
  },
  imageIcon: {
    height: 30,
    width: 30,
  },
  uavItemTitle: {
    fontSize: 10,
    marginTop: 9,
    lineHeight: 12,
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  uavItemValue: {
    fontSize: 13,
    marginTop: 10,
    lineHeight: 15,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  uavItemQuicraValue: {
    fontSize: 9,
    marginTop: 34,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  uavItemQuicra: {
    fontSize: 6,
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  uavStatsDivider: {
    height: 1,
    backgroundColor: theme.APP_COLOR_1,
  },
  quicraContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quicraValue: {
    fontSize: 17,
    lineHeight: 20.57,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  quicra: {
    fontSize: 6,
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  mainDivider: {
    height: 2,
    marginVertical: 29,
    marginHorizontal: -15,
    backgroundColor: theme.APP_COLOR_2,
  },
  graph: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 20.71,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  graphContainer: {
    borderRadius: 8,
    marginTop: 22,
    paddingVertical: 12,
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_2,
  },
  graphTitle: {
    fontSize: 11,
    lineHeight: 13,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  graphQuicra: {
    fontSize: 6,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  rewardbtn: {
    alignItems: "center",
    backgroundColor: theme.APP_COLOR_2,
    padding: 15,
    borderRadius: 25,
    width: '70%',
    alignSelf: 'center',

  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    textAlignVertical: 'center',
  },
});

export default withTranslation()(Wallet);