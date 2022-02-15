import React, { useRef, useEffect, useState } from 'react'
import { View, Text, Dimensions,TouchableOpacity, Modal, Pressable, 
    StyleSheet, StatusBar, ScrollView, Image, ActivityIndicator} from 'react-native'
//import { styles } from '../styles/token'
import {
  Field,
  FieldInputProps,
  FormikContextType,
  useFormikContext,
  useFormik,
  Formik, 
} from 'formik'
const DUIcon = require('../../assets/app-logo.png');
import {actions} from '../../services/State/Reducer';
import {useStateValue} from '../../services/State/State';
import ImageAnnotateMission from "../ImageAnnotateMission";
import { LiquidityModal } from "./LiquidityModal";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { POOL_ADDRESS } from "../../../env";
import minABI from '../../abis/minABI.json'
import { web3 } from "../../web3/utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../../functions/walletsettings';
import { OceanPool } from '../../components/OceanPool'
//import { styles } from '../../styles/walletsettings'
import { WriteTextInput } from '../../components/formikYup/TextInput'
import * as Yup from 'yup'
import { theme } from "../../services/Common/theme";
import { Picker } from '@react-native-picker/picker';
import { styles } from "../../styles/wallet";
import Ripple from "../../components/Ripple";
import LinearGradient from 'react-native-linear-gradient';
import { MessageBox } from '../../components/formikYup/TextInput';
import debounce from 'lodash.debounce'

//this is template or component that creates a form for adding liq.
export default function FormAddLiquidity({
 // coin,
  dtBalance,
  oceanBalance,
  dtSymbol,
  amountMax,
  //setCoin,
  totalPoolTokens,
  totalBalance,
  poolAddress,
  oceanAddress,
  dtAddress,
  setNewPoolTokens,
  setNewPoolShare
}) {
  //const { ocean, balance } = useOcean()

  const [userInfo, setUserInfo] = useState('')
  const [helper] = useState(() => new OceanPool());
  const [, dispatch] = useStateValue();
  const [modalVisible, setModalVisible] = useState(false);
  const [symbolList, setSymbolList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState('OCEAN')
  const [showInfo, setShowInfo] = useState(false);
  const [newAccount, setNewAccount] = useState('');
  const [secondTitleTokens, setSecondTitleTokens] = useState([])
  const [liquidityHash, setLiquidityHash] = useState('')
  const [liquidityError, setLiquidityError] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [showRemove, setShowRemove] = useState(false)
  const [amountPercent, setAmountPercent] = useState('0')
  const [amountMaxPercent, setAmountMaxPercent] = useState('100')
  const [amountPoolShares, setAmountPoolShares] = useState('0')
  const [amountOcean, setAmountOcean] = useState('0')
  const [amountDatatoken, setAmountDatatoken] = useState('0')
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [poolTokens, setPoolTokens] = useState()

  const ValidationSchema = Yup.object().shape({
    // destination: Yup.string()
    //    .matches(/0x[a-fA-F0-9]{40}/g, 'Enter a valid Ethereum address!')
    //   .required('Destination is Required!'),

    amount: Yup.number()
     .max(Number(amountMax),
      `Maximum you can add is ${Number(amountMax).toFixed(2)} ${coin}`
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
    validationSchema: ValidationSchema,
    initialValues: {
      // destination: '', 
      amount: '' 
    },
    onSubmit: async(values) => {
      alert(values.amount)
     // handleAddLiquidity(values)
      ///: null
    }  
   });  
  
     // Submit
  async function handleAddLiquidity(values) {
     
    try {
    setLoading(true)
    setLiquidityError('')
    setLiquidityHash('')
    const result =
        coin === 'OCEAN'
        ? await helper.addOceanLiquidity(
            newAccount,
            POOL_ADDRESS,
            `${values.amount}`
            )
        : await helper.addDTLiquidity(newAccount, POOL_ADDRESS, `${values.amount}`)

        //  (result !== null) 
        //  ? setLiquidityHash(`Success!:${result.transactionHash}`)
        //  : setLiquidityError('Failed to Join the Pool!')
        setLoading(false)
        console.log({myresult: result})
        if (result.status === true) {
        setLiquidityHash(`${result.transactionHash}`)
        } else {
        setLiquidityError('Failed to Join the Pool!')
        }
    //resetForm()
    //refreshInfo()
    } catch (error) {
    console.error(error.message)
    // toast.error(error.message)
    }
  }
  async function handleRemoveLiquidity(values) {
     
    try {
    setLoading(true)
    setLiquidityError('')
    setLiquidityHash('')
    const result =
        coin === 'OCEAN'
        ? await helper.removeOceanLiquidity(
            newAccount,
            POOL_ADDRESS,
            `${values.amount}`,
            amountPoolShares
            )
        : await helper.removeDTLiquidity(newAccount, POOL_ADDRESS, `${values.amount}`)
       // helper.removePoolLiquidity()

        //  (result !== null) 
        //  ? setLiquidityHash(`Success!:${result.transactionHash}`)
        //  : setLiquidityError('Failed to Join the Pool!')
        setLoading(false)
        console.log({myresult: result})
        if (result.status === true) {
        setLiquidityHash(`${result.transactionHash}`)
        } else {
        setLiquidityError('Failed to Join the Pool!')
        }
    //resetForm()
    //refreshInfo()
    } catch (error) {
    console.error(error.message)
    // toast.error(error.message)
    }
  }

  const LiquidityModal = () => {
            
    return (
      <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles_.centeredView}>
            <View style={styles_.modalView}>
    
            <View style={styles__.container}>
          
                <View style={styles__.info}>
                  <Image
                    resizeMode="stretch"
                    source={DUIcon}
                    style={styles__.infoImage}
                  />
                  <View>
                    <Text style={styles__.compantTitle}>CONFIRM TRANSACTION</Text>
                  </View>
                </View>
                <View style={styles__.mainDivider} />
                <View style={styles.mainDivider} />
                <LinearGradient
                    end={{x: 1, y: 0}}
                    start={{x: 0.15, y: 0}}
                    colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}
                    style={styles__.modalButtonGradient}>
              <Ripple
                onPress={() => {
                setModalVisible(!modalVisible)    
                dispatch({
                  type: actions.SET_ALERT_SETTINGS,
                  alertSettings: {
                    show: true,
                    type: 'warn',
                    message: `Authorize this app to access your ${coin} `,                
                    confirmText: 'Authorize',
                    title: 'Confirm Transaction',
                    showConfirmButton: true,
                    showCancelButton: true,
                    onConfirmPressed: () => {
                       // alert(values.amount)
                       handleAddLiquidity(values)  
                    },
                    onCancelPressed: () => {},
                  },
                  });
                }}
               style={styles__.modalButton}>
              <Text style={styles__.buttonText}>Continue</Text>
              <MaterialIcon
                size={20}
                name="double-arrow"
                color={theme.COLORS.WHITE}
                style={styles__.buttonIconRight}
              />
              </Ripple>
               </LinearGradient>
        </View>
        </View>
          </View>
        </Modal>
      </View>
    );
  };

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

  useEffect(() => {
    async function calculatePoolShares() {
      if (!values.amount) {
        setNewPoolTokens('0')
        setNewPoolShare('0')
        return
      }

      if (Number(values.amount) > Number(amountMax)) return
      const poolTokens = await helper.calcPoolOutGivenSingleIn(
        poolAddress,
        coin === 'OCEAN' ? oceanAddress : dtAddress,
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
    calculatePoolShares()
  }, [])

  // Get Balances...
  useEffect(() => {
      if (!helper && !POOL_ADDRESS) {return;}
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
             // symbolList_ = [oceanSymbol, tokenSymbol]
               //console.log('symbolList_:', symbolList_)
              setSymbolList([oceanSymbol, tokenSymbol]);
    
              const ethBal =  await web3.eth.getBalance(newAccount).then((bal) =>
                              Number(web3.utils.fromWei(bal, 'ether')).toFixed(1));

                             // console.log({ethBal:ethBal})
    
            //   calculateTokenBal(oceanInstance,newAccount)
            //     .then((oceanBal) => setOceanBal(Number(web3.utils.fromWei(oceanBal)).toFixed(1)
            //     ))
            //   calculateTokenBal(tokenInstance,newAccount)
            //     .then((tokenBal) => setTokenBal(Number(web3.utils.fromWei(tokenBal)).toFixed(1)
            //     ))
    
         // setDtAddress(poolDtToken)
        //   setOceanAddress(oceanAddress) 
          // setEthBal(ethBal)
        } 
      
        // const maxTokensInPool = await helper.getDTMaxBuyQuantity(destination) // OR
            // const maxTokensInPool = await helper.getMaxBuyQuantity(POOL_ADDRESS,poolDtToken) //max buy datatoken
            // const maxOceanInPool = await helper.getMaxBuyQuantity(POOL_ADDRESS,oceanAddress) //max buy ocean
            // setMaxDt(Number(maxTokensInPool))
            // setMaxOcean(Number(maxOceanInPool))
    
     console.log({poolDtToken:poolDtToken, currTokens:currTokens, dataToken:dataToken})
       console.log({oceanAddress:oceanAddress, dtAddress:dtAddress})
      }
        getBalances()
  }, [helper])

  // Get pool Tokens
  useEffect(() => {
       const calcPoolTokens = async() => {
          if (!helper || !newAccount || !POOL_ADDRESS)return
           // Get everything the user has put into the pool
        const poolTokens = await helper.sharesBalance(
            newAccount, // accountId,
            POOL_ADDRESS //price.address
        )
        setPoolTokens(poolTokens)
    }

   calcPoolTokens()
  
  },[helper,newAccount,POOL_ADDRESS])

    // Get and set max percentage
  useEffect(() => {
        if (!helper || !poolTokens) return
    
        async function getMax() {
            const amountMaxOcean = await helper.getOceanMaxRemoveLiquidity(
                POOL_ADDRESS
              )
            const amountMaxOcean_ = await helper.getMaxRemoveLiquidity(
                POOL_ADDRESS, dtAddress // bug: dtAddress is actually oceanAddress
            )  
            
              const amountMaxPoolShares = await helper.getPoolSharesRequiredToRemoveOcean(
                POOL_ADDRESS,
                amountMaxOcean
              )
            
              let amountMaxPercent = `${Math.floor(
                (Number(amountMaxPoolShares) / Number(poolTokens)) * 100
              )}`
              if (Number(amountMaxPercent) > 100) {
                amountMaxPercent = '100'
              }

              const MaxPercentRemoved =
                isAdvanced === true
                ? '100'
                : amountMaxPercent
               // : await getMaxPercentRemove(ocean, poolAddress, poolTokens)
            setAmountMaxPercent(MaxPercentRemoved)
            console.log({amountMaxOcean:amountMaxOcean, amountMaxPoolShares:amountMaxPoolShares})
            console.log({amountMaxPercent:amountMaxPercent,MaxPercentRemoved:MaxPercentRemoved})
            console.log({amountMaxOcean_:amountMaxOcean_, })
        }
        getMax()
  }, [helper, isAdvanced, POOL_ADDRESS, poolTokens])

  const getValues = useRef(
    debounce(async (newAmountPoolShares, isAdvanced) => {
      if (isAdvanced === true) {
        const tokens = await helper.getTokensRemovedforPoolShares(
          POOL_ADDRESS,
          `${newAmountPoolShares}`
        )
        setAmountOcean(tokens?.oceanAmount)
        setAmountDatatoken(tokens?.dtAmount)
        return
      }

      const amountOcean = await ocean.pool.getOceanRemovedforPoolShares(
        POOL_ADDRESS,
        newAmountPoolShares
      )
      setAmountOcean(amountOcean)
    }, 150)
  )
  
   // Check and set outputs when amountPoolShares changes
   useEffect(() => {
    if (!helper || !poolTokens) return
    getValues.current(amountPoolShares, isAdvanced)
  }, [
    amountPoolShares,
    isAdvanced,
    helper,
    poolTokens,
    POOL_ADDRESS,
    totalPoolTokens
  ])

  // Set amountPoolShares based on set slider value
  const handleAmountPercentChange = (e) => {
    setAmountPercent(e.target.value)
    if (!poolTokens) return

    const amountPoolShares = (Number(e.target.value) / 100) * Number(poolTokens)
    setAmountPoolShares(`${amountPoolShares}`)
  }

  const handleMaxButton = (e) => {
    //e.preventDefault()
    setAmountPercent(amountMaxPercent)

    const amountPoolShares =
      (Number(amountMaxPercent) / 100) * Number(poolTokens)
    setAmountPoolShares(`${amountPoolShares}`)
  }

  const handleAdvancedButton = (e) => {
   // e.preventDefault()
    setIsAdvanced(!isAdvanced)

    setAmountPoolShares('0')
    setAmountPercent('0')
    setAmountOcean('0')

    if (isAdvanced === true) {
      setAmountDatatoken('0')
    }
  }

  console.log({totalPoolTokens:totalPoolTokens,amountPoolShares:amountPoolShares})
  console.log({newAccount:newAccount, poolTokens:poolTokens, amountMaxPercent:amountMaxPercent})
  
  return (
       <>
       <View>
        <WriteTextInput
          icon='cash'
          selectable={true}
          selectTextOnFocus={true}
          style={{color:'#ffff'}}
          placeholder={'enter amount'}
          onChangeText={handleChange('amount')}
          onBlur={handleBlur('amount')}
          error={errors.amount}
          touched={touched.amount}
        />
        <Picker
          style={{
          color:theme.COLORS.WHITE,
          width: Dimensions.get('screen').width * 0.39,
          alignSelf:'flex-end',
          marginTop: -95
          }}
          dropdownIconColor={theme.COLORS.WHITE}
          mode="dropdown"
          selectedValue={coin}
          onValueChange={(itemValue) => setCoin(itemValue)
          
         }
          >
          { symbolList.map((item, index) => {
            return (<Picker.Item label={item} value={item} key={index} />)
            })
          }
        </Picker>
         <View>
          { touched.amount && errors.amount &&
         <Text style={{ fontSize: 12, color: '#FF0D10',marginTop: 15 }}>{errors.amount}</Text> 
          }
         </View>
         <View style={styles.contentContainer, {paddingTop: 20}}>
          {
            liquidityHash 
            ? <MessageBox 
                title={`Succeeded Staking  ${values.amount} ${coin}...`}
                value={liquidityHash}
             /> 
            : liquidityError
            ? <MessageBox 
                title={`Failed Staking to the Liquidity Pool!`}
                value={liquidityError}
             />
            : null 
          }
         </View>
         <View style={ {paddingTop: 60}}>
          <TouchableOpacity
            disabled={!isValid || loading}
            style={isValid ? 
                {...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68,}: 
                {...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, backgroundColor:'grey'}}
            onPress={() => {
                // validateField('amount').then(setModalVisible(true)) 
                validateField('amount').then((res) => {
                    //res == values.amount
                    //console.log({res:res, amount:values.amount})
                    if (values.amount) {
                     // setModalVisible(true)
                     dispatch({
                        type: actions.SET_ALERT_SETTINGS,
                        alertSettings: {
                          show: true,
                          type: 'warn',
                          message: `Authorize this app to access your ${coin} `,                
                          confirmText: 'Authorize',
                          title: 'Confirm Transaction',
                          showConfirmButton: true,
                          showCancelButton: true,
                          onConfirmPressed: () => {
                             // alert(values.amount)
                             handleAddLiquidity(values)  
                          },
                          onCancelPressed: () => {},
                        },
                        });
                    }
                })

                }}
            >
            <Text style={styles.buttonText}>Stake {values.amount} {coin}</Text> 
            <View style={{ position: 'absolute', top:"90%",right: 0, left: 220 }}>
            {
                loading 
                ? <ActivityIndicator size="large" color="#ffff" />
                : null
            }       
            </View>
          </TouchableOpacity>
         </View>
         <View style={{paddingTop:20}}>
        <TouchableOpacity
            disabled={!isValid || loading}
            style={isValid ? 
            {...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68,}: 
            {...styles.approveSendButtonStyle, width: Dimensions.get('screen').width * 0.68, backgroundColor:'grey'}}
            onPress={() => { 
                //setModalVisible(true) && handleAddLiquidity(values)
            }}     
        >
        <Text style={styles.buttonText}>UnStake {values.amount} {coin}</Text> 
        </TouchableOpacity>
        </View>
        {/* {LiquidityModal()} */}
        {/* <ModalActivityIndicator modalVisible={false} /> */}
      
      </View>

    </>
  )
}

const styles_ = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop:289
    },
    modalView: {
      margin: 20,
      backgroundColor: theme.APP_COLOR_2,
      //borderRadius: 50,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      padding: 105,
     // height: 30,
     height: Dimensions.get('window').height * 0.6,
     width: Dimensions.get('window').width,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      height: 40
    },
    buttonOpen: {
      backgroundColor: "red",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

const styles__ = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardCover: {
      height: '50%',
      width: '100%',
    },
    companyInfoContainer: {
      marginTop: '8%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: theme.APP_COLOR_2,// edited
    },
    companyInfoContentContainer: {
      paddingBottom: '10%',
    },
    info: {
      paddingVertical: -10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoImage: {
      width: 80,
      height: 80,
      marginRight: 22,
    },
    compantTitle: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Moon-Bold',
      color: theme.COLORS.WHITE,
      textTransform: 'uppercase',
    },
    tags: {
      marginTop: 9,
      flexDirection: 'row',
    },
    tag: {
      marginRight: 8,
      borderRadius: 30,
      paddingVertical: 5,
      paddingHorizontal: 10.5,
      backgroundColor: theme.COLORS.SKY_BLUE,
    },
    tagText: {
      fontSize: 12,
      lineHeight: 14,
      fontFamily: 'Moon-Bold',
      color: theme.COLORS.WHITE,
      textTransform: 'uppercase',
    },
    mainDivider: {
      height: 2,
      backgroundColor: theme.APP_COLOR_2,
    },
  
    button: {
      marginTop: 30,
      marginHorizontal: '10%',
    },
    buttonIcon: {
      marginRight: 10,
    },
    buttonOuter: {
      width: '100%',
      borderRadius: 30,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: '5%',
      paddingHorizontal: '1%',
      justifyContent: 'center',
      backgroundColor: theme.APP_COLOR_2,
    },
    radius30: {
      borderRadius: 30,
    },
    gradientButtonInner: {
      width: '100%',
      borderRadius: 30,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: '5%',
      paddingHorizontal: '1%',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'Moon-Bold',
      color: theme.COLORS.WHITE,
      textTransform: 'uppercase',
    },
    approveSendButtonStyle: {
      alignItems: "center",
      backgroundColor: theme.COLORS.BLUE,
      padding: 20,
      borderRadius: 30,
      width: Dimensions.get('screen').width * 0.44,
      alignSelf: 'center',
      //marginTop: '5%',
      height: 55
    },
    tcText: {
      padding: 38,
      fontSize: 16,
      lineHeight: 29,
      textAlign: 'center',
      fontFamily: 'Moon-Bold',
      color: theme.COLORS.WHITE,
      textTransform: 'uppercase',
    },
    actionContainer: {
      paddingHorizontal: 40,
    },
    radioButtonContainer: {
      paddingTop: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioButtonText: {
      fontSize: 12,
      lineHeight: 16,
      textAlign: 'left',
      paddingHorizontal: 16,
      fontFamily: 'Moon-Bold',
      textTransform: 'uppercase',
      color: theme.COLORS.SILVER,
    },
    radioButtonTextLink: {
      fontSize: 12,
      lineHeight: 16,
      textAlign: 'left',
      paddingHorizontal: 16,
      fontFamily: 'Moon-Bold',
      textTransform: 'uppercase',
      color: theme.COLORS.DARK_BLUE,
      textDecorationLine: 'underline',
    },
  
    // Info Modal Styling
    infoModalContainer: {
      flex: 1,
      paddingTop: StatusBar.currentHeight || '10%',
    },
    infoModalContentContainer: {
      flex: 1,
      marginTop: '8%',
      borderRadius: 30,
      marginBottom: '11.2%',
      marginHorizontal: '4.5%',
      backgroundColor: theme.APP_COLOR_2,
    },
    header: {
      height: '18%',
      alignItems: 'center',
      borderBottomWidth: 2,
      paddingHorizontal: '1%',
      justifyContent: 'center',
      borderBottomColor: theme.COLORS.LIGHT_GREY,
    },
    headerTitle: {
      fontSize: 24,
      marginTop: 13,
      textAlign: 'center',
      fontFamily: 'Moon-Bold',
      color: theme.COLORS.WHITE,
      textTransform: 'uppercase',
    },
    infoContainerItems: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: '4.5%',
      width: Dimensions.get('screen').width * 0.91,
    },
    infoContainerItem: {
      paddingTop: '13%',
    },
    infoContentItemTitle: {
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'Moon-Bold',
      color: theme.COLORS.WHITE,
      textTransform: 'uppercase',
    },
    infoContentItemDescription: {
      fontSize: 12,
      lineHeight: 19,
      marginTop: '6%',
      textAlign: 'center',
      fontFamily: 'Moon-Light',
      textTransform: 'uppercase',
      color: theme.COLORS.WHITE,
    },
    bottomContainer: {
      flex: 1,
      marginBottom: '10%',
      paddingHorizontal: '9%',
      justifyContent: 'flex-end',
    },
    dots: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      paddingHorizontal: '2%',
      paddingVertical: '1.25%',
      marginVertical: '13.5%',
      justifyContent: 'center',
    },
    dot: {
      width: 12,
      height: 12,
      elevation: 5,
      borderRadius: 15,
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      marginHorizontal: '1.25%',
      shadowColor: theme.COLORS.BLACK,
      shadowOffset: {width: 0, height: 4},
      backgroundColor: theme.COLORS.PURPLE,
    },
    dotActive: {
      width: 12,
      height: 12,
      elevation: 5,
      borderRadius: 15,
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      marginHorizontal: '1.25%',
      shadowColor: theme.COLORS.BLACK,
      backgroundColor: theme.COLORS.GREY,
      shadowOffset: {width: 0, height: 4},
    },
    modalButtonGradient: {
      borderRadius: 30,
      marginVertical: '1.25%',
    },
    modalButton: {
      margin: 2,
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: '5%',
      paddingHorizontal: '1%',
      justifyContent: 'center',
      backgroundColor: theme.APP_COLOR_2,
    },
  
    //RadioButton Styling
    radioButton: {
      width: 32,
      height: 32,
      borderWidth: 2,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.APP_COLOR_2,
      borderColor: theme.COLORS.LIGHT_GREY,
    },
    radioButtonDot: {
      width: 16,
      height: 16,
      borderRadius: 25,
      backgroundColor: theme.APP_COLOR_2,
    },
  
    // TC Modal Styling
    tcModalContainer: {
      flex: 1,
      paddingTop: '30%',
    },
    tcModalContentContainer: {
      flex: 1,
      borderRadius: 30,
      backgroundColor: theme.APP_COLOR_1,
    },
    tcHeaderTitle: {
      margin: 40,
      fontSize: 16,
      lineHeight: 29,
      textAlign: 'center',
      fontFamily: 'Moon-Bold',
      color: theme.COLORS.WHITE,
      textTransform: 'uppercase',
    },
    tcContainerItems: {
      alignItems: 'center',
      paddingBottom: '50%',
      paddingHorizontal: 40,
    },
    tcContainerItem: {
      paddingTop: 32,
    },
    tcContentItemTitle: {
      fontSize: 14,
      lineHeight: 17,
      textAlign: 'center',
      fontFamily: 'Moon-Bold',
      color: theme.COLORS.WHITE,
      textTransform: 'uppercase',
    },
    tcContentItemDescription: {
      fontSize: 12,
      lineHeight: 20,
      marginTop: 20,
      textAlign: 'center',
      fontFamily: 'Moon-Light',
      color: theme.COLORS.WHITE,
      textTransform: 'uppercase',
    },
    tcCloseButtonContainer: {
      left: 0,
      right: 0,
      bottom: 0,
      height: '30%',
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      position: 'absolute',
      paddingBottom: '15%',
      justifyContent: 'flex-end',
    },
    tcCloseButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.APP_COLOR_2,
    },
  });
