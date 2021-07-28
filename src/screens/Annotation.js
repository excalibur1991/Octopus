import {
  View,
  Text, 
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions 
} from 'react-native';
import React, {useEffect, useState} from 'react';
//import MultiSelect from 'react-native-multiple-select'
import MultiSelect from '../components/Multiselect'

import {useStateValue} from '../services/State/State';

import {theme} from '../services/Common/theme';
import { Chip } from 'react-native-paper';

import {actions} from '../services/State/Reducer';
import {
    queryMetadata,
    getImageById,
    annotate
  } from '../services/API/APIManager';

import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas'
import {
  Button,
Divider,
Checkbox
} from 'react-native-paper';
import ImageZoom from 'react-native-image-pan-zoom';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Svg, {Line, Defs, Pattern, Rect, Path} from 'react-native-svg';

const initial_bounties = [
  {tag: 'anonymization bounty', desc: 'Anonymization Bounty (photos of faces)', checked: false, disabled: false},
  {tag: 'food bounty', desc: 'Food Bounty', checked: false, disabled: false},
  {tag: 'project.bb bounty', desc: 'project.bb bounty(cigarette butt on the beach)', checked: false, disabled: false},
  {tag: 'nft+art bounty', desc: 'NFT Bounty(photos of NFTs)', checked: false, disabled: false},
  {tag: 'traffic sign bounty', desc: 'Traffiic Sign Bounty', checked: false, disabled: false},
  {tag: 'meme bounty', desc: 'Meme Bounty', checked: false, disabled: false},
  {tag: 'product bounty', desc: 'Product Bounty(photos of products)', checked: false, disabled: false},
  {tag: 'ocr bounty', desc: 'OCR Bounty(photos with text in them)', checked: false, disabled: false},
  {tag: 'biometric', desc: 'This image contains biometric information.', checked: false, disabled: false},
  {tag: 'PII - faces', desc: 'This image contains PII of faces.', checked: false, disabled: false},
  {tag: 'PII - non faces',desc: 'This image contains PII  of non-faces.', checked: false, disabled: false},
  {tag: 'Copyright', desc: 'Copyright', checked: false, disabled: false},
];

const init_rect = {width:30, height: 30, x:0, y:0, ratioX: 1, ratioY: 1};
const rectWidth = 30;
const rectHeight = 30;

const Annotation = () => {
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

  const [annoRect, setAnnoRect] = useState([]);
  const [curTag, setCurTag] = useState("");
  const [rectScale, setRectScale] = useState(1.0);
  const [zoomView,setZoomView] = useState(null);
  const [cropPosition, setCropPosition] = useState({x:0, y:0});

  useEffect(() => {
    setCurImageIndex(0);
  }, []);


  useEffect(()=>{
    //fetchMetadata();
  }, [curPage]);

  useEffect(()=>{
    console.log(curImageIndex);
    updateMetadata();
  }, 
  [curImageIndex]);

  useEffect(()=>{
    //curindex metadata handling
  },
  [curMetadata]);

  useEffect(()=>{
    //drawImage();
  },
  [imageBlob]);

  const init_variables = ()=>{
    setCropPosition({x: 0, y: 0});
    setRectScale(1.0);
    setCurTag("");
    setAnnoRect([]);
    setSelectedBounties([]);

    if (zoomView){
      zoomView.reset();
      console.log('zoomView.resetScale();');
    }


  };


 
  const updateMetadata = async ()=>{
    var arr = [];
    if(curImageIndex>= metadata.length){
      arr = await fetchMetadata();
    }else{
      arr = metadata;
    }
    console.log(arr.length);
    if(curImageIndex < arr.length ){
      const _metadata = arr[curImageIndex];
      setCurMetadata(_metadata);
      var _annotationTags = [];
      var _bounties = [];
      _metadata.tag_data.map((value)=>{
        const found = initial_bounties.find((bounty)=>(bounty.tag == value));
        if(found){
          _bounties.push({tag: value, checked: false, disabled: false});
        }else{
          _annotationTags.push({tag: value, checked: false, disabled: false});
        }
      });

      setAnnotationTags(_annotationTags);
      setBounties(_bounties);
      init_variables();
    }
    const image_id = arr[curImageIndex].image_id;
    await getImage(image_id);
  };

  const fetchMetadata = async ()=>{
    try {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: true,
      });
      const response = await queryMetadata(curPage);
      if(response && response.result && response.result.length > 0) {
        setMaxPage(response.pageSize);
        // imagees exists then add these
        //actually this not works properly
        var arr = [...metadata, ...response.result];
        setMetadata(arr);
        return arr;
      }
    }catch(err){
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
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: false,
      });
    }
    return [];
  }

  const  getImage = async (image_id)=>{
    const result = await getImageById (image_id);
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(result);
    fileReaderInstance.onload = () => {
      setImageBlob(fileReaderInstance.result);
    };
  };


  const handleBountySelection = (items)=>{
    annotationTags.map((value,index)=>{
      value.checked = false;
    });
    setSelectedBounties(items);
    if(items.length > 0){
      setCurTag(items[0].tag);
    }
  };

  const saveAnnotation = async ()=>{
    //save annotation
    if(curImageIndex >= metadata.length) return;

    const image_id = curMetadata.image_id;

    var _rects = [];
    annoRect.map((value)=>{
      //should change the scale issue
      _rects.push(value);

    })

    const response = await annotate({image_id: image_id, annotations: _rects});

    setCurImageIndex((curImageIndex+1));
  };



  const find_dimesions = (layout)=> {
    const {x, y, width, height} = layout;
    setFrameDimension({width: width, height: height});
  };



  const handleOnMove = (position)=>{
    //onPanResponderRelease
    const originalImageWidth = zoomView.props.imageWidth;
    const originalImageHeight = zoomView.props.imageHeight;
    const cropWidth = zoomView.props.cropWidth;
    const cropHeight = zoomView.props.cropHeight;
    const scaledImageWidth = originalImageWidth * rectScale;
    const scaledImageHeight = originalImageHeight * rectScale;
    const scaledCropWidth = cropWidth // rectScale;
    const scaledCropHeight = cropHeight // rectScale;

    const positionX = position.positionX * rectScale;
    const positionY = position.positionY * rectScale;
    const originX = (scaledImageWidth - scaledCropWidth) / 2;
    const originY = (scaledImageHeight - scaledCropHeight) / 2;

    const cropPosX = originX - positionX;
    const cropPosY = originY - positionY;
    
    setCropPosition({x: cropPosX / rectScale, y: cropPosY / rectScale});
    setRectScale(position.scale);
  }

  const intersect = (x,y,width, height, ptX,ptY)=>{
    if((ptX >= x && ptX <= (x + width)) 
    &&(ptY >= y && ptY <= (y + height))) {
      return true;
    }
    return false;
  };

  const handleOnClick = (position)=>{
    if(curTag == "") return;
    var found = false;
    var _rect = [];
    const origLocX = position.locationX;
    const origLocY = position.locationY;
    const _rectX = origLocX , _rectY = origLocY, _rectWidth = rectWidth / rectScale, _rectHeight = rectHeight / rectScale;
    console.log('position', position, rectScale);
    console.log('origLocX',cropPosition,  origLocX, origLocY);
    console.log(_rectX, _rectY, _rectWidth, _rectHeight);

    const blockX = Math.floor((origLocX) / _rectWidth) * _rectWidth + cropPosition.x % _rectWidth;
    const blockY = Math.floor((origLocY) / _rectWidth) * _rectHeight + cropPosition.y % _rectWidth;


    annoRect.map((value, index)=>{
      if(value.tag == curTag) {
        if(intersect(value.x, value.y, value.width, value.height, _rectX, _rectY)){
          //found
          found = true
        }else{
          _rect.push(value);
        }
      }else{
        _rect.push(value);
      }
    });

    if(found == false){
      _rect.push({tag: curTag, type: 'box', x: blockX, y: blockY, width: _rectWidth, height: _rectHeight});
    }

    setAnnoRect(_rect);

  };

  const handlePressAnnoTag = (_annoTag)=>{
    setSelectedBounties([]);

    if(_annoTag.checked){
      setCurTag("");
    }else{
      setCurTag(_annoTag.tag);
    }

    var _tags = [];
    annotationTags.map((value,index)=>{
      if(_annoTag.tag == value.tag){
        value.checked = !_annoTag.checked;
      }else{
        value.checked = false;
      }
      _tags.push(value);
    });

    console.log(_annoTag.checked);
    setAnnotationTags(_tags);
  }

  
  return (
    <View style={styles.container}>
      <View style={{width: '100%', flexDirection: 'column', flex: 1}}>
        <MultiSelect 
          hideTags
          hideSubmitButton
          hideDropdown        
          items={bounties}
          uniqueKey="tag"
          selectText="Bounty"
          displayKey="tag"
          single={true}
          showFilter={false}
          canAddItems={false}
          selectedItems={selectedBounties}
          onSelectedItemsChange={(items)=>{handleBountySelection(items) }}
          textInputProps={{
            editable:false
          }}
          searchInputPlaceholderText={bountyPlaceholder}
          selectedItemTextColor={'#00A5FF'}
          styleDropdownMenu={{
            height:56,
          }}
          styleDropdownMenuSubsection={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#DADADA',
            paddingLeft: 10
          }}
          styleInputGroup={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#DADADA',
            paddingLeft: 10
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#DADADA',
            paddingHorizontal: 14,
            paddingVertical: 10
          }}
        >
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
              onPress={()=>{handlePressAnnoTag(annoTag)}}
              selected={annoTag.checked}
              closeIconAccessibilityLabel={'Close'}
              onClose={()=>{console.log('onClose')}}
              >{annoTag.tag}</Chip>
          ))
        }
        </View>
        <View
          onLayout={(event) => {find_dimesions(event.nativeEvent.layout) }}
          style={{
          marginTop: 10,
          width: '100%',
          flex: 0.8
        }}>
          <ImageZoom 
          ref={(view)=>{setZoomView(view)}}
            cropWidth={frameDimension.width}
            cropHeight={frameDimension.height}
            imageWidth={frameDimension.width}
            imageHeight={frameDimension.height}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 8,
              borderColor: '#DADADA',
              borderWidth: 1
              }}
              onMove={(position)=>{handleOnMove(position)}}
              onClick={(position)=>{handleOnClick(position)}}
            >
            <Image
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black'
            }}
            source={{uri:imageBlob}}
            />
            
          </ImageZoom>
          {(curTag != "") &&
          <Svg 
          width={'100%'} 
          height={'100%'}
          style={{
            position: "absolute",  
            left: 0,
            top: 0,
            width: rectWidth,
            height: rectHeight,
            }} pointerEvents={'box-none'}
          >
            <Defs>
              <Pattern id="grid" width={rectWidth} height={rectHeight} patternUnits="userSpaceOnUse">
                <Path d="M 30 0 L 0 0 0 30" fill="none" stroke="gray" stroke-width="1"/>
              </Pattern>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grid)" />
          </Svg>
          }

          <Svg
          width={'100%'}
          height={'100%'}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
          }}
          pointerEvents={'box-none'}
          >
            {
              annoRect.filter((_rect)=>(_rect.tag == curTag)).map((rect,index)=>(
                <Rect
                key={index}
                x={(rect.x - cropPosition.x) * rectScale}
                y={(rect.y - cropPosition.y) * rectScale}
                width={rect.width * rectScale}
                height={rect.height * rectScale}
                fill="#ff000030"
                stroke="none"
                strokeWidth="0"
              />
              ))
            }
          </Svg>
        </View>
        <Button 
        mode={'contained'}
        style={{
          width: '100%',
          backgroundColor: '#4E9CF9',
          borderRadius: 16,
          marginTop: 20
        }}
        onPress={saveAnnotation} >Save</Button>
      </View>
    </View>
  );
};
export default Annotation;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: '2%',
      paddingTop: '5%',
      paddingHorizontal: 25,
      alignItems: 'center',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: theme.COLORS.WHITE,
    },
});
