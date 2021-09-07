import {
    View,
    Image,
    Text,
    ScrollView,
    Alert,
    TextInput,
    Pressable
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
  IconButton
} from 'react-native-paper';

/**
 * play AI
 * 1. upload photo
 * 2. upload photo tag
 * 3. retrieve playAI returns
 * 4. upload user defined result
 * 5. goto 1.
 */


const PlayAI = ({navigation, t}) => {
  const [, dispatch] = useStateValue();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageId, setImageId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [bounds, setBounds] = useState([]); 
  const [imageData, setImageData] = useState(null);
  const [age, setAge] = useState(1);
  const [gender, setGender] = useState(['Male']);
  const [skinColor, setSkinColor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [curRectIndex, setCurRectIndex] = useState(-1);
  const [anonymVisible, setAnonymVisible] = useState(false);
  const [isEyeDrop, setEyeDrop] = useState(false);

  const uploadFile = async(file)=>{
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
          setImageData(fileReaderInstance.result);
          
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
          }
        };
      }catch(err){

      }
  }

  const submitBounds = async ()=>{
    //submit bounds to server
    let annotations = [];
    let data = {
      image_id: imageId,
      annotations: annotations
    };
    const result = await annotate(data);
    setReadOnly(false);
    setFile(null);
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
  return (
    <View style={styles.container}>
      {!readOnly? (
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
      }
    </View>
  );
};

export default withTranslation()(PlayAI);

