import {
  View, 
  Image,
  Dimensions, 
  Text
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import ImageZoom from 'react-native-image-pan-zoom';
import Svg, { Defs, Pattern, Rect, Path, G, Circle} from 'react-native-svg';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';
import {DragResizeBlock} from '../components/DragResizeBlock';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';

export const EDIT_MODE = {
  MODE_SWIPE: 0,
  MODE_AI: 1,
  MODE_ANNOTATE: 2,
};


const DrawingPan = (props) => {
  const {
      setAnnoRect = () => {},
      annoRect = [],
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
      editMode,
      mode,
      isAIEnabled = true,
    } = props || {};

  const [, dispatch] = useStateValue();
  const [cropPosition, setCropPosition] = useState({x:0, y:0});
  const [rectScale, setRectScale] = useState(1.0);
  const [zoomView, setZoomView] = useState(null);
  const [frameDimension, setFrameDimension] = useState({width: Dimensions.get('window').width - 50, height: 300});
  const [imageDimension, setImageDimension] = useState({width:0, height: 0});
  const [imageBlob, setImageBlob] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [imageRatio, setImageRatio] = useState(1.0);

  const canvasRef = useRef(null);
  const zoomViewRef = useRef(null);

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
    if(editMode != EDIT_MODE.MODE_ANNOTATE) return;
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

    const handleCentering = (imageWidth, imageHeight, cropWidth, cropHeight, rectScale)=>{
      const originalImageWidth = imageWidth;
      const originalImageHeight = imageHeight;
      const scaledImageWidth = originalImageWidth * rectScale;
      const scaledImageHeight = originalImageHeight * rectScale;
      const scaledCropWidth = cropWidth; // rectScale;
      const scaledCropHeight = cropHeight; // rectScale;
      
      const originX = (scaledImageWidth - scaledCropWidth) / 2;
      const originY = (scaledImageHeight - scaledCropHeight) / 2;
  
      const cropPosX = originX;
      const cropPosY = originY;
      
      setCropPosition({x: cropPosX / rectScale, y: cropPosY / rectScale});
      setRectScale(1.0);
    }

    const drawCanvas = (blob)=>{
      console.log('drawCanvas');
      if(canvas == null) return;
      const image = new CanvasImage(canvas);
      //const context = props.canvas.getContext('2d');
      image.src = blob;
      image.addEventListener('load', () => {
        //assume current drawingpan is landcape
        const width_ratio =  frameDimension.width / image.width;
        const height_ratio = frameDimension.height / image.height;
  
        var image_ratio = width_ratio;
  
        var inWidthBase = true;
        //the smaller is the base
        if(width_ratio < height_ratio){
          inWidthBase = true;
        }
        else {
          inWidthBase= false;
        }
        var width = Math.floor(frameDimension.width);
        var height = Math.floor(image.height * image_ratio);
  
        //props.canvas.width = image.width;
        //props.canvas.height = image.height;
        canvas.width = width;
        canvas.height = height;
  
        const context = canvas.getContext('2d');
        //context.setTransform(1, 0, 0, 1, 0, 0);
        context.drawImage(image, 0, 0, width, height);
        //context.scale(1, 1);
  
        zoomView.positionX = 0;
        zoomView.positionY = 0;
        //props.setFrameDimension({width: width, height: Dimensions.get('window').height *0.5});
        setImageDimension({width: width, height: height});
        setRectScale(1.0);
        setImageRatio(image_ratio);
        handleCentering(width, height, frameDimension.width, frameDimension.height, 1.0);
      });
    }


    useEffect(()=>{
      if(props.imageSource){
        drawCanvas(props.imageSource);
      }
    },
    [props.imageSource]);

    useEffect(()=>{
      console.log(mode);
      if(props.imageSource){
        drawCanvas(props.imageSource);
      }
    }, [mode]);

    useEffect(()=>{
      setCanvas(canvasRef.current);
    }, [canvasRef]);

    
  useEffect(()=>{
    setZoomView(zoomViewRef.current);
  }, [zoomViewRef]);
  
    useEffect(()=>{
    }, []);


  

  return (
      <View
        onLayout={(event) => {find_dimensions(props, event.nativeEvent.layout) }}
        style={styles.imageView}>
        <ImageZoom 
          ref={zoomViewRef}
          cropWidth={frameDimension.width}
          cropHeight={frameDimension.height}
          imageWidth={imageDimension.width}
          imageHeight={imageDimension.height}
          style={styles.imageZoom}
          enableCenterFocus={false}
          onMove={(position)=>{handleOnMove(props, position)}}
          onClick={(position)=>{handleOnClick(props, position)}}
        >
          <Canvas ref={canvasRef} style={{padding: 0, margin: 0}}/>

          {isAIEnabled && props.annoRect.filter(i=>i.isAI).map((rect, index)=>(
           <DragResizeBlock
             pointerEvents={editMode == EDIT_MODE.MODE_AI? 'auto' : 'none'}
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
                color: '#72B5CB',
                fontSize: 18,
                fontWeight: '700',
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
                    <Path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00000030" stroke-width="1"/>
                  </Pattern>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grid)" />
              </G>
              <G>
              {
                props.annoRect.filter(i=>!i.isAI).map((rect, index)=>(
                  
                    <Rect
                      key={'annoRect' + index}
                      x={(rect.x - cropPosition.x) * rectScale + 2}
                      y={(rect.y - cropPosition.y) * rectScale + 2}
                      width={rect.width * rectScale - 4}
                      height={rect.height * rectScale - 4}
                      fill="#FDD7CC80"
                      stroke="none"
                      strokeWidth="0"
                    />
                ))
              }
              </G>
           </Svg>
           
        </View>
      </View>
  );
};


DrawingPan.propTypes = {
  setAnnoRect: PropTypes.func,
  annoRect: PropTypes.array,
  imageSource: PropTypes.string,
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