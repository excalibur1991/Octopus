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
import { fetchOverall } from '../Pool/AddLiquidity';
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


const FormSwap = ({ t, navigation }) => {
  useEffect(() => {
    fetchOverall(
      dispatch,
      setUserInfo,
      setEthBal,
      setTokenBal,
      setOceanBal,
      setOceanAddress,
      setDtAddress,
      setSymbolList,
      setUserLiquidity


    );
  }, []);

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
  const [amountMaxBuy, setAmountMaxBuy] = useState('0')
  const [amountMaxBuyPool, setAmountMaxBuyPool] = useState('0')
  const [helper] = useState(() => new OceanPool())
  const [userLiquidity, setUserLiquidity] = useState('0')
  const [newPoolTokens, setNewPoolTokens] = useState('0')
  const [newPoolShare, setNewPoolShare] = useState('0')


  //console.log({ethBal:ethBal})

  useEffect(() => {
    async function getMaximum() {
      // setSymbolList().then(res => console.log({ res: res }))
      const oceanMaxBuyAmountPool = await helper.getMaxBuyQuantity(POOL_ADDRESS, oceanAddress)
      const tokenMaxBuyAmountPool = await helper.getMaxBuyQuantity(POOL_ADDRESS, dtAddress)

      /**
    * Bug???
    */
      // const amountMaxBuyPool =
      //   coinSymbol === 'OCEAN'
      //     ?  tokenMaxBuyAmountPool
      //     :  oceanMaxBuyAmountPool


      /**
       * Fix???
       */
      const amountMaxBuyPool =
        coinSymbol === 'OCEAN'
          ? oceanMaxBuyAmountPool
          : tokenMaxBuyAmountPool

      const amountMaxBuy =
        coinSymbol === 'OCEAN'
          ? Number(oceanBal) > Number(amountMaxBuyPool)
            ? amountMaxBuyPool
            : oceanBal
          : Number(tokenBal) > Number(amountMaxBuyPool)
            ? amountMaxBuyPool
            : tokenBal


      // console.log({ coinSymbol: coinSymbol })
      // console.log({ symbolList: symbolList })
      // console.log({ amountMaxBuyPool: `${amountMaxBuyPool} ${coinSymbol}` })
      // console.log({ oceanMaxBuyAmountPool: `${oceanMaxBuyAmountPool}`, tokenMaxBuyAmountPool: `${tokenMaxBuyAmountPool}` })
      // console.log({ oceanAddress: oceanAddress, dtAddress })
      // console.log({ oceanBal: oceanBal, tokenBal: tokenBal })

      setAmountMaxBuy(amountMaxBuy)
      // setAmountMaxPool(amountMaxPool)
    }
    getMaximum();
  })

  useEffect(() => {
    async function calculatePoolShares() {
      if (!values.amount) {
        setNewPoolTokens('0')
        setNewPoolShare('0')
        return
      }
      if (Number(values.amount) > Number(amountMaxBuy)) return
      const poolTokens = await helper.calcPoolOutGivenSingleIn(
        POOL_ADDRESS,
        coinSymbol === 'OCEAN' ? oceanAddress : dtAddress,
        values.amount.toString()
      )
      setNewPoolTokens(poolTokens)
      setNewPoolShare(
        totalBalance &&
        (
          (Number(poolTokens) /
            (Number(totalPoolTokens) + Number(poolTokens))) *
          100
        ).toFixed(2)
      )
    }
    //  calculatePoolShares()
  }, [])


  //console.log({ amountMaxBuy: `${amountMaxBuy} ${coinSymbol}` })
  // console.log({ newAccount:newAccount})
  //console.log({ Account: `${userInfo.publicKey}` })
  // console.log({amountMax_:amountMax, amountMaxPool:amountMaxPool})

  const stakeSchema = Yup.object().shape({
    // destination: Yup.string()
    //    .matches(/0x[a-fA-F0-9]{40}/g, 'Enter a valid Ethereum address!')
    //   .required('Destination is Required!'),

    amount: Yup.number()
      .max(Number(amountMaxBuy),
        `Maximum you can add is ${Number(amountMaxBuy).toFixed(2)} ${coinSymbol}`
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
    validationSchema: stakeSchema,
    initialValues: {
      // destination: '', 
      amount: ''
    },
    onSubmit: async (values) => {
      // handleAddLiquidity(values)

    }
  });

  // Submit
  async function handleAddLiquidity(values) {
    try {
      setLoading(true)
      setLiquidityError('')
      setLiquidityHash('')
      const result =
        coinSymbol === 'OCEAN'
          ? await helper.addOceanLiquidity(
            `${userInfo.publicKey}`,
            POOL_ADDRESS,
            `${values.amount}`
          )
          : await helper.addDTLiquidity(`${userInfo.publicKey}`, POOL_ADDRESS, `${values.amount}`)
      setLoading(false)
      console.log({ myresult: result })
      if (result.status === true) {
        setLiquidityHash(`${result.transactionHash}`)
        dispatch({
          type: actions.SET_ALERT_SETTINGS,
          alertSettings: {
            show: true,
            type: 'success',
            message: `Succeeded Staking  ${values.amount} ${coinSymbol}...`,
            confirmText: 'Got It',
            cancelText: 'Got It',
            title: `🎉 Transaction Success!`,
            showCancelButton: true,
            onCancelPressed: () => { },
          },
        })

      } else {
        setLiquidityError('Failed to Join the Pool!')
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

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.sendAmountInputContainer}>
        <Text style={styles.inputLabel}>Amount ({coinSymbol})</Text>
        <WriteInput
          icon='cash'
          selectable={true}
          selectTextOnFocus={true}
          style={{ color: '#ffff' }}
          placeholder={'amount to swap'}
          onChangeText={handleChange('amount')}
          onBlur={handleBlur('amount')}
          error={errors.amount}
          touched={touched.amount}
        />
        <Picker
          style={{
            color: theme.COLORS.WHITE,
            width: Dimensions.get('screen').width * 0.39,
            alignSelf: 'flex-end',
            marginTop: -95
          }}
          dropdownIconColor={theme.COLORS.WHITE}
          mode="dropdown"
          selectedValue={coinSymbol}
          onValueChange={(itemValue) => setCoinSymbol(itemValue)

          }
        >
          {symbolList.map((item, index) => {
            return (<Picker.Item label={item} value={item} key={index} />)
          })
          }
        </Picker>
        <View>
          {touched.amount && errors.amount &&
            <Text style={{ fontSize: 12, color: '#FF0D10', marginTop: 15 }}>{errors.amount}</Text>
          }
        </View>
        <View style={styles.contentContainer, { paddingTop: 20 }}>
          {
            liquidityHash
              ? <MessageBox
                title={`🎉 Succeeded Staking  ${values.amount} ${coinSymbol}...`}
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
        <View style={{ paddingTop: 60 }}>
          <TouchableOpacity
            disabled={!isValid || loading}
            style={isValid ?
              { ...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, } :
              { ...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, backgroundColor: 'grey' }}
            onPress={() => {
              validateField('amount').then((res) => {
                if (values.amount) {
                  dispatch({
                    type: actions.SET_ALERT_SETTINGS,
                    alertSettings: {
                      show: true,
                      type: 'warn',
                      message: `Authorize this app to access your ${coinSymbol} `,
                      confirmText: 'Authorize',
                      title: 'Please Confirm Transaction',
                      showConfirmButton: true,
                      showCancelButton: true,
                      onConfirmPressed: () => {
                        handleAddLiquidity(values)
                      },
                      onCancelPressed: () => { },
                    },
                  });
                }
              })

            }}
          >
            <Text style={styles.buttonText}>Swap {values.amount} {coinSymbol}</Text>
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
