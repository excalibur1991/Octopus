import {
    View, 
    Image,
    Text,
    StyleSheet,
    ScrollView,
    Keyboard,
    TextInput,
    TouchableHighlightBase,
    KeyboardAvoidingView
} from 'react-native';
import {theme} from '../services/Common/theme';
import React, {useEffect, useState} from 'react';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import {
    queryMetadata,
    getImageById,
    reportImages,
    verifyImage
  } from '../services/API/APIManager';
import SwipeCards from 'react-native-swipe-cards';
import { Chip, IconButton, Button } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';

//CardView
export const InCard = (props) => {
  useEffect( () => {
  }, []);

  const findImage = (props) => {
    var card = null;
    props.images.map((data)=>{
      if(data.image_id == props.image_id){
        card = data;
      }
    })
    return card ? {uri:card.image} : require('../assets/top_image.png')
  }

  return (
    <View style={styles.card}>
      <Image 
        style={styles.thumbnail}
        source={ 
          findImage(props)
        } />
    </View>
    );
};


export const NoMoreCards = (props) => {
  useEffect(()=>{

  }, []);

  return (
    <View style={styles.card}>
      <Text>No more Images.</Text>
    </View>
  );

};

const cardImageArray = [];

const VeriPage = (props) => {

    const [checked, setChecked] = useState(false);

    const [images, setImages] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
   // const [mainImage, setMainImage] = useState(null);

    const [cutoutImage, setCutoutImage] = useState(null);
    const [, dispatch] = useStateValue();
    const [cards, setCards] = useState([]);
    const [cardImages, setCardImages] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [mainImage, setMainImage] = useState(null);

    //{"descriptions":["Waves in the baltic sea"],
    // "image_id":"fffffff81e1c0000",
    //"tag_data":["wave","waves","blue","sea","water","ocean"]}
    const [metadata, setMetadata] = useState({});
    const [imageId, setImageId] = useState("");
    //reserve aannotation
    const [annotations, setAnnotations] = useState({});
    const [annoDescription, setAnnoDescription] = useState("");
    const [annoTags, setAnnoTags] = useState([]);
    
    //verification: 
    //    descriptions: {up_votes: ["red motorbike in front of a building"], down_votes: []},
    //    tags: {up_votes: ["purple", "flower"], down_votes: ["green"]}
    //verification
    const [descriptions, setDescriptions] = useState([]);
    const [downDescriptions, setDownDescriptions] = useState([]);

    const [tags, setTags] = useState([]);
    const [downTags, setDownTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");

    const [annotationTags, setAnnotationTags] = useState([]);

    const [textEditor,setTextEditor] = useState(null);

    const [editorType, setEditorType] = useState(""); //annotation | verification

    const [bEditEnabled, setBEditEnabled] = useState(false);
    const [tagEditValue, setTagEditValue] = useState("");
    const [tagEditIndex, setTagEditindexx] = useState(0);



    //update metadata for currentIndex
    const updateMetadata = async(cardArray, curIndex) => {
      try{
        if(cardArray.length <= curIndex){
          setMetadata({});
          setImageId("");
          setDescriptions([]);
          setTags([]);
          setDownTags([]);
          setDownDescriptions([]);
          setSelectedTag("");
        }else {
          const metadata = cardArray[curIndex];
          console.log(JSON.stringify(metadata));
          setMetadata(metadata);
          setImageId(metadata.image_id);
          setDescriptions(metadata.descriptions);
          setTags(metadata.tag_data);
          setDownTags([]);
          setDownDescriptions([]);
          setSelectedTag("");
        }

        setAnnotationTags([]);
        setBEditEnabled(false);
        setTagEditindexx(0);

      }
      catch(err){
        console.log(err)
      }

    }

    const updateImages = async (cardArray, curIndex, idx) => {
      try{
        //if (cards.length <= currentIndex) break;
        if(cardArray.length <= curIndex + idx) return;



        const image_id = cardArray[curIndex + idx].image_id;
        var found = false;
        cardImageArray.map((value,index)=>{
          if(value.image_id === image_id) found = true;
        })
        console.log(cardImageArray.length, found, currentIndex, (currentIndex + idx));
        if(found) {
          if(idx < 2 ){
            updateImages(cardArray, curIndex, ++idx);
          }
          return;
        }
        const result = await getImageById (image_id);
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(result);
        fileReaderInstance.onload = () => {
          cardImageArray.push({image_id: image_id, image: fileReaderInstance.result});
          setCardImages([...cardImageArray]);
         // console.log(cardImageArray.length);
          if(idx < 2 ){
            updateImages(cardArray, curIndex, ++idx);
          }
        };
      }catch(err){
        console.log(err);  
      }
    }

  const fetchImages = async () => {
      try {
        dispatch({
          type: actions.SET_PROGRESS_SETTINGS,
          show: true,
        }); 
        const response = await queryMetadata(curPage);
        console.log(JSON.stringify(response));
        if(response && response.result && response.result.length > 0) {
          setMaxPage(response.pageSize);
          setCurPage(response.page  + 1);
          // imagees exists then add these
          //actually this not works properly
          var arr = [...cards, ...response.result];
          setCards(arr)
          await updateImages(arr, currentIndex, 0);
          await updateMetadata(arr, currentIndex);

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
    };


  const handleVerify = (card) => {
    let  index = currentIndex;
    setCurrentIndex((++index));
    updateImages(cards, index, 0);
    callVerify(currentIndex);
    updateMetadata(cards, index);
  }
 
  const handleReport = (card) => {
    let  index = currentIndex;
    setCurrentIndex(++index);
    updateImages(cards, index, 0);
    callReport(currentIndex);

    updateMetadata(cards, index);
  }

  const callVerify = async (currentIndex) => {

    const response = await verifyImage( 
      imageId,
      {tags:[], description:""},
      {
        tags: {
          up_votes:[...tags], 
          down_votes:[...downTags]}, 
        descriptions: {
          up_votes:[...descriptions],
          down_votes:[...downDescriptions]}}
    );
    console.log("callVerify()", JSON.stringify(response));
  }

  const callReport = async(currentIndex) => {
    const photos = [imageId,];
    console.log(JSON.stringify(photos));
    const response = await reportImages(photos);
    console.log("callReport()", JSON.stringify(response));
  }

  const deleteTag = (tag, tagType)=> {
    if(tagType == 'verification'){
      //down vote
      var tagArr = [...tags];
      var downTagsArr = [...downTags];
        downTagsArr.push(tag);
      const modTagArr = tagArr.filter((value)=> {return value != tag})
      if(modTagArr) {
        setSelectedTag(tag)
        setDownTags(downTagsArr);
  
        setTimeout(()=>{
          setTags(modTagArr);
        }, 500);
      }
    } else {
      var tagArr = [...annotationTags];
      const modTagArr = tagArr.filter((value) => {return value != tag})
      if(modTagArr) {

        setTimeout(()=>{
          setAnnotationTags(modTagArr);
        }, 500);
      }
    }
  }
 
  const cardRemoved = (index) => {
    console.log(`The index is ${index}`);
    let CARD_REFRESH_LIMIT = 3
    if (cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${cards.length - index - 1} cards left.`);
      try{
        fetchImages();
      }catch(err){
        console.log(err);
      }
    }
  }

 //add annotation tag
 const handleNewTag = ()=>{
  setEditorType('annotation');
  setTagEditindexx(annotationTags.length);
  setBEditEnabled(true);
  setTagEditValue("");
  textEditor.focus();

   
 };

 const editTag = (tag, index)=> {
   setTagEditindexx(index);
   setBEditEnabled(true);
   setTagEditValue(tag);
   textEditor.focus();
   setTimeout(() => {
  } ,100);
 };

 const setTagsValue = (_tags, _editorType)=>{
  if(editorType == 'annotation') {
    setAnnotationTags(_tags);
  }
  else {
    setTags(_tags);
  }

 }

 const onSubmitText = ()=>{
   const text = tagEditValue;
    var _tags = [];
    if(editorType == 'annotation') {
      _tags = [...annotationTags];

    }
    else {
      _tags = [...tags];
    }
    if(text == ""){
      if(tagEditIndex < _tags.length) {
        const tag = _tags[tagEditIndex];
        deleteTag(tag, editorType);
      }
    }
    else {
      if(tagEditIndex >= _tags.length - 1) {
        _tags.push(tagEditValue);
        setTagsValue(_tags, editorType);
      }else {
        _tags[tagEditIndex] = tagEditValue;
        setTagsValue(_tags, editorType);
      }
    }
 };

 const setKeyboardListener = ()=> {
  Keyboard.addListener('keyboardDidHide', ()=>{
    setBEditEnabled(false);
  });
 };

 const onChangeText = (text)=>{
   setTagEditValue(text); 
  }


    useEffect(() => {
      //setKeyboardListener();
      Keyboard.addListener('keyboardDidHide', ()=>{
        setBEditEnabled(false);
      });
      setCurrentIndex(0);
      fetchImages();
    }, []);

    /**
     * SWIPE-DELETE Card - react-natve-swipecards
     * left anim to report image
     * right anim to approve image
     *  //bestofreactjs
     * 
     * 
     * unordered word list
     */
    return (
        <View style={styles.container}>

          <View style={styles.CardWrapper}>

            <Image
              style={styles.leftbar}
              source={require('../assets/left.png')}
            />
            <View style={styles.CardView}>
            <SwipeCards
              cards={cards}
              renderCard={(cardData)=> <InCard {...cardData} images={cardImages} currentIndex={currentIndex} />}
              renderNoMoreCards={() =><NoMoreCards />}
              nopeText='Reported'
              yupText='Verified' 
              stack={false} 
              handleYup={ (card)=> handleVerify(card) }
              handleNope={ (card)=>handleReport(card) }
              hasMaybeAction={false}
              cardRemoved={ (index)=>cardRemoved(index) }
              showYup = {false}
              showNope = {false}
              />
            </View>
            <Image
            style={styles.rightbar}
            source={require('../assets/right.png')}
            />
          </View>
          <ScrollView 
            style={styles.ScrollView} 
            showsVerticalScrollIndicator={false}>
            
          <View style={styles.TagsView}>
            
            <View style={{...styles.ChipWrapper, 
            position: 'absolute',
                  left: 0,
                  top: -3,
                  }}>
              <IconButton 
                icon='plus'
                color='#FFFFFF'
                textStyle={styles.ChipText}
                style={{    
                  backgroundColor:  "#3A506B",
                }}
                onPress={()=>{handleNewTag()}}
                />
            </View>

            {tags.map((vtag, index)=>(
                <View style={ index == 0? styles.ChipWrapper1: styles.ChipWrapper}>
                  <Chip  
                    key={index}
                    title={vtag}
                    onLongPress={()=>{deleteTag(vtag, 'verification')}}
                    onPress={()=>{editTag(vtag, index, 'verification')}}
                    textStyle={styles.ChipText}
                    style={[styles.Chip, {    
                      backgroundColor:  selectedTag == vtag ? "#EB5454" : "#3A506B",
                    }]}>
                    {vtag}
                  </Chip>
                </View>
              ))}              
            
            
            {annotationTags.map((tag, index)=>(
              <View style={styles.ChipWrapper}>
                <Chip  
                  key={index}
                  title={tag}
                  onLongPress={()=>{deleteTag(tag, 'annotation')}}
                  onPress={()=>{editTag(tag, index, 'annotation')}}s
                  textStyle={styles.ChipText}
                  style={[styles.Chip, {    
                    backgroundColor:  selectedTag == tag ? "#EB5454" : "#3A506B",
                  }]}>
                  {tag}
                </Chip>
              </View>
            ))}
            
          </View>

        </ScrollView>
        <TextInput
            ref={input => (setTextEditor(input))}
            keyboardType = 'text'
            value={tagEditValue}
            
            blurOnSubmit={true}
            onChangeText={(text)=>{onChangeText(text)}}
            onSubmitEditing={()=>{onSubmitText()}}
            returnKeyType="done"
            style={[styles.inputbox, {bottom:bEditEnabled? 0: -100}]}
        />
      </View>
    );
};

export default VeriPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    marginHorizontal: 0,
  },
  card: {
    alignItems: 'center',
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 43,
    width: 302,
    height: 307,
    borderWidth: 0,  
    elevation: 1
  },
  leftbar: {
      zIndex: 0,
      left: 0
  },
  rightbar: {
    zIndex: 0,  
    right: 0
  },
  thumbnail: {
    width: 302,
    height: 307,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardWrapper: {
    //    justifyContent: 'space-between',
    height: 350,
    zIndex: 1000,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  CardView: {
    zIndex: 1000
  },
  TagsView: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 0,
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  ScrollView: {
    padding: 10,
  },
  ChipText: {
    fontSize: 15,
    color: '#ffffff',
  },
  Chip: {
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 26,
    paddingLeft: 10,
    paddingRight: 10
  },
  ChipWrapper1: {
    marginHorizontal: 2,
    marginVertical: 3,
    flexWrap: 'wrap',
    marginLeft:60,
   },
  ChipWrapper: {
    marginHorizontal: 2,
    marginVertical: 3,
    flexWrap: 'wrap',
   },
  inputbox: {
    width: '100%',
    position: 'absolute',
    
    backgroundColor: '#0B132B',
    color: 'white',
    display: 'none'
  }
})