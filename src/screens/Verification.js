import {View, Image} from 'react-native';
import Ripple from '../components/Ripple';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import GestureRecognizer from 'react-native-swipe-gestures';
import TOC from './TOC'
import VeriPage from './VeriPage';

import {
  getAllImages,
  getImage,
  storeUserResponse,
} from '../services/API/APIManager';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles/swipeai';
import {fetchImages, onSwipe} from '../functions/swipeai';

import {isPrivacyAndTermsAccepted, setPrivacyAndTermsAccepted} from '../services/DataManager';



const Verification = () => {
  
  const initScreen = async ()=>{
    const _checked = await isPrivacyAndTermsAccepted();
    console.log('_checked', _checked);
  
    setTOCChecked(_checked);
  }

  useEffect(() => {
    initScreen();
  }, []);

  
  const [isTOCChecked, setTOCChecked] = useState(true);

  const [, dispatch] = useStateValue();
  return (
    <View style={styles.container}>
      {
        (isTOCChecked == false) &&
       <TOC 
        isTOCChecked={isTOCChecked}
        setTOCChecked={()=>{setTOCChecked()}} 
       />
      }
      {
        <VeriPage />
      }
    </View>
  );
};
export default Verification;
