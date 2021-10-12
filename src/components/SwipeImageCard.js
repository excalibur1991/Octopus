import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import {settings as s} from '../services/API/Settings';
import {refreshTokenAPI} from '../services/API/CoreAPICalls';

export const NoMoreCards = (props) => {
  return (
    <View style={styles.card}>
      <Text>No more Videos.</Text>
    </View>
  );
};

export const SwipeImageCard = (props) => {
  const fetchToken = async () => {
    const authToken = await refreshTokenAPI();
    if (authToken && authToken.access_token) {
      setToken(authToken.access_token);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const [token, setToken] = useState('');

  const {images = [], image_id = ''} = props || {};

  const findImage = () => {
    var card = null;
    images.map((data) => {
      if (data.image_id == image_id) {
        card = data;
      }
    });
    return card ? {uri: card.image} : require('../assets/top_image.png');
  };

  return (
    <View style={styles.card}>
      {token && image_id ? (
        <Video
          controls
          onBuffer={(data) => console.log('BufferData: ', data)}
          onError={(error) => console.log('Error: ', error)}
          resizeMode="stretch"
          style={styles.thumbnail}
          source={{
            uri: `${s.baseUrl}/api/v1/videos/${image_id}/download`,
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: '*/*'
            },
          }}
        />
      ) : null}
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
    width: 302,
    height: 307,
    borderWidth: 0,
    elevation: 1,
  },
  thumbnail: {
    width: 302,
    height: 307,
  },
});

SwipeImageCard.propTypes = {
  images: PropTypes.array,
  image_id: PropTypes.string,
};
