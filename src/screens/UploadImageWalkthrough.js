import Tag from '../components/Tag';
import Button from '../components/Button';
import {theme} from '../services/Common/theme';
import TextInput from '../components/TextInput';
import ImageTagInput from '../components/ImageTagInput';
import React, {useState} from 'react';
import MultiSelectDropDown from '../components/MultiSelectDropDown';
// import UploadProgress from '../components/UploadProgress';
const CloudUpload = require('../assets/cloud_upload.png');
const Test = require('../assets/image_upload_mission_test.png');
import {ScrollView, Text, View, Image} from 'react-native';
import DotNavigation from '../components/DotNavigation';
import styles from '../styles/uploadimagewalkthrough';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {actions} from '../services/State/Reducer';
import {
  onPickFile,
  handlePiiSelect,
  handleBountySelect,
  verifyFields,
  getSuccess,
  getError,
  onRemove,
  canProceed,
  submitMultipleImageTags,
  handleChangeDescription,
  handleChangeTags,
} from '../functions/uploadimage';
import {useStateValue} from '../services/State/State';
import Ripple from '../components/Ripple';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useHeaderHeight } from '@react-navigation/stack';


const Upload = ({navigation}) => {
  const [files, setFiles] = useState(['test']);
  const [descriptions, setDescriptions] = useState([]);
  const [tags, setTags] = useState([]);
  const [commonTags, setCommonTags] = useState([]);
  const [pii, setPii] = useState([]);
  const [bounties, setBounties] = useState([]);
  const [fileUploadResponses, setFileUploadResponses] = useState([]);
  const [uploadingImageIndex, setUploadingImageIndex] = useState(null);
  const [readOnly, setReadOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useStateValue();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const headerHeight = useHeaderHeight();

  const piiOptions = [
    'This image contains biometric information',
    'This image contains PII of faces',
    'This image contains PII of non-faces',
    'Copyright',
  ];
  const bountyOptions = [
    'Anonymization Bounty (photos of faces)',
    'Traffic sign bounty',
    'Food bounty',
    'Project.bb bounty(cigarette butts on the beach)',
    'NFT Bounty (photos of NFTs)',
    'OCR Bounty (photos with text in them)',
    'Meme Bounty',
    'Product Bounty (photos of products)',
  ];

  return (
    <View style={{...styles.container, paddingTop: headerHeight}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.uploadScrollContainer}>
              <View style={styles.imageDescriptionContainer}>
                  <Image
                    //source={{uri: files[selectedIndex].uri}}
                    source={Test}
                    resizeMode="stretch"
                    style={styles.uploadImage}
                  />
                  <Text style={styles.imageCount}>1/5</Text>
                <View style={styles.descriptionTextInput}>
                  <TextInput
                    isTextArea
                    label="Description"
                    value={descriptions[selectedIndex]}
                    placeholder="Add Description"
                    onChangeText={(val) =>
                      handleChangeDescription(
                        val,
                        selectedIndex,
                        descriptions,
                        setDescriptions,
                      )
                    }
                  />
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.tagsContainer}>
                <ImageTagInput
                  tags={['Tag 1', 'Tag 2']}
                  commonTags={['Common Tag 1', 'Common Tag 2']}
                  onChangeTags={(val) =>
                    handleChangeTags(val, selectedIndex, tags, setTags)
                  }
                  onChangeCommonTags={setCommonTags}
                  tagsPlaceholder="ENTER TAGS"
                  commonTagsPlaceholder="ENTER COMMON TAGS"
                />
              </View>
              <View style={styles.divider} />
              <View style={styles.tagsContainer}>
                <MultiSelectDropDown
                  options={piiOptions}
                  placeholder="CHOOSE PII"
                  textColor={theme.COLORS.WHITE}
                  selectedIndices={pii[selectedIndex]}
                  onSelect={(val) =>
                    handlePiiSelect(val, selectedIndex, pii, setPii)
                  }
                />
                <MultiSelectDropDown
                  options={bountyOptions}
                  textColor={theme.COLORS.WHITE}
                  selectedIndices={bounties[selectedIndex]}
                  placeholder="CHOOSE BOUNTIES"
                  onSelect={(val) =>
                    handleBountySelect(
                      val,
                      selectedIndex,
                      bounties,
                      setBounties,
                    )
                  }
                />
              </View>
              <View style={styles.divider} />
              <View style={styles.actionsContainer}>
                <LinearGradient
                  end={{x: 1, y: 0}}
                  start={{x: 0.15, y: 0}}
                  colors={[
                    theme.COLORS.DARK_PURPLE_1,
                    theme.COLORS.DARK_BLUE_1,
                  ]}
                  style={styles.radius30}>
                  <Ripple
                    style={styles.gradientButtonInner}
                    onPress={() => navigation.navigate('ImageUpload')}>
                    <FeatherIcon
                      size={20}
                      name="upload"
                      color={theme.COLORS.WHITE}
                      style={styles.buttonIconLeft}
                    />
                    <Text style={styles.buttonText}>Upload</Text>
                  </Ripple>
                </LinearGradient>
                <View style={styles.button}>
                  <LinearGradient
                    end={{x: 1, y: 0}}
                    start={{x: 0.15, y: 0}}
                    colors={[
                      theme.COLORS.LIGHT_PURPLE,
                      theme.COLORS.LIGHT_BLUE,
                    ]}
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
                            onConfirmPressed: () => {navigation.goBack()},
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
          <DotNavigation
            count={files && files.length ? files.length : 0}
            onChange={setSelectedIndex}
            selectedIndex={selectedIndex}
          />
        </ScrollView>
    </View>
  );
};

export default Upload;