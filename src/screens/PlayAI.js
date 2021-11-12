import {
    View,
    Image,
    Text,
    ScrollView,
    Dimensions,
    Modal,
    requireNativeComponent,
    StyleSheet,
  } from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import  Button from '../components/Button';
import {theme} from '../services/Common/theme';
import {actions} from '../services/State/Reducer';
import {
  annotate,
  annotateImage,
  getImageById,
} from '../services/API/APIManager';
import DrawingPan, {EDIT_MODE} from '../components/DrawingPan';
import {styles} from '../styles/playai';
import {withTranslation} from 'react-i18next';
import {
  Chip,
} from 'react-native-paper';
import DottedProgressBar from '../components/DottedProgressBar';
import SwipeCards from '../components/SwipeCards';
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


const PlayAI = ({navigation, params, t}) => {
  const [{cameraSettings, playAISettings}, dispatch] = useStateValue();
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
  const [mode, setMode] = useState(null);
  const [response, setResponse] = useState(null);

  const [annotateProgress, setAnnotateProgress] = useState(0);
  const [isAnnotationUpload, setIsAnnotationUpload] = useState(false);
  const [isAnnoAI, setIsAnnoAI] =useState(false);
  const [cards, setCards] = useState([]);
  const [editMode, setEditMode] = useState(EDIT_MODE.MODE_SWIPE);


  //const {mode} = params || '';


  const initVariables = () =>{
    setEditMode(EDIT_MODE.MODE_SWIPE);
    setIsAnnoAI(false);
    setBounds([]);
    setImageId(null);
    setImageData(null);
    setMode(enum_mode.MODE_PHOTO);
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

  /**
   * handleNextTut
   */
  const handleNextTut = () =>{

  }

  const TutDesc = ({title, desc}) =>{
    return (
      <>
        <Text>{title}</Text>
        <Text>{desc}</Text>
      </>
    );

  }

  const TutorialOverlay = ({step}) => {
    return (
      <>
      {(step === 'tut_description') && (
        <View>
          <Text style={styles.tut_desc_heading}>ABOUT PLAY AI</Text>
          <Text style={styles.tut_description}>Play AI is a game where Sed sed interdum est. Donec iaculis et tortor non porta. Donec suscipit fermentum purus, in dictum mi consequat ut. Mauris vulputate turpis vestibulum tortor pretium condimentum. Donec leo elit, luctus et feugiat sit amet, vulputate nec est. Mauris bibendum ante ultrices tellus laoreet</Text>
          <Text style={styles.tut_desc_heading}>How to Play:</Text>
          <Text style={styles.tut_description}>Play AI is a game where Sed sed interdum est. Donec iaculis et tortor non porta. Donec suscipit fermentum purus, in dictum mi consequat ut. Mauris vulputate turpis vestibulum tortor pretium condimentum. Donec leo elit, luctus et feugiat sit amet, vulputate nec est. Mauris bibendum ante ultrices tellus laoreet, in pharetra risus.
          </Text>
      </View>
      )}
      {
        (step === 'tut_drawface') && (
          <View>
            <Text>DRAW THE FACE</Text>
            <Text>Annotate the face by clicking on the boxes</Text>
          </View>
        )
      }
      {
        (step === 'tut_press_annotate') && (
          <View>
            <Text>PRESS 'annotate'</Text>
            <Text>Press Annotate to finish</Text>
          </View>
        )
      }
      {
        (step === 'tut_annotation' ) && (
          <View>
            <Text>ANNOTATION</Text>
            <Text>Annotation is displayed in the coloured boxes</Text>
          </View>
        )
      }
      {(step === 'tut_aiframe') && (
        <View>
          <Text>AI FRAME</Text>
          <Text>AI frame is displayed in the gradient square</Text>
        </View>
      ) } 
      {(step === 'tut_need_editing') && (
        <View>
          <TutDesc 
            title={'IMAGE NEEDS EDITING'}
            desc={'If the AI framedoese not match the annotation, you can edit incoreect parts'}
            />
        </View>
      )}
      {(step === 'tut_edit_annotation') && (
        <View>
          <TutDesc
            title={'EDIT ANNOTATION'}
            desc={'If the annotation does not match the AI frame annotation, you can reannotate the face.'}
          />
        </View>
      )}
      {(step === 'tut_swipe_left') && (
        <View>
          <TutDesc
            title={'SWIPE LEFT TO REPORT'}
            desc={'If the image contains inappropriate content, You canallways report it to be removed.'}
            />
        </View>
      )}
      {(step === 'tut_swiipe_right') && (
        <View>
          <TutDesc
            title={'SWIPE RIGHT TO VERIFY'}
            desc={'If the AI frame matches the annotation, you can verify.'}
            />
        </View>
      )}
      {(step === 'tut_completed') && (
        <View>
          
        </View>
      )}
      </>
    );

  }

  useEffect(()=>{
    if(mode == enum_mode.MODE_PHOTO){
      initVariables();
      //openCameraView();
    }
  }, [mode]);

  useEffect(()=>{
    initVariables();
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
        {
          (mode == 'tutorial') && (
            <View style={styles.tut_overlay}>
              <View style={styles.tut_exit}>
                <Button 
                  onPress={navigation.navigate('')}
                ><Image source={require('../assets/exit.png')} /></Button>
                <Text>Exit WALKTHROUGH</Text>
              </View>
              <Button style={styles.next_tut_btn} onPress={handleNextTut()}>
                <Image source={require('../assets/btn_tut_next.png')} />
              </Button>
             
            </View>
          )
        }
    </View>
  );
};

export default withTranslation()(PlayAI);

