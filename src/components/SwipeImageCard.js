import React from 'react';
import {
    View, 
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

export const NoMoreCards = (props) => {
  return (
    <View style={styles.card}>
      <Text>No more Images.</Text>
    </View>
  );
};

export const SwipeImageCard = (props) => {
  const {images = [], image_id = ''} = props || {};

    const findImage = () => {
      var card = null;
      images.map((data)=>{
        if(data.image_id == image_id){
          card = data;
        }
      })
      return card ? {uri:card.image} : require('../assets/loading.gif')
    }

  return (
    <View style={styles.card}>
      <Image 
      resizeMode='stretch'
          style={styles.thumbnail}
          source={ 
              findImage(props)
          } />
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      alignItems: 'center',
      overflow: 'hidden',
      borderColor: 'grey',
      backgroundColor: 'white',
      borderRadius: 43,
      width: Dimensions.get('window').height * 0.3,
      height: Dimensions.get('window').height * 0.3,
      borderWidth: 0,  
      elevation: 1
    },
    thumbnail: {
        width: Dimensions.get('window').height * 0.3,
        height: Dimensions.get('window').height * 0.3,
    }
  })

SwipeImageCard.propTypes = {
  images: PropTypes.array,
  image_id: PropTypes.string,
};
