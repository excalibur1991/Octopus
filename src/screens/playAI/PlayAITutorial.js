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
import {useStateValue} from '../../services/State/State';
import  Button from '../../components/Button';
import {theme, dark_theme} from '../../services/Common/theme';
import {actions} from '../../services/State/Reducer';
import {
  annotate,
  annotateImage,
  getImageById,
} from '../../services/API/APIManager';
import DrawingPan, {EDIT_MODE} from '../../components/DrawingPan';
import {styles} from '../../styles/playai';
import {withTranslation} from 'react-i18next';
import {
  Chip,
} from 'react-native-paper';
import DottedProgressBar from '../../components/DottedProgressBar';
import SwipeCards from '../../components/SwipeCards';
import Ripple from '../../components/Ripple';
import { setPrivacyAndTermsAccepted } from '../../services/DataManager';
import { CommonStyles } from '../../services/Common/styles';
import RoundButton from '../../components/RoundButton';

const PlayAITutorial = (props) => {
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
    const [tutStep, setTutStep] = useState('tut_description');
    const [tutStepIndex, setTutStepIndex] = useState(0);
  
  
    const {navigation, t} = props || {};
    const {onExitTutorial} = navigation.params || {};


    const enum_mode = {
        MODE_PHOTO: 'photo',
        MODE_LIBRARY:'library',
        MODE_UPLOAD: 'upload',
        MODE_ANNOTATE: 'annotate',
        MODE_AI_ANNOATE: 'ai_annotate'
      };
      
    const tutStepDesc = [
        'tut_description',
        'tut_drawface',
        'tut_press_annotate',
        'tut_annotation',
        'tut_aiframe',
        'tut_need_editing',
        'tut_edit_annotation',
        'tut_swipe_left',
        'tut_swiipe_right',
        'tut_completed'
    ];



    const TutDesc = ({title, desc}) =>{
        return (
            <>
            <Text style={styles.tut_desc_heading}>{title}</Text>
            <Text style={styles.tut_description}>{desc}</Text>
            <View style={{height: 50}}></View>
            </>
        );
    }

    
    const handleNextTut = () =>{
        console.log(tutStepIndex);
        if(tutStepIndex < tutStepDesc.length){
        setTutStepIndex(tutStepIndex+1);
        setTutStep(tutStepDesc[tutStepIndex + 1]);
        }
    }

    
    const initVariables = () =>{
        setEditMode(EDIT_MODE.MODE_SWIPE);
        setIsAnnoAI(false);
        setBounds([]);
        setImageId(null);
        setImageData(null);
        setMode(enum_mode.MODE_PHOTO);
    };

    useEffect(()=>{

        switch(tutStep){
            case 'tut_description':
                break;
            case 'tut_drawface':
                break;
            case 'tut_press_annotate':
                break;
            case 'tut_annotation':
                break;
            case 'tut_aiframe':
                break;
            case 'tut_need_editing':
                break;
            case 'tut_edit_annotation':
                break;
            case 'tut_swipe_left':
                break;
            case 'tut_swiipe_right':
                break;
            case 'tut_completed':
                break;
        }

    }, [tutStep]);

    useEffect(()=>{
        initVariables();
    }, []);

    
const TutorialOverlay = (props) => {
    return (
        <>
        {(tutStep === 'tut_description') && (
        <View>
            <TutDesc 
            title={'ABOUT PLAY AI'}
            desc={'Play AI is a game where Sed sed interdum est. Donec iaculis et tortor non porta. Donec suscipit fermentum purus, in dictum mi consequat ut. Mauris vulputate turpis vestibulum tortor pretium condimentum. Donec leo elit, luctus et feugiat sit amet, vulputate nec est. Mauris bibendum ante ultrices tellus laoreet'}
            />
    
            <TutDesc 
            title={'How to Play:'}
            desc={'Play AI is a game where Sed sed interdum est. Donec iaculis et tortor non porta. Donec suscipit fermentum purus, in dictum mi consequat ut. Mauris vulputate turpis vestibulum tortor pretium condimentum. Donec leo elit, luctus et feugiat sit amet, vulputate nec est. Mauris bibendum ante ultrices tellus laoreet, in pharetra risus.'}
            />
        </View>
        )}
        {
        (tutStep === 'tut_drawface') && (
            <View style={{flex:1, justifyContent: 'flex-end'}}>
            <TutDesc 
                title={'DRAW THE FACE'}
                desc={'Annotate the face by clicking on the boxes'}
            />
            </View>
        )
        }
        {
        (tutStep === 'tut_press_annotate') && (
            <View>
            <TutDesc 
                title={'PRESS \'ANNOTATE\''}
                desc={'Press Annotate to finish'}
            />
            </View>
        )
        }
        {
        (tutStep === 'tut_annotation' ) && (
            <View>
            <TutDesc 
                title={'ANNOTATION'}
                desc={'Annotation is displayed in the coloured boxes'}
            />
            </View>
        )
        }
        {(tutStep === 'tut_aiframe') && (
        <View>
            <TutDesc 
            title={'AI FRAME'}
            desc={'AI frame is displayed in the gradient square'}
            />
        </View>
        ) } 
        {(tutStep === 'tut_need_editing') && (
        <View>
            <TutDesc 
            title={'IMAGE NEEDS EDITING'}
            desc={'If the AI framedoese not match the annotation, you can edit incoreect parts'}
            />
        </View>
        )}
        {(tutStep === 'tut_edit_ai') && (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TutDesc
            title={'EDIT AI'}
            desc={'If the annotation does not match the AI frame annotation, you can reannotate the face.'} 
            />
        </View>
        )}
        {(tutStep === 'tut_edit_annotation') && (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TutDesc
            title={'EDIT ANNOTATION'}
            desc={'If the annotation does not match the AI frame annotation, you can reannotate the face.'} 
            />
        </View>
        )}
        {(tutStep === 'tut_swipe_left') && (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TutDesc
            title={'SWIPE LEFT TO REPORT'}
            desc={'If the image contains inappropriate content, You canallways report it to be removed.'}
            />
        </View>
        )}
        {(tutStep === 'tut_swiipe_right') && (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TutDesc
            title={'SWIPE RIGHT TO VERIFY'}
            desc={'If the AI frame matches the annotation, you can verify.'}
            />
        </View>
        )}
        {(tutStep === 'tut_completed') && (
        <View style={{
            flex: 1, 
            justifyContent: 'center', 
            alignContent:'center', 
            alignItems: 'center'}}>
            <Text style={{
            color: '#FFF',
            fontFamily: 'Moon-Bold',
            fontSize: 32,
            textAlign: 'center'
            }}>TUTORIAL COMPLETED</Text>
            <Text style={{
            color: '#FFF',
            fontFamily: 'Moon-Bold',
            fontSize: 14,
            textAlign: 'center',
            marginVertical: 20
            }}>EXIT TUTORIAL MODE BY CLICKING THE BUTTON BELOW</Text>
    
            <Ripple
            onPress={() =>{
                onExitTutorial();
            }}
            outerStyle={{
                borderRadius: 30,
                backgroundColor: dark_theme.COLORS.BG_GREY,
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            innerStyle={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image source={require('../../assets/ico_close.png')} />
            </Ripple>
        </View>
        )}
        </>
    );
    }


    const TutorialView = (props) =>{
        return(
          <>
            <View style={styles.tut_overlay}>
              <View style={styles.tut_exit}>
                <Ripple 
                  onPress={()=>onExitTutorial()}
                ><Image source={require('../../assets/exit.png')} />
                </Ripple>
                <Text style={{color: '#FFF', marginTop: 7}}>EXIT WALKTHROUGH</Text>
              </View>
              <View style={styles.tut_content}>
                <TutorialOverlay />
              </View>
              <View style={styles.next_tut_btn}>
                <Ripple onPress={()=>handleNextTut()}>
                  <Image source={require('../../assets/btn_tut_next.png')} />
                </Ripple>
              </View>
            </View>
          </>
        );
    }
    const PlayAIView = (props) => {
        return (
            <>
                <View style={styles.uploadScrollContainer}>
                   

            {(tutStep === 'tut_description' || 
                tutStep === 'tut_drawface') && (
                    <>
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
                        <RoundButton
                            title={t('playAI.annotate')}
                            type={'primary'}
                            onPress={()=>{
                                //submitAnnotate();

                            }}
                            />
                    </>

                )
        }
        {
            (tutStep === 'tut_press_annotate') && (
                <View>
                <TutDesc 
                    title={'PRESS \'ANNOTATE\''}
                    desc={'Press Annotate to finish'}
                />
                </View>
            )
            }
            {
            (tutStep === 'tut_annotation' ) && (
                <View>
                <TutDesc 
                    title={'ANNOTATION'}
                    desc={'Annotation is displayed in the coloured boxes'}
                />
                </View>
            )
            }
            {(tutStep === 'tut_aiframe') && (
            <View>
                <TutDesc 
                title={'AI FRAME'}
                desc={'AI frame is displayed in the gradient square'}
                />
            </View>
            ) } 
            {(tutStep === 'tut_need_editing') && (
            <View>
                <TutDesc 
                title={'IMAGE NEEDS EDITING'}
                desc={'If the AI framedoese not match the annotation, you can edit incoreect parts'}
                />
            </View>
            )}
            {(tutStep === 'tut_edit_ai') && (
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TutDesc
                title={'EDIT AI'}
                desc={'If the annotation does not match the AI frame annotation, you can reannotate the face.'} 
                />
            </View>
            )}
            {(tutStep === 'tut_edit_annotation') && (
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TutDesc
                title={'EDIT ANNOTATION'}
                desc={'If the annotation does not match the AI frame annotation, you can reannotate the face.'} 
                />
            </View>
            )}
            {(tutStep === 'tut_swipe_left') && (
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TutDesc
                title={'SWIPE LEFT TO REPORT'}
                desc={'If the image contains inappropriate content, You canallways report it to be removed.'}
                />
            </View>
            )}
            {(tutStep === 'tut_swiipe_right') && (
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TutDesc
                title={'SWIPE RIGHT TO VERIFY'}
                desc={'If the AI frame matches the annotation, you can verify.'}
                />
            </View>
            )}
            {(tutStep === 'tut_completed') && (
            <View style={{
                flex: 1, 
                justifyContent: 'center', 
                alignContent:'center', 
                alignItems: 'center'}}>
                <Text style={{
                color: '#FFF',
                fontFamily: 'Moon-Bold',
                fontSize: 32,
                textAlign: 'center'
                }}>TUTORIAL COMPLETED</Text>
                <Text style={{
                color: '#FFF',
                fontFamily: 'Moon-Bold',
                fontSize: 14,
                textAlign: 'center',
                marginVertical: 20
                }}>EXIT TUTORIAL MODE BY CLICKING THE BUTTON BELOW</Text>
        
                <Ripple
                onPress={() =>{
                    onExitTutorial();
                }}
                outerStyle={{
                    borderRadius: 30,
                    backgroundColor: dark_theme.COLORS.BG_GREY,
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                innerStyle={{
                    height: 60,
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={require('../../assets/ico_close.png')} />
                </Ripple>
            </View>
            )}
                </View>
            </>
        );
    }
      

    return (
        <>
        <View style={styles.container}>
            <PlayAIView />
            <TutorialView />
        </View>
        </>
    );
}

export default withTranslation()(PlayAITutorial);
