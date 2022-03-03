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
import React, { createRef, useEffect, useState } from 'react';
import { useStateValue } from '../../services/State/State';
import Button from '../../components/Button';
import { theme, dark_theme } from '../../services/Common/theme';
import { actions } from '../../services/State/Reducer';
import {
    annotate,
    annotateImage,
    getImageById,
} from '../../services/API/APIManager';
import DrawingPan, { EDIT_MODE } from '../../components/DrawingPan';
import { styles } from '../../styles/playaitutorial';
import { withTranslation } from 'react-i18next';
import {
    Chip, Divider,
} from 'react-native-paper';
import DottedProgressBar from '../../components/DottedProgressBar';
import SwipeCards from '../../components/SwipeCards';
import Ripple from '../../components/Ripple';
import { setPrivacyAndTermsAccepted } from '../../services/DataManager';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { CommonStyles } from '../../services/Common/styles';
import RoundButton from '../../components/RoundButton';
import ImageZoom from 'react-native-image-pan-zoom';
import Svg, { Defs, Pattern, Rect, Path, G, Circle } from 'react-native-svg';
import Canvas, { Image as CanvasImage, Path2D, ImageData } from 'react-native-canvas';
import Tag from '../../components/Tag';
import styled from 'styled-components/native';
import { DragResizeBlock } from '../../components/DragResizeBlock';
import CircleButton from '../../components/CircleButton';
import AntIcon from 'react-native-vector-icons/AntDesign';


const PlayAITutorial = (props) => {
    const [{ cameraSettings, playAISettings }, dispatch] = useStateValue();
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
    const [imageDimension, setImageDimension] = useState({ width: 0, height: 0 });

    //camera mode, 
    const [mode, setMode] = useState(null);
    const [response, setResponse] = useState(null);

    const [annotateProgress, setAnnotateProgress] = useState(0);
    const [isAnnotationUpload, setIsAnnotationUpload] = useState(false);
    const [isAnnoAI, setIsAnnoAI] = useState(false);
    const [cards, setCards] = useState([]);
    const [editMode, setEditMode] = useState(EDIT_MODE.MODE_SWIPE);
    const [tutStep, setTutStep] = useState('tut_description');
    const [tutStepIndex, setTutStepIndex] = useState(0);

    const [tutImageData, setTutImageData] = useState(require('../../assets/tut/tut_image_playai.png'));
    const [isCompleted, setIsCompleted] = useState(false);

    const [cropRect, setCropRect] = useState({x: 0, y: 0, width: 0, height: 0, pageX:0, pageY:0});

    const { navigation, t } = props || {};
    const { onExitTutorial } = navigation.params || {};


    const annoRectData = [
        { isAI: true, x: 130, y: 0, width: 80, height: 60 },
        { isAI: false, x: 90, y: 90, width: 28, height: 28 },
        { isAI: false, x: 90, y: 120, width: 28, height: 28 },
        { isAI: false, x: 120, y: 60, width: 28, height: 28 },
        { isAI: false, x: 120, y: 90, width: 28, height: 28 },
        { isAI: false, x: 120, y: 120, width: 28, height: 28 },
        { isAI: false, x: 120, y: 150, width: 28, height: 28 },
        { isAI: false, x: 150, y: 60, width: 28, height: 28 },
        { isAI: false, x: 150, y: 90, width: 28, height: 28 },
        { isAI: false, x: 150, y: 120, width: 28, height: 28 },
        { isAI: false, x: 150, y: 150, width: 28, height: 28 },
        { isAI: false, x: 180, y: 60, width: 28, height: 28 },
        { isAI: false, x: 180, y: 90, width: 28, height: 28 },
        { isAI: false, x: 180, y: 120, width: 28, height: 28 },
        { isAI: false, x: 180, y: 150, width: 28, height: 28 },
    ]


    const enum_mode = {
        MODE_PHOTO: 'photo',
        MODE_LIBRARY: 'library',
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
        'tut_edit_ai',
        'tut_edit_annotation',
        'tut_swipe_left',
        'tut_swipe_right'
    ];

    const TutDesc = (props) => {
        const {
            title,
            desc,
            decoDown = false,
            borderColor = '#4E9CF0',
            secondaryBorderColor = '#A262E2',
            space = 40
        } = props || {};
        const [lineHeight, setLineHeight] = useState(0);

        const find_dimensions = (layout) => {
            const { x, y, width, height } = layout;
            setLineHeight(height);
        };

        return (
            <View onLayout={(event) => { find_dimensions(event.nativeEvent.layout) }}
                style={
                    decoDown ? {
                        width: '100%',
                        borderBottomWidth: .5,
                        borderColor: borderColor,
                        paddingBottom: space,
                        marginBottom: 40,
                        
                    } : {
                        width: '100%',
                        borderTopWidth: .5,
                        borderColor: borderColor,
                        paddingTop: space,
                        marginBottom: 40,
                    }}>
                {decoDown == false && (<View style={{
                    marginTop: 7,
                    position: 'absolute',
                    width: '100%',
                    borderTopWidth: .5,
                    borderColor: secondaryBorderColor
                }}>
                    <View style={{
                        width: '100%',
                        height: space,
                        borderColor: secondaryBorderColor,
                        borderLeftWidth: .5,
                        marginLeft: '5%',
                    }}>
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            width: 3,
                            height: 3,
                            marginLeft: -2,
                            backgroundColor: secondaryBorderColor,
                            transform: [{ rotate: "45deg" }]
                        }}>
                        </View>
                    </View>
                </View>)
                }
                <View
                    style={{
                        paddingRight: '15%',
                        paddingLeft: '10%',
                    }}
                >
                    <Text style={styles.tut_desc_heading}>{title}</Text>
                    <Text style={styles.tut_description}>{desc}</Text>
                </View>
                {decoDown && (<View style={{
                    bottom: 7,
                    width: '100%',
                    borderTopWidth: .5,
                    position: 'absolute',
                    borderColor: secondaryBorderColor
                }}>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: lineHeight - 15,
                        borderColor: secondaryBorderColor,
                        borderLeftWidth: .5,
                        marginLeft: '5%',
                    }}>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            width: 3,
                            height: 3,
                            marginLeft: -2,
                            backgroundColor: secondaryBorderColor,
                            transform: [{ rotate: "45deg" }]
                        }}>
                        </View>
                    </View>
                </View>)
                }
            </View>
        );
    }


    const handleNextTut = () => {
        if (tutStepIndex < tutStepDesc.length-1) {
            setTutStepIndex(tutStepIndex + 1);
            setTutStep(tutStepDesc[tutStepIndex + 1]);
        }

        if(tutStep === 'tut_swipe_right') {
            setIsCompleted(true);
        }
    }


    const initVariables = () => {
        setEditMode(EDIT_MODE.MODE_SWIPE);
        setIsAnnoAI(false);
        setBounds([]);
        setImageId(null);
        setImageData(null);
        setMode(enum_mode.MODE_PHOTO);
    };

    useEffect(() => {
    }, [tutStep]);

    useEffect(() => {
        initVariables();
    }, []);

    const TutDrawingPan = (props) => {
        const {
            tutImageSource = null,
            rectWidth = 30,
            rectHeight = 30,
            annoRect = [],
            cropPosition = { x: 0, y: 0 },
            rectScale = 1.0,
            cropRect = {},
            getCropRect = ()=>{}

        } = props || {};

        const rectRef = createRef();
        useEffect(()=>{
            if (rectRef && !cropRect.pageX  && !cropRect.pageY) {
                rectRef.current.measure((x, y, width, height, pageX, pageY) => {
                          getCropRect({x, y, width, height, pageX, pageY});
                 });
              }
        }, [rectRef]);

        return (
            <View style={{
                backgroundColor: '#ffffff',
                borderRadius: 8,
                borderColor: '#DADADA',
                borderWidth: 1,
                width: '100%',
                height: Dimensions.get('screen').height * 0.5
            }}
            ref={rectRef}
           
            >
                <Image
                    source={tutImageSource}
                    style={{
                        flex: 1,
                        height: undefined,
                        width: undefined
                    }}
                />
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                    }}
                    pointerEvents={'none'}
                >
                    <Svg
                        width={'100%'}
                        height={'100%'}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                        }}
                    >
                        <G>
                            <Defs>
                                <Pattern id="grid" width={rectWidth} height={rectHeight} patternUnits="userSpaceOnUse">
                                    <Path d="M 30 0 L 0 0 0 30" fill="none" stroke="#8A9CB1" stroke-width="1" />
                                </Pattern>
                            </Defs>
                            <Rect width="100%" height="100%" fill="url(#grid)" />
                        </G>
                        <G>
                            {
                                annoRect.filter(i => !i.isAI).map((rect, index) => (
                                    <Rect
                                        key={'annoRect' + index}
                                        x={(rect.x - cropPosition.x) * rectScale + 2}
                                        y={(rect.y - cropPosition.y) * rectScale + 2}
                                        width={rect.width * rectScale - 4}
                                        height={rect.height * rectScale - 4}
                                        fill="#95615280"
                                        stroke="none"
                                        strokeWidth="0"
                                    />
                                ))
                            }
                        </G>
                    </Svg>

                </View>
                {annoRect.filter(i=>i.isAI).map((rect, index)=>(
                <DragResizeBlock
                    key={'annoRect' + index}
                    index={index}
                    curRectIndex={props.curRectIndex}
                    x={(rect.x - cropPosition.x) * rectScale}
                    y={(rect.y - cropPosition.y) * rectScale}
                    w={rect.width * rectScale}
                    h={rect.height * rectScale}
                    >
                <View
                    style={{
                    width: '100%',
                    height: '100%',
                    }}
                />
                {rect.isAI &&
                    <Text style={{
                        position: 'absolute',
                        color: '#72B5CB',
                        fontSize: 18,
                        fontWeight: '700',
                        right: -25,
                        bottom: -10,
                    }}>AI</Text>
                }
                
                </DragResizeBlock>
                ))}
            </View>
        );
    }

    const TutSwipeCard = (props) => {
        const {
            rotateLeft = false,
            rotateRight = false,
            annoRect = [],
            tutImageSource = '',
            cropRect = {},
            getCropRect = ()=>{}
        } = props || {};
        return (
            <View style={{
                zIndex: 10,
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',                      
            }}>
                <Image
                    resizeMode='stretch'
                    source={require('../../assets/left.png')}
                    style={{
                        zIndex: 0,
                        height: '100%',
                        left: 0,
                    }}
                />
                <View style={
                rotateLeft ? {transform: [{translateY: -20},{rotate: '-10deg'}], width: '80%'} : rotateRight? {transform: [{translateX: 20},{rotate:'10deg'}], width: '80%'} : {width: '80%', zIndex: 1000}}>
                    <TutDrawingPan
                        annoRect={annoRect}
                        tutImageSource={tutImageSource}
                        cropRect={cropRect}
                        getCropRect={getCropRect}
                    />
                </View>
                <Image
                    resizeMode='stretch'
                    source={require('../../assets/right.png')}
                    style={{
                        zIndex: 0,
                        height: '100%',
                        right: 0
                    }}
                />

            </View>
        );
    }


    const TutorialOverlay = (props) => {
        return (
            <>
                {(tutStep === 'tut_description') && (
                    <View>
                        <TutDesc
                            title={t('playAITut.tut_about_title')}
                            desc={t('playAITut.tut_about_desc')}
                        />

                        <TutDesc
                            title={t('playAITut.tut_howto_title')}
                            desc={t('playAITut.tut_howto_desc')}
                        />
                    </View>
                )}
                {
                    (tutStep === 'tut_drawface') && (
                        <View 
                            style={{ 
                                flex: 1, 
                                justifyContent: 'flex-end',
                                position: 'absolute',
                                width: '100%',
                                top: Dimensions.get('window').height* .68
                            }}>
                            <TutDesc
                                title={t('playAITut.tut_drawface_title')}
                                desc={t('playAITut.tut_drawface_desc')}
                                space={80}
                            />
                        </View>
                    )
                }
                {
                    (tutStep === 'tut_press_annotate') && (
                        <View style={{ 
                            flex: 1, 
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            width: '100%',
                            top: Dimensions.get('window').height* .56
                        }}>
                            <TutDesc
                                decoDown={true}
                                space={80}
                                title={t('playAITut.tut_press_annotate_title')}
                                desc={t('playAITut.tut_press_annotate_desc')}
                            />
                        </View>
                    )
                }
                {
                    (tutStep === 'tut_annotation') && (
                        <View style={{ 
                            flex: 1, 
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            width: '100%',
                            top: Dimensions.get('window').height* .4
                        }}>
                            <TutDesc
                                title={t('playAITut.tut_annotation_title')}
                                desc={t('playAITut.tut_annotation_desc')}
                            />
                        </View>
                    )
                }
                {(tutStep === 'tut_aiframe') && (
                    <View style={{ 
                        flex: 1, 
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        width: '100%',
                        top: Dimensions.get('window').height* .22
                    }}>
                        <TutDesc
                            title={t('playAITut.tut_aiframe_title')}
                            desc={t('playAITut.tut_aiframe_desc')}
                        />
                    </View>
                )}
                {(tutStep === 'tut_need_editing') && (
                    <View style={{ 
                        flex: 1, 
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        width: '100%',
                        top: Dimensions.get('window').height* .59,
                    }}>
                        <TutDesc
                            decoDown={true}
                            space={80}
                            title={t('playAITut.tut_need_editing_title')}
                            desc={t('playAITut.tut_need_editing_desc')}
                        />
                    </View>
                )}
                {(tutStep === 'tut_edit_ai') && (
                    <View style={{ 
                        flex: 1, 
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        width: '100%',
                        top: Dimensions.get('window').height* .8,
                    }}>
                        <TutDesc
                            title={t('playAITut.tut_edit_ai_title')}
                            desc={t('playAITut.tut_edit_ai_desc')}
                        />
                    </View>
                )}
                {(tutStep === 'tut_edit_annotation') && (
                    <View style={{ 
                        flex: 1, 
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        width: '100%',
                        top: Dimensions.get('window').height* .8,
                    }}>
                        <TutDesc
                            title={t('playAITut.tut_edit_annotation_title')}
                            desc={t('playAITut.tut_edit_annotation_desc')}
                        />
                    </View>
                )}
                {(tutStep === 'tut_swipe_left') && (
                    <View style={{ 
                        flex: 1, 
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        width: '100%',
                        top: Dimensions.get('window').height* .70,
                    }}>
                        <TutDesc
                            space={80}
                            title={t('playAITut.tut_swipe_left_title')}
                            desc={t('playAITut.tut_swipe_left_desc')}
                        />
                    </View>
                )}
                {(tutStep === 'tut_swipe_right') && (
                    <View style={{ 
                        flex: 1, 
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        width: '100%',
                        top: Dimensions.get('window').height* .70,
                    }}>
                        <TutDesc
                            title={t('playAITut.tut_swipe_right_title')}
                            desc={t('playAITut.tut_swipe_right_desc')}
                        />
                    </View>
                )}
            </>
        );
    }

    const EditAIorAnnotate = (props) => {
        const {
            highlight = false,
            isEditAI = false,
            isAnnotate = false,
            onPress = ()=>{}
        } = props || {};
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                zIndex: highlight? 1000: 0,
            }}>
                <Chip
                    style={{
                        backgroundColor: '#25262B',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 25,
                        borderColor: isEditAI ? '#A737C1': 'transparent',
                        height: 52,
                        borderStyle: 'solid',
                        borderWidth: 2,
                    }}
                    textStyle={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: '#FFFFFF',
                        fontFamily: 'Inter'
                    }}
                    title={t('playAI.editAI')}
                    icon={() => null}
                    onLongPress={() => { }}
                    onPress={onPress}
                    selected={true}
                    closeIconAccessibilityLabel={'Close'}
                >{t('playAI.editAI')}</Chip>
                <Chip
                    style={{
                        backgroundColor: '#25262B',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 25,
                        fontWeight: '600',
                        height: 52,
                        borderStyle: 'solid',
                        borderWidth: 2,
                        borderColor: isAnnotate ? '#21975A': 'transparent',
                    }}
                    textStyle={{
                        fontSize: 20,
                        fontWeight: '600',
                        color:  '#FFFFFF',
                        fontFamily: 'Inter'
                    }}
                    title={t('playAI.editAnnotation')}
                    icon={() => null}
                    onLongPress={() => { }}
                    onPress={onPress}
                    selected={true}
                    closeIconAccessibilityLabel={'Close'}
                >{t('playAI.editAnnotation')}</Chip>
            </View>
        );
    }

    const highlight = () => {
        return {zIndex: 1000};
    }

    const ExitButton = () => {
        return (
            <View style={{ position: 'absolute', width: '90%', bottom: '10%' }}>
                <RoundButton
                    title={t('playAI.exit')}
                    type={'outline'}
                    tail={
                        <Image source={require('../../assets/exit.png')} />}
                />
            </View>
        );
    }


    const TutorialView = (props) => {
        return (
            <>
                <View style={styles.tut_overlay}>
                </View>
                <View style={{
                    position: 'absolute',
                    width: '100%', 
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 999
                }}>
                    <View style={styles.tut_exit}>
                        <Ripple
                            onPress={() => {navigation.goBack();}}
                        ><Image source={require('../../assets/exit.png')} />
                        </Ripple>
                        <Text style={{ color: '#FFF', marginTop: 7, fontSize: 10 }}>EXIT WALKTHROUGH</Text>
                    </View>
                    <View style={styles.tut_content}>
                        <TutorialOverlay />
                    </View>
                    {/* <View style={styles.next_tut_btn}>
                        <Ripple onPress={() => handleNextTut()}>
                            <Image source={require('../../assets/btn_tut_next.png')} />
                        </Ripple>
                    </View> */}
                    <View style={styles.nextContainer}>
                        <LinearGradient
                        end={{x: 1, y: 0.9}}
                        start={{x: 0.15, y: 0}}
                        colors={[theme.COLORS.LIGHT_BLUE, theme.COLORS.LIGHT_PURPLE]}
                        style={styles.nextButton}>
                        <Ripple onPress={handleNextTut} style={styles.buttonInner}>
                            <View style={styles.buttonIconContainer}>
                            <MaterialCommunityIcon
                                size={20}
                                color={theme.COLORS.WHITE}
                                name="chevron-double-right"
                            />
                            </View>
                        </Ripple>
                        </LinearGradient>
                    </View>
                </View>
            </>
        );
    }
    const PlayAIView = (props) => {
        return (
            <View style={{width: '100%', height: '100%'}}> 
                {(tutStep === 'tut_description' ||
                    tutStep === 'tut_drawface') && (
                        <View style={styles.uploadScrollContainer}>
                            <View style={styles.readOnlyContainer}>
                                <TutDrawingPan
                                    tutImageSource={require('../../assets/tut/tut_image_playai.png')}
                                />
                            </View>
                            <View style={styles.tagWrapper}>
                                <Tag title={t('playAI.PlayAI')} isGradient={true} />
                            </View>
                            <RoundButton
                                title={t('playAI.annotate')}
                                type={'primary'}
                                onPress={() => {
                                }}
                            />
                        </View>
                    )
                }
                {
                    (tutStep === 'tut_press_annotate') && (
                        <View style={styles.uploadScrollContainer}>
                            <View style={styles.readOnlyContainer}>
                                <TutDrawingPan
                                    tutImageSource={require('../../assets/tut/tut_image_playai.png')}
                                />
                            </View>
                            <View style={styles.tagWrapper}>
                                <Tag title={t('playAI.PlayAI')} isGradient={true} />
                            </View>
                            <RoundButton
                                style={highlight()}
                                title={t('playAI.annotate')}
                                type={'primary'}
                                onPress={() => {
                                    handleNextTut();
                                }}
                            />

                        </View>
                    )
                }
                {
                    (tutStep === 'tut_annotation') && [
                        <View style={{ paddingTop: '25%'}}>
                            <TutSwipeCard
                                annoRect={annoRectData}
                                cropRect={cropRect}
                                getCropRect={(rect)=>{ setCropRect(rect);}}
                                tutImageSource={require('../../assets/tut/tut_image_playai2.png')}
                            />
                        </View>,
                        <View style={{paddingHorizontal: '5%', alignItems: 'center', flex: 1, marginVertical: '10%'}} >
                        <EditAIorAnnotate />
                            <ExitButton />
                        </View>,
                        (cropRect.pageX != 0 && cropRect.pageY != 0 )&& (
                            <Svg
                            width={cropRect.width}
                            height={cropRect.height}

                            style={{
                                zIndex: 1000,
                                position: 'absolute',
                                left: cropRect.pageX,
                                top: cropRect.pageY,
                            }}
                        >
                            <G>
                                {
                                    annoRectData.filter(i => !i.isAI).map((rect, index) => (
                                        <Rect
                                            key={'annoRect' + index}
                                            x={(rect.x) + 2}
                                            y={(rect.y) + 2}
                                            width={rect.width - 4}
                                            height={rect.height - 4}
                                            fill="#95615280"
                                            stroke="none"
                                            strokeWidth="0"
                                        />
                                    ))
                                }
                            </G>
                        </Svg>
                        )
                        
                    ]
                }
                {(tutStep === 'tut_aiframe') && [
                        <View style={{ paddingTop: '25%'}}>
                            <TutSwipeCard
                                annoRect={annoRectData}
                                tutImageSource={require('../../assets/tut/tut_image_playai2.png')}
                            />
                        </View>,
                        <View style={{ paddingHorizontal: '5%', alignItems: 'center', flex: 1, marginVertical: '10%'}} >
                            <EditAIorAnnotate />
                            <ExitButton />
                        </View>,
                        (cropRect.pageX != 0 && cropRect.pageY != 0 )&& (
                        <View style={{
                            zIndex: 1000,
                            position: 'absolute',
                            left: cropRect.pageX,
                            top: cropRect.pageY,
                            width: cropRect.width,
                            height: cropRect.height
                        }}>
                        {annoRectData.filter(i=>i.isAI).map((rect, index)=>(
                            <DragResizeBlock
                                key={'annoRect' + index}
                                index={index}
                                x={rect.x}
                                y={rect.y}
                                w={rect.width}
                                h={rect.height}
                                >
                            <View
                                style={{
                                width: '100%',
                                height: '100%',
                                }}
                            />
                            {rect.isAI &&
                                <Text style={{
                                    position: 'absolute',
                                    color: '#72B5CB',
                                    fontSize: 18,
                                    fontWeight: '700',
                                    right: -25,
                                    bottom: -10,
                                }}>AI</Text>
                            }
                            
                            </DragResizeBlock>
                            ))}
                        </View>)
                ]}
                {(tutStep === 'tut_need_editing') && [
                        <View style={{ paddingTop: '25%'}}>
                            <TutSwipeCard
                                annoRect={annoRectData}
                                tutImageSource={require('../../assets/tut/tut_image_playai2.png')}
                            />
                        </View>,
                        <View style={{ paddingHorizontal: '5%', alignItems: 'center', flex: 1, marginVertical: '10%'}} >
                            <EditAIorAnnotate
                                highlight={true}
                            />
                            <ExitButton />
                        </View>
                ]}
                {(tutStep === 'tut_edit_ai') && [
                        <View style={{ paddingTop: '25%'}}>
                            <TutSwipeCard
                                annoRect={annoRectData}
                                tutImageSource={require('../../assets/tut/tut_image_playai2.png')}
                            />
                        </View>,
                        <View style={{ paddingHorizontal: '5%', alignItems: 'center', flex: 1, marginVertical: '10%'}} >
                            <EditAIorAnnotate
                                highlight={true}
                                isEditAI={true}
                            />
                            <ExitButton />
                        </View>
                ]}
                {(tutStep === 'tut_edit_annotation') && [
                        <View style={{ paddingTop: '25%'}}>
                            <TutSwipeCard
                                annoRect={annoRectData}
                                tutImageSource={require('../../assets/tut/tut_image_playai2.png')}
                            />
                        </View>,
                        <View style={{ paddingHorizontal: '5%', alignItems: 'center', flex: 1, marginVertical: '10%'}} >
                            <EditAIorAnnotate
                                highlight={true}
                                isAnnotate={true}
                            />
                            <ExitButton />
                        </View>
                ]}
                {(tutStep === 'tut_swipe_left') && [
                    <View style={{ paddingTop: '25%', zIndex: 20}} pointerEvents='none'>
                        <TutSwipeCard
                            rotateLeft={true}
                            annoRect={annoRectData}
                            tutImageSource={require('../../assets/tut/tut_image_playai2.png')}
                        />
                    </View>,
                    <View style={{ paddingHorizontal: '5%', alignItems: 'center', flex: 1, marginVertical: '10%' }} >
                        <EditAIorAnnotate />
                        <ExitButton />
                    </View>
                ]}
                {(tutStep === 'tut_swipe_right') && [
                        <View style={{ paddingTop: '25%', zIndex: isCompleted? 0: 20}} pointerEvents='none'>
                            <TutSwipeCard
                                rotateRight={true}
                                annoRect={annoRectData}
                                tutImageSource={require('../../assets/tut/tut_image_playai2.png')}
                            />
                        </View>,
                        <View style={{ paddingHorizontal: '5%', alignItems: 'center', flex: 1, marginVertical: '10%' }} >
                            <EditAIorAnnotate />
                            <ExitButton />
                        </View>
                ]}
            </View>
        );
    }


    const TutCompleted = (props) => {

        return (
            <>
            <View style={styles.tut_overlay_completed}>
                
            </View>
            <View style={{
                ...styles.tut_center, 
                
                zIndex: 999}}>
            <Text style={styles.tut_text_big}>{t('playAITut.tutCompleted')}</Text>
            <Text style={styles.tut_text_big_desc}>{t('playAITut.tutCompletedDesc')}</Text>
            <Ripple onPress={()=>{
                    navigation.goBack();
                }}
                 style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.APP_COLOR_2,
                 }}>
                <AntIcon size={20} name="close" color={theme.COLORS.WHITE} />
            </Ripple>
            </View>
        </>
        );
    }



    return (
        <>
            <View style={styles.container}>
                
                <PlayAIView />
                <TutorialView />
                {isCompleted && (
                    <TutCompleted />
                )}
            </View>
        </>
    );
}

export default withTranslation()(PlayAITutorial);
