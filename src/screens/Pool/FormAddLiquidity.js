import React, { useState, useEffect } from 'react';
import { actions } from '../../services/State/Reducer';
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
import { getWalletBalances, getAllAddCalcs } from './AddLiquidity';

const FormAddLiquidity = ({ t, navigation }) => {

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
      setUserLiquidity,
    )
  }, [])


  const [ethBal, setEthBal] = useState('0');
  const [tokenBal, setTokenBal] = useState('0');
  const [oceanBal, setOceanBal] = useState('0');
  const [userInfo, setUserInfo] = useState('0');
  const [oceanAddress, setOceanAddress] = useState('')
  const [dtAddress, setDtAddress] = useState('')
  const [symbolList, setSymbolList] = useState([])
  const [, dispatch] = useStateValue();
  const [coinSymbol, setCoinSymbol] = useState([])
  const [liquidityHash, setLiquidityHash] = useState('')
  const [liquidityError, setLiquidityError] = useState('')
  const [loading, setLoading] = useState(false);
  const [amountMaxBuy, setAmountMaxBuy] = useState('0')
  const [helper] = useState(() => new OceanPool())
  const [totalPoolTokens, setTotalPoolTokens] = useState('0')
  const [userLiquidity, setUserLiquidity] = useState('0')
  const [weightDt, setWeightDt] = useState('0')
  const [weightOcean, setWeightOcean] = useState('0')
  const [swapFee, setSwapFee] = useState('0')
  const [dtReserve, setDtReserve] = useState('0')
  const [oceanReserve, setOceanReserve] = useState('0')
 

  useEffect(() => {
    async function getMaximum() {
      if (!oceanAddress || !POOL_ADDRESS) return

      const oceanMaxBuyAmountPool = await helper.getMaxBuyQuantity(POOL_ADDRESS, oceanAddress)
      const tokenMaxBuyAmountPool = await helper.getMaxBuyQuantity(POOL_ADDRESS, dtAddress)

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

      setAmountMaxBuy(amountMaxBuy)
      // setAmountMaxPool(amountMaxPool)
    }
    getMaximum();
  })

  const stakeSchema = Yup.object().shape({
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
      amount: ''
    },
    onSubmit: async (values) => {

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
      // console.log({ myresult: result })
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
        <Text style={styles.inputLabel}>Amount ({coinSymbol})</Text>
        <WriteInput
          icon='cash'
          selectable={true}
          selectTextOnFocus={true}
          style={{ color: '#ffff' }}
          placeholder={'amount to stake'}
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
          <Picker.Item label={symbolList.tokenSymbol} value={symbolList.tokenSymbol} />
          <Picker.Item label={symbolList.oceanSymbol} value={symbolList.oceanSymbol} />
        </Picker>
        <View>
          {touched.amount && errors.amount &&
            <Text style={{ fontSize: 12, color: '#FF0D10', marginTop: 15 }}>{errors.amount}</Text>
          }
        </View>
        {
          liquidityHash
            ? <View style={[styles.contentContainer, { paddingTop: 20, paddingBottom: 5 }]}>
              <MessageBox
                title={`🎉 Succeeded Staking  ${values.saleAmount} ${coinSymbol}...`}
                value={liquidityHash}
              />
            </View>
            : liquidityError
              ?
              <View style={[styles.contentContainer, { paddingTop: 20 }]}>
                <MessageBox
                  title={`❗Failed Staking to the Liquidity Pool!`}
                  value={liquidityError}
                />
              </View>
              : null
        }
        <View style={{ paddingTop: 50 }}>
          <TouchableOpacity
            disabled={!isValid || loading}
            style={isValid ?
              { ...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, } :
              { ...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, backgroundColor: 'grey' }}
            onPress={() => {
              validateField('amount').then((res) => {
                if (values.amount) {
                  setLiquidityHash('')
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
            <Text style={styles.buttonText}>Stake {values.amount} {coinSymbol}</Text>
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

export default withTranslation()(FormAddLiquidity);
