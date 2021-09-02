
import {actions} from '../services/State/Reducer';
import {
    queryMetadata,
    getImageById,
    annotate
  } from '../services/API/APIManager';

 import i18n from '../languages/i18n';
import { block } from 'react-native-reanimated';
import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';

import groupBy from 'lodash.groupby'

 export const initial_bounties = [
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
  
  export const rectWidth = 30;
  export const rectHeight = 30;
  //init states when new metadata loads
  export const init_variables = (props)=>{
    props.setCropPosition({x: 0, y: 0});
    props.setRectScale(1.0);
    props.setCurTag("");
    props.setAnnoRect([]);
    props.setAnnoDot([]);
    props.setSelectedBounties([]);

    if (props.zoomView){
        props.zoomView.reset();
    }
  };

  
  export const updateMetadata = async (props)=>{
    try{

        var arr = [];
        //if metadata queue has no element, fetch metadata
        if(props.curImageIndex>= props.metadata.length){
            arr = await fetchMetadata(props);
        }else{
            arr = props.metadata;
        }
    
        if(props.curImageIndex < arr.length ){
            const _metadata = arr[props.curImageIndex];
            props.setCurMetadata(_metadata);
            var _annotationTags = [];
            var _bounties = [];
            _metadata.tag_data.map((value)=>{
                const found = initial_bounties.find((bounty)=>(bounty.desc.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1));
                if(found){
                _bounties.push({tag: value, checked: false, disabled: false});
                }else{
                _annotationTags.push({tag: value, checked: false, disabled: false});
                }
            });

            props.setAnnotationTags(_annotationTags);
            props.setBounties(_bounties);
            init_variables(props);
            const image_id = arr[props.curImageIndex].image_id;
            await getImage(props, image_id);
        }
    } catch(err){
    }

  };

  
  //fetch metadata api
  export const fetchMetadata = async (props)=>{
    try {
      props.dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: true,
      });
      const response = await queryMetadata(props.curPage);
      if(response && response.result && response.result.length > 0) {
        props.setMaxPage(response.pageSize);
        // imagees exists then add these
        //actually this not works properly
        var arr = [...props.metadata, ...response.result];
        props.setMetadata(arr);
        return arr;
      }
    }catch(err){
        props.dispatch({
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
        props.dispatch({
            type: actions.SET_PROGRESS_SETTINGS,
            show: false,
        });
    }
    return [];
  }

  
  //load Image api call
  export const  getImage = async (props, image_id)=>{
    const result = await getImageById (image_id);
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(result);
    fileReaderInstance.onload = () => {
      props.setImageBlob(fileReaderInstance.result);
      //drawCanvas(props, fileReaderInstance.result);
    };
  };

  
  //bounty selection handler
  export const handleBountySelection = (props, items)=>{
    props.annotationTags.map((value,index)=>{
      value.checked = false;
    });
    props.setSelectedBounties(items);
    props.setEyeDrop(false);
    if(items.length > 0){
        props.setCurTag(items[0]);
        if(items[0].toLocaleLowerCase() == 'anonymization bounty'){
          props.setIsAnonymization(true);
        }else{
          props.setIsAnonymization(false);
        }
    }
  };

  
  // save annotation handler
  export const saveAnnotation = async (props)=>{
    //save annotation
    if(props.curImageIndex >= props.metadata.length) return;

    props.dispatch({
      type: actions.SET_PROGRESS_SETTINGS,
      show: true,
    });

    const image_id = props.curMetadata.image_id;
    const originalImageWidth = props.zoomView.props.imageWidth;
    const originalImageHeight = props.zoomView.props.imageHeight;
    const optBlocks = optimizeBlocks(props.annoRect);

    var _rects = [];
    //props.annoRect.map((value)=>{
    optBlocks.map((value)=>{  
    //should change the scale issue
      _rects.push({type: 'box', 
        tag: value.tag, 
        x: (value.x / originalImageWidth), 
        y: (value.y / originalImageHeight), 
        width: (value.width / originalImageWidth),
        height: (value.height / originalImageHeight)
      });
    });
    
    props.annoDot.map((value)=>{
      var _dots = [];
      value.dots.map((dot)=>{
        //_dots.push({x: (dot.x / originalImageWidth), y: (dot.y / originalImageHeight)});
        _dots.push({x: (dot.x), y: (dot.y)});
      });
      _rects.push({
        type: 'dots',
        tag: value.tag,
        dots: _dots
      });
    });

    const response = await annotate({image_id: image_id, annotations: _rects});
    
    props.setCurImageIndex((props.curImageIndex+1));
    props.dispatch({
      type: actions.SET_PROGRESS_SETTINGS,
      show: false,
    });
  };

  
  export const find_dimesions = (props, layout)=> {
    const {x, y, width, height} = layout;
    props.setFrameDimension({width: width, height: height});
    props.setImageDimension({width:width, height: height});
  };



  //image onMove
  export const handleOnMove = (props, position)=>{
    //onPanResponderRelease
    const originalImageWidth = props.zoomView.props.imageWidth;
    const originalImageHeight = props.zoomView.props.imageHeight;
    const cropWidth = props.zoomView.props.cropWidth;
    const cropHeight = props.zoomView.props.cropHeight;
    const scaledImageWidth = originalImageWidth * props.rectScale;
    const scaledImageHeight = originalImageHeight * props.rectScale;
    const scaledCropWidth = cropWidth // rectScale;
    const scaledCropHeight = cropHeight // rectScale;

    const positionX = position.positionX * props.rectScale;
    const positionY = position.positionY * props.rectScale;
    const originX = (scaledImageWidth - scaledCropWidth) / 2;
    const originY = (scaledImageHeight - scaledCropHeight) / 2;

    const cropPosX = originX - positionX;
    const cropPosY = originY - positionY;
    
    props.setCropPosition({x: cropPosX / props.rectScale, y: cropPosY / props.rectScale});
    props.setRectScale(position.scale);
  };

  
  export const intersect = (x,y,width, height, ptX,ptY)=>{
    if((ptX >= x && ptX <= (x + width)) 
    &&(ptY >= y && ptY <= (y + height))) {
      return true;
    }
    return false;
  };

  export const intersectCircle = (x, y, ptX, ptY, r=3)=>{
    return (Math.sqrt((x-ptX) * (x-ptX)  + (y - ptY) * (y - ptY)) < r)
  }

  export const sameDot = (x, y, ptX, ptY)=>{
    if(x == ptX && y == ptY){
      return true;
    }
    return false;
  };

  export const handleOnClick = (props, position)=>{
    if(props.curTag == "") return;

    var found = false;
    var _rect = [];
    const origLocX = Math.floor(position.locationX);
    const origLocY = Math.floor(position.locationY);
    const _rectX = origLocX , _rectY = origLocY, _rectWidth = rectWidth / props.rectScale, _rectHeight = rectHeight / props.rectScale;
   

    //const blockX = Math.floor((origLocX) / _rectWidth) * _rectWidth + ((origLocX-props.cropPosition.x) % _rectWidth);
    //const blockY = Math.floor((origLocY) / _rectHeight) * _rectHeight + ((origLocY- props.cropPosition.y) % _rectHeight);

    const blockX = props.cropPosition.x + Math.floor((origLocX-props.cropPosition.x) / _rectWidth) * _rectWidth;
    const blockY = props.cropPosition.y + Math.floor((origLocY-props.cropPosition.y) / _rectHeight) * _rectHeight;

    if(props.isEyeDrop){
      console.log(position, props.imageRatio);
      getImageColor(props, position.locationX / props.imageRatio, position.locationY / props.imageRatio);
      return;
    }

    if(props.curAnnoMode == 'box'){
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

    }else if(props.curAnnoMode == 'dots') {
      //find tag
      var hasTag = props.annoDot.find((value)=>(value.tag == props.curTag));
      if(hasTag){
        props.annoDot.map((value, index)=>{
          if(value.tag == props.curTag){
            var foundedItem = value.dots.find((dot)=>(intersectCircle(dot.x, dot.y, _rectX, _rectY)));
            if(foundedItem){
              var remained_dots = value.dots.filter((dot)=>(!intersectCircle(dot.x, dot.y, _rectX, _rectY)));
              _rect.push({tag: value.tag, type: 'dots', dots: remained_dots});
            }else{
              _rect.push({tag: value.tag, type: 'dots', dots: [...value.dots, {x: _rectX, y: _rectY}]});
            }
          }else{
            //org value
            _rect.push(value);
          }
        })
      }else{
        _rect.push({tag: props.curTag, type: 'dots', dots: [{x: _rectX, y: _rectY}]});
      }

      props.setAnnoDot(_rect);
    }
  };

  
  export const handlePressAnnoTag = (props, _annoTag)=>{
    props.setSelectedBounties([]);

    if(_annoTag.checked){
        props.setCurTag("");
    }else{
        props.setCurTag(_annoTag.tag);
    }

    var _tags = [];
    props.annotationTags.map((value,index)=>{
      if(_annoTag.tag == value.tag){
        value.checked = !_annoTag.checked;
      }else{
        value.checked = false;
      }
      _tags.push(value);
    });
    props.setAnnotationTags(_tags);
  };

  const isOverlaps = (x,y, width, height, x2, y2, width2, height2) => {
    if(( x < x2 + width2) &&
      (y < y2 + height2) &&
      (x2 < x + width) &&
      (y2 < y + height)) 
      return true;
    return false;
  }

  const get_box_size = (curblock, blocks)=>{
    const {x, y, width, height} = curblock;
    //filterout same blocks
    const t_blocks = blocks.filter((block)=>block.width == width && block.height == height)

    //find width
    var max_width = 1
    while(true){
      const found = t_blocks.find((block)=>{
        return isOverlaps(x+max_width*width, y, width, height,
          block.x, block.y, block.width, block.height
          )
      })

      if(found) {max_width++;}
      else break;
    }
    
    //find max_height
    var max_height = 1
    var stop = false
    while(true){

      for(var i = 0; i < max_width; i++) {
        const found = t_blocks.find((block)=>isOverlaps(
          x + i*width, y + max_height * height, width, height,
          block.x, block.y, block.width, block.height
        ))

        if (!found){
          stop = true;
          break;
        } 
      }

      if(!stop){
        max_height++;
      }
      else break;
    }
    //find height
    return {max_width, max_height}
  };

  export const optimizeBlocks = (blocks)=>{
    //group by tag
    var optBlocks = [];
    const tag_group = groupBy(blocks, (block)=>(block.tag));
    const tag_keys = Object.keys(tag_group);

    tag_keys.map((tag_key)=>{
      var _blocks = [];
          //group by width| hieght
      const group = groupBy(tag_group[tag_key], (block)=>(block.width));
      //retrieve rect size
      const group_keys = Object.keys(group);
      
      group_keys.map((key)=>{
        const grouped_blocks = group[key];
        var blocks_per_width = [];
        grouped_blocks.map((block)=>{
          const {max_width, max_height} = get_box_size(block, grouped_blocks);
          //add lists
          blocks_per_width.push({
            x: block.x,
            y: block.y,
            type: 'box',
            tag: block.tag,
            width: max_width * block.width, 
            height: max_height * block.height});
        });
        //sort rect by area size
        blocks_per_width.sort((b1, b2)=>(b2.width * b2.height - b1.width * b1.height));
        if(blocks_per_width.length > 0){
          _blocks.push(blocks_per_width[0]);
        }
        //filter out overlaps
        blocks_per_width.map((block, index)=>{

          const found = _blocks.find((t_block, t_index)=>{
            //skip self compare
            return isOverlaps(block.x, block.y, block.width, block.height, t_block.x, t_block.y, t_block.width, t_block.height)
          })

          if(!found){
            //final block
            _blocks.push(block);
          }
        });
        optBlocks = [..._blocks];
      });

    });
    return optBlocks;
  };


  
  const rgbToHex = (r, g, b)=> {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  export const getImageColor = (props, x, y)=>{
    const context = props.canvas.getContext('2d');
    context.getImageData(x, y, 1, 1).then(
      (imageData)=>{
        if(imageData){
          const p = imageData.data;
          var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
          props.setSkinColor(hex);  
        }
      }
    );
  }

  export const drawCanvas = (props, blob)=>{
    if(props.canvas == null) return;
    const image = new CanvasImage(props.canvas);
    const context = props.canvas.getContext('2d');
    image.src = blob;
    image.addEventListener('load', () => {
      //assume current drawingpan is landcape
      const width_ratio =  props.frameDimension.width/image.width;
      var image_ratio = width_ratio;
      var width = props.frameDimension.width;
      var height = image.height * image_ratio;
      props.canvas.width = width;
      props.canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
      props.setFrameDimension({width: width, height: height});
      props.setImageRatio(image_ratio);
    });
  }

