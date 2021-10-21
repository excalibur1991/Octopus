import {
    View,
    Image,
    Text,
    ScrollView,
    Alert,
    TextInput,
    Pressable,
    Dimensions,
    TouchableOpacity
  } from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import  Button from '../components/Button';
import {theme} from '../services/Common/theme';
import {actions} from '../services/State/Reducer';
import {
  annotate,
  uploadImage, 
  annotateImage,
  getImageById,
  getPlayAIAnnotation,
  setPlayAIAnnotation
} from '../services/API/APIManager';
import DrawingPan, {EDIT_MODE} from '../components/DrawingPan';
import {styles} from '../styles/playai';
import {withTranslation} from 'react-i18next';
import {
  Chip,
} from 'react-native-paper';
import DottedProgressBar from '../components/DottedProgressBar';
import SwipeCards from '../components/SwipeCards';
import {SwipeImageCard, NoMoreCards} from '../components/SwipeImageCard';
import LinearGradient from 'react-native-linear-gradient';
import { GradientBox } from '../components/GradientBox';
/**
 * play AI
 * 1. upload photo
 * 2. upload photo tag
 * 3. retrieve playAI returns
 * 4. upload user defined result
 * 5. goto 1.
 */
const enum_mode = {
  MODE_PHOTO: 'photo',
  MODE_LIBRARY:'library',
  MODE_UPLOAD: 'upload',
  MODE_ANNOTATE: 'annotate',
  MODE_AI_ANNOATE: 'ai_annotate'
};


const PlayAI = ({navigation, t}) => {
  const [{cameraSettings}, dispatch] = useStateValue();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageId, setImageId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [bounds, setBounds] = useState([]); 
  const [aiBounds, setAIBounds] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [curRectIndex, setCurRectIndex] = useState(-1);
  const [imageDimension, setImageDimension] = useState({width: 0, height: 0});

  //camera mode, 
  const [mode, setMode] = useState(enum_mode.MODE_PHOTO);
  const [response, setResponse] = useState(null);

  const [annotateProgress, setAnnotateProgress] = useState(0);
  const [isAnnotationUpload, setIsAnnotationUpload] = useState(false);
  const [isAnnoAI, setIsAnnoAI] =useState(false);
  const [cards, setCards] = useState([]);
  const [editMode, setEditMode] = useState(EDIT_MODE.MODE_SWIPE);


  const initVariables = () =>{
    setEditMode(EDIT_MODE.MODE_SWIPE);
    setIsAnnoAI(false);
    setBounds([]);
    setImageId(null);
    setImageData(null);
    setMode(enum_mode.MODE_PHOTO);
  };

  const submitTags = async(imageId, description='', tags=['playai_anonymisation_bounty'])=>{
    let ret = false;
    try{
      setLoading(true);
      const req = {
        image_id: imageId,
        description: description,
        tags: tags,
      };
      const result = await annotateImage(req);
      if (result && result.status && result.status === 'success') {
        dispatch({
          type: actions.SET_ALERT_SETTINGS,
          alertSettings: {
            show: true,
            type: 'success',
            title: 'Success!',
            message: 'Description & Tags Submitted',
            showConfirmButton: true,
            confirmText: 'Ok',
          },
        });
        ret = true;
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
    } catch (err) {
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
      setLoading(false);
    }
    return ret;

  };


  const verifyFields = ()=>{
    let message = '';
    //check bounds
    if (message) {
      dispatch({
        type: actions.SET_ALERT_SETTINGS,
        alertSettings: {
          show: true,
          type: 'error',
          tile: 'Fields Required',
          message: message,
          showConfirmButton: true,
          confirmText: 'Ok'
        }
      });
      return false;
    }
    return true;
  };

  const fetchImage = async ()=>{
    //if(imageId){
      try{
        dispatch({
          type: actions.SET_PROGRESS_SETTINGS,
          show: true,
        });
        const result = await getImageById (imageId);
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(result);
        fileReaderInstance.onload = () => {
          setImageData(fileReaderInstance.result);
        };
        dispatch({
          type: actions.SET_PROGRESS_SETTINGS,
          show: false,
        });
      }catch(err){
        dispatch({
          type: actions.SET_PROGRESS_SETTINGS,
          show: false,
        });
      }
  }

  const submitBounds = async ()=>{
    //submit bounds to server
    setAnnotateProgress(0.3);
    setIsAnnotationUpload(true);
    let annotations = [];
    bounds.filter((bound)=>(!bound.isAI)).map(
    (rect)=>{
      annotations.push();
    }
    );


    let data = {
      image_id: imageId,
      annotations: annotations
    };
    const result = annotate(data).then((res)=>{
      console.log(result);
      setAnnotateProgress(0.7);

      //retrieve playAI metadata 
      //const ai_result = await getPlayAIAnnotation({image_id: image_id});
      const ai_result = {
        image_id: imageId,
        annotations: [
          {tag: 'playai_anonymisation_bounty', type: 'box', x: 30, y: 30, width: 150, height: 100, isAI: 'true'},
        ]
      };

      if(ai_result && ai_result.annotations){
        setBounds([...ai_result.annotations, ...bounds]);
      }
      setTimeout(()=>{
        setAnnotateProgress(1.0);
        setIsAnnotationUpload(false);
        setIsAnnoAI(true);
        setEditMode(-1);
        setEditMode(EDIT_MODE.MODE_SWIPE);
        setMode(enum_mode.MODE_AI_ANNOATE);
      }, 300);
    });
  };


  useEffect(()=>{
    fetchImage();
  }, [imageId]);

  const openCameraView = ()=>{
    dispatch({
      type: actions.SET_CAMERASETTINGS,
      cameraSettings: {
        show: true,
        onCallback : (res)=>{
          closeCameraView(res);
        }
      },
    });
  };

  const closeCameraView = (res)=>{
    setResponse(res);
    //cancel go back to menu
    if(!res.imageId){
      navigation.goBack();
    }
    dispatch({
      type: actions.SET_CAMERASETTINGS,
      cameraSettings: {
        show: false,
        onCallback : null
      },
    });

    setMode(enum_mode.MODE_ANNOTATE);

    if(res.imageId){
      setImageId(res.imageId);
    }
  }


  const submitAnnotate = () => {
    submitBounds();
  };

  const cancelAnnotate = () => {
    setAnnotateProgress(0);
    setIsAnnotationUpload(false);
  };

  const handleVerify = () => {
    callVerify();
  };

  const handleReport = () => {
    callReport();

  };
  const callVerify = async () => {

    const response = await verifyImage( 
      imageId,
      {tags:["playAI"], description:""},
      {
        tags: {
          up_votes:["playAI"], 
          down_votes:[]}, 
        descriptions: {
          up_votes:[],
          down_votes:[]}}
    );
  }

  const callReport = async() => {
    const photos = [imageId,];
    const response = await reportImages(photos);
  }

  const cardRemoved = () =>{
    setIsAnnoAI(false);
    initVariables();
    openCameraView();
  };

  useEffect(()=>{
    if(mode == enum_mode.MODE_PHOTO){
      initVariables();
    }
  }, [mode]);

  useEffect(()=>{
    initVariables();
    openCameraView();
  }, []);


  return (
    <View style={styles.container}>
      {isAnnoAI ? (
        <>
        <Text style={{
          fontWeight: '500',
          fontSize: 24,
          fontFamily: 'Inter',
          marginLeft: 20
        }}>{t('playAI.userAnnotationAndAI')}</Text>
       
        <View style={styles.CardWrapper}>
            <Image
              resizeMode='stretch'
              style={styles.leftbar}
              source={require('../assets/left.png')}
            />
            <View style={styles.CardView}>
              <SwipeCards
                cards={[{name: 'abc'}]}
                enabled={editMode == EDIT_MODE.MODE_SWIPE? true: false}
                renderCard={(cardData)=> (
                  <View style={{
                    borderRadius: 15,
                    backgroundColor: '#F5F6FC',
                  }}>
                  <DrawingPan
                    setAnnoRect={setBounds}
                    setCurRectIndex={setCurRectIndex}
                    curRectIndex={curRectIndex}
                    annoRect={bounds}
                    imageSource={imageData}
                    imageDimension={imageDimension}
                    editMode={editMode}
                    mode={mode}
                    isAIEnabled={true}
                  />
                  <View 
                    pointerEvents={editMode == EDIT_MODE.MODE_SWIPE ? 'auto' : 'none'}
                    style={{position:'absolute', width:'100%', height: '100%'}} 
                    ></View>
                </View>
                )}
                renderNoMoreCards={() =><></>}
                nopeText='Reported'
                yupText='Verified' 
                stack={false} 
                handleYup={ (card)=> handleVerify(card) }
                handleNope={ (card)=>handleReport(card) }
                hasMaybeAction={false}
                cardRemoved={ (index)=>cardRemoved(index) }
                showYup = {false}
                showNope = {false}
                />
            </View>
            <Image
              style={styles.rightbar}
              resizeMode='stretch'
              source={require('../assets/right.png')}
              />
          </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.uploadScrollContainer}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          <Chip
              style={{ 
                backgroundColor: '#3A506B',
                paddingHorizontal:15,
                paddingVertical: 10,
                borderRadius: 25,
                borderColor: (editMode == EDIT_MODE.MODE_AI)? '#A737C1' : 'transparent',
                height: 52,
                borderStyle: 'solid',
                borderWidth: 2,
              }}
              textStyle={{
                fontSize: 20,
                fontWeight: '600',
                color: (editMode == EDIT_MODE.MODE_AI)? '#5E7086' : '#FFFFFF',
                fontFamily: 'Inter'
              }}
              title={t('playAI.editAI')}
              icon={()=>null}
              onLongPress={()=>{}}
              onPress={()=>{
                setEditMode(editMode ==EDIT_MODE.MODE_AI ? EDIT_MODE.MODE_SWIPE : EDIT_MODE.MODE_AI);
              }}
              selected={true}
              closeIconAccessibilityLabel={'Close'}
            >{t('playAI.editAI')}</Chip>
            <Chip
              style={{ 
                backgroundColor: '#3A506B',
                paddingHorizontal:15,
                paddingVertical: 10,
                borderRadius: 25,
                fontWeight: '600',
                height: 52,
                borderStyle: 'solid',
                borderWidth: 2,
                borderColor: (editMode == EDIT_MODE.MODE_ANNOTATE)? '#21975A' : 'transparent',
               }}
               textStyle={{
                fontSize: 20,
                fontWeight: '600',
                color: (editMode == EDIT_MODE.MODE_ANNOTATE)? '#5E7086' : '#FFFFFF',
                fontFamily: 'Inter'
               }}
              title={t('playAI.editAnnotation')}
              icon={()=>null}
              onLongPress={()=>{}}
              onPress={()=>{
                setEditMode(editMode ==EDIT_MODE.MODE_ANNOTATE ? EDIT_MODE.MODE_SWIPE : EDIT_MODE.MODE_ANNOTATE);
              }}
              selected={true}
              closeIconAccessibilityLabel={'Close'}
            >{t('playAI.editAnnotation')}</Chip>
          </View>
        </ScrollView>
        </>
      ) : (<View
          style={styles.uploadScrollContainer}>
        <View style={styles.readOnlyContainer}>
          <DrawingPan
            setAnnoRect={setBounds}
            setCurRectIndex={setCurRectIndex}
            curRectIndex={curRectIndex}
            annoRect={bounds}
            imageSource={imageData}
            imageDimension={imageDimension}
            mode={mode}
            editMode={EDIT_MODE.MODE_ANNOTATE}
            isAIEnabled={true}
          />
        </View>
          <View style={styles.tagWrapper}>
            <Chip
              style={{ 
                margin:2,
               }}
              title={t('playAI.PlayAI')}
              icon={()=>null}
              onLongPress={()=>{}}
              onPress={()=>{}}
              selected={true}
              closeIconAccessibilityLabel={'Close'}
            >{t('playAI.PlayAI')}</Chip>
          </View>
          {
            !isAnnotationUpload ? (
              <Button
              color={theme.APP_COLOR}
              title={t('playAI.annotate')}
              buttonStyle={styles.button}
              onPress={
                ()=>{
                  submitAnnotate();
                }
              }
              textStyle={styles.buttonText}
              />
            ) : (
              <View style={{
                flex: 1,
                width: '100%',
                flexDirection: 'column',
              }}>
                <View style={styles.row}>
                  <Button
                    color={'#3A506B'}
                    buttonStyle={styles.smallButton}
                    title={'Cancel'}
                    onPress={
                      ()=>cancelAnnotate()
                    }
                    textStyle={styles.smallButtonText}
                  />
                  <View style={{
                    width: Dimensions.get('window').width - 200
                  }}>
                    <DottedProgressBar 
                      progress={annotateProgress}
                      hideLable={true}
                    />
                    <Text style={{textAlign: 'right'}}>{t('playAI.annotating')}</Text>
                  </View>
                </View>
              </View>
            )
          }
        </View>)}
    </View>
  );
};

export default withTranslation()(PlayAI);

