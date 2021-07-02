import {
    View, 
    Image,
    Text,
    StyleSheet,
    ScrollView,
    Linking
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Ripple from '../components/Ripple';

import {theme} from '../services/Common/theme';
import React, {useEffect, useState} from 'react';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
//import {styles} from '../styles/swipeai';
import {
    getAllImages,
    getImage,
    getLabelImage,
    storeUserResponse,
  } from '../services/API/APIManager';

import SwipeCards from 'react-native-swipe-cards';
//import { Chip } from 'react-native-paper';
import { Chip } from 'react-native-elements';
import Leftbar from '../assets/leftbar.svg'
import right from '../assets/rightbar.svg'

import Svg, {
  RadialGradient
} from 'react-native-svg'


  export const InCard = (props) => {
    useEffect(() => {
    }, []);

    return (
      <View style={[styles.card, 
      {
        borderWidth: 1,  
        bordercolor: 'grey',
        elevation: 1
        }]}>
        <Image 
        style={styles.thumbnail}
        source={{
          uri: props.image
        }} />
      </View>
      );
  };


  export const NoMoreCards = (props) => {
    useEffect(()=>{

    }, []);

    return (
      <View style={styles.noMoreCards}>
        <Text>No more Images.</Text>
      </View>
    );

  };

const VeriPage = (props) => {

    const [checked, setChecked] = useState(false);

    const [images, setImages] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mainImage, setMainImage] = useState(null);
    const [cutoutImage, setCutoutImage] = useState(null);
    const [, dispatch] = useStateValue();
    const [cards, setCards] = useState([]);

    const _cards = [
      {name: '1', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
      {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
      {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
      {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
      {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
      {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
      {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
      {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
      {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},    ]

    const _words = [
      {name: 'Castle', },
      {name: 'Desert', },
      {name: 'Sand', },
      {name: 'Trees', },
      {name: 'Skyline', },
      {name: 'Orange', },
      {name: 'Sun', },
      {name: 'Hot', },
      {name: 'Arid',},
      {name: 'Cactus',},
      {name: 'Dry',},
    ];

    const handleVerify = (card) => {
      console.log(`Yup for ${card.text}`)
    };
    const handleReport = (card) => {
      console.log(`Nope for ${card.text}`)
    };
    const handleMaybe = (card) => {
      console.log(`Maybe for ${card.text}`)
    };


    
const fetchImages = async (
    dispatch,
    images,
    setImages,
    setCurrentIndex,
    setMainImage,
    setCutoutImage,
  ) => {
    try {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: true,
      });
      const response = await getAllImages();
      if (response && response.result && response.result.length > 0) {
        if (images && images.length > 0) {
          setImages([...images, ...response.result]);
        } else {
          setImages(response.result);
          setCurrentIndex(0);
          fetchLabelImage(response.result[0].label, setMainImage);
          fetchImage(
            setMainImage,
            setCutoutImage,
            response.result[0].image_id,
            false,
          );
        }
      }
    } catch (error) {
      dispatch({
        type: actions.SET_ALERT_SETTINGS,
        alertSettings: {
          show: true,
          type: 'error',
          title: 'Error Occured',
          message:
            'This Operation Could Not Be Completed. Please Try Again Later.',
          showConfirmButton: true,
          confirmText: 'Ok',
        },
      });
    } finally {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: false,
      });
    }
  };
  
  const fetchImage = async (
    setMainImage,
    setCutoutImage,
    imageId,
    isMainImage = true,
  ) => {
    const result = await getImage(imageId);
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(result);
    fileReaderInstance.onload = () => {
      if (isMainImage) {
        setMainImage(fileReaderInstance.result);
      } else {
        setCutoutImage(fileReaderInstance.result);
      }
    };
  };
  
  const fetchLabelImage = async (label, setMainImage) => {
    const result = await getLabelImage(label);
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(result);
    fileReaderInstance.onload = () => {
      setMainImage(fileReaderInstance.result);
    };
  };
  
  const onSwipe = async (
    userResponse,
    dispatch,
    images,
    setImages,
    currentIndex,
    setCurrentIndex,
    setMainImage,
    setCutoutImage,
  ) => {
    try {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: true,
      });
      const reqBody = {
        response: userResponse,
        image_id: images[currentIndex].image_id,
      };
      const response = await storeUserResponse(reqBody);
      console.log('abcde', response);
      if (response && response.status && response.status === 'success') {
        if (userResponse === 'YES') {
          next(
            dispatch,
            images,
            setImages,
            currentIndex,
            setCurrentIndex,
            setMainImage,
            setCutoutImage,
          );
        } else if (userResponse === 'NO') {
          prev(
            dispatch,
            images,
            setImages,
            currentIndex,
            setCurrentIndex,
            setMainImage,
            setCutoutImage,
          );
        }
      } else {
        dispatch({
          type: actions.SET_ALERT_SETTINGS,
          alertSettings: {
            show: true,
            type: 'error',
            title: 'Error Occured',
            message:
              'This Operation Could Not Be Completed. Please Try Again Later.',
            showConfirmButton: true,
            confirmText: 'Ok',
          },
        });
      }
    } catch (error) {
      dispatch({
        type: actions.SET_ALERT_SETTINGS,
        alertSettings: {
          show: true,
          type: 'error',
          title: 'Error Occured',
          message:
            'This Operation Could Not Be Completed. Please Try Again Later.',
          showConfirmButton: true,
          confirmText: 'Ok',
        },
      });
    } finally {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: false,
      });
    }
  };
  
  const next = async (
    dispatch,
    images,
    setImages,
    currentIndex,
    setCurrentIndex,
    setMainImage,
    setCutoutImage,
    keepIndex = false,
  ) => {
    try {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: true,
      });
      let allImages = images.slice();
      if (keepIndex) {
        allImages = images.filter(
          (img) => img.image_id !== images[currentIndex].image_id,
        );
        // allImages = images.filter((img, index) => index !== currentIndex);
        setImages(allImages);
      }
      const index = keepIndex ? currentIndex : currentIndex + 1;
      if (allImages && allImages.length > 0) {
        if (index < allImages.length) {
          setCurrentIndex(index);
          await fetchLabelImage(allImages[index].label, setMainImage);
          await fetchImage(
            setMainImage,
            setCutoutImage,
            allImages[index].image_id,
            false,
          );
        } else {
          const index = allImages.length - 1;
          setCurrentIndex(index);
          await fetchLabelImage(allImages[index].label, setMainImage);
          await fetchImage(
            setMainImage,
            setCutoutImage,
            allImages[index].image_id,
            false,
          );
        }
        if (allImages.length <= 5) {
          fetchImages();
        }
      } else {
        setCurrentIndex(0);
        setMainImage(null);
        setCutoutImage(null);
        fetchImages();
      }
    } catch (error) {
      dispatch({
        type: actions.SET_ALERT_SETTINGS,
        alertSettings: {
          show: true,
          type: 'error',
          title: 'Error Occured',
          message:
            'This Operation Could Not Be Completed. Please Try Again Later.',
          showConfirmButton: true,
          confirmText: 'Ok',
        },
      });
    } finally {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: false,
      });
    }
  };
  
  const prev = async (
    dispatch,
    images,
    setImages,
    currentIndex,
    setCurrentIndex,
    setMainImage,
    setCutoutImage,
    keepIndex = false,
  ) => {
    try {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: true,
      });
      let allImages = images.slice();
      if (keepIndex) {
        const allImages = images.filter(
          (img) => img.image_id !== images[currentIndex].image_id,
        );
        // allImages = images.filter((img, index) => index !== currentIndex);
        setImages(allImages);
      }
      const index = keepIndex ? currentIndex : currentIndex - 1;
      if (allImages && allImages.length > 0) {
        if (index >= 0) {
          setCurrentIndex(index);
          await fetchLabelImage(allImages[index].label, setMainImage);
          await fetchImage(
            setMainImage,
            setCutoutImage,
            allImages[index].image_id,
            false,
          );
        } else {
          const index = allImages.length - 1;
          setCurrentIndex(index);
          await fetchLabelImage(allImages[index].label, setMainImage);
          await fetchImage(
            setMainImage,
            setCutoutImage,
            allImages[index].image_id,
            false,
          );
        }
        if (allImages.length <= 5) {
          fetchImages();
        }
      } else {
        setCurrentIndex(0);
        setMainImage(null);
        setCutoutImage(null);
        fetchImages();
      }
    } catch (error) {
      dispatch({
        type: actions.SET_ALERT_SETTINGS,
        alertSettings: {
          show: true,
          type: 'error',
          title: 'Error Occured',
          message:
            'This Operation Could Not Be Completed. Please Try Again Later.',
          showConfirmButton: true,
          confirmText: 'Ok',
        },
      });
    } finally {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: false,
      });
    }
  };

    useEffect(() => {
        fetchImages(
            dispatch,
            images,
            setImages,
            setCurrentIndex,
            setMainImage,
            setCutoutImage,
          );
         setCards(_cards);
        }, []);

    /**
     * SWIPE-DELETE Card - react-natve-swipecards
     * left anim to report image
     * right anim to approve image
     *  //bestofreactjs
     * 
     * 
     * unordered word list
     */


    return (
        <View style={styles.container}>
          <View style={styles.CardView}>
            <SwipeCards
              stackOffsetX={10}
              cards={cards}
              renderCard={(cardData)=> <InCard {...cardData} />}
              renderNoMoreCards={() =><NoMoreCards />}
              nopeText='Reported'
              yupText='Verified'
              stack={false}

              handleYup={ handleVerify }
              handleNope={ handleReport }
              handleMaybe={ handleMaybe }
              hasMaybeAction
              />
            
          </View>

 
            <View style={
              {
                flexDirection: 'row',
                justifyContent:'center',
                flexWrap: 'wrap',
              }
            }>
              <Chip
              style={styles.chip}
              title="Breakfast"
               />
               <Chip
              style={styles.chip}
              title="Butter"
               />
               <Chip
              title="Butter"
               />
               <Chip
              title="Butter"
               />
               <Chip
              title="Butter"
               />
               <Chip
              title="Butter"
               />
               <Chip
              title="Butter"
               />
               <Chip
              title="Butter"
               />
               <Chip
              title="Butter"
               />
               <Chip
              title="Butter"
               />
            </View>
          
            {/*
        <Image
          resizeMode="stretch"
          style={styles.topImage}
          source={
            mainImage ? {uri: mainImage} : require('../assets/top_image.png')
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
                : require('../assets/bottom_image.png')
            }
          />
        </GestureRecognizer>
        <View style={styles.actionsContainer}>
          
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
           
        </View>
        */}
      </View>
    );
};

export default VeriPage;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 43,
    width: 302,
    height: 307,
    
  },
  thumbnail: {
    width: 302,
    height: 307,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 350,
  },
  ChipView: {
  },
})