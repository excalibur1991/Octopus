import {
  View,
  Text, 
  Image,
  StyleSheet
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';


const Annotation = () => {
  
  useEffect(() => {
  }, []);

  const [, dispatch] = useStateValue();
  return (
    <View style={styles.container}>
    </View>
  );
};
export default Annotation;


const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      marginHorizontal: 0,
    },
});
