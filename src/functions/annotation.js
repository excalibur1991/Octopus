
import {actions} from '../services/State/Reducer';
import {
    queryMetadata,
    getImageById,
    annotate
  } from '../services/API/APIManager';

 import i18n from '../languages/i18n';

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
        console.log(err);
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
        console.log(err);
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
    };
  };

  
  //bounty selection handler
  export const handleBountySelection = (props, items)=>{
    props.annotationTags.map((value,index)=>{
      value.checked = false;
    });
    console.log(items);
    props.setSelectedBounties(items);
    if(items.length > 0){
        props.setCurTag(items[0]);
    }
  };

  
  // save annotation handler
  export const saveAnnotation = async (props)=>{
    //save annotation
    if(props.curImageIndex >= props.metadata.length) return;

    const image_id = props.curMetadata.image_id;
    const originalImageWidth = props.zoomView.props.imageWidth;
    const originalImageHeight = props.zoomView.props.imageHeight;

    var _rects = [];
    props.annoRect.map((value)=>{
      //should change the scale issue
      _rects.push({type: 'box', 
        tag: value.tag, 
        x: (value.x / originalImageWidth), 
        y: (value.y / originalImageHeight), 
        width: (value.width / originalImageWidth),
        height: (value.height / originalImageHeight)
      });
    });

    const response = await annotate({image_id: image_id, annotations: _rects});
    
    props.setCurImageIndex((props.curImageIndex+1));
  };

  
  export const find_dimesions = (props, layout)=> {
    const {x, y, width, height} = layout;
    props.setFrameDimension({width: width, height: height});
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

  export const handleOnClick = (props, position)=>{
    if(props.curTag == "") return;
    var found = false;
    var _rect = [];
    const origLocX = position.locationX;
    const origLocY = position.locationY;
    const _rectX = origLocX , _rectY = origLocY, _rectWidth = rectWidth / props.rectScale, _rectHeight = rectHeight / props.rectScale;
   

    const blockX = Math.floor((origLocX) / _rectWidth) * _rectWidth + props.cropPosition.x % _rectWidth;
    const blockY = Math.floor((origLocY) / _rectWidth) * _rectHeight + props.cropPosition.y % _rectWidth;


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
  }
