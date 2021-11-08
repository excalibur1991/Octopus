import {View,Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import UploadGuidelines from './UploadGuidelines';
import UploadImage from './UploadImage';
import PlayAI  from './PlayAI';
import {getDataUsageFlag, setDataUsageFlag} from '../services/DataManager';
import {actions} from '../services/State/Reducer';
import { Appbar } from 'react-native-paper';
import { MainScreeen } from './playAI/MainSceen';
//later branch the Upload cases
const Upload = (props) => {
  //set this true cause TOC first show always
  const [{dataUsageSettings }, dispatch] = useStateValue();

  const {navigation} = props || {};
  

  useEffect(() => {
    
  }, []);

  return (
      <View style={{flex:1, backgroundColor: '#ccc', height: '100%'}}>
      {
       (dataUsageSettings == false) ? (
       <UploadGuidelines 
       isDataUsageAvailable={dataUsageSettings}
       setDataUsageAvailable={()=>{
        setDataUsageFlag();
        dispatch({
            type: actions.SET_DATAUSAGE,
            dataUsageSettings: true
          });
        }} 
       />) : (
        /*<UploadImage {...props} />*/
        <MainScreeen />
        //<PlayAI {...props} />
       )
      }
      </View>
  );
};
export default Upload;
