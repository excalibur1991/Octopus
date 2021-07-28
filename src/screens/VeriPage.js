import React, {useEffect, useState} from 'react';
import {
    View, 
    Image,
    Text,
    StyleSheet,
    ScrollView,
    Keyboard,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import {
    queryMetadata,
    getImageById,
    reportImages,
    verifyImage,
    GetWords
  } from '../services/API/APIManager';
import SwipeCards from 'react-native-swipe-cards';
import { 
  Chip, 
  IconButton, 
  Button,
  Divider,
  Checkbox
} from 'react-native-paper';

import MultiSelect from 'react-native-multiple-select'
//import SelectDropdown from "react-native-select-dropdown";

import {SwipeImageCard, NoMoreCards} from '../components/SwipeImageCard'
import TagInput from '../components/TagInput'
import AddTag from '../components/AddTag';
import Tags from '../components/Tags';
import BountyView from '../components/BountyView';


const initial_piis = [
  {tag: 'biometric', desc: 'This image contains biometric information.', checked: false, disabled: false},
  {tag: 'PII - faces', desc: 'This image contains PII of faces.', checked: false, disabled: false},
  {tag: 'PII - non faces',desc: 'This image contains PII  of non-faces.', checked: false, disabled: false},
  {tag: 'Copyright', desc: 'Copyright', checked: false, disabled: false},
];
  const initial_bounties = [
    {tag: 'anonymization bounty', desc: 'Anonymization Bounty (photos of faces)', checked: false, disabled: false},
    {tag: 'food bounty', desc: 'Food Bounty', checked: false, disabled: false},
    {tag: 'project.bb bounty', desc: 'project.bb bounty(cigarette butt on the beach)', checked: false, disabled: false},
    {tag: 'nft+art bounty', desc: 'NFT Bounty(photos of NFTs)', checked: false, disabled: false},
    {tag: 'traffic sign bounty', desc: 'Traffiic Sign Bounty', checked: false, disabled: false},
    {tag: 'meme bounty', desc: 'Meme Bounty', checked: false, disabled: false},
    {tag: 'product bounty', desc: 'Product Bounty(photos of products)', checked: false, disabled: false},
    {tag: 'ocr bounty', desc: 'OCR Bounty(photos with text in them)', checked: false, disabled: false},
  ];




var _bEditEnabled = false;

const VeriPage = (props) => {




  const [, dispatch] = useStateValue();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [cardImages, setCardImages] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  //{"descriptions":["Waves in the baltic sea"],
  // "image_id":"fffffff81e1c0000",
  //"tag_data":["wave","waves","blue","sea","water","ocean"]}
  const [metadata, setMetadata] = useState({});
  const [imageId, setImageId] = useState("");
  const [cardImageArray, setCardImageArray] = useState([]);
  //reserve aannotation
  const [annotations, setAnnotations] = useState({});
  const [annoDescription, setAnnoDescription] = useState("");
  
  //verification: 
  //    descriptions: {up_votes: ["red motorbike in front of a building"], down_votes: []},
  //    tags: {up_votes: ["purple", "flower"], down_votes: ["green"]}
  //verification
  const [descriptions, setDescriptions] = useState([]);
  const [downDescriptions, setDownDescriptions] = useState([]);

  const [tags, setTags] = useState([]);
  const [upTags, setUpTags] = useState([]);
  const [downTags, setDownTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(""); //

  const [annotationTags, setAnnotationTags] = useState([]);

  const [textEditor,setTextEditor] = useState(null);

  const [editorType, setEditorType] = useState(""); //annotation | verification

  const [bEditEnabled, setBEditEnabled] = useState(false);
  const [tagEditValue, setTagEditValue] = useState("");
  const [tagEditIndex, setTagEditiIndex] = useState(0);

  
  const [recommendedTags, setRecommandedTags] = useState([]);
  const [bannedTags, setBannedTags] = useState([]);

  const [filteredTags, setFilteredTags] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [bounties, setBounties] = useState(initial_bounties);
  const [piis, setPiis] = useState(initial_piis);

  const [selectedPII, setSelectedPII] = useState([]);
  const [selectedBounties, setSelectedBounties] = useState([]);
  const max_image_load = 5;


  const tagHandler = (tags, annotations)=> {

  }

  const checkBounties = (_tags)=>
  {
    const _bounties = [...bounties];
    _bounties.map((value, index)=> {
      const found = _tags.find((tag)=>(value.tag == tag))
      if (found) {
        _bounties[index].disabled = true
      }else{
        _bounties[index].disabled = false
      }
    })
    setBounties(_bounties);
    //selection
  };
  const checkBountiesSelection = (_tags)=>{

    var _selectedBounties = [];
    _tags.map((value)=>{
      const found = bounties.find((bounty)=>(bounty.tag === value));
      if(found){
        _selectedBounties.push(value);
      }
    });

    setSelectedBounties(_selectedBounties);
  };

  const checkPii = (_tags)=>
  {
    const _piis = [...piis];
    _piis.map((value, index)=> {
      const found = _tags.find((tag)=>(value.tag == tag))
      if (found) {
        _piis[index].disabled = true
      }else{
        _piis[index].disabled = false
      }
    })  
    setPiis(_piis);
  };
  const checkPIISelection = (_tags)=>{

    var _selectedPII = [];
    _tags.map((value)=>{
      const found = piis.find((pii)=>(pii.tag === value));
      if(found){
        _selectedPII.push(value);
      }
    });

    setSelectedPII(_selectedPII);
  };

  //update metadata for currentIndex
  const updateMetadata = async( cardArray, curIndex) => {
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
      setTagEditiIndex(0);

    }
    catch(err){
    }
  }

  //update image
  const updateImages = async (cardArray, curIndex, idx) => {
    try{
      //if (cards.length <= currentIndex) break;
      if(cardArray.length <= curIndex + idx) return;

      const image_id = cardArray[curIndex + idx].image_id;
      var found = false;
      cardImageArray.map((value,index)=>{
        if(value.image_id === image_id) found = true;
      })
      if(found) {
        if(idx < max_image_load ){
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
        if(idx < max_image_load ){
          updateImages(cardArray, curIndex, ++idx);
        }
      };
    }catch(err){
    }
  }

  const fetchImages = async (bUpdateImage=true) => {
      try {
        dispatch({
          type: actions.SET_PROGRESS_SETTINGS,
          show: true,
        });
        setIsLoading(true);
        const response = await queryMetadata(curPage);
        if(response && response.result && response.result.length > 0) {
          setMaxPage(response.pageSize);
          setCurPage(response.page  + 1);
          // imagees exists then add these
          //actually this not works properly
          var arr = [...cards, ...response.result];
          setCards(arr)
          if(bUpdateImage) {
            await updateImages(arr, currentIndex, 0);
          }
          await updateMetadata( arr, currentIndex);

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

    //find nextImage
    callVerify(currentIndex);
    updateMetadata( cards, index);
  }
 
  const handleReport = (card) => {
    let  index = currentIndex;
    setCurrentIndex(++index);

    callReport(currentIndex);

    updateMetadata( cards, index);
  }

  const callVerify = async (currentIndex) => {

    const response = await verifyImage( 
      imageId,
      {tags:[...annotationTags], description:""},
      {
        tags: {
          up_votes:[...upTags], 
          down_votes:[...downTags]}, 
        descriptions: {
          up_votes:[...descriptions],
          down_votes:[...downDescriptions]}}
    );
  }

  const callReport = async(currentIndex) => {
    const photos = [imageId,];
    const response = await reportImages(photos);
  }

  const deleteTag = (tag, tagType)=> {
    if(tagType == 'verification'){
      //down vote
      var tagArr = [...tags];
      var downTagsArr = [...downTags];
        downTagsArr.push(tag);
      const modTagArr = tagArr.filter((value)=> (value != tag));
      if(modTagArr) {
        setSelectedTag(tag)
        setDownTags(downTagsArr);
  
        setTimeout(()=>{
          setTags(modTagArr);
          setSelectedTag("");
        }, 500);
      }
    } else if(tagType == 'annotation') {
      var tagArr = [...annotationTags];
      const modTagArr = tagArr.filter((value) => (value != tag));
      if(modTagArr) {
        setSelectedTag(tag);
        setTimeout(()=>{
          setAnnotationTags(modTagArr);
          setSelectedTag("");
        }, 500);
      }
    }
  }
 
  const cardRemoved = (index) => {
    let CARD_REFRESH_LIMIT = 3
    if (cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      try{
        fetchImages(false);
      }catch(err){
      }
    }
    if(currentIndex +1 < cards.length) {
      if(!cardImageArray.find((image)=>(image.image_id == cards[currentIndex+1].image_id))){
        dispatch({
          type: actions.SET_PROGRESS_SETTINGS,
          show: true,
        });
        updateImages(cards, currentIndex, 0).then(()=>{
          dispatch({
            type: actions.SET_PROGRESS_SETTINGS,
            show: false,
          });
        });
      }
    }

  }

  //add annotation tag
  const handleNewTag = ()=>{
    try{
      setEditorType('annotation');
      setTagEditiIndex(annotationTags?annotationTags.length: 0);
      setBEditEnabled(true);
      setTagEditValue("");
      textEditor.focus();
  
    }catch(err){
    }
    
  };

  const editTag = (tag, index, _editorType)=> {
    setTagEditiIndex(index);
    setBEditEnabled(true);
    setEditorType(_editorType);
    setTagEditValue(tag);
    textEditor.focus();
    setTimeout(() => {
    } ,100);
  };

  const UpvoteTag = (tag, index, _editorType)=>{
    var _upTags = upTags;
    const founded_tag = upTags.find((value)=>(value === tag));
    if(founded_tag) {
      //remove from upTag
      const moded_tag = upTags.filter((value)=>(value != tag));
      setUpTags(moded_tag);
    }else {
      //add to upTag
      setUpTags([...upTags, tag]);
    }
  }

  const setTagsValue = (_tags, _editorType)=>{
    if(editorType == 'annotation') {
      setAnnotationTags(_tags);
    }
    else {
      setTags(_tags);
    }

  }

  const getTags = (tagType)=>{
    var _tags = [];
    if(tagType == 'annotation') {
      _tags = [...annotationTags];

    }
    else {
      _tags = [...tags];
    }  
    return _tags;
  }


  const onSubmitText = ()=>{
    const text = tagEditValue;
      var _tags = getTags(editorType);
      const curTag = tagEditIndex < _tags.length ? _tags[tagEditIndex]: "";


      if(text === ""){
        if(tagEditIndex < _tags.length) {
          const tag = _tags[tagEditIndex];
          deleteTag(tag, editorType);
        }
      }
      else {

        //profanity filteer
        if(!profanityFilter(text)) {
          alert('taboo words');
          return;
        }

        if(isDuplicated(text) && curTag != text) {
          alert('Duplicated Tag Exists!');
          return;
        }

        if(tagEditIndex >= _tags.length) {
          //new addition
          _tags.push(tagEditValue);
          setTagsValue(_tags, editorType);
        }else {
          // modification
          _tags[tagEditIndex] = tagEditValue;
          setTagsValue(_tags, editorType);
        }
      }
  };

  const onChangeText = (text)=>{
   setTagEditValue(text); 
  }

  const [keyboardOffset, setKeyboardOffset] = useState(-300);

  const _keyboardDidShow = (event)=> {
      if(Platform.OS === 'ios') {
        setKeyboardOffset(event.endCoordinates.height - 40 );
       }
       else{
         setKeyboardOffset(0);
       }
  };

  const _keyboardDidHide=()=> {
      setKeyboardOffset(-300);
  }

    useEffect(() => {
      Keyboard.addListener('keyboardDidHide', ()=>{
        setBEditEnabled(false);
      });
      Keyboard.addListener(
        'keyboardDidShow',
        _keyboardDidShow,
    );
    Keyboard.addListener(
        'keyboardDidHide',
        _keyboardDidHide,
    );
      setCurrentIndex(0);
      fetchImages();
    }, []);



    useEffect(()=>{
      if(recommendedTags.length== 0){
        GetWords('RECOMMENDED_WORDS').then(res=>{
          setRecommandedTags(res.result);
        });
      }
    }, [recommendedTags]);

    useEffect(()=>{
      if(bannedTags.length == 0){

        GetWords('BANNED_WORDS').then(res=>{
          setBannedTags(res.result);
        });
      }
    }, [bannedTags]);

    useEffect(()=>{
      if(isLoading){
          dispatch({
            type: actions.SET_PROGRESS_SETTINGS,
            show: true,
          });
      }else {
          dispatch({
            type: actions.SET_PROGRESS_SETTINGS,
            show: false,
          });
      }
    },
    [isLoading]);

    useEffect(()=>{

      checkBountiesSelection(annotationTags);
      checkPIISelection(annotationTags);
    },[annotationTags]);

    useEffect(()=>{
      checkBounties(tags);
      checkPii(tags);
    }, [tags]);


    // FILTERS
    const searchFilter = (_filter_text) => {
      if(filter_text == ""){
        setFilteredTags([]) // local
        return;
      }
      const filter_text = _filter_text.toLocaleLowerCase();
      if (recommendedTags) {
        const filteredItems = filter_text === '' ? recommendedTags : recommendedTags.filter(
          (item) =>
            item.slice(0, filter_text.length).toLocaleLowerCase().includes(filter_text)
          )
        const shuffled = filteredItems.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setFilteredTags(selected) // local
      }
    };

    const profanityFilter = (filter_text) => {
      const filteredItems = bannedTags.filter((item) =>item.toLocaleLowerCase() === filter_text)
        if (filteredItems.length === 0) {
            return true
        } else {
            return false
        }
    };

    //
    const isDuplicated = (tag) => {
      const low_tag = tag.trim().toLocaleLowerCase();
      const containTags = tags.filter((item)=>(item.trim().toLocaleLowerCase() === low_tag))
      if(containTags.length != 0){
        //tag exists
        return true;
      }
      const containNewTags = annotationTags.filter((item)=>(item.trim().toLocaleLowerCase() === low_tag));
      if(containNewTags.length != 0) {
        //tag exists
        return true;
      }

      return false;
    }

    const handleBountySelection = (items)=>{
      var _bounties = [];
      //remove prev iems
      annotationTags.map((value)=>{
        const found = selectedBounties.find((bounty)=>(value == bounty));
        if(found){
          //remove
        }else{
          _bounties.push(value);
        }
      })

      items.map((value)=>{
        _bounties.push(value);
      })
      
      setSelectedBounties(items);
      setAnnotationTags(_bounties);
    }

    const handlePiiSelection = (items)=>{
      var _annotations = [];
      //remove prev iems
      annotationTags.map((value)=>{
        const found = selectedPII.find((pii)=>(value==pii));
        if(found){
          //remove
        }else{
          _annotations.push(value);
        }
      })

      items.map((value)=>{
        _annotations.push(value);
      })
      
      setSelectedPII(items);
      setAnnotationTags(_annotations);
    }

    useEffect(()=>{
      searchFilter(tagEditValue);
    }, [tagEditValue]);

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
                renderCard={(cardData)=> 
                <SwipeImageCard 
                image_id={cardData.image_id}
                images={cardImages} 
                />}
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
              <AddTag
                handleNewTag={handleNewTag}
              />
              <Tags 
                tags={tags}
                upTags={upTags}
                tag_type={"verification"}
                selectedTag={selectedTag}
                deleteTag={deleteTag}
                editTag={UpvoteTag}
                bIndent={true}
              />
              <Tags 
                tags={annotationTags}
                upTags={[]}
                tag_type={"annotation"}
                selectedTag={selectedTag}
                deleteTag={deleteTag}
                editTag={editTag}
                bIndent={tags.length == 0}
              />
            </View>
            <Divider style={
              {marginTop: 10}
            }/>
            <MultiSelect 
              hideTags
              hideSubmitButton
              items={piis}
              uniqueKey="tag"
              selectText="PII"
              displayKey="tag"
              single={false}
              selectedItems={selectedPII}
              onSelectedItemsChange={(items)=>{ handlePiiSelection(items)}}
              showFilter={false}
              canAddItems={false}
              onToggleList={(value)=>{
              }}
              textInputProps={{
                editable:false
              }}
              searchInputPlaceholderText="PII ..."
              selectedItemTextColor={'#00A5FF'}
              styleDropdownMenu={{
                height:56,
              }}
            />
            <Divider />
            <MultiSelect 
              hideTags
              hideSubmitButton
              items={bounties}
              uniqueKey="tag"
              selectText="Bounty"
              displayKey="tag"
              single={false}
              onSelectedItemsChange={(items)=>{}}
              showFilter={false}
              canAddItems={false}
              selectedItems={selectedBounties}
              onSelectedItemsChange={(items)=>{handleBountySelection(items) }}

              textInputProps={{
                editable:false
              }}
              searchInputPlaceholderText="Bounties ..."
              selectedItemTextColor={'#00A5FF'}
              styleDropdownMenu={{
                height:56,
              }}
            />
          </ScrollView>
        <TagInput
          bEditEnabled={bEditEnabled}
          tagEditValue = {tagEditValue}
          filteredTags = {filteredTags}
          onChangeText = {onChangeText}
          onSubmitEditing = {onSubmitText}
          setTextEditor = {setTextEditor}
          setTagEditValue = {setTagEditValue}
          keyboardOffset = {keyboardOffset}
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
 
  leftbar: {
      zIndex: 0,
      left: 0
  },
  rightbar: {
    zIndex: 0,  
    right: 0
  },
  
  CardWrapper: {
    height: 350,
    zIndex: 1000,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  CardView: {
    zIndex: 1000
  },
  TagsView: {
    flexDirection: 'row',
    zIndex: 0,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ScrollView: {
    padding: 10,
  },
});