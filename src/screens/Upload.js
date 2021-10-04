import {View,Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import UploadGuidelines from './UploadGuidelines';
import UploadImage from './UploadImage';
import {getDataUsageFlag, setDataUsageFlag} from '../services/DataManager';
import {actions} from '../services/State/Reducer';


const Upload = (props) => {
  //set this true cause TOC first show always
  const [{dataUsageSettings }, dispatch] = useStateValue();

  useEffect(() => {
  }, []);

  return (
      <>
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
        <UploadImage {...props} />
       )
      }
      </>
  );
};
export default Upload;
