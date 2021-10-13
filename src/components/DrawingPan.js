import {
    View, 
    Image, 
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

const DrawingPan = (props) => {
    const {
        setAnnoRect = () => {},
        annoRect = [],
        annoDot = [],
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
        curTag = '',
      } = props || {};

    const [, dispatch] = useStateValue();
    const [cropPosition, setCropPosition] = useState({x:0, y:0});
    const [rectScale, setRectScale] = useState(1.0);
    const [zoomView, setZoomView] = useState(null);
    const [frameDimension, setFrameDimension] = useState({width: 400, height: 300});
    const [canvas, setCanvas]= useState(null);

    const canvasRef = useRef(null);


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

      
  const rgbToHex = (r, g, b)=> {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  const getImageColor = (x, y)=>{
    const context = canvas.getContext('2d');
    context.getImageData(x, y, 1, 1).then(
      (imageData)=>{
        if(imageData){
          const p = imageData.data;
          var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
          setSkinColor(hex);  
        }
      }
    );
  }

  const drawCanvas = (blob)=>{
    if(canvas == null) return;
    const image = new CanvasImage(canvas);
    const context = canvas.getContext('2d');
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
      var width = frameDimension.width;
      var height = image.height * image_ratio;
      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
      setFrameDimension({width: width, height: height});
      setImageDimension({width: width, height: height});
      setImageRatio(image_ratio);
    });
  }

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
    
      useEffect(()=>{
        setCanvas(canvasRef.current);
      }, [canvasRef]);

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
            <Canvas ref={canvasRef} />
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
                <G>
                {
                  annoRect.map((rect,index)=>(
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
                  annoDot.map((rect, index)=>(
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
    curTag: PropTypes.string,
    annoDot: PropTypes.array,
};
  
export default DrawingPan;


export const styles = StyleSheet.create({
   
    imageView: {
      width: '100%',
      aspectRatio: 1.2,
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