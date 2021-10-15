import {
    View,
    Image,
    Text,
    ScrollView,
    Alert,
    TextInput,
    Pressable,
    Dimensions
  } from 'react-native';
import React, {useEffect, useState} from 'react';
import UploadProgress from '../components/UploadProgress';
import UploadProgressTile from '../components/UploadProgressTile';
import {useStateValue} from '../services/State/State';
import  Button from '../components/Button';
import {theme} from '../services/Common/theme';
const CloudUpload = require('../assets/cloud_upload.png');
import {actions} from '../services/State/Reducer';
import {
  annotate,
  uploadImage, 
  annotateImage,
  getImageById,
  getPlayAIAnnotation,
  setPlayAIAnnotation
} from '../services/API/APIManager';
import MultiSelect from '../components/Multiselect.js';
import DrawingPan from '../components/DrawingPan';
import DocumentPicker from 'react-native-document-picker';
import ColorPicker from 'react-native-wheel-color-picker';
import {styles} from '../styles/playai';
import {withTranslation} from 'react-i18next';
import {
  Chip,
  IconButton
} from 'react-native-paper';
import DottedProgressBar from '../components/DottedProgressBar';
import SwipeCards from 'react-native-swipe-cards';
import {SwipeImageCard, NoMoreCards} from '../components/SwipeImageCard';
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
  const [imageId, setImageId] = useState('ffffffff3f000000');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [bounds, setBounds] = useState([]); 
  const [aiBounds, setAIBounds] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [age, setAge] = useState(1);
  const [gender, setGender] = useState(['Male']);
  const [skinColor, setSkinColor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [curRectIndex, setCurRectIndex] = useState(-1);
  const [anonymVisible, setAnonymVisible] = useState(false);
  const [isEyeDrop, setEyeDrop] = useState(false);
  const [imageDimension, setImageDimension] = useState({width: 0, height: 0});

  //camera mode, 
  const [mode, setMode] = useState(enum_mode.MODE_PHOTO);
  const [response, setResponse] = useState(null);

  const [annotateProgress, setAnnotateProgress] = useState(0);
  const [isAnnotationUpload, setIsAnnotationUpload] = useState(false);
  const [isAnnoAI, setIsAnnoAI] =useState(false);
  const [cards, setCards] = useState([]);

  const uploadFile = async(file)=>{
    console.log(file);
    try{
      setProgress(0.5);
      const filedata = new FormData();
      filedata.append('file', file);
      const result = await uploadImage(filedata);
      if(result){
        console.log(result);
        if(result.id){
          setImageId(result.id);
          
          const tag_result = await submitTags(result.id);
          if(tag_result){
            setProgress(1);
            setSuccess(true);
          }
          else{
            setError(true);
            setErrorText("Submit Annotation failed.");
          }

        } else if (result.message) {
          setError(true);
          setErrorText(result.message);
        } else if (
          result.status &&
          result.status === 'failed' &&
          result.messages &&
          result.messages.length > 0
        ){
          setError(true);
          setErrorText(result.messages.join(', '));
        }

      }else{
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
    }catch(err){
      console.log(err);
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

  const onPickFile = async()=>{
    try{
      setProgress(0);
      setSuccess(false);
      setError(false);
      setErrorText('');
      const pickedFile = await DocumentPicker.pickSingle({
        type:[DocumentPicker.types.images]
      });
      if(pickedFile){
        setFile(pickedFile);
        uploadFile(pickedFile);
      }
    }catch(err){}
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
        const result = await getImageById (imageId);
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(result);
        fileReaderInstance.onload = () => {
          console.log(fileReaderInstance.result);
          setImageData(fileReaderInstance.result);

          /*
          
          //retrieve playAI metadata 
          //const ai_result = await getPlayAIAnnotation({image_id: image_id});
          const ai_result = {
            image_id: imageId,
            annotations: [
              {tag: 'playai_anonymisation_bounty', type: 'box', x: 30, y: 30, width: 150, height: 100},
              {tag: 'playai_anonymisation_bounty', type: 'box', x: 60, y: 100, width: 50, height: 70}
            ]
          };

          if(ai_result && ai_result.annotations){
            setBounds(ai_result.annotations);
          }*/
        };
      }catch(err){

      }
  }

  const submitBounds = async ()=>{
    //submit bounds to server
    setAnnotateProgress(0.3);
    setIsAnnotationUpload(true);
    let annotations = [];
    let data = {
      image_id: imageId,
      annotations: annotations
    };
    const result = annotate(data).then((res)=>{
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
      }, 300);
    });
  };

  useEffect(()=>{
    fetchImage();
  }, [imageId]);

/*
  useEffect(()=>{
    if(curRectIndex == -1){
      setAnonymVisible(false);
    }else{
      setAnonymVisible(true);

      if ( typeof (bounds[curRectIndex].age)  === 'undefined') {
        bounds[curRectIndex].age = 25;
      }
      if ( typeof (bounds[curRectIndex].skinColor)  === 'undefined') {
        bounds[curRectIndex].skinColor = '#FFFFFF';
      }
      if ( typeof (bounds[curRectIndex].gender)  === 'undefined') {
        bounds[curRectIndex].gender = '#Male';
      }

      setAge(bounds[curRectIndex].age);
      setSkinColor(bounds[curRectIndex].skinColor);
      setGender([...(bounds[curRectIndex].gender)]);
    }
  }, [curRectIndex]);
*/

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
  console.log(res);
  setResponse(res);
  //cancel go back to menu
  if(res.didCancel){
    navigation.goBack();
  }
  dispatch({
    type: actions.SET_CAMERASETTINGS,
    cameraSettings: {
      show: false,
      onCallback : null
    },
  });

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

};

const handleReport = () => {

};

const cardRemoved = () =>{
  setIsAnnoAI(false);
  openCameraView();
};

  useEffect(()=>{
    console.log('camera come');
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
        }}>User Annotation & AI</Text>
        <View style={styles.CardWrapper}>
            <Image
              resizeMode='stretch'
              style={styles.leftbar}
              source={require('../assets/left.png')}
            />
            <View style={styles.CardView}>
              <SwipeCards
                cards={[{name: 'abc'}]}
                renderCard={(cardData)=> (
                  <View style={{
                    borderRadius: 15,
                    backgroundColor: '#F5F6FC',
                    marginBottom: '3%',
                    width: 300
                  }}>
                  <DrawingPan
                    setAnnoRect={setBounds}
                    setCurRectIndex={setCurRectIndex}
                    curRectIndex={curRectIndex}
                    annoRect={bounds}
                    imageSource={{uri: imageData}}
                    imageDimension={imageDimension}
                    onDragEnd={
                      (event, index)=>{console.log('onDragEnd', event, index)}
                    }
                    onResizeEnd={
                      (event, index)=>{console.log('onResizeEnd', event, index)}
                    }
                    onLongPressRect={
                      (event, index)=>{console.log('onLongPressRect', event, index)}
                    }
                  />
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
                height: 52,
              }}
              textStyle={{
                fontSize: 20,
                fontWeight: '600',
                color: '#FFFFFF',
                fontFamily: 'Inter'
              }}
              title={'Edit AI'}
              icon={()=>null}
              onLongPress={()=>{}}
              onPress={()=>{}}
              selected={true}
              closeIconAccessibilityLabel={'Close'}
            >Edit AI</Chip>
            <Chip
              style={{ 
                backgroundColor: '#3A506B',
                paddingHorizontal:15,
                paddingVertical: 10,
                borderRadius: 25,
                fontWeight: '600',
                height: 52
               }}
               textStyle={{
                fontSize: 20,
                fontWeight: '600',
                color: '#FFFFFF',
                fontFamily: 'Inter'
               }}
              title={'Edit Annotation'}
              icon={()=>null}
              onLongPress={()=>{}}
              onPress={()=>{}}
              selected={true}
              closeIconAccessibilityLabel={'Close'}
            >Edit Annotation</Chip>
          </View>
        </ScrollView>
        </>
      ) : (<ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.uploadScrollContainer}>
        <View style={styles.readOnlyContainer}>
          <DrawingPan
            setAnnoRect={setBounds}
            setCurRectIndex={setCurRectIndex}
            curRectIndex={curRectIndex}
            annoRect={bounds}
            imageSource={{uri: imageData}}
            imageDimension={imageDimension}
            onDragEnd={
              (event, index)=>{console.log('onDragEnd', event, index)}
            }
            onResizeEnd={
              (event, index)=>{console.log('onResizeEnd', event, index)}
            }
            onLongPressRect={
              (event, index)=>{console.log('onLongPressRect', event, index)}
            }
          />
        </View>
          <View style={styles.tagWrapper}>
            <Chip
              style={{ 
                margin:2,
               }}
              title={'PlayAI'}
              icon={()=>null}
              onLongPress={()=>{}}
              onPress={()=>{}}
              selected={true}
              closeIconAccessibilityLabel={'Close'}
            >PlayAI</Chip>
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
                  </View>
                </View>
                <Text style={{textAlign: 'right'}}>Annotating...</Text>
              </View>
            )
          }
        </ScrollView>)}






      {/*
      {readOnly? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.uploadScrollContainer}>
        <View style={styles.readOnlyContainer}>
          <DrawingPan
            setAnnoRect={setBounds}
            setCurRectIndex={setCurRectIndex}
            curRectIndex={curRectIndex}
            annoRect={bounds}
            imageSource={{imageData}}
            onDragEnd={
              (event, index)=>{console.log('onDragEnd', event, index)}
            }
            onResizeEnd={
              (event, index)=>{console.log('onResizeEnd', event, index)}
            }
            onLongPressRect={
              (event, index)=>{console.log('onLongPressRect', event, index)}
            }
          />
        </View>
        <View>
        <TextInput
          style={styles.ageInput}
          keyboardType={'numeric'}
          value={age}
          placeholder={t('playAI.age')}
          placeholderTextColor={'#A9A9A9'}
          onChangeText={(txt)=>{
            setAge(parseInt(txt));
          }
          }
        />
        <MultiSelect 
          hideTags
          hideSubmitButton
          hideDropdown        
          items={[
            {name: t('playAI.male'), value:'Male'}, 
            {name: t('playAI.female'), value: 'Female'}, 
            {name: t('playAI.other'), value: 'Other'}]}
          uniqueKey="value"
          selectText={t('playAI.gender')}
          displayKey="name"
          single={true}
          showFilter={false}
          canAddItems={false}
          selectedItems={gender}
          onSelectedItemsChange={(items)=>{ 
            setGender(items) 
          }}
          textInputProps={{
            editable:false
          }}
          searchInputPlaceholderText={t('playAI.gender')}
          
          selectedItemTextColor={'#00A5FF'}
          styleMainWrapper={{
            marginTop: 10
          }}/>

          <View style={styles.skinButton}>
            <Text style={{
              alignSelf: 'center',
            }} color={'#A9A9A9'}>{t('Annotations.skinColor')}</Text>
            <View
              style={{
                marginLeft: 10,
                backgroundColor: skinColor,
                paddingHorizontal: 10,
                borderColor: '#ADADAD',
                borderWidth: 1,
                width: 100,
                height: 35
              }}>
                <TextInput
                  style={{
                    height: 30,
                    paddingVertical: 0
                  }}
                  onChangeText={setSkinColor}
                  value={skinColor}
                  placeholder={'#FFFFFF'}
                />
            </View>
            <IconButton 
              size={25} 
              icon="eyedropper-variant" 
              color={isEyeDrop ? theme.APP_COLOR: '#333333'}
              onPress={()=>{
                setEyeDrop(!isEyeDrop);
              }}
             />
          </View>
        {isEyeDrop && (
        <View
          style={styles.colorPickerView}>
          <ColorPicker
            // ref={r => { this.picker = r }}
            color={skinColor ? skinColor: '#FFFFFF'}
            swatchesOnly={false}
            onColorChange={(color)=>{
            }}
            onColorChangeComplete={(color)=>{
              setSkinColor(color)
            }}
            thumbSize={15}
            sliderSize={15}
            noSnap={false}
            row={true}
            swatchesLast={false}
            swatches={false}
            discrete={false}
            style={styles.colorPicker}/>
          </View>
        )}
        </View>
        <Button
          color={theme.APP_COLOR}
          title={t('playAI.submit')}
          buttonStyle={styles.button}
          onPress={
            ()=>{
              submitBounds();
            }
          }
          textStyle={styles.buttonText}
          />
        </ScrollView>
        ) : file ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.uploadScrollContainer}>
          <UploadProgress
            file={file}
            progress={progress}
            success={success}
            error={error}
            errorText={errorText}
            onCancel={() => {
              setProgress(0);
              setSuccess(false);
              setError(false);
              setErrorText('');
              setFile(null);
            }}
          />
          <Button
            color={theme.APP_COLOR}
            title={error ? t('playAI.upload') : success ? t('playAI.next') : t('playAI.back')}
            buttonStyle={styles.button}
            onPress={() => {
              if (error) {
                onPickFile();
              } else if (success) {
                if (verifyFields()) {
                  setReadOnly(true);
                }
              } else {
                setFile(null);
              }
            }}
            textStyle={styles.buttonText}
          />
        </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.uploadScrollContainer}>
            <View style={styles.uploadBorderContainer}>
              <Image
                resizeMode="stretch"
                source={CloudUpload}
                style={styles.imageIcon}
              />
              <Text style={[styles.uploadText, styles.marginBottom3p]}>
                {t('playAI.title')}
              </Text>
              <Button
                title={t('playAI.uploadImage')}
                onPress={() =>
                  onPickFile()
                }
                color={theme.APP_COLOR}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
              />
            </View>
          </ScrollView>
          
              )
      }*/}
    </View>
  );
};

export default withTranslation()(PlayAI);

