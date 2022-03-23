import React, { useRef, useState, useEffect } from 'react';
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
import { getAllAddCalcs } from './AddLiquidity';
import { withTranslation } from 'react-i18next';
import { MessageBox } from '../../components/CustomInput';
import { POOL_ADDRESS } from '../../../env';
import * as Yup from 'yup'
import {
  useFormik,
  Formik,
} from 'formik'
import { OceanPool } from '../../components/OceanPool';
import ModalActivityIndicator from '../../components/ModalActivityIndicator';
import Decimal from 'decimal.js'
import Slider from '@react-native-community/slider';
import { getWalletBalances } from './AddLiquidity';

const FormRemoveLiquidity = ({ t, navigation }) => {
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
  const [coinSymbol, setCoinSymbol] = useState([])
  const [liquidityHash, setLiquidityHash] = useState('')
  const [liquidityError, setLiquidityError] = useState('')
  const [loading, setLoading] = useState(false);
  const [helper] = useState(() => new OceanPool())
  const [totalPoolTokens, setTotalPoolTokens] = useState('0')
  const [amountPercent, setAmountPercent] = useState('0')
  const [amountMaxPercent, setAmountMaxPercent] = useState(100)
  const [amountMaxRemove, setAmountMaxRemove] = useState('0')
  const [amountPoolShares, setAmountPoolShares] = useState('0')
  const [amountOcean, setAmountOcean] = useState('0')
  const [amountDatatoken, setAmountDatatoken] = useState('0')
  const [userLiquidity, setUserLiquidity] = useState('0')
  const [amountMaxDt, setAmountMaxDt] = useState('0')
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [weightDt, setWeightDt] = useState('0')
  const [weightOcean, setWeightOcean] = useState('0')
  const [swapFee, setSwapFee] = useState('0')
  const [dtReserve, setDtReserve] = useState('0')
  const [oceanReserve, setOceanReserve] = useState('0')


  async function handleRemoveLiquidity() {
    try {
      setLoading(true)
      setLiquidityError('')
      setLiquidityHash('')

      const result =
        isAdvanced === true
          ? await helper.removePoolLiquidity(
            `${userInfo.publicKey}`,
            POOL_ADDRESS,
            amountPoolShares
          )
          : await helper.removeOceanLiquidity(
            `${userInfo.publicKey}`,
            POOL_ADDRESS,
            amountOcean,
            amountPoolShares
          )

      setLoading(false)
      console.log({ myresult: result })
      if (result.status === true) {
        setLiquidityHash(`${result.transactionHash}`)
        dispatch({
          type: actions.SET_ALERT_SETTINGS,
          alertSettings: {
            show: true,
            type: 'success',
            message: `Succeeded UnStaking  ${values.amount} ${coinSymbol}...`,
            confirmText: 'Got It',
            cancelText: 'Got It',
            title: `🎉 Transaction Success!`,
            showCancelButton: true,
            onCancelPressed: () => { },
          },
        })

      } else {
        setLiquidityError('Failed to Remove Liquidity from the Pool!')
      }
      //resetForm()
      //refreshInfo()
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

  useEffect(() => {
    if (!POOL_ADDRESS || !helper || !oceanReserve || !amountPoolShares ) return
    const getValues = async () => {
      const POOL_MAX_AMOUNT_OUT_LIMIT = 0.25 // maximum 1/4 of the pool reserve
      const totalPoolTokens = await helper.getPoolSharesTotalSupply(POOL_ADDRESS)

      let dataTokenReserve
      let oceanTokenReserve
      if (parseFloat(oceanReserve) > 0) {
        dataTokenReserve = new Decimal(dtReserve).mul(POOL_MAX_AMOUNT_OUT_LIMIT).toString()
        oceanTokenReserve = new Decimal(oceanReserve).mul(POOL_MAX_AMOUNT_OUT_LIMIT).toString()
      }
      // console.log({ dtAddress: dtAddress, oceanAddress: oceanAddress, dtReserve: dtReserve, oceanReserve: oceanReserve })
      // console.log({userLiquidity:userLiquidity})
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

      const dtAmount = new Decimal(amountPoolShares)
        .div(totalPoolTokens)
        .mul(dataTokenReserve)
        .toString()
      const oceanAmount = new Decimal(amountPoolShares)
        .div(totalPoolTokens)
        .mul(oceanTokenReserve)
        .toString()

      const amountOcean = await helper.getOceanRemovedforPoolShares(
        POOL_ADDRESS,
        amountPoolShares
      )
    
      const amountDT = await helper.getDTRemovedforPoolShares(
        POOL_ADDRESS,
        amountPoolShares
      )

      setAmountMaxPercent(Number(oceanAmountMaxPercent))
      setAmountOcean(Number(amountOcean - (amountOcean * 0.05)).toFixed(2))
    }
    getValues();
  },[amountPoolShares, oceanReserve])

  // Set amountPoolShares based on set slider value
  async function handleAmountPercentChange(value) {
    setAmountPercent(value.toFixed(0))

    if (!userLiquidity || ! amountPercent) return
    const amountPoolShares = (amountPercent/ 100) * Number(userLiquidity)
    setAmountPoolShares(`${amountPoolShares.toFixed(2)}`)
    
  }


  const unStakeSchema = Yup.object().shape({
    // destination: Yup.string()
    //    .matches(/0x[a-fA-F0-9]{40}/g, 'Enter a valid Ethereum address!')
    //   .required('Destination is Required!'),

    amount: Yup.number()
      .max(Number(amountMaxRemove),
        `Maximum you can remove is ${Number(amountMaxRemove).toFixed(2)} ${coinSymbol}`
      )
      .min(0.00001, (param) => `Must be more or equal to ${param.min}`)
      .required('Amount is Required')
      .nullable(),

  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    validateField,
    validateForm,
    setTouched,
    isValid,
    values,
    errors,
    touched
  } = useFormik({
    validationSchema: unStakeSchema,
    initialValues: {
      // destination: '', 
      amount: ''
    },
    onSubmit: async (values) => {

    }
  });

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.sendAmountInputContainer}>
        <Text style={[styles.inputLabel, { fontSize: 35, paddingTop: 32 }]}> {amountPercent}%</Text>
         <View >
          <Slider
            style={{
              width: Dimensions.get('screen').width * 0.86,
              height: 20,
              marginBottom: -15,

            }}
            minimumValue={0}
            step={0.1}
            maximumValue={amountMaxPercent}
            maximumTrackTintColor="#FFFFFF"
            onValueChange={(value) =>
              handleAmountPercentChange(value)
            }
          />
         </View>
        <View style={[styles.contentContainer, { paddingTop: 20 }]}>
          {
            liquidityHash
              ? <MessageBox
                title={`🎉 Succeeded UnStaking  ${values.amount} ${coinSymbol}...`}
                value={liquidityHash}
              />
              : liquidityError
                ? <MessageBox
                  title={`❗Failed unStaking from the Liquidity Pool!`}
                  value={liquidityError}
                />
                : null
          }
        </View>
        <View  >
          <Text style={{ color: '#7666E8' }}>{'Share to spend:'} {amountPoolShares}<Text style={{ color: '#ffff' }}>  pool shares</Text> </Text>
          <Text style={{ color: '#7666E8' }}>{'OCEAN to receive:'} {amountOcean}<Text style={{ color: '#ffff' }}></Text> </Text>
        </View>
       
        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity
            disabled={loading}
            style={!loading ?
              { ...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, } :
              { ...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, backgroundColor: 'grey' }}
            onPress={() => {
              dispatch({
                type: actions.SET_ALERT_SETTINGS,
                alertSettings: {
                  show: true,
                  type: 'warn',
                  message: `Authorize this app to access your funds `,
                  confirmText: 'Authorize',
                  title: 'Please Confirm Transaction',
                  showConfirmButton: true,
                  showCancelButton: true,
                  onConfirmPressed: () => {
                    handleRemoveLiquidity()
                  },
                  onCancelPressed: () => { },
                },
              });
            }}
          >
            <Text style={styles.buttonText}>UnStake {amountPoolShares} shares</Text>
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

export default withTranslation()(FormRemoveLiquidity);
