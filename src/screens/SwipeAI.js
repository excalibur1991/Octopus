import {View, Image} from 'react-native';
import Ripple from '../components/Ripple';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import GestureRecognizer from 'react-native-swipe-gestures';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles/swipeai';
import {fetchImages, onSwipe} from '../functions/swipeai';

const SwipeAI = () => {
  useEffect(() => {
    fetchImages(
      dispatch,
      images,
      setImages,
      setCurrentIndex,
      setMainImage,
      setCutoutImage,
    );
  }, []);

  const [images, setImages] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [cutoutImage, setCutoutImage] = useState(null);
  const [, dispatch] = useStateValue();
  return (
    <View style={styles.container}>
      <Image
        resizeMode="stretch"
        style={styles.topImage}
        source={
          mainImage ? {uri: mainImage} : require('../assets/vt_top_image.png')
        }
      />
      <GestureRecognizer
        onSwipeLeft={() =>
          onSwipe(
            'NO',
            dispatch,
            images,
            setImages,
            currentIndex,
            setCurrentIndex,
            setMainImage,
            setCutoutImage,
          )
        }
        onSwipeRight={() =>
          onSwipe(
            'YES',
            dispatch,
            images,
            setImages,
            currentIndex,
            setCurrentIndex,
            setMainImage,
            setCutoutImage,
          )
        }
        style={styles.gestureContiner}>
        <Image
          resizeMode="stretch"
          style={styles.bottomImage}
          source={
            mainImage
              ? {uri: cutoutImage}
              : require('../assets/vt_bottom_image.png')
          }
        />
      </GestureRecognizer>
      <View style={styles.actionsContainer}>
        {/* <Ripple
          outerStyle={styles.miniLeftButton}
          innerStyle={styles.miniButtonInner}
          onPress={() => {}}>
          <MaterialCommunityIcon name="reload" size={20} color="#DCCD96" />{' '}
        </Ripple> */}
        <Ripple
          outerStyle={styles.largeLeftButton}
          innerStyle={styles.largeButtonInner}
          onPress={() =>
            onSwipe(
              'NO',
              dispatch,
              images,
              setImages,
              currentIndex,
              setCurrentIndex,
              setMainImage,
              setCutoutImage,
            )
          }>
          <MaterialCommunityIcon name="close-thick" size={35} color="#CC1C26" />
        </Ripple>
        <Ripple
          outerStyle={styles.largeRightButton}
          innerStyle={styles.miniButtonInner}
          onPress={() =>
            onSwipe(
              'YES',
              dispatch,
              images,
              setImages,
              currentIndex,
              setCurrentIndex,
              setMainImage,
              setCutoutImage,
            )
          }>
          <MaterialCommunityIcon name="check-bold" size={35} color="#76B772" />
        </Ripple>
        {/* <Ripple
          outerStyle={styles.miniRightButton}
          innerStyle={styles.miniButtonInner}
          onPress={() => next()}>
          <MaterialIcon name="arrow-right-alt" size={20} color="#DCCD96" />
        </Ripple> */}
      </View>
    </View>
  );
};
export default SwipeAI;
