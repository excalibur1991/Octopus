/* eslint-disable react-hooks/exhaustive-deps */
import {View, ScrollView, Text, Dimensions, TextInput} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {actions} from '../services/State/Reducer';
import MultiSelect from '../components/BountyMultiselect';
import {useStateValue} from '../services/State/State';
import {Chip, Button, IconButton} from 'react-native-paper';
import ImageZoom from 'react-native-image-pan-zoom';
import Svg, {Defs, Pattern, Rect, Path, G, Circle} from 'react-native-svg';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../services/Common/theme';
import * as Progress from 'react-native-progress';
import {
  updateMetadata,
  handleBountySelection,
  handlePressAnnoTag,
  find_dimesions,
  handleOnMove,
  handleOnClick,
  saveAnnotation,
  rectWidth,
  rectHeight,
  drawCanvas,
  saveChange,
  onNext,
  onCancel,
} from '../functions/annotation';
import ColorPicker from 'react-native-wheel-color-picker';
import {styles} from '../styles/annotateimage';
import {withTranslation} from 'react-i18next';
import Ripple from '../components/Ripple';
import LinearGradient from 'react-native-linear-gradient';
import Canvas from 'react-native-canvas';

const AnnotateImage = ({navigation, t}) => {
  const [, dispatch] = useStateValue();
  const [annotating, setAnnotating] = useState(false);
  const [annotatingProgress, setAnnotatingProgress] = useState(0);
  const [bounties, setBounties] = useState([]);
  const [selectedBounties, setSelectedBounties] = useState([]);
  const [bountyPlaceholder, setBountyPlaceholder] = useState('Bounties');
  const [annotationTags, setAnnotationTags] = useState([]);

  const [metadata, setMetadata] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [curImageIndex, setCurImageIndex] = useState(0);
  const [curMetadata, setCurMetadata] = useState({});

  const [frameDimension, setFrameDimension] = useState({
    width: Dimensions.get('window').width - 50,
    height: 300,
  });
  const [imageDimension, setImageDimension] = useState({
    width: 400,
    height: 300,
  });

  const [imageBlob, setImageBlob] = useState(null);

  //type: 'box', x: 0, y: 0, width: 30, height: 30
  const [annoRect, setAnnoRect] = useState([]);
  //type: 'dots', dots: [{x: 0, y: 0}]
  const [annoDot, setAnnoDot] = useState([]);

  const [tempAnnoRect, setTempAnnoRect] = useState({rects: []});

  const [annoMode, setAnnoMode] = useState([
    {type: 'box', checked: true},
    {type: 'anonymization', checked: true},
    {type: 'dots', checked: false},
  ]); // 'dots'
  const [curAnnoMode, setCurAnnoMode] = useState(['box']);

  const [curTag, setCurTag] = useState('');
  const [rectScale, setRectScale] = useState(1.0);
  const [zoomView, setZoomView] = useState(null);
  const [cropPosition, setCropPosition] = useState({x: 0, y: 0});
  const [isAnonymization, setIsAnonymization] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState([]);
  const [skinColor, setSkinColor] = useState(null);
  const [anonymizationBounties, setAnonymizationBounties] = useState([]);
  const [imageRatio, setImageRatio] = useState(1.0);
  const [isEyeDrop, setEyeDrop] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [isInEdit, setIsInEdit] = useState(false);
  const [curRectIndex, setCurRectIndex] = useState(-1);
  const [imageData, setImageData] = useState(null);

  const canvasRef = useRef(null);
  const zoomViewRef = useRef(null);

  const props = {
    dispatch,
    bounties,
    setBounties,
    selectedBounties,
    setSelectedBounties,
    annotationTags,
    setAnnotationTags,
    metadata,
    setMetadata,
    curPage,
    setCurPage,
    maxPage,
    setMaxPage,
    curImageIndex,
    setCurImageIndex,
    curMetadata,
    setCurMetadata,
    frameDimension,
    setFrameDimension,
    imageBlob,
    setImageBlob,
    annoRect,
    setAnnoRect,
    curTag,
    setCurTag,
    rectScale,
    setRectScale,
    zoomView,
    setZoomView,
    cropPosition,
    setCropPosition,
    curAnnoMode,
    setCurAnnoMode,
    annoDot,
    setAnnoDot,
    isAnonymization,
    setIsAnonymization,
    anonymizationBounties,
    setAnonymizationBounties,
    imageDimension,
    setImageDimension,
    canvas,
    imageRatio,
    setImageRatio,
    isEyeDrop,
    setEyeDrop,
    gender,
    setGender,
    age,
    setAge,
    setSkinColor,
    skinColor,
    tempAnnoRect,
    setTempAnnoRect,
    curRectIndex,
    setCurRectIndex,
    isInEdit,
    setIsInEdit,
    imageData,
    setImageData,
    annotating,
    setAnnotating,
    annotatingProgress,
    setAnnotatingProgress,
  };

  const handleAnnoModeSelection = (items) => {
    setCurAnnoMode(items);
  };

  useEffect(() => {
    setCurImageIndex(0);
  }, []);

  useEffect(() => {
    try {
      updateMetadata(props);
    } catch (err) {}
  }, [curImageIndex]);

  useEffect(() => {
    drawCanvas(props, imageBlob);
  }, [imageBlob]);

  useEffect(() => {}, [isInEdit]);

  useEffect(() => {
    setCanvas(canvasRef.current);
  }, [canvasRef]);

  useEffect(() => {
    setZoomView(zoomViewRef.current);
  }, [zoomViewRef]);

  useEffect(() => {
    let _tempAnnoRect = {...(tempAnnoRect || {})};
    _tempAnnoRect.tag = curTag;
    _tempAnnoRect.skinColor = skinColor;
    setTempAnnoRect(_tempAnnoRect);
  }, [skinColor]);

  useEffect(() => {
    let _tempAnnoRect = {...(tempAnnoRect || {})};
    _tempAnnoRect.tag = curTag;
    _tempAnnoRect.age = age;
    setTempAnnoRect(_tempAnnoRect);
  }, [age]);

  useEffect(() => {
    let _tempAnnoRect = {...(tempAnnoRect || {})};
    _tempAnnoRect.gender = gender;
    _tempAnnoRect.tag = curTag;
    setTempAnnoRect(_tempAnnoRect);
  }, [gender]);

  const total = (metadata && metadata.length) || 0;
  const completed = (curImageIndex || 0) + 1;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Progress.Bar
          height={8}
          width={150}
          progress={completed / total}
          borderWidth={0}
          color={theme.COLORS.CORNFLOWER_BLUE}
          unfilledColor={theme.COLORS.MID_GRAY}
        />
        <Text style={styles.progressText}>
          {completed} / {total} images
        </Text>
      </View>
      <View
        onLayout={(event) => {
          find_dimesions(props, event.nativeEvent.layout);
        }}
        style={styles.imageView}>
        <ImageZoom
          ref={zoomViewRef}
          cropWidth={frameDimension.width}
          cropHeight={frameDimension.height}
          imageWidth={imageDimension.width}
          imageHeight={imageDimension.height}
          style={styles.imageZoom}
          enableCenterFocus={false}
          onMove={(position) => {
            handleOnMove(props, position);
          }}
          onClick={(position) => {
            handleOnClick(props, position);
          }}>
          <Canvas ref={canvasRef} style={{padding: 0, margin: 0}} />
        </ImageZoom>
        <View style={styles.overlay} pointerEvents={'none'}>
          <Svg width={'100%'} height={'100%'} style={styles.svgRect}>
            {curTag != '' && (
              <G>
                <Defs>
                  <Pattern
                    id="grid"
                    width={rectWidth}
                    height={rectHeight}
                    patternUnits="userSpaceOnUse">
                    <Path
                      d="M 30 0 L 0 0 0 30"
                      fill="none"
                      stroke="gray"
                      stroke-width="1"
                    />
                  </Pattern>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grid)" />
              </G>
            )}
            <G>
              {annoRect
                .filter((data, index) => index !== curRectIndex)
                .map((data, data_index) =>
                  data.rects.map((rect, index) => (
                    <Rect
                      key={'annoRect' + index}
                      x={(rect.x - cropPosition.x) * rectScale}
                      y={(rect.y - cropPosition.y) * rectScale}
                      width={rect.width * rectScale}
                      height={rect.height * rectScale}
                      fill="#00ff0030"
                      stroke="none"
                      strokeWidth="0"
                    />
                  )),
                )}
              {annoDot.map((rect, index) =>
                rect.dots.map((dot, index) => (
                  <Circle
                    key={'annoDot' + rect.tag + index}
                    cx={(dot.x - cropPosition.x) * rectScale}
                    cy={(dot.y - cropPosition.y) * rectScale}
                    r={3 * rectScale}
                    fill="#FF000080"
                    stroke="none"
                    strokeWidth="0"
                  />
                )),
              )}
              {tempAnnoRect &&
                tempAnnoRect.rects &&
                tempAnnoRect.rects.map((rect, index) => (
                  <Rect
                    key={'tempAnnoRect' + index}
                    x={(rect.x - cropPosition.x) * rectScale}
                    y={(rect.y - cropPosition.y) * rectScale}
                    width={rect.width * rectScale}
                    height={rect.height * rectScale}
                    fill="#FF000030"
                    stroke="none"
                    strokeWidth="0"
                  />
                ))}
            </G>
          </Svg>
        </View>
        {isInEdit && (
          <>
            <View style={styles.saveButtonContainer}>
              <Ripple
                style={styles.rippleButton}
                onPress={() => saveChange(props)}>
                <Text style={styles.rippleButtonText}>Save</Text>
              </Ripple>
            </View>
            <View style={styles.clearButtonContainer}>
              <Ripple
                style={styles.rippleButton}
                onPress={() => setTempAnnoRect({rects: []})}>
                <Text style={styles.rippleButtonText}>Clear</Text>
              </Ripple>
            </View>
          </>
        )}
      </View>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.column}>
          <MultiSelect
            hideTags
            hideSubmitButton
            hideDropdown
            items={bounties}
            uniqueKey="tag"
            selectText={t('Annotations.Bounty')}
            displayKey="tag"
            single={true}
            showFilter={false}
            canAddItems={false}
            selectedItems={selectedBounties}
            onSelectedItemsChange={(items) => {
              handleBountySelection(props, items);
            }}
            textInputProps={{editable: false}}
            searchInputPlaceholderText={bountyPlaceholder}
            selectedItemTextColor={'#00A5FF'}
            styleDropdownMenu={{height: 56}}
            styleDropdownMenuSubsection={styles.styleDropdownMenuSubsection}
            styleInputGroup={styles.styleInputGroup}
          />
          {annotationTags.length > 0 && (
            <>
              <View style={styles.tagWrapper}>
                {annotationTags.map((annoTag) => (
                  <Chip
                    key={annoTag.tag}
                    style={
                      curTag !== annoTag.tag ? styles.tag : styles.tagActive
                    }
                    title={annoTag.tag}
                    textStyle={styles.tagText}
                    icon={() => null}
                    onLongPress={() => {}}
                    onPress={() => {
                      handlePressAnnoTag(props, annoTag);
                    }}
                    selected={annoTag.checked}
                    closeIconAccessibilityLabel={'Close'}>
                    {annoTag.tag}
                  </Chip>
                ))}
              </View>
              <Text style={styles.tagsNote}>
                Choose a tag to add annotations.
              </Text>
            </>
          )}

          {isAnonymization && (
            <View>
              <TextInput
                style={styles.ageInput}
                keyboardType={'numeric'}
                value={age.toString()}
                placeholder={t('Annotations.age')}
                placeholderTextColor={'#A9A9A9'}
                onChangeText={setAge}
              />
              <MultiSelect
                hideTags
                hideSubmitButton
                hideDropdown
                items={[
                  {name: t('Annotations.male'), value: 'Male'},
                  {name: t('Annotations.female'), value: 'Female'},
                  {name: t('Annotations.other'), value: 'Other'},
                ]}
                uniqueKey="value"
                selectText={t('Annotations.gender')}
                displayKey="name"
                single={true}
                showFilter={false}
                canAddItems={false}
                selectedItems={gender}
                onSelectedItemsChange={(items) => {
                  setGender(items);
                }}
                textInputProps={{
                  editable: false,
                }}
                searchInputPlaceholderText={t('Annotations.gender')}
                selectedItemTextColor={'#00A5FF'}
                styleMainWrapper={{
                  marginTop: 10,
                }}
              />
              <View style={styles.skinButton}>
                <Text
                  style={{
                    alignSelf: 'center',
                  }}
                  color={'#A9A9A9'}>
                  {t('Annotations.skinColor')}
                </Text>
                <View
                  style={{
                    marginLeft: 10,
                    backgroundColor: skinColor,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderColor: '#ADADAD',
                    borderWidth: 1,
                    width: 100,
                  }}>
                  <TextInput
                    style={{
                      height: 30,
                      paddingVertical: 0,
                    }}
                    onChangeText={setSkinColor}
                    value={skinColor}
                    placeholder={'#FFFFFF'}
                  />
                </View>
                <IconButton
                  size={25}
                  icon="eyedropper-variant"
                  color={isEyeDrop ? theme.APP_COLOR : '#333333'}
                  onPress={() => {
                    setEyeDrop(!isEyeDrop);
                  }}
                />
              </View>
              {isEyeDrop && (
                <View style={styles.colorPickerView}>
                  <ColorPicker
                    // ref={r => { this.picker = r }}
                    color={skinColor ? skinColor : '#FFFFFF'}
                    swatchesOnly={false}
                    onColorChange={(color) => {}}
                    onColorChangeComplete={(color) => {
                      setSkinColor(color);
                    }}
                    thumbSize={15}
                    sliderSize={15}
                    noSnap={false}
                    row={true}
                    swatchesLast={false}
                    swatches={false}
                    discrete={false}
                    style={styles.colorPicker}
                  />
                </View>
              )}
            </View>
          )}

          {annotating || annotatingProgress > 0 ? (
            <View style={styles.annotatingContainer}>
              <View style={styles.row}>
                {annotatingProgress === 1 ? (
                  <Ripple
                    onPress={() => onNext(props)}
                    style={styles.cancelNextButton}>
                    <Text style={styles.nextButtonText}>Next</Text>
                  </Ripple>
                ) : (
                  <Ripple
                    onPress={() => onCancel(props)}
                    style={styles.cancelNextButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Ripple>
                )}
                <Progress.Bar
                  height={13}
                  progress={annotatingProgress}
                  borderWidth={0}
                  borderRadius={30}
                  color={theme.COLORS.CORNFLOWER_BLUE}
                  width={Dimensions.get('window').width * 0.68}
                  unfilledColor={theme.COLORS.SKY_BLUE_DARK_OPACITY_20P}
                />
              </View>
              <Text style={styles.annotationProgressText}>
                {annotating ? 'Annotating...' : 'Annotated'}
              </Text>
            </View>
          ) : (
            <Ripple
              onPress={() => saveAnnotation(props)}
              style={styles.annotateButton}>
              <Text style={styles.buttonText}>{t('Annotations.save')}</Text>
            </Ripple>
          )}

          <LinearGradient
            end={{x: 1, y: 0}}
            start={{x: 0.15, y: 0}}
            colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}
            style={styles.modalButtonGradient}>
            <Ripple
              onPress={() => {
                dispatch({
                  type: actions.SET_ALERT_SETTINGS,
                  alertSettings: {
                    show: true,
                    type: 'warn',
                    message:
                      'ARE YOU SURE YOU WANT TO EXIT THE MISSION NOW? YOU MAY GO TO ‘MY MISSIONS’ TO CONTINUE UNFINISHED MISSIONS.',
                    confirmText: 'EXIT',
                    title: 'EXIT MISSION',
                    showConfirmButton: true,
                    showCancelButton: true,
                    onConfirmPressed: () => navigation.goBack(),
                    onCancelPressed: () => {},
                  },
                });
              }}
              style={styles.modalButton}>
              <Text style={styles.buttonText}>Exit</Text>
              <MaterialIcon
                size={20}
                name="exit-to-app"
                color={theme.COLORS.WHITE}
                style={styles.buttonIconRight}
              />
            </Ripple>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
};

export default withTranslation()(AnnotateImage);