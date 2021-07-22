import { FormikContextType, useFormikContext } from 'formik'
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import {View,Text,TextInput} from 'react-native'
import { FormTradeData, slippagePresets } from '../screens/FormTrade'
//import styles from './Slippage.module.css'
import {Picker} from '@react-native-picker/picker';
import Button from '../components/Button';

export default function Slippage(): ReactElement {
   const [slippageValues, setSlippageValues] = useState([])
   const [selectedValues, setSelectedValues] =useState('')


 const getPickerValues = async() => {
   slippagePresets.map((item, i) => {
    console.log({items: item.toString()}) 
    setSelectedValues(item)
    })
  
   console.log({slippagePresets:slippagePresets, pickerValues: selectedValues})
 }
     
  useEffect(() => {

   getPickerValues()
  },[])

  return (
    <>
      <View 
         >
        <Text>Expected price impact</Text>

      <Picker
       // style={{your_style}}
        mode="dropdown"
        selectedValue={selectedValues}
        onValueChange={(itemValue, itemIndex)=>setSelectedValues(slippagePresets[itemIndex])}> 
        {slippagePresets.map((item, index) => {
          //setSlippageValues(item)
            return (<Picker.Item label={item} value={index} key={index}/>) 
        })}
      </Picker> 

      <Button onPress={getPickerValues} title="Get" />
      </View>
    </>
  )
}
