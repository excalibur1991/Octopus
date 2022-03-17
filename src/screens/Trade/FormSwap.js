import React, { useState, useEffect } from 'react';
import { actions } from '../../services/State/Reducer';
import { LineChart } from 'react-native-charts-wrapper';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useStateValue } from '../../services/State/State';
import { styles } from '../../styles/wallet';
import { getAllAddCalcs } from '../Pool/AddLiquidity';
import { withTranslation } from 'react-i18next';
import { theme } from '../../services/Common/theme';
import { WriteInput } from '../../components/CustomInput'
import { MessageBox } from '../../components/CustomInput';
import { Picker } from '@react-native-picker/picker';
import { POOL_ADDRESS } from '../../../env';
import * as Yup from 'yup'
import {
  Field,
  FieldInputProps,
  FormikContextType,
  useFormikContext,
  useFormik,
  Formik,
} from 'formik'
import { OceanPool } from '../../components/OceanPool';
import ModalActivityIndicator from '../../components/ModalActivityIndicator';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Slider from '@react-native-community/slider';
import { getWalletBalances } from '../Pool/AddLiquidity';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Decimal from 'decimal.js'

const FormSwap = ({ t, navigation }) => {
  useEffect(() => {
    getAllAddCalcs(
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

    );
  }, []);

  useEffect(() => {
    getWalletBalances(
      dispatch,
      setEthBal,
      setTokenBal,
      setOceanBal,
      setUserLiquidity
    )
  }, [])

  const [ethBal, setEthBal] = useState('');
  const [tokenBal, setTokenBal] = useState('');
  const [oceanBal, setOceanBal] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [oceanAddress, setOceanAddress] = useState('')
  const [dtAddress, setDtAddress] = useState('')
  const [symbolList, setSymbolList] = useState([])
  const [, dispatch] = useStateValue();
  const [coin, setCoin] = useState('PHECOR-0')
  const [buyCoin, setBuyCoin] = useState('PHECOR-0')
  const [saleCoin, setSaleCoin] = useState('OCEAN')
  const [liquidityHash, setLiquidityHash] = useState('')
  const [liquidityError, setLiquidityError] = useState('')
  const [loading, setLoading] = useState(false);
  const [amountMaxBuy, setAmountMaxBuy] = useState('0')
  const [maxOutput, setMaxOutput] = useState()
  const [swapFee, setSwapFee] = useState('')
  const [swapFeeValue, setSwapFeeValue] = useState('')
  const [helper] = useState(() => new OceanPool())
  const [userLiquidity, setUserLiquidity] = useState('0')
  const [firstTitleText, setFirstTitleText] = useState('SELL');
  const [secondTitleText, setSecondTitleText] = useState('BUY');
  const [weightDt, setWeightDt] = useState('0')
  const [weightOcean, setWeightOcean] = useState('0')
  const [dtReserve, setDtReserve] = useState('0')
  const [oceanReserve, setOceanReserve] = useState('0')
  const [totalPoolTokens, setTotalPoolTokens] = useState('0')
  const [minimumBuyDT, setMinimumBuyDT] = useState('0.00');
  const [minimumBuyOcean, setMinimumBuyOcean] = useState('0.00');
  const [maximumBuyDT, setMaximumBuyDT] = useState('0.00');
  const [maximumBuyOcean, setMaximumBuyOcean] = useState();
  const [dtAmountToReceive, setDTAmtToReceive] = useState('0.00');
  const [oceanAmountToReceive, setOceanAmtToReceive] = useState('0.00');

  const [maximumDt, setMaximumDt] = useState('0')
  const [maximumOcean, setMaximumOcean] = useState('0')
  const [maxDt, setMaxDt] = useState(0)
  const [maxOcean, setMaxOcean] = useState(0)
  const [oceanItem, setOceanItem] = useState({
    amount: 0,
    token: 'OCEAN',
    maxAmount: 0
  })
  const [dtItem, setDtItem] = useState({
    amount: 0,
    token: symbolList.tokenSymbol !== null,
    maxAmount: 0
  })

  // console.log({ swapFee: swapFee })
  // console.log({buyAmount:values.buyAmount, saleAmount:values.saleAmount})
  //console.log({ethBal:ethBal})
  // console.log({ ocean: symbolList[0], ocean: symbolList.oceanSymbol })

  // Get maximum amount for either OCEAN or datatoken
  useEffect(() => {
    if (!helper || !POOL_ADDRESS || !oceanAddress || !dtAddress) return

    async function getMaximum() {
      const maxOceanInPool = await helper.getMaxBuyQuantity(POOL_ADDRESS, oceanAddress)
      const maxTokensInPool = await helper.getMaxBuyQuantity(POOL_ADDRESS, dtAddress)
      // console.log({POOL_ADDRESS:POOL_ADDRESS, values})
      setMaxDt(Number(maxTokensInPool).toFixed(2))

      setMaxOcean(Number(maxOceanInPool).toFixed(2))
    }
    getMaximum()
  }, [helper, POOL_ADDRESS, oceanAddress, dtAddress])

  useEffect(() => {
    if (!helper || !POOL_ADDRESS || !oceanAddress || !dtAddress || !values) return

    async function getOutput() {
      const maxOceanInPool = await helper.getMaxBuyQuantity(POOL_ADDRESS, oceanAddress)
      const maxTokensInPool = await helper.getMaxBuyQuantity(POOL_ADDRESS, dtAddress)
      // console.log({POOL_ADDRESS_:POOL_ADDRESS, buyAmount:values.buyAmount, saleAmount:values.saleAmount})

      const value =
        secondTitleText === 'BUY'
          ? Number(swapFee) * values.buyAmount
          : Number(swapFee) * values.saleAmount
      // console.log({ values_: values, value: value })
      setSwapFeeValue(value.toString())
      // setMaxDt(Number(maxTokensInPool).toFixed(2))

      // setMaxOcean(Number(maxOceanInPool).toFixed(2))
    }
    getOutput()
  }, [helper, POOL_ADDRESS, oceanAddress, dtAddress, values])

  // console.log({ maxDt: maxDt, maxOcean: maxOcean })

  useEffect(() => {
    if (!helper || !values || !oceanBal || !tokenBal || !oceanAddress || !dtAddress) return

    async function calculateMaximum() {
      const dtAmount = secondTitleText === 'BUY' ? maxDt : tokenBal
      const oceanAmount = firstTitleText === 'SELL' ? oceanBal : maxOcean
      // const dtAmount = values.type === 'buy' ? maxDt : tokenBal
      // const oceanAmount = values.type === 'buy' ? oceanBal : maxOcean

      // Calculate how many Ocean Tokens are you going to receive for selling a specific dtAmount (selling DT)
      const maxBuyOcean = await helper.calcOutGivenIn(POOL_ADDRESS, dtAddress, oceanAddress, dtAmount)
      const AmtBuyOcean = await helper.calcOutGivenIn(POOL_ADDRESS, dtAddress, oceanAddress, values.buyAmount)

      // Calculate how many data token are you going to receive for selling a specific oceanAmount (buying DT)
      const maxBuyDt = await helper.calcOutGivenIn(POOL_ADDRESS, oceanAddress, dtAddress, oceanAmount)
      const AmtBuyDt = await helper.calcOutGivenIn(POOL_ADDRESS, oceanAddress, dtAddress, values.saleAmount)

      const dtAmountToReceive = await helper.getDTReceived(POOL_ADDRESS, values.saleAmount)
      const oceanAmountToReceive = await helper.getOceanReceived(POOL_ADDRESS, values.saleAmount)
      const maxBuyDT_ = await helper.getMaxBuyQuantity(POOL_ADDRESS, dtAddress) //max datatoken to buy with available ocean in pool
      const maxBuyOcean_ = await helper.getMaxBuyQuantity(POOL_ADDRESS, oceanAddress) //max ocean to buy

      const maxImpact = 1 - Number(values.slippage) / 100
      const minBuyDT = AmtBuyDt * maxImpact.toString()
      const minBuyOcean = AmtBuyOcean * maxImpact.toString()

      setMinimumBuyDT(Number(minBuyDT).toFixed(3))
      setMinimumBuyOcean(Number(minBuyOcean).toFixed(3))
      // setMaximumBuyDT(Number(maxBuyDT).toFixed(3))
      // setMaximumBuyOcean(Number(maxBuyOcean).toFixed(3))

      // console.log({ dtAmountToReceive: dtAmountToReceive, oceanAmountToReceive: oceanAmountToReceive })
      // console.log({maxBuyDT_:maxBuyDT_, maxBuyOcean_:maxBuyOcean_})
      // console.log({ AmtBuyDt: AmtBuyDt, AmtBuyOcean: AmtBuyOcean })
      console.log({ minBuyDT: minBuyDT, minBuyOcean: minBuyOcean })
      // console.log({POOL_ADDRESS_:POOL_ADDRESS, buyAmount:values.buyAmount, saleAmount:values.saleAmount})
      // console.log({values:values})
      // const maxBuyOcean = await helper.getOceanReceived(
      //   POOL_ADDRESS,
      //   dtAmount.toString()
      // )
      // const maxBuyDt = await helper.getDTReceived(
      //   POOL_ADDRESS,
      //   oceanAmount.toString()
      // )

      const maximumDt =
        values.type === 'buy'
          // secondTitleText === 'BUY' 
          ? Number(dtAmount) > Number(maxBuyDt)
            ? Number(maxBuyDt)
            : Number(dtAmount)
          : Number(dtAmount) > tokenBal
            ? tokenBal
            : Number(dtAmount)

      const maximumOcean =
        values.type !== 'buy'
          // firstTitleText === 'SELL' 
          ? Number(oceanAmount) > Number(maxBuyOcean)
            ? Number(maxBuyOcean)
            : Number(oceanAmount)
          : Number(oceanAmount) > oceanBal
            ? oceanBal
            : Number(oceanAmount)

      setMaximumDt(maximumDt)
      setMaximumOcean(maximumOcean)
      setOceanItem({
        ...oceanItem,
        amount: oceanAmount,
        maxAmount: maximumOcean
      })
      setDtItem({
        ...dtItem,
        amount: dtAmount,
        maxAmount: maximumDt
      })
      // console.log({ secondTitleText: secondTitleText, firstTitleText: firstTitleText })
      // console.log({ dtAmount: dtAmount, oceanAmount: oceanAmount, type: values.type })
      // console.log({ dtItem: dtItem, oceanItem: oceanItem })
      // // console.log({maxBuyDt:maxBuyDt,maxBuyOcean:maxBuyOcean})
      // console.log({maximumDt:maximumDt,maximumOcean:maximumOcean})
    }

    calculateMaximum()
  }, [maxOcean, maxDt, oceanBal, tokenBal, POOL_ADDRESS, dtAddress, oceanAddress])

  // console.log({maximumDt:maximumDt,maximumOcean:maximumOcean})

  // Get swap fee
  useEffect(() => {
    if (!helper || !POOL_ADDRESS || !swapFee) return

    async function getSwapFee() {
      // const swapFee = await ocean.pool.getSwapFee(poolAddress)
      // swapFee is tricky: to get 0.1% you need to convert from 0.001
      // setSwapFee(`${Number(swapFee) * 100}`)
      // const value =
      // secondTitleText === 'BUY'
      //   ? Number(swapFee) * values.buyAmount
      //   : Number(swapFee) * values.saleAmount
      console.log({ swapFee: swapFee, swapFeeValue: swapFeeValue })
      console.log({ buyAmount: values.buyAmount, saleAmount: values.saleAmount })
      // setSwapFeeValue(value.toString())
    }
    // getSwapFee()
  }, [helper, POOL_ADDRESS, values])

  // Get output values
  useEffect(() => {
    if (!helper || !POOL_ADDRESS) return

    async function getOutput() {
      // Minimum received

      // console.log({POOL_ADDRESS:POOL_ADDRESS})
      // const maxImpact = 1 - Number(values.slippage) / 100
      // const maxPrice =
      //   // values.type === 'buy'
      //   secondTitleText === 'BUY'
      //     ? (values.buyAmount * maxImpact).toString()
      //     : (values.saleAmount * maxImpact).toString()
      //   console.log({buyAmount:values.buyAmount, saleAmount:values.saleAmount})
      //   console.log({slippage:values.slippage ,maxPrice:maxPrice})
      // setMaxOutput(maxPrice)
    }
    getOutput()
  }, [helper, POOL_ADDRESS])

  function handleAmountChange(value) {

    // setAmountPercent(value.toFixed(0))
    // if (!userLiquidity) return

    // const maxImpact = 1 - Number(values.slippage) / 100
    // const maxPrice =
    //   // values.type === 'buy'
    //   secondTitleText === 'BUY'
    //     ? (values.buyAmount * maxImpact).toString()
    //     : (values.saleAmount * maxImpact).toString()
    //   console.log({buyAmount:values.buyAmount, saleAmount:values.saleAmount})
    //   console.log({slippage:values.slippage ,maxPrice:maxPrice})
    // setMaxOutput(maxPrice)

    const amountPoolShares = (Number(value) / 100) * Number(userLiquidity)

    setAmountPoolShares(`${amountPoolShares.toFixed(2)}`)
  }

  async function handleInputChange() {
    const buy = values.buyAmount
    const sell = values.saleAmount
    // console.log({ buyA: buy, sellA: sell })
    const value =
      secondTitleText === 'BUY'
        ? Number(swapFee) * values.buyAmount
        : Number(swapFee) * values.saleAmount

    return '27';
    // setSwapFeeValue(buy)
  }

  const switchTokens = () => {
    if (saleCoin === 'PHECOR-0') {
      setSaleCoin('OCEAN')
      setBuyCoin('PHECOR-0')
    } else {
      setSaleCoin('PHECOR-0')
      setBuyCoin('OCEAN')
    }
  }

  const handleValueChange = async (name, value) => {
    const newValue =
      name === 'ocean'
        ? values.type === 'sell'
          ? await ocean.pool.getDTNeeded(price.address, value.toString())
          : await ocean.pool.getDTReceived(price.address, value.toString())
        : values.type === 'sell'
          ? await ocean.pool.getOceanReceived(price.address, value.toString())
          : await ocean.pool.getOceanNeeded(price.address, value.toString())

    setFieldValue(name === 'ocean' ? 'datatoken' : 'ocean', newValue)
    validateForm()
  }

  //console.log({ amountMaxBuy: `${amountMaxBuy} ${firstCoinSymbol}` })
  // console.log({ newAccount:newAccount})
  //console.log({ Account: `${userInfo.publicKey}` })
  // console.log({amountMax_:amountMax, amountMaxPool:amountMaxPool})

  const stakeSchema = Yup.object().shape({
    // amount: Yup.number(),
    // .max(Number(amountMaxBuy),
    //   `Maximum you can add is ${Number(amountMaxBuy).toFixed(2)} ${firstCoinSymbol}`
    // )
    // .min(0.00001, (param) => `Must be more or equal to ${param.min}`)
    // .required('Amount is Required')
    // .nullable(),
    saleAmount: Yup.number()
      .max(maximumOcean, (param) => `Must be less or equal to ${param.max}`)
      .min(0.001, (param) => `Must be more or equal to ${param.min}`)
      .required('Required')
      .nullable(),
    buyAmount: Yup.number()
      .max(maxDt, `Must be less or equal than ${maximumDt}`)
      .min(0.00001, (param) => `Must be more or equal to ${param.min}`)
      .required('Required')
      .nullable(),
    type: Yup.string(),
    slippage: Yup.string()

  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    validateField,
    validateForm,
    setTouched,
    setFieldValue,
    isValid,
    values,
    errors,
    touched
  } = useFormik({
    validationSchema: stakeSchema,
    initialValues: {
      saleAmount: '',
      buyAmount: '',
      type: 'buy',
      slippage: '0.05',
    },
    onSubmit: async (values) => {
      // handleAddLiquidity(values)

    }
  });


  async function handleTrade(values) {

    try {

      setLoading(true)
      setLiquidityError('')
      setLiquidityHash('')
      const impact = new Decimal(100 - Number(values.slippage)).div(100)
      const precision = 15
      const tx =
        // values.type === 'buy'
        secondTitleText === 'BUY' && saleCoin == 'OCEAN'
          ? await helper.buyDTWithExactOcean(
            `${userInfo.publicKey}`,
            POOL_ADDRESS,
            // new Decimal(values.buyAmount)
            new Decimal(minimumBuyDT)
              .mul(impact)
              .toFixed(precision)
              .toString(),
            new Decimal(values.saleAmount).toFixed(precision).toString()
          )
          : await helper.sellDT(
            `${userInfo.publicKey}`,
            POOL_ADDRESS,
            new Decimal(values.buyAmount).toFixed(precision).toString(),
            new Decimal(values.saleAmount)
              .mul(impact)
              .toFixed(precision)
              .toString()
          )
      setLoading(false)
      console.log({ res: tx })
      if (tx.status === true) {
        setLiquidityHash(`${tx.transactionHash}`)
        dispatch({
          type: actions.SET_ALERT_SETTINGS,
          alertSettings: {
            show: true,
            type: 'success',
            message: `Succeeded Swapping  ${values.saleAmount} ${saleCoin}...`,
            confirmText: 'Got It',
            cancelText: 'Got It',
            title: `🎉 Transaction Success!`,
            showCancelButton: true,
            onCancelPressed: () => { },
          },
        })

      } else {
        setLiquidityError(`Failed to Swap ${saleCoin}!`)
      }
    } catch (error) {
      setLoading(false)
      console.error(error.message)
      dispatch({
        type: actions.SET_ALERT_SETTINGS,
        alertSettings: {
          show: true,
          type: 'error',
          title: '❗Error Occured',
          message:
            `Transaction Failed! ${error.message}`,
          showConfirmButton: true,
          confirmText: 'Ok',
        },
      })
    }
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.sendAmountInputContainer}>
        <Text style={styles.inputLabel}> {firstTitleText}  {saleCoin} </Text>
        <WriteInput
          icon='cash'
          selectable={true}
          selectTextOnFocus={true}
          style={{ color: '#ffff' }}
          placeholder={'0'}
          onChangeText={handleChange('saleAmount')}
          onBlur={handleBlur('saleAmount')}
          error={errors.saleAmount}
          touched={touched.saleAmount}
        />
        <Text
          style={{
            color: theme.COLORS.WHITE,
            // width: Dimensions.get('screen').width * 0.39,
            alignSelf: 'flex-end',
            paddingHorizontal: 12,
            marginTop: -55
          }}
        >
          {saleCoin}
        </Text>

        <View>
          {touched.saleAmount && errors.saleAmount &&
            <Text style={{ fontSize: 12, color: '#FF0D10', marginTop: 15 }}>{errors.saleAmount}</Text>
          }
        </View>
        <View>
          <Icon
            name='swap-vertical'
            size={36}
            color='green'
            style={{ paddingTop: 12, paddingHorizontal: Dimensions.get('screen').width * 0.38 }}
            onPress={() => switchTokens()}
          />
        </View>
        <View >
          <Text style={styles.inputLabel}>{secondTitleText} {buyCoin} </Text>
          <WriteInput
            icon='cash'
            selectable={true}
            selectTextOnFocus={true}
            style={{ color: '#ffff' }}
            placeholder={'0'}
            onChangeText={handleChange('buyAmount', minimumBuyDT)}
            onBlur={handleBlur('buyAmount')}
            error={errors.buyAmount}
            touched={touched.buyAmount}
          />
          <Text
            style={{
              color: theme.COLORS.WHITE,
              // width: Dimensions.get('screen').width * 0.39,
              alignSelf: 'flex-end',
              paddingHorizontal: 12,
              marginTop: -55
            }}
          >
            {buyCoin}
          </Text>
        </View>
        <View>
          {touched.buyAmount && errors.buyAmount &&
            <Text style={{ fontSize: 12, color: '#FF0D10', marginTop: 15 }}>{errors.buyAmount}</Text>
          }
        </View>
        <View style={[styles.contentContainer, { paddingTop: 20 }]}>
          {
            liquidityHash
              ? <MessageBox
                title={`🎉 Succeeded Swapping  ${values.saleAmount} ${saleCoin}...`}
                value={liquidityHash}
              />
              : liquidityError
                ? <MessageBox
                  title={`❗Failed Staking to the Liquidity Pool!`}
                  value={liquidityError}
                />
                : null
          }
        </View>
        <View style={styles.liquidityContainer}>
          <View style={styles.inputDivider} />

          <Text style={{ color: 'white', }}>Min. Received:
            <Text style={{ color: 'skyblue', lineHeight: 14 }}>
              {minimumBuyDT}
              <Text style={{ color: 'green' }}> {buyCoin}</Text>
            </Text>
          </Text>
          <View style={styles.inputDivider} />
          <Text style={{ color: 'white', }}>Swap Fee:
            <Text style={{ color: 'skyblue', lineHeight: 14 }}>
              {

                Number(swapFee / 100) * values.saleAmount 
              }
              <Text style={{ color: 'green' }}> {saleCoin} (0.1%)</Text>
            </Text>
          </Text>
          <View style={styles.inputDivider} />
        </View>
        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity
            disabled={!isValid || loading}
            style={isValid ?
              { ...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, } :
              { ...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, backgroundColor: 'grey' }}
            onPress={() => {
              validateField('saleAmount').then((res) => {
                if (values.saleAmount && values.buyAmount) {
                  dispatch({
                    type: actions.SET_ALERT_SETTINGS,
                    alertSettings: {
                      show: true,
                      type: 'warn',
                      message: `Authorize this app to access your ${saleCoin} `,
                      confirmText: 'Authorize',
                      title: 'Please Confirm Transaction',
                      showConfirmButton: true,
                      showCancelButton: true,
                      onConfirmPressed: () => {
                        handleTrade(values)
                      },
                      onCancelPressed: () => { },
                    },
                  });
                }
              })

            }}
          >
            <Text style={styles.buttonText}>Swap {values.saleAmount} {saleCoin}</Text>
            <View style={{ position: 'absolute', top: "90%", right: 0, left: 220 }}>
              {
                loading
                  ? <ModalActivityIndicator modalVisible={true} />
                  : null
              }
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  )
};

export default withTranslation()(FormSwap);
