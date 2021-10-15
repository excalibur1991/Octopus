import {
  View, 
  Image,
  Dimensions, 
  Text
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageZoom from 'react-native-image-pan-zoom';
import Svg, { Defs, Pattern, Rect, Path, G, Circle} from 'react-native-svg';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';
import {DragResizeBlock} from '../components/DragResizeBlock';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';

const DrawingPan = (props) => {
  const {
      setAnnoRect = () => {},
      annoRect = [],
      imageSource ={},
      rectHeight = 30,
      rectWidth = 30,
      onLongPressRect=()=>{},
      onResizeEnd=()=>{},
      onDragEnd=()=>{},
      onAddRect=()=>{},
      onDeleteRect=()=>{},
      onSelectRect=()=>{},
      curRectIndex = -1,
      setCurRectIndex= ()=>{},
      imageWidth = 0,
      imageHeight = 0,
    } = props || {};

  const [, dispatch] = useStateValue();
  const [cropPosition, setCropPosition] = useState({x:0, y:0});
  const [rectScale, setRectScale] = useState(1.0);
  const [zoomView, setZoomView] = useState(null);
  const [frameDimension, setFrameDimension] = useState({width: 400, height: 300});
  const [imageDimension, setImageDimension] = useState({width:0, height: 0});


  const find_dimensions = (props, layout)=> {
      const {x, y, width, height} = layout;
      setFrameDimension({width: width, height: height});
  };

  const intersect = (x,y,width, height, ptX,ptY)=>{
      if((ptX >= x && ptX <= (x + width)) 
      &&(ptY >= y && ptY <= (y + height))) {
        return true;
      }
      return false;
    };

  const handleOnClick = (props, position)=>{
      var found = false;
      var _rect = [];
      const origLocX = Math.floor(position.locationX);
      const origLocY = Math.floor(position.locationY);
      const _rectX = origLocX , _rectY = origLocY, _rectWidth = rectWidth / rectScale, _rectHeight = rectHeight / rectScale;
      
      const blockX = cropPosition.x + Math.floor((origLocX-cropPosition.x) / _rectWidth) * _rectWidth;
      const blockY = cropPosition.y + Math.floor((origLocY-cropPosition.y) / _rectHeight) * _rectHeight;
  
      props.annoRect.map((value, index)=>{
      if(value.tag == props.curTag) {
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
      _rect.push({tag: props.curTag, type: 'box', x: blockX, y: blockY, width: _rectWidth, height: _rectHeight});
      }
      props.setAnnoRect(_rect);
      if(found == false){
        props.setCurRectIndex(_rect.length - 1);
      }
  };

  const handleOnMove = (props, position)=>{
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
    };

    const handleRectMove = (event, index)=>{

      let rects = [...props.annoRect];
      rects.map((rect, rectIndex)=>{
        if(rectIndex == index){
          rects[rectIndex].x=event[0];
          rects[rectIndex].y=event[1];
          rects[rectIndex].width = event[2];
          rects[rectIndex].height = event[3];
        }
      });
      props.setAnnoRect(rects);
      props.setCurRectIndex(index);
    };
  

    useEffect(()=>{
      console.log(props.annoRect);
    }, []);

    const removeRect = (index)=>{
      let rects = [];
      props.annoRect.map((rect, rectIndex)=>{
        if(rectIndex != index){
          rects.push(rect);
        }
      })
      props.setAnnoRect(rects);
      props.setCurRectIndex(-1);
    }
  

  return (
      <View
        onLayout={(event) => {find_dimensions(props, event.nativeEvent.layout) }}
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
          source={props.imageSource}
          />

          {props.annoRect.map((rect, index)=>(
           <DragResizeBlock
            key={'annoRect' + index}
            index={index}
            curRectIndex={props.curRectIndex}
            x={(rect.x - cropPosition.x) * rectScale}
            y={(rect.y - cropPosition.y) * rectScale}
            w={rect.width * rectScale}
            h={rect.height * rectScale}
            onPress={(event)=>{console.log(event)}}
            onLongPress={(event)=>{
              if(props.onLongPressRect){
                //delete operation
                props.onLongPressRect(event, index);
              }}
            }
            onResizeEnd={(event)=>{
              handleRectMove(event, index);
            }}
            onDragEnd={(event)=>{
              handleRectMove(event, index);
            }}
            onClose={(event)=>{
              //if(props.onClose){
              //  props.onClose(event, index);
              //}
              dispatch({
                type: actions.SET_ALERT_SETTINGS,
                alertSettings: {
                  show: true,
                  type: 'alert',
                  tile: 'Notice',
                  message: 'Do you really delete this bounding box?',
                  showConfirmButton: true,
                  confirmText: 'Ok',
                  onConfirmPressed: ()=>{
                    removeRect(index);
                  }
                }
              });
        
            }}
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
              right: -25,
              bottom: -10,
            }}>AI</Text>
           }
           
          </DragResizeBlock>
          ))}
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
              <G>
                <Defs>
                  <Pattern id="grid" width={rectWidth} height={rectHeight} patternUnits="userSpaceOnUse">
                    <Path d="M 30 0 L 0 0 0 30" fill="none" stroke="gray" stroke-width="1"/>
                  </Pattern>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grid)" />
              </G>
           </Svg>
           
          </View>
      </View>
  );
};


DrawingPan.propTypes = {
  setAnnoRect: PropTypes.func,
  annoRect: PropTypes.array,
  imageSource: PropTypes.object,
  rectHeight: PropTypes.number,
  rectWidth: PropTypes.number,
  onLongPressRect: PropTypes.func,
  onResizeEnd: PropTypes.func,
  onDragEnd: PropTypes.func,
  curRectIndex: PropTypes.number,
  setCurRectIndex: PropTypes.func,
};

export default DrawingPan;


export const styles = StyleSheet.create({
 
  imageView: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.5
  },
  imageZoom: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#DADADA',
    borderWidth: 1,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  svgStyle:{
    position: "absolute",  
    left: 0,
    top: 0,
    
  },
  svgRect: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  overlay: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
  }
});