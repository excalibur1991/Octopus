import React, { useState, useEffect } from 'react';
import { actions } from '../../services/State/Reducer';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useStateValue } from '../../services/State/State';
import { styles } from '../../styles/wallet';
import { getAllAddCalcs } from '../Pool/AddLiquidity';
import { withTranslation } from 'react-i18next';
import { theme } from '../../services/Common/theme';
import { WriteInput } from '../../components/CustomInput'
import { MessageBox } from '../../components/CustomInput';
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
import Slider from '@react-native-community/slider';
import { getWalletBalances } from '../Pool/AddLiquidity';
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
  const [buyCoin, setBuyCoin] = useState('PHECOR-0')
  const [saleCoin, setSaleCoin] = useState('OCEAN')
  const [liquidityHash, setLiquidityHash] = useState('')
  const [liquidityError, setLiquidityError] = useState('')
  const [loading, setLoading] = useState(false);
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
  const [amount, setAmount] = useState('0')
  const [amountPoolShares, setAmountPoolShares] = useState('0')
  const [amountMaxPercent, setAmountMaxPercent] = useState(100)
  const [amountPercent, setAmountPercent] = useState('0')
  const [amountOcean, setAmountOcean] = useState('0')
  const [amountBuy, setAmountBuy] = useState('0')

  const [maximumDt, setMaximumDt] = useState('0')
  const [maximumOcean, setMaximumOcean] = useState('0')
  const [maxDt, setMaxDt] = useState(0)
  const [maxOcean, setMaxOcean] = useState(0)

  // Get maximum amount for either OCEAN or datatoken
  useEffect(() => {
    if (!helper || !POOL_ADDRESS || !oceanAddress || !dtAddress) return

    async function getMaximum() {
      const maxOceanInPool = await helper.getMaxBuyQuantity(POOL_ADDRESS, oceanAddress)
      const maxTokensInPool = await helper.getMaxBuyQuantity(POOL_ADDRESS, dtAddress)
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

      const value =
        secondTitleText === 'BUY'
          ? Number(swapFee) * values.buyAmount
          : Number(swapFee) * values.saleAmount
      setSwapFeeValue(value.toString())
      // setMaxDt(Number(maxTokensInPool).toFixed(2))

      // setMaxOcean(Number(maxOceanInPool).toFixed(2))
    }
    getOutput()
  }, [helper, POOL_ADDRESS, oceanAddress, dtAddress, values])

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
      // setMinimumBuyDT(Number(values.saleAmount).toFixed(3))
      setMinimumBuyOcean(Number(minBuyOcean).toFixed(3))
      // setMaximumBuyDT(Number(maxBuyDT).toFixed(3))
      // setMaximumBuyOcean(Number(maxBuyOcean).toFixed(3))

      const amountOcean = await helper.getOceanRemovedforPoolShares(
        POOL_ADDRESS,
        amountPoolShares
      )
    

      const maximumDt =
        buyCoin === 'PHECOR-0'
          ? Number(dtAmount) > Number(maxBuyDt)
            ? Number(maxBuyDt)
            : Number(dtAmount)
          : Number(dtAmount) > tokenBal
            ? tokenBal
            : Number(dtAmount)

      const maximumOcean =
        buyCoin === 'OCEAN'
          ? Number(oceanAmount) > Number(maxBuyOcean)
            ? Number(maxBuyOcean)
            : Number(oceanAmount)
          : Number(oceanAmount) > oceanBal
            ? oceanBal
            : Number(oceanAmount)

      setMaximumDt(maximumDt)
      setMaximumOcean(maximumOcean)
 

    }

    calculateMaximum()
  }, [maxOcean, maxDt, oceanBal, tokenBal, POOL_ADDRESS, dtAddress, oceanAddress, values])


  useEffect(() => {
    if (!POOL_ADDRESS || !helper || !oceanReserve || !amountPoolShares) return
    const getValues = async () => {
      const POOL_MAX_AMOUNT_OUT_LIMIT = 0.25 // maximum 1/4 of the pool reserve
      const totalPoolTokens = await helper.getPoolSharesTotalSupply(POOL_ADDRESS)

      let dataTokenReserve
      let oceanTokenReserve
      if (parseFloat(oceanReserve) > 0) {
        dataTokenReserve = new Decimal(dtReserve).mul(POOL_MAX_AMOUNT_OUT_LIMIT).toString()
        oceanTokenReserve = new Decimal(oceanReserve).mul(POOL_MAX_AMOUNT_OUT_LIMIT).toString()
      }
 
      const oceanAmountMaxPoolShares = await helper.getPoolSharesRequiredToRemoveOcean( //remove OCEAN and get DT
        POOL_ADDRESS,
        oceanTokenReserve
      )

      let oceanAmountMaxPercent = `${Math.floor(
        (Number(oceanAmountMaxPoolShares) / Number(userLiquidity)) * 100
      )}`


      if (Number(oceanAmountMaxPercent) > 100 || isNaN(Number(oceanAmountMaxPercent))) {
        oceanAmountMaxPercent = 100
      }


      const amountOcean = await helper.getOceanRemovedforPoolShares(
        POOL_ADDRESS,
        amountPoolShares
      )

      const AmountBuy =
        saleCoin === 'OCEAN'
          ? await helper.calcOutGivenIn(POOL_ADDRESS, oceanAddress, dtAddress, amountPoolShares)
          : await helper.calcOutGivenIn(POOL_ADDRESS, dtAddress, oceanAddress, amountPoolShares)

      setAmountBuy(Number(AmountBuy).toFixed(2))
      setAmountMaxPercent(Number(oceanAmountMaxPercent))
      setAmountOcean(Number(amountOcean - (amountOcean * 0.05)).toFixed(2))
    }
    getValues();
  }, [amountPoolShares, oceanReserve])

  const switchTokens = () => {
    // buyResult = (firstTitleTokens === symbolList[0]) && (firstTitleText == 'SELL') 
    if (saleCoin === 'PHECOR-0') {
      setSaleCoin('OCEAN')
      setBuyCoin('PHECOR-0')
      setAmountBuy('0')
    } else {
      setSaleCoin('PHECOR-0')
      setBuyCoin('OCEAN')
      setAmountBuy('0')
    }
    // saleCoin === 'PHECOR-0' ? setBuyCoin('OCEAN') : setBuyCoin('PHECOR-0')
    // buyCoin === 'PHECOR-0' ? setSaleCoin('OCEAN') : setSaleCoin('PHECOR-0')
    // saleCoin === 'PHECOR-0' ? setBuyCoin('OCEAN') : setBuyCoin('PHECOR-0')
    // saleCoin === 'OCEAN' ? setBuyCoin('PHECOR-0') : setBuyCoin('OCEAN')
    // don't reset form because we don't want to reset type
    // setFieldValue('saleAmount', 0)
    // setFieldValue('buyAmount', 0)
    // setErrors({})
    // setFieldValue(values.buyAmount, 0)
    // setFieldValue(values.saleAmount, 0)
    // validateForm(values.buyAmount,values.saleAmount)
    // alert('helo')
  }

  async function handleAmountPercentChange(value) {


    setAmountPercent(value.toFixed(0))

    if (!oceanBal || !tokenBal) return

    const amount =
      saleCoin === 'OCEAN'
        ? oceanBal
        : tokenBal

    setAmount(Number(amount).toFixed(2))

    const amountPoolShares = (amountPercent / 100) * Number(amount)
  
    setAmountPoolShares(`${Number(amountPoolShares).toFixed(2)}`)

  }

  const stakeSchema = Yup.object().shape({
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
    setFieldTouched,
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
    }
  });

  async function handleTrade() {

    try {

      setLoading(true)
      setLiquidityError('')
      setLiquidityHash('')
      const impact = new Decimal(100 - Number(values.slippage)).div(100)
      const precision = 15
      
      const tx =
        secondTitleText === 'BUY' && saleCoin == 'OCEAN'
          ? await helper.buyDTWithExactOcean(
            `${userInfo.publicKey}`,
            POOL_ADDRESS,
            // new Decimal(values.buyAmount)
            new Decimal(minimumBuyDT)
              .mul(impact)
              .toFixed(precision)
              .toString(),
            // new Decimal(values.saleAmount).toFixed(precision).toString()
            new Decimal((amountPercent * amount / 100)).toFixed(precision).toString()
          )
          : await helper.sellDT(
            `${userInfo.publicKey}`,
            POOL_ADDRESS,
            // new Decimal(values.buyAmount).toFixed(precision).toString(),
            new Decimal(amountBuy).toFixed(precision).toString(),
            new Decimal(values.saleAmount)
              .mul(impact)
              .toFixed(precision)
              .toString()
          )
      setLoading(false)
      // console.log({ res: tx })
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
      // console.error(error.message)
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
        <View style={{ borderColor: theme.COLORS.BLUE, backgroundColor: theme.APP_COLOR_1, borderRadius: 8, borderWidth: 1, }}>
          <Text style={[styles.inputLabel, { fontSize: 35, paddingTop: 32 }]}> {amountPercent}%</Text>
          <Slider
            style={{
              width: Dimensions.get('screen').width * 0.86,
              height: 20,
            }}
            minimumValue={0}
            maximumValue={100}
            maximumTrackTintColor="#FFFFFF"
            onValueChange={(value) =>
              handleAmountPercentChange(value)
            }
          />
        </View>
        <Text
          style={{
            color: theme.COLORS.WHITE,
            alignSelf: 'flex-end',
            paddingHorizontal: 12,
            marginTop: -55
          }}
        >
          {saleCoin}
        </Text>
        {/* 
        <View>
          {touched.saleAmount && errors.saleAmount &&
            <Text style={{ fontSize: 12, color: '#FF0D10', marginTop: 15 }}>{errors.saleAmount}</Text>
          }
        </View> */}

        <View >

          <View style={{ paddingTop: 60 }}>
            <Text style={styles.inputLabel}>{secondTitleText} {buyCoin} </Text>
            <WriteInput
              icon='cash'
              selectable={true}
              selectTextOnFocus={true}
              style={{ color: '#ffff' }}
              placeholder={'0'}
              // onChangeText={handleChange('buyAmount')}
              // onBlur={handleBlur('buyAmount')}
              // error={errors.buyAmount}
              // touched={touched.buyAmount}
              value={amountBuy}
            />
          </View>
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
        {
          liquidityHash
            ? <View style={[styles.contentContainer, { paddingTop: 20 }]}>
              <MessageBox
                title={`🎉 Succeeded Swapping  ${values.saleAmount} ${saleCoin}...`}
                value={liquidityHash}
              />
            </View>
            : liquidityError
              ?
              <View style={[styles.contentContainer, { paddingTop: 20 }]}>
                <MessageBox
                  title={`❗Failed to Swap from the Liquidity Pool!`}
                  value={liquidityError}
                />
              </View>
              : null
        }

        <View style={[styles.liquidityContainer]}>
          <View>
            <Icon
              name='swap-vertical'
              size={36}
              color='green'
              style={{ paddingTop: 5, paddingHorizontal: Dimensions.get('screen').width * 0.32 }}
              onPress={() => switchTokens()}
            />
          </View>
          <View style={[styles.inputDivider, {marginVertical:10}]} />
          <View>
            <Text style={{ color:theme.COLORS.WHITE, }}>Shares to Sell:
              <Text style={{ color:theme.COLORS.BLUE, lineHeight: 14 }}>
                {Number(amountPercent * amount / 100).toFixed(2)}
                <Text style={{ color:theme.COLORS.SUCCESS_COLOR}}> {saleCoin}</Text>
              </Text>
            </Text>
          </View>
          <View style={[styles.inputDivider, {marginVertical:10}]} />
          <Text style={{ color:theme.COLORS.WHITE}}>Swap Fee:
            <Text style={{ color:theme.COLORS.BLUE, lineHeight: 14 }}>
              {
                Number((swapFee / 100) * (amountPercent * amount / 100)).toFixed(3)
              }
              <Text style={{ color:theme.COLORS.SUCCESS_COLOR }}> {saleCoin} (0.1%)</Text>
            </Text>
          </Text>
          <View style={[styles.inputDivider, {marginVertical:10}]} />
        </View>

        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity
            disabled={!isValid || loading}
            style={isValid ?
              { ...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, } :
              { ...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, backgroundColor: 'grey' }}
            onPress={() => {
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
                        handleTrade()
                      },
                      onCancelPressed: () => { },
                    },
                  });

            }}
          >
            <Text style={styles.buttonText}>Swap {Number(amountPercent * amount / 100).toFixed(2)} {saleCoin}</Text>
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
