import {
  View,
  Image,
  ScrollView,
  Pressable,
  Text,
  TextInput
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MultiSelect from '../components/Multiselect'
import {useStateValue} from '../services/State/State';
import {
  Chip,
  Button,
} from 'react-native-paper';
import ImageZoom from 'react-native-image-pan-zoom';
import Svg, { Defs, Pattern, Rect, Path, G, Circle} from 'react-native-svg';

import {
  updateMetadata,
  handleBountySelection,
  handlePressAnnoTag,
  find_dimesions,
  handleOnMove,
  handleOnClick,
  saveAnnotation,
  rectWidth,
  rectHeight
} from '../functions/annotation';
import ColorPicker from 'react-native-wheel-color-picker';
import {styles} from '../styles/annotation';
import {withTranslation} from 'react-i18next';


const Annotation = ({navigation, t}) => {
  const [, dispatch] = useStateValue();
  
  const [bounties, setBounties] = useState([]);
  const [selectedBounties, setSelectedBounties] = useState([]);
  const [bountyPlaceholder, setBountyPlaceholder] = useState("Bounties");
  const [annotationTags, setAnnotationTags] = useState([]);

  const [metadata, setMetadata] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [curImageIndex, setCurImageIndex] = useState(0);
  const [curMetadata, setCurMetadata] = useState({});

  const [frameDimension, setFrameDimension] = useState({width: 400, height: 300});
  
  const [imageBlob, setImageBlob] = useState(null);

  //type: 'box', x: 0, y: 0, width: 30, height: 30
  const [annoRect, setAnnoRect] = useState([]);
  //type: 'dots', dots: [{x: 0, y: 0}]
  const [annoDot, setAnnoDot] = useState([]);

  const [annoMode, setAnnoMode] = useState([{type:'box', checked: true}, {type: 'dots', checked: false}]); // 'dots'
  const [curAnnoMode, setCurAnnoMode] = useState(['box']);

  const [curTag, setCurTag] = useState("");
  const [rectScale, setRectScale] = useState(1.0);
  const [zoomView,setZoomView] = useState(null);
  const [cropPosition, setCropPosition] = useState({x:0, y:0});
  const [isAnonymization, setIsAnonymization] = useState(false);
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState(['Male']);
  const [skinColor, setSkinColor] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [anonymizationBounties, setAnonymizationBounties] = useState([]);


  const props = {
    dispatch: dispatch,
    bounties: bounties,
    setBounties: setBounties,
    selectedBounties: selectedBounties, 
    setSelectedBounties: setSelectedBounties,
    annotationTags:annotationTags, 
    setAnnotationTags: setAnnotationTags,
    metadata: metadata, 
    setMetadata:setMetadata,
    curPage:curPage, 
    setCurPage:setCurPage,
    maxPage:maxPage, 
    setMaxPage:setMaxPage,
    curImageIndex:curImageIndex, 
    setCurImageIndex:setCurImageIndex,
    curMetadata:curMetadata, 
    setCurMetadata:setCurMetadata,
    frameDimension:frameDimension, 
    setFrameDimension:setFrameDimension,
    imageBlob:imageBlob, 
    setImageBlob:setImageBlob,
    annoRect:annoRect, 
    setAnnoRect:setAnnoRect,
    curTag:curTag, 
    setCurTag:setCurTag,
    rectScale:rectScale, 
    setRectScale:setRectScale,
    zoomView:zoomView,
    setZoomView:setZoomView,
    cropPosition:cropPosition, 
    setCropPosition:setCropPosition,
    curAnnoMode: curAnnoMode, 
    setCurAnnoMode: setCurAnnoMode,
    annoDot:annoDot, 
    setAnnoDot:setAnnoDot,
    isAnonymization,
    setIsAnonymization,
    anonymizationBounties,
    setAnonymizationBounties
  };

  useEffect(() => {
    setCurImageIndex(0);
  }, []);

 
  useEffect(()=>{
    try{

      updateMetadata(props);
    }catch(err){
    }
  }, 
  [curImageIndex]);

  const handleAnnoModeSelection = (items)=>{
    setCurAnnoMode(items);
  }


  
  return (
    <View style={styles.container}>
    <ScrollView 
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
          onSelectedItemsChange={(items)=>{handleBountySelection(props, items) }}
          textInputProps={{
            editable:false
          }}
          searchInputPlaceholderText={bountyPlaceholder}
          selectedItemTextColor={'#00A5FF'}
          styleDropdownMenu={{
            height:56,
          }}
          styleDropdownMenuSubsection={styles.styleDropdownMenuSubsection}
          styleInputGroup={styles.styleInputGroup}
        />
        {
               (annotationTags.length > 0) && (
               <View style={styles.tagWrapper}>
                {
                  annotationTags.map((annoTag)=>(
                    <Chip
                      key={annoTag.tag}
                      style={{
                        margin:2                   
                      }}
                      title={annoTag.tag}
                      icon={()=>null}
                      onLongPress={()=>{}}
                      onPress={()=>{handlePressAnnoTag(props, annoTag)}}
                      selected={annoTag.checked}
                      closeIconAccessibilityLabel={'Close'}
                    >{annoTag.tag}</Chip>
                  ))
                }
                </View>)

        }

          <MultiSelect 
          hideTags
          hideSubmitButton
          hideDropdown        
          items={annoMode}
          uniqueKey="type"
          selectText={t('Annotations.Type')}
          displayKey="type"
          single={true}
          showFilter={false}
          canAddItems={false}
          selectedItems={curAnnoMode}
          onSelectedItemsChange={(items)=>{handleAnnoModeSelection(items) }}
          textInputProps={{
            editable:false
          }}
          searchInputPlaceholderText={bountyPlaceholder}
          selectedItemTextColor={'#00A5FF'}
          styleDropdownMenu={{
            height:56,
          }}
          styleDropdownMenuSubsection={styles.styleDropdownMenuSubsection}
          styleInputGroup={styles.styleInputGroup}
        />

        <View
          onLayout={(event) => {find_dimesions(props, event.nativeEvent.layout) }}
          style={styles.imageView}>
          <ImageZoom 
            ref={(view)=>{setZoomView(view)}}
            cropWidth={frameDimension.width}
            cropHeight={frameDimension.height}
            imageWidth={frameDimension.width}
            imageHeight={frameDimension.height}
            style={styles.imageZoom}
            onMove={(position)=>{handleOnMove(props, position)}}
            onClick={(position)=>{handleOnClick(props, position)}}
          >
            <Image
            style={styles.imageContainer}
            source={{uri:imageBlob}}
            />
            
          </ImageZoom>
          <View 
            style={styles.overlay}
            pointerEvents={'none'}
          >
            <Svg
              width={'100%'}
              height={'100%'}
              style={styles.svgRect}
              >
              {(curTag != "") && 
              <G>
                <Defs>
                  <Pattern id="grid" width={rectWidth} height={rectHeight} patternUnits="userSpaceOnUse">
                    <Path d="M 30 0 L 0 0 0 30" fill="none" stroke="gray" stroke-width="1"/>
                  </Pattern>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grid)" />
              </G>}
              <G>
            
              {
                annoRect.filter((_rect)=>(_rect.tag == curTag)).map((rect,index)=>(
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
                ))
              }
              {
                annoDot.filter((_rect)=>(_rect.tag == curTag)).map((rect, index)=>(
                  rect.dots.map((dot, index)=>(
                    <Circle
                    key={'annoDot' + rect.tag + index}
                    cx={(dot.x - cropPosition.x) * rectScale}
                    cy={(dot.y - cropPosition.y) * rectScale}
                    r={3*rectScale}
                    fill="#FF000080"
                    stroke="none"
                    strokeWidth="0"
                    />
                  ))
                ))

              }
              </G>
           </Svg>
          </View>
          
        </View>
          {isAnonymization && annoRect.find((value)=>(value.tag.toLowerCase() == 'anonymization bounty')) &&
          (
            <View>
          <TextInput
            style={styles.ageInput}
            keyboardType={'numeric'}
            value={age}
            placeholder={t('Annotations.age')}
            placeholderTextColor={'#A9A9A9'}
            onChangeText={setAge}
          />
          <MultiSelect 
            hideTags
            hideSubmitButton
            hideDropdown        
            items={[
              {name: t('Annotations.male'), value:'Male'}, 
              {name: t('Annotations.female'), value: 'Female'}, 
              {name: t('Annotations.other'), value: 'Other'}]}
            uniqueKey="value"
            selectText={t('Annotations.gender')}
            displayKey="name"
            single={true}
            showFilter={false}
            canAddItems={false}
            selectedItems={gender}
            onSelectedItemsChange={(items)=>{ setGender(items) }}
            textInputProps={{
              editable:false
            }}
            searchInputPlaceholderText={t('Annotations.gender')}
            
            selectedItemTextColor={'#00A5FF'}
            styleMainWrapper={{
              marginTop: 10
            }}/>
            <Pressable
            style={styles.skinButton}
            onPress={()=>{
              setModalVisible(!modalVisible);
            }}>
            <Text style={{
              alignSelf: 'center'
            }} color={'#A9A9A9'}>{t('Annotations.skinColor')}</Text>
            <View
              style={{
                marginLeft: 10,
                backgroundColor: skinColor,
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderColor: '#ADADAD',
                borderWidth: 1
              }}>
              <Text>{skinColor}</Text>
            </View>
          </Pressable>
          {modalVisible && (
          <View
            style={styles.colorPickerView}>
            <ColorPicker
              // ref={r => { this.picker = r }}
              color={skinColor ? skinColor: '#FFFFFF'}
              swatchesOnly={false}
              onColorChange={(color)=>{
                console.log(color);
              }}
              onColorChangeComplete={(color)=>{
                setSkinColor(color)
                console.log(color);
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
          )}
        <Button 
        mode={'contained'}
        style={styles.button}
        onPress={()=>saveAnnotation(props)} >{t('Annotations.save')}</Button>
      </View>
      </ScrollView>
    </View>
  );
};

export default withTranslation()(Annotation);

