import {
    View,
    Image,
    Text,
    StyleSheet,
    ScrollView
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
  uploadImage, 
  annotateImage,
  getImageById,
  getPlayAIAnnotation,
  setPlayAIAnnotation
} from '../services/API/APIManager';
import DrawingPan from '../components/DrawingPan';
import DocumentPicker from 'react-native-document-picker';
import { nullLiteralTypeAnnotation } from 'jscodeshift';
import { uploadFiles } from 'react-native-fs';
import {withTranslation} from 'react-i18next';

const playAI_tag = '';


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

  const uploadFile = async(file)=>{
    try{
      setProgress(0.8);
      const filedata = new FormData();
      filedata.append('file', file);
      const result = await uploadImage(filedata);
      if(result){
        console.log(result);
        if(result.id){
          setImageId(result.id);
          setProgress(1);
          setSuccess(true);
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
        //navigation.navigate('LandingPage');
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
          console.log(fileReaderInstance.result);

          //retrieve playAI metadata 
          //const ai_result = await getPlayAIAnnotation({image_id: image_id});
          const ai_result = {
            image_id: imageId,
            annotations: [
              {tag: 'playai_anonymisation_bounty', type: 'box', x: 0.05, y: 0.05, width: 0.01, height: 0.01},
              {tag: 'playai_anonymisation_bounty', type: 'box', x: 0.05, y: 0.06, width: 0.01, height: 0.01}
            ]
          };

          if(ai_result && ai_result.annotations){
            setBounds(ai_result.annotations);
          }
        };
      }catch(err){

      }

    //}
  }

  useEffect(()=>{
    fetchImage();
  }, [imageId]);


  return (
      <View style={styles.container}>
        {readOnly? (
          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.uploadScrollContainer}>
          <View style={styles.readOnlyContainer}>
            <DrawingPan
              setAnnoRect={setBounds}
              annoRect={bounds}
              imageSource={{uri: imageData}}
            />
          </View>
          
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
              title={error ? 'Upload' : success ? 'Next' : 'Back'}
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
                    PlayAI  Anonymization
                  </Text>
                  <Button
                    title="Upload Image"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '8%',
    paddingHorizontal: '8%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.COLORS.WHITE,
  },
  marginBottom3p: {
    marginBottom: '3%',
  },
  uploadContainer: {
    flex: 1,
  },
  uploadBorderContainer: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderColor: '#E3E7FF',
    marginVertical: '10%',
  },
  uploadText: {
    color: theme.APP_COLOR,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
  },
  imageIcon: {
    height: 70,
    width: 90,
    marginBottom: '3%',
  },
  button: {
    marginTop: '2%',
    borderRadius: 15,
  },
  buttonText: {
    color: theme.COLORS.WHITE,
    fontSize: 19,
    textAlign: 'center',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontFamily: 'Inter-Bold',
  },
  uploadScrollContainer: {
    paddingBottom: '15%',
    flexGrow: 1,
  },
  readOnlyContainer: {
    borderRadius: 15,
    paddingVertical: '8%',
    paddingHorizontal: '4%',
    backgroundColor: '#F5F6FC',
    marginBottom: '3%',
  },
  readOnlyTagsContainer: {
    flexWrap: 'wrap',
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },
  image: {
    height: 200,
    width: '100%',
  },
  space: {
    marginBottom: 15,
  },
  textFieldHeader: {
    fontSize: 12,
    marginTop: 10,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
  multipleFilesHeader: {
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    marginTop: 10,
    fontFamily: 'Inter-Bold',
  },
  descroptionContainer: {
    borderColor: 'lightgray',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
    maxHeight: 100,
  },
  text: {
    fontFamily: 'Inter-Regular',
  },
});

  export default withTranslation()(PlayAI);

