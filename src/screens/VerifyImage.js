import React, {useEffect, useState, useRef} from 'react';
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
  ImageBackground,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import {
  queryMetadata,
  getImageById,
  reportImages,
  verifyImage,
  GetWords,
} from '../services/API/APIManager';
import SwipeCards from 'react-native-swipe-cards';
// import {Chip, IconButton, Button, Divider, Checkbox} from 'react-native-paper';
// import MultiSelect from '../components/BountyMultiselect';
//import SelectDropdown from "react-native-select-dropdown";
import {SwipeImageCard, NoMoreCards} from '../components/SwipeImageCard';
import TagInput from '../components/TagInput';
import AddTag from '../components/AddTag';
import Tags from '../components/Tags';
// import BountyView from '../components/BountyView';
import {theme} from '../services/Common/theme';
import * as Progress from 'react-native-progress';
import styles from '../styles/verifyimage';
import MultiSelectDropDown from '../components/MultiSelectDropDown';
import Ripple from '../components/Ripple';
import LinearGradient from 'react-native-linear-gradient';
// import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const initial_piis = [
  {
    tag: 'biometric',
    desc: 'This image contains biometric information.',
    checked: false,
    disabled: false,
  },
  {
    tag: 'PII - faces',
    desc: 'This image contains PII of faces.',
    checked: false,
    disabled: false,
  },
  {
    tag: 'PII - non faces',
    desc: 'This image contains PII  of non-faces.',
    checked: false,
    disabled: false,
  },
  {tag: 'Copyright', desc: 'Copyright', checked: false, disabled: false},
];
const initial_bounties = [
  {
    tag: 'anonymization bounty',
    desc: 'Anonymization Bounty (photos of faces)',
    checked: false,
    disabled: false,
  },
  {tag: 'food bounty', desc: 'Food Bounty', checked: false, disabled: false},
  {
    tag: 'project.bb bounty',
    desc: 'project.bb bounty(cigarette butt on the beach)',
    checked: false,
    disabled: false,
  },
  {
    tag: 'nft+art bounty',
    desc: 'NFT Bounty(photos of NFTs)',
    checked: false,
    disabled: false,
  },
  {
    tag: 'traffic sign bounty',
    desc: 'Traffiic Sign Bounty',
    checked: false,
    disabled: false,
  },
  {tag: 'meme bounty', desc: 'Meme Bounty', checked: false, disabled: false},
  {
    tag: 'product bounty',
    desc: 'Product Bounty(photos of products)',
    checked: false,
    disabled: false,
  },
  {
    tag: 'ocr bounty',
    desc: 'OCR Bounty(photos with text in them)',
    checked: false,
    disabled: false,
  },
];

const reportOptions = [
  'Contains pornographic content',
  'Contains violent content',
  'Contains illegal content',
  'Contains self promotion',
  'Contains political promotion',
  'Contains harassement',
  'other',
];

var _bEditEnabled = false;

const RadioButton = ({checked, onCheckChange}) => {
  return (
    <Ripple style={styles.radioButton} onPress={() => onCheckChange(!checked)}>
      {checked && (
        <LinearGradient
          end={{x: 1, y: 0}}
          start={{x: 0.15, y: 0}}
          style={styles.radioButtonDot}
          colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}
        />
      )}
    </Ripple>
  );
};

const ReportModal = ({open = false, onClose = () => {}, onReport = () => {}}) => {
  const [selectedReportOption, setSelectedReportOption] = useState(0);
  const [caseReported, setCaseReported] = useState(false);

  const handleClose = () => {
    setSelectedReportOption(0);
    setCaseReported(false);
    onClose();
  };

  const handleReport = () => {
    onReport();
    setCaseReported(true);
  }

  return (
    <Modal transparent visible={open} statusBarTranslucent animationType="fade">
      <View style={styles.reportModalContainer}>
        <View style={styles.reportModalContentContainer}>
          <View style={styles.closeButton}>
            <AntIcon
              size={20}
              name="close"
              onPress={handleClose}
              color={theme.COLORS.WHITE}
            />
          </View>
          {!caseReported ? (
            <>
              <Text style={styles.headerTitle}>
                Are you sure you want to report the image ?
              </Text>
              <Text style={styles.subTitle}>
                Check the relevant boxes below
              </Text>
              <View style={styles.radioButtons}>
                {reportOptions.map((ro, index) => (
                  <View style={styles.reportOptionRow}>
                    <RadioButton
                      checked={selectedReportOption === index}
                      onCheckChange={() => setSelectedReportOption(index)}
                    />
                    <Text
                      onPress={() => setSelectedReportOption(index)}
                      style={styles.reportOptionLabel}>
                      {ro}
                    </Text>
                  </View>
                ))}
              </View>
              {reportOptions[selectedReportOption].toLowerCase() ===
                'other' && (
                <TextInput
                  multiline
                  style={styles.reportOther}
                  placeholder="Image Contains...ETC"
                  placeholderTextColor={theme.COLORS.WHITE}
                />
              )}
              <LinearGradient
                end={{x: 1, y: 0}}
                start={{x: 0.15, y: 0}}
                colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}
                style={styles.modalButtonGradient}>
                <Ripple
                  onPress={handleReport}
                  style={styles.modalButton}>
                  <Text style={styles.buttonText}>Report</Text>
                </Ripple>
              </LinearGradient>
            </>
          ) : (
            <>
              <Text style={styles.headerTitleReported}>Case Reported</Text>
              <Text style={styles.subTitleReported}>
                Report has been delivereed and will be evaluated collectively by
                other users. Thank you for your asistance.
              </Text>
              <View style={styles.tcCloseButtonContainer}>
                <Ripple onPress={handleClose} style={styles.tcCloseButton}>
                  <AntIcon size={23} name="close" color={theme.COLORS.WHITE} />
                </Ripple>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const VeriPage = (props) => {
  const {navigation, t} = props || {};
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
  const [imageId, setImageId] = useState('');
  const [cardImageArray, setCardImageArray] = useState([]);
  //reserve aannotation
  const [annotations, setAnnotations] = useState({});
  const [annoDescription, setAnnoDescription] = useState('');

  //verification:
  //    descriptions: {up_votes: ["red motorbike in front of a building"], down_votes: []},
  //    tags: {up_votes: ["purple", "flower"], down_votes: ["green"]}
  //verification
  const [descriptions, setDescriptions] = useState([]);
  const [downDescriptions, setDownDescriptions] = useState([]);

  const [tags, setTags] = useState([]);
  const [upTags, setUpTags] = useState([]);
  const [downTags, setDownTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(''); //

  const [annotationTags, setAnnotationTags] = useState([]);

  const [textEditor, setTextEditor] = useState(useRef(null));

  const [editorType, setEditorType] = useState(''); //annotation | verification

  const [bEditEnabled, setBEditEnabled] = useState(false);
  const [tagEditValue, setTagEditValue] = useState('');
  const [tagEditIndex, setTagEditiIndex] = useState(0);

  const [recommendedTags, setRecommandedTags] = useState([]);
  const [bannedTags, setBannedTags] = useState([]);

  const [filteredTags, setFilteredTags] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [bounties, setBounties] = useState(initial_bounties);
  const [piis, setPiis] = useState(initial_piis);

  const [selectedPII, setSelectedPII] = useState([]);
  const [selectedBountiess, setSelectedBountiess] = useState([]);
  const max_image_load = 5;

  const [selectedPiis, setSelectedPiis] = useState([]);
  const [selectedBounties, setSelectedBounties] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const tagHandler = (tags, annotations) => {};

  const checkBounties = (_tags) => {
    const _bounties = [...bounties];
    _bounties.map((value, index) => {
      const found = _tags.find((tag) => value.tag == tag);
      if (found) {
        _bounties[index].disabled = true;
      } else {
        _bounties[index].disabled = false;
      }
    });
    setBounties(_bounties);
    //selection
  };
  const checkBountiesSelection = (_tags) => {
    var _selectedBounties = [];
    _tags.map((value) => {
      const found = bounties.find((bounty) => bounty.tag === value);
      if (found) {
        _selectedBounties.push(value);
      }
    });

    setSelectedBounties(_selectedBounties);
  };

  const checkPii = (_tags) => {
    const _piis = [...piis];
    _piis.map((value, index) => {
      const found = _tags.find((tag) => value.tag == tag);
      if (found) {
        _piis[index].disabled = true;
      } else {
        _piis[index].disabled = false;
      }
    });
    setPiis(_piis);
  };
  const checkPIISelection = (_tags) => {
    var _selectedPII = [];
    _tags.map((value) => {
      const found = piis.find((pii) => pii.tag === value);
      if (found) {
        _selectedPII.push(value);
      }
    });

    setSelectedPII(_selectedPII);
  };

  //update metadata for currentIndex
  const updateMetadata = async (cardArray, curIndex) => {
    try {
      if (cardArray.length <= curIndex) {
        setMetadata({});
        setImageId('');
        setDescriptions([]);
        setTags([]);
        setDownTags([]);
        setDownDescriptions([]);
        setSelectedTag('');
      } else {
        const metadata = cardArray[curIndex];
        setMetadata(metadata);
        setImageId(metadata.image_id);
        setDescriptions(metadata.descriptions);
        setTags(metadata.tag_data);
        setDownTags([]);
        setDownDescriptions([]);
        setSelectedTag('');
      }

      setAnnotationTags([]);
      setBEditEnabled(false);
      setTagEditiIndex(0);
    } catch (err) {}
  };

  //update image
  const updateImages = async (cardArray, curIndex, idx) => {
    try {
      //if (cards.length <= currentIndex) break;
      if (cardArray.length <= curIndex + idx) {
        return;
      }

      const image_id = cardArray[curIndex + idx].image_id;
      var found = false;
      cardImageArray.map((value, index) => {
        if (value.image_id === image_id) {
          found = true;
        }
      });
      if (found) {
        if (idx < max_image_load) {
          updateImages(cardArray, curIndex, ++idx);
        }
        return;
      }
      const result = await getImageById(image_id);
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(result);
      fileReaderInstance.onload = () => {
        cardImageArray.push({
          image_id: image_id,
          image: fileReaderInstance.result,
        });
        setCardImages([...cardImageArray]);
        if (idx < max_image_load) {
          updateImages(cardArray, curIndex, ++idx);
        }
      };
    } catch (err) {}
  };

  const fetchImages = async (bUpdateImage = true) => {
    try {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: true,
      });
      setIsLoading(true);
      const response = await queryMetadata({
        page: curPage,
        status: 'VERIFIABLE',
        fields: ['image_id', 'tag_data', 'descriptions'],
        type: 'TextTag',
        tags: [],
      });
      if (response && response.result && response.result.length > 0) {
        setMaxPage(response.pageSize);
        setCurPage(response.page + 1);
        // imagees exists then add these
        //actually this not works properly
        var arr = [...cards, ...response.result];
        setCards(arr);
        if (bUpdateImage) {
          await updateImages(arr, currentIndex, 0);
        }
        await updateMetadata(arr, currentIndex);
      }
    } catch (err) {
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
    let index = currentIndex;
    setCurrentIndex(++index);

    //find nextImage
    callVerify(currentIndex);
    updateMetadata(cards, index);
  };

  const handleReport = () => {
    let index = currentIndex;
    setCurrentIndex(++index);
    callReport(currentIndex);
    updateMetadata(cards, index);
  };

  const callVerify = async (currentIndex) => {
    const response = await verifyImage(
      imageId,
      {tags: [...annotationTags], description: ''},
      {
        tags: {
          up_votes: [...upTags],
          down_votes: [...downTags],
        },
        descriptions: {
          up_votes: [...descriptions],
          down_votes: [...downDescriptions],
        },
      },
    );
  };

  const callReport = async (currentIndex) => {
    const photos = [imageId];
    const response = await reportImages(photos);
  };

  const deleteTag = (tag, tagType) => {
    if (tagType == 'verification') {
      //down vote
      var tagArr = [...tags];
      var downTagsArr = [...downTags];
      downTagsArr.push(tag);
      const modTagArr = tagArr.filter((value) => value != tag);
      if (modTagArr) {
        setSelectedTag(tag);
        setDownTags(downTagsArr);

        setTimeout(() => {
          setTags(modTagArr);
          setSelectedTag('');
        }, 500);
      }
    } else if (tagType == 'annotation') {
      var tagArr = [...annotationTags];
      const modTagArr = tagArr.filter((value) => value != tag);
      if (modTagArr) {
        setSelectedTag(tag);
        setTimeout(() => {
          setAnnotationTags(modTagArr);
          setSelectedTag('');
        }, 500);
      }
    }
  };

  const cardRemoved = (index) => {
    let CARD_REFRESH_LIMIT = 3;
    if (cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      try {
        fetchImages(false);
      } catch (err) {}
    }
    if (currentIndex + 1 < cards.length) {
      if (
        !cardImageArray.find(
          (image) => image.image_id == cards[currentIndex + 1].image_id,
        )
      ) {
        dispatch({
          type: actions.SET_PROGRESS_SETTINGS,
          show: true,
        });
        updateImages(cards, currentIndex, 0).then(() => {
          dispatch({
            type: actions.SET_PROGRESS_SETTINGS,
            show: false,
          });
        });
      }
    }
  };

  //add annotation tag
  const handleNewTag = () => {
    try {
      setEditorType('annotation');
      setTagEditiIndex(annotationTags ? annotationTags.length : 0);
      setTagEditValue('');
      setBEditEnabled(true);
      textEditor.focus();
    } catch (err) {}
  };

  const editTag = (tag, index, _editorType) => {
    setTagEditiIndex(index);
    setBEditEnabled(true);
    setEditorType(_editorType);
    setTagEditValue(tag);
    textEditor.focus();
    setTimeout(() => {}, 100);
  };

  const UpvoteTag = (tag, index, _editorType) => {
    var _upTags = upTags;
    const founded_tag = upTags.find((value) => value === tag);
    if (founded_tag) {
      //remove from upTag
      const moded_tag = upTags.filter((value) => value != tag);
      setUpTags(moded_tag);
    } else {
      //add to upTag
      setUpTags([...upTags, tag]);
    }
  };

  const setTagsValue = (_tags, _editorType) => {
    if (editorType == 'annotation') {
      setAnnotationTags(_tags);
    } else {
      setTags(_tags.toLowerCase());
    }
  };

  const getTags = (tagType) => {
    var _tags = [];
    if (tagType == 'annotation') {
      _tags = [...annotationTags];
    } else {
      _tags = [...tags];
    }
    return _tags;
  };

  const onSubmitText = () => {
    setBEditEnabled(false);
    const text = tagEditValue;
    var _tags = getTags(editorType);
    const curTag = tagEditIndex < _tags.length ? _tags[tagEditIndex] : '';

    if (text === '') {
      if (tagEditIndex < _tags.length) {
        const tag = _tags[tagEditIndex];
        deleteTag(tag, editorType);
      }
    } else {
      //profanity filteer
      if (!profanityFilter(text)) {
        alert('taboo words');
        return;
      }

      if (isDuplicated(text) && curTag != text) {
        alert('Duplicated Tag Exists!');
        return;
      }

      if (tagEditIndex >= _tags.length) {
        //new addition
        _tags.push(tagEditValue.toLowerCase());
        setTagsValue(_tags, editorType);
      } else {
        // modification
        _tags[tagEditIndex] = tagEditValue.toLowerCase();
        setTagsValue(_tags, editorType);
      }
    }
  };

  const onChangeText = (text) => {
    setTagEditValue(text);
  };

  const [keyboardOffset, setKeyboardOffset] = useState(-300);

  const _keyboardDidShow = (event) => {
    if (Platform.OS === 'ios') {
      setKeyboardOffset(event.endCoordinates.height - 40);
    } else {
      setKeyboardOffset(0);
    }
  };

  const _keyboardDidHide = () => {
    setKeyboardOffset(-300);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      setBEditEnabled(false);
    });
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    setCurrentIndex(0);
    fetchImages();
  }, []);

  useEffect(() => {
    if (recommendedTags.length == 0) {
      GetWords('RECOMMENDED_WORDS').then((res) => {
        setRecommandedTags(res.result);
      });
    }
  }, [recommendedTags]);

  useEffect(() => {
    if (bannedTags.length == 0) {
      GetWords('BANNED_WORDS').then((res) => {
        setBannedTags(res.result);
      });
    }
  }, [bannedTags]);

  useEffect(() => {
    if (isLoading) {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: true,
      });
    } else {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: false,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    checkBountiesSelection(annotationTags);
    checkPIISelection(annotationTags);
  }, [annotationTags]);

  useEffect(() => {
    checkBounties(tags);
    checkPii(tags);
  }, [tags]);

  // FILTERS
  const searchFilter = (_filter_text) => {
    if (filter_text == '') {
      setFilteredTags([]); // local
      return;
    }
    const filter_text = _filter_text.toLocaleLowerCase();
    if (recommendedTags) {
      const filteredItems =
        filter_text === ''
          ? recommendedTags
          : recommendedTags.filter((item) =>
              item
                .slice(0, filter_text.length)
                .toLocaleLowerCase()
                .includes(filter_text),
            );
      const shuffled = filteredItems.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      setFilteredTags(selected); // local
    }
  };

  const profanityFilter = (filter_text) => {
    const filteredItems = bannedTags.filter(
      (item) => item.toLocaleLowerCase() === filter_text,
    );
    if (filteredItems.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  //
  const isDuplicated = (tag) => {
    const low_tag = tag.trim().toLocaleLowerCase();
    const containTags = tags.filter(
      (item) => item.trim().toLocaleLowerCase() === low_tag,
    );
    if (containTags.length != 0) {
      //tag exists
      return true;
    }
    const containNewTags = annotationTags.filter(
      (item) => item.trim().toLocaleLowerCase() === low_tag,
    );
    if (containNewTags.length != 0) {
      //tag exists
      return true;
    }

    return false;
  };

  const handleBountySelection = (items) => {
    var _bounties = [];
    //remove prev iems
    annotationTags.map((value) => {
      const found = selectedBounties.find((bounty) => value == bounty);
      if (found) {
        //remove
      } else {
        _bounties.push(value);
      }
    });

    items.map((value) => {
      _bounties.push(value);
    });

    setSelectedBounties(items);
    setAnnotationTags(_bounties);
  };

  const handlePiiSelection = (items) => {
    var _annotations = [];
    //remove prev iems
    annotationTags.map((value) => {
      const found = selectedPII.find((pii) => value == pii);
      if (found) {
        //remove
      } else {
        _annotations.push(value);
      }
    });

    items.map((value) => {
      _annotations.push(value);
    });

    setSelectedPII(items);
    setAnnotationTags(_annotations);
  };

  useEffect(() => {
    searchFilter(tagEditValue);
  }, [tagEditValue]);

  const handlePiiSelect = (val) => {
    let allSelectedOptions = selectedPiis.slice();
    if (allSelectedOptions.includes(val)) {
      allSelectedOptions = allSelectedOptions.filter((o) => o !== val);
    } else {
      allSelectedOptions.push(val);
    }
    setSelectedPiis(allSelectedOptions);
  };

  const handleBountySelect = (val) => {
    let allSelectedOptions = selectedBountiess.slice();
    if (allSelectedOptions.includes(val)) {
      allSelectedOptions = allSelectedOptions.filter((o) => o !== val);
    } else {
      allSelectedOptions.push(val);
    }
    setSelectedBountiess(allSelectedOptions);
  };

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
      <ReportModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        onReport={()=> handleReport() } 
      />
      <View style={styles.progressContainer}>
        <Progress.Bar
          height={8}
          width={150}
          progress={0.3}
          borderWidth={0}
          color={theme.COLORS.DARK_BLUE}
          unfilledColor={theme.COLORS.MID_GREY}
        />
      </View>
      <View style={styles.swipeContainer}>
        <Image
          resizeMode="stretch"
          style={styles.leftBar}
          source={require('../assets/left.png')}
        />
        <SwipeCards
          cards={cards}
          renderCard={(cardData) => (
            <SwipeImageCard image_id={cardData.image_id} images={cardImages} />
          )}
          renderNoMoreCards={() => <NoMoreCards />}
          nopeText="Reported"
          yupText="Verified"
          stack={false}
          handleYup={(card) => handleVerify(card)}
          handleNope={(card) => setOpenModal(true)}
          hasMaybeAction={false}
          cardRemoved={(index) => cardRemoved(index)}
          showYup={false}
          showNope={false}
        />
        <Image
          resizeMode="stretch"
          style={styles.rightBar}
          source={require('../assets/right.png')}
        />
      </View>
      <View style={styles.divider} />
      {/* <ScrollView
        style={styles.tagsContainer}
        contentContainerStyle={styles.tagsContentContainer}
        showsVerticalScrollIndicator={false}> */}
        {!bEditEnabled && <AddTag handleNewTag={handleNewTag} />}
        <TagInput
          bEditEnabled={bEditEnabled}
          tagEditValue={tagEditValue}
          filteredTags={filteredTags}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitText}
          setTextEditor={setTextEditor}
          setTagEditValue={setTagEditValue}
          keyboardOffset={keyboardOffset}
        />
        {!bEditEnabled && (
          <>
            <Tags
              tags={tags}
              upTags={upTags}
              tag_type={'verification'}
              selectedTag={selectedTag}
              deleteTag={deleteTag}
              editTag={UpvoteTag}
              bIndent={true}
            />
            <Tags
              tags={annotationTags}
              upTags={[]}
              tag_type={'annotation'}
              selectedTag={selectedTag}
              deleteTag={deleteTag}
              editTag={editTag}
              bIndent={tags.length === 0}
            />
          </>
        )}
      {/* </ScrollView> */}
      <View style={styles.divider} />
      <View style={styles.actionsContainer}>
        <View style={styles.dropDownContainer}>
          <View style={styles.dropDownBounty}>
            <MultiSelectDropDown
              options={bounties.map((bounty) => bounty.tag)}
              placeholder="CHOOSE BOUNTIES"
              textColor={theme.COLORS.WHITE}
              selectedIndices={selectedBountiess}
              onSelect={(val) => handleBountySelect(val)}
              color={theme.COLORS.DARK_BLUE}
            />
          </View>
          <View style={styles.dropDownPii}>
            <MultiSelectDropDown
              options={piis.map((pii) => pii.tag)}
              placeholder="PII"
              textColor={theme.COLORS.WHITE}
              selectedIndices={selectedPiis}
              onSelect={(val) => handlePiiSelect(val)}
              color={theme.COLORS.DARK_BLUE}
            />
          </View>
        </View>
        <View style={styles.button}>
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
      </View>

      {/* <MultiSelect
        hideTags
        hideSubmitButton
        hideDropdown
        items={piis}
        uniqueKey="tag"
        selectText="PII"
        displayKey="tag"
        single={false}
        selectedItems={selectedPII}
        onSelectedItemsChange={(items) => {
          handlePiiSelection(items);
        }}
        showFilter={false}
        canAddItems={false}
        onToggleList={(value) => {}}
        textInputProps={{
          editable: false,
        }}
        searchInputPlaceholderText="PII ..."
        selectedItemTextColor={'#00A5FF'}
        styleDropdownMenu={{height: 56}}
      />
      <MultiSelect
        hideTags
        hideSubmitButton
        hideDropdown
        items={bounties}
        uniqueKey="tag"
        selectText="Bounty"
        displayKey="tag"
        single={false}
        onSelectedItemsChange={(items) => {}}
        showFilter={false}
        canAddItems={false}
        selectedItems={selectedBounties}
        onSelectedItemsChange={(items) => {
          handleBountySelection(items);
        }}
        textInputProps={{
          editable: false,
        }}
        searchInputPlaceholderText="Bounties ..."
        selectedItemTextColor={'#00A5FF'}
        styleDropdownMenu={{height: 56}}
      /> */}
      {/*
      <ScrollView
        style={styles.ScrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.TagsView}>
          <AddTag handleNewTag={handleNewTag} />
          <Tags
            tags={tags}
            upTags={upTags}
            tag_type={'verification'}
            selectedTag={selectedTag}
            deleteTag={deleteTag}
            editTag={UpvoteTag}
            bIndent={true}
          />
          <Tags
            tags={annotationTags}
            upTags={[]}
            tag_type={'annotation'}
            selectedTag={selectedTag}
            deleteTag={deleteTag}
            editTag={editTag}
            bIndent={tags.length == 0}
          />
        </View>
      </ScrollView>
      <TagInput
        bEditEnabled={bEditEnabled}
        tagEditValue={tagEditValue}
        filteredTags={filteredTags}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitText}
        setTextEditor={setTextEditor}
        setTagEditValue={setTagEditValue}
        keyboardOffset={keyboardOffset}
      /> */}
    </View>
  );
};

export default VeriPage;
