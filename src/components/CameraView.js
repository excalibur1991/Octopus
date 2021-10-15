
import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import Ripple from './Ripple';
import { ProgressBar } from 'react-native-paper';
import { Stop } from "react-native-svg";
import {useStateValue} from '../../src/services/State/State';
import {actions} from '../services/State/Reducer';
import * as ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {
    uploadImage, 
} from '../services/API/APIManager';


const enum_mode = {
    MODE_PHOTO: 'photo',
    MODE_LIBRARY:'library',
    MODE_UPLOAD: 'upload',
  };

export const CameraView = (props) => {
    
    // mode photo | upload
    const [, dispatch] = useStateValue();
    const [mode, setMode] = useState(null);
    const [response, setResponse] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(true);
    const [uploadText, setUploadText] = useState("");

    const {show, onCallback} = props;
    

    const selectedColor = ['#72B5CB', '#A737C1'];
    const unselectedColor = ['#374768', '#422B65'];
    

    const setPhotoMode = ()=> {
        setMode(enum_mode.MODE_UPLOAD);
    }

    const onPress = () => {
        setMode(enum_mode.MODE_PHOTO);
        openCamera();
    }

    useEffect(()=>{
        if(show){
            openCamera();
        }
    }, 
    [show]);

    const onDismiss = ()=>{

    }

    const openCamera =  () => {
        ImagePicker.launchCamera(
            {
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                  },
//                saveToPhotos: true,
//                mediaType: 'photo',
//                includeBase64: false,
            },
            (res)=>{
                if(res.didCancel){
                    onCallback(res);
                } else {
                    console.log(res);
                    setMode(enum_mode.MODE_UPLOAD);
                    setResponse(res);
                    setUploadText('Uploading...');
                    uploadFile({
                        name:res.assets[0].fileName,
                        uri: res.assets[0].uri,
                        type: res.assets[0].type,
                        size: res.assets[0].fileSize,
                    });
                }
            });
    };

    const openLirary = () => {
        ImagePicker.launchImageLibrary(
            {
                maxHeight: 200,
                maxWidth: 200,
                selectionLimit: 0,
                mediaType: 'photo',
                includeBase64: false,
            }, 
            (res)=>{
                console.log('res', res);
                if(res){
                    setMode(enum_mode.MODE_UPLOAD);
                   
                    setResponse(res);

                }
            });
    };

    const uploadFile = async(file)=>{
        try{
          setProgress(0.5);
          const filedata = new FormData();
          filedata.append('file', file);
          const result = await uploadImage(filedata);
          console.log(result);
          if(result){
            if(result.id){
              setProgress(1);
              setTimeout(()=>{
                onCallback({imageId: result.id, ...response});
              }, 500);

    
            } else if (result.message) {
              setProgress(0);
              setUploadText(result.message);
            } else if (
              result.status &&
              result.status === 'failed' &&
              result.messages &&
              result.messages.length > 0
            ){
                setProgress(0);
                setUploadText(result.messages.join(', '));
            }
    
          }else{
              setProgress(0);
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
            setProgress(0);
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



    return (
        <>
        {show && 
        <View style={styles.container}>
            <View style={styles.contents}>
            {response?.assets &&
                response?.assets.map(({uri}) => (
                    <View key={uri}>
                    <Image
                        resizeMode="center"
                        style={{width: Dimensions.get('screen').width, height: Dimensions.get('window').height}}
                        source={{uri: uri}}
                    />
                    </View>
                )

            )}

                <View style={styles.overlay}>
                    <View style={styles.loading}>
                        <View style={styles.progress}>
                        {Array(10).fill(1).map((el, i) =>(
                            <LinearGradient  key={i} style={styles.circle} colors={(progress * 10 >= i + 1) ? selectedColor : unselectedColor}>
                            </LinearGradient>
                        )
                          
                        )}
                        </View>
                        <Text style={styles.whiteText}>{uploadText}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
            <Ripple
                onPress={onPress}>
                <Text style={styles.buttonText}>Retake</Text>
            </Ripple>
            </View>
        </View>
        }
        </>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      backgroundColor: '#000000',
      zIndex: 1000
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    circle: {
        width: 12,
        height: 12,
        backgroundColor: 'red',
        borderRadius: 6,
        marginHorizontal: 3
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contents: {
        flex: 0.9,
        width: '100%',
    },
    bottom: {
        flex: 0.1,
        width: '100%',
        backgroundColor: '#171717',
        padding: '3%'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'normal',
        fontFamily: 'SF Pro Text'
    },
    whiteText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Inter',
        textAlign: 'right',
        marginTop: 18
    },
    loading: {
        width: '70%',
        justifyContent: 'flex-end'
    }
});