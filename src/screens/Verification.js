import {View} from 'react-native';
import React, {useEffect} from 'react';
import {useStateValue} from '../services/State/State';
import TOC from './TOC'
import VeriPage from './VeriPage';
import {actions} from '../services/State/Reducer';


import {
  getAllImages,
  getImage,
  storeUserResponse,
} from '../services/API/APIManager';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles/swipeai';

import {isPrivacyAndTermsAccepted, setPrivacyAndTermsAccepted} from '../services/DataManager';



const Verification = () => {
  
  useEffect(() => {
 
  }, []);

  //set this true cause TOC first show always
  const [{verifySettings}, dispatch] = useStateValue();
  return (
    <View style={styles.container}>
      {
       (verifySettings == false) ? (
       <TOC 
        isTOCChecked={verifySettings}
        setTOCChecked={()=>{
          dispatch({
            type: actions.SET_VERIFYSETTING,
            dataUsageSettings: true
          });
        }} 
       />
       ) : (
        <VeriPage />
       )
      }
    </View>
  );
};
export default Verification;
