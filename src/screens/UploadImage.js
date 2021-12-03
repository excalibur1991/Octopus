import Tag from '../components/Tag';
import Button from '../components/Button';
import {theme} from '../services/Common/theme';
import TextInput from '../components/TextInput';
import ImageTagInput from '../components/ImageTagInput';
import React, {useState} from 'react';
import MultiSelectDropDown from '../components/MultiSelectDropDown';
import UploadProgress from '../components/UploadProgress';
const CloudUpload = require('../assets/cloud_upload.png');
const Test = require('../assets/image_upload_mission_test.png');
import {ScrollView, Text, View, Image, Platform} from 'react-native';
import DotNavigation from '../components/DotNavigation';
import styles from '../styles/uploadimage';
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

const Upload = ({navigation}) => {
  const [files, setFiles] = useState(['a']);
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
    <View style={styles.container}>
      {(files && files.length > 0) || readOnly ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.uploadScrollContainer}>
          {readOnly ? (
            <>
              <View style={styles.readOnlyContainer}>
                <Image
                  borderRadius={10}
                  resizeMode="stretch"
                  style={[styles.image, styles.space]}
                  source={{uri: files[selectedIndex].uri}}
                />
                <Text style={styles.textFieldHeader}>Description</Text>
                <View style={styles.descriptionContainer}>
                  <ScrollView
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}>
                    <Text style={styles.text}>
                      {descriptions[selectedIndex]}
                    </Text>
                  </ScrollView>
                </View>
                <Text style={styles.textFieldHeader}>Tags</Text>
                <View style={styles.readOnlyTagsContainer}>
                  {tags &&
                    tags[selectedIndex] &&
                    tags[selectedIndex].length > 0 &&
                    tags[selectedIndex].map((tag) => (
                      <Tag
                        title={tag}
                        iconColor="#fff"
                        textColor="#fff"
                        backgroundColor="#405570"
                      />
                    ))}
                  {commonTags &&
                    commonTags.length > 0 &&
                    commonTags.map((commonTag) => (
                      <Tag
                        iconColor="#fff"
                        textColor="#fff"
                        title={commonTag}
                        backgroundColor="#663b69"
                      />
                    ))}
                  {pii &&
                    pii[selectedIndex] &&
                    pii[selectedIndex].length > 0 &&
                    piiOptions &&
                    piiOptions.length > 0 &&
                    pii[selectedIndex].map((index) => (
                      <Tag title={piiOptions[index]} />
                    ))}
                  {bounties &&
                    bounties[selectedIndex] &&
                    bounties[selectedIndex].length > 0 &&
                    bountyOptions &&
                    bountyOptions.length > 0 &&
                    bounties[selectedIndex].map((index) => (
                      <Tag
                        title={bountyOptions[index]}
                        backgroundColor="#F5C3CB"
                      />
                    ))}
                </View>
              </View>
              <Button
                disabled={loading}
                loading={loading}
                color={theme.APP_COLOR}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title={'Submit Description & Tags'}
                onPress={() => {
                  const allPiiTags = [],
                    allBountyTags = [];
                  pii.forEach((item) => {
                    if (item && item.length > 0) {
                      const piiTags = [];
                      item.forEach((index) => {
                        piiTags.push(piiOptions[index]);
                      });
                      allPiiTags.push(piiTags);
                    } else {
                      allPiiTags.push([]);
                    }
                  });
                  bounties.forEach((item) => {
                    if (item && item.length > 0) {
                      const bountyTags = [];
                      item.forEach((index) => {
                        bountyTags.push(bountyOptions[index]);
                      });
                      allBountyTags.push(bountyTags);
                    } else {
                      allBountyTags.push([]);
                    }
                  });
                  submitMultipleImageTags(
                    dispatch,
                    setLoading,
                    fileUploadResponses,
                    navigation,
                    descriptions,
                    tags,
                    commonTags,
                    allPiiTags,
                    allBountyTags,
                  );
                }}
              />
            </>
          ) : files && files.length > 0 ? (
            <>
              {/* <UploadProgress
                progress={
                  selectedIndex === uploadingImageIndex
                    ? 0.8
                    : fileUploadResponses &&
                      fileUploadResponses.length > 0 &&
                      fileUploadResponses[selectedIndex]
                    ? 1
                    : 0
                }
                success={getSuccess(fileUploadResponses, selectedIndex)}
                error={getError(fileUploadResponses, selectedIndex)}
                onCancel={() =>
                  onRemove(
                    files,
                    setFiles,
                    fileUploadResponses,
                    setFileUploadResponses,
                    selectedIndex,
                  )
                }
              /> */}
              <View style={styles.imageDescriptionContainer}>
                {/* {files[selectedIndex] && files[selectedIndex].uri && (
                  <Image
                    borderRadius={10}
                    resizeMode="stretch"
                    style={styles.uploadImage}
                    source={{uri: files[selectedIndex].uri}}
                  />
                )} */}
                <>
                  <Image
                    source={Test}
                    resizeMode="stretch"
                    style={styles.uploadImage}
                  />
                  <Text style={styles.imageCount}>1/5</Text>
                </>
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
                  tags={tags[selectedIndex]}
                  commonTags={commonTags}
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
                            onConfirmPressed: () => {},
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
            </>
          ) : null}
          <DotNavigation
            count={files && files.length ? files.length : 0}
            onChange={setSelectedIndex}
            selectedIndex={selectedIndex}
          />
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.uploadContainer}>
          <View style={styles.uploadBorderContainer}>
            <Image
              resizeMode="stretch"
              source={CloudUpload}
              style={styles.imageIcon}
            />
            <Text style={[styles.uploadText, styles.marginBottom3p]}>
              <Text
                onPress={() => {
                  navigation.navigate('Legal', {screen: 'ImageCategorization'});
                }}>
                Personal Information,{' '}
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate('About');
                }}>
                Tutorial,{' '}
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate('Legal', {screen: 'Bounty'});
                }}>
                Data Bounties
              </Text>
            </Text>
            <Button
              title="Upload"
              onPress={() =>
                onPickFile(
                  files,
                  setFiles,
                  fileUploadResponses,
                  setFileUploadResponses,
                  setUploadingImageIndex,
                )
              }
              color={theme.APP_COLOR}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Upload;

// import Tag from '../components/Tag';
// import Button from '../components/Button';
// import {theme} from '../services/Common/theme';
// import TextInput from '../components/TextInput';
// import ImageTagInput from '../components/ImageTagInput';
// import React, {useState} from 'react';
// import MultiSelectDropDown from '../components/MultiSelectDropDown';
// import UploadProgress from '../components/UploadProgress';
// const CloudUpload = require('../assets/cloud_upload.png');
// import {ScrollView, Text, View, Image, Link} from 'react-native';
// import DotNavigation from '../components/DotNavigation';
// import styles from '../styles/uploadimage';
// import {
//   onPickFile,
//   handlePiiSelect,
//   handleBountySelect,
//   verifyFields,
//   getSuccess,
//   getError,
//   onRemove,
//   canProceed,
//   submitMultipleImageTags,
//   handleChangeDescription,
//   handleChangeTags,
// } from '../functions/uploadimage';
// import {useStateValue} from '../services/State/State';

// const Upload = ({navigation}) => {
//   const [files, setFiles] = useState([]);
//   const [descriptions, setDescriptions] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [commonTags, setCommonTags] = useState([]);
//   const [pii, setPii] = useState([]);
//   const [bounties, setBounties] = useState([]);
//   const [fileUploadResponses, setFileUploadResponses] = useState([]);
//   const [uploadingImageIndex, setUploadingImageIndex] = useState(null);
//   const [readOnly, setReadOnly] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [, dispatch] = useStateValue();
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const piiOptions = [
//     'This image contains biometric information',
//     'This image contains PII of faces',
//     'This image contains PII of non-faces',
//     'Copyright',
//   ];
//   const bountyOptions = [
//     'Anonymization Bounty (photos of faces)',
//     'Traffic sign bounty',
//     'Food bounty',
//     'Project.bb bounty(cigarette butts on the beach)',
//     'NFT Bounty (photos of NFTs)',
//     'OCR Bounty (photos with text in them)',
//     'Meme Bounty',
//     'Product Bounty (photos of products)',
//   ];

//   return (
//     <View style={styles.container}>
//       {(files && files.length > 0) || readOnly ? (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.uploadScrollContainer}>
//           {readOnly ? (
//             <>
//               <View style={styles.readOnlyContainer}>
//                 <Image
//                   borderRadius={10}
//                   resizeMode="stretch"
//                   style={[styles.image, styles.space]}
//                   source={{uri: files[selectedIndex].uri}}
//                 />
//                 <Text style={styles.textFieldHeader}>Description</Text>
//                 <View style={styles.descriptionContainer}>
//                   <ScrollView
//                     nestedScrollEnabled
//                     showsVerticalScrollIndicator={false}>
//                     <Text style={styles.text}>
//                       {descriptions[selectedIndex]}
//                     </Text>
//                   </ScrollView>
//                 </View>
//                 <Text style={styles.textFieldHeader}>Tags</Text>
//                 <View style={styles.readOnlyTagsContainer}>
//                   {tags &&
//                     tags[selectedIndex] &&
//                     tags[selectedIndex].length > 0 &&
//                     tags[selectedIndex].map((tag) => (
//                       <Tag
//                         title={tag}
//                         iconColor="#fff"
//                         textColor="#fff"
//                         backgroundColor="#405570"
//                       />
//                     ))}
//                   {commonTags &&
//                     commonTags.length > 0 &&
//                     commonTags.map((commonTag) => (
//                       <Tag
//                         iconColor="#fff"
//                         textColor="#fff"
//                         title={commonTag}
//                         backgroundColor="#663b69"
//                       />
//                     ))}
//                   {pii &&
//                     pii[selectedIndex] &&
//                     pii[selectedIndex].length > 0 &&
//                     piiOptions &&
//                     piiOptions.length > 0 &&
//                     pii[selectedIndex].map((index) => (
//                       <Tag title={piiOptions[index]} />
//                     ))}
//                   {bounties &&
//                     bounties[selectedIndex] &&
//                     bounties[selectedIndex].length > 0 &&
//                     bountyOptions &&
//                     bountyOptions.length > 0 &&
//                     bounties[selectedIndex].map((index) => (
//                       <Tag
//                         title={bountyOptions[index]}
//                         backgroundColor="#F5C3CB"
//                       />
//                     ))}
//                 </View>
//               </View>
//               <Button
//                 disabled={loading}
//                 loading={loading}
//                 color={theme.APP_COLOR}
//                 buttonStyle={styles.button}
//                 textStyle={styles.buttonText}
//                 title={'Submit Description & Tags'}
//                 onPress={() => {
//                   const allPiiTags = [],
//                     allBountyTags = [];
//                   pii.forEach((item) => {
//                     if (item && item.length > 0) {
//                       const piiTags = [];
//                       item.forEach((index) => {
//                         piiTags.push(piiOptions[index]);
//                       });
//                       allPiiTags.push(piiTags);
//                     } else {
//                       allPiiTags.push([]);
//                     }
//                   });
//                   bounties.forEach((item) => {
//                     if (item && item.length > 0) {
//                       const bountyTags = [];
//                       item.forEach((index) => {
//                         bountyTags.push(bountyOptions[index]);
//                       });
//                       allBountyTags.push(bountyTags);
//                     } else {
//                       allBountyTags.push([]);
//                     }
//                   });
//                   submitMultipleImageTags(
//                     dispatch,
//                     setLoading,
//                     fileUploadResponses,
//                     navigation,
//                     descriptions,
//                     tags,
//                     commonTags,
//                     allPiiTags,
//                     allBountyTags,
//                   );
//                 }}
//               />
//             </>
//           ) : files && files.length > 0 ? (
//             <>
//               <UploadProgress
//                 progress={
//                   selectedIndex === uploadingImageIndex
//                     ? 0.8
//                     : fileUploadResponses &&
//                       fileUploadResponses.length > 0 &&
//                       fileUploadResponses[selectedIndex]
//                     ? 1
//                     : 0
//                 }
//                 success={getSuccess(fileUploadResponses, selectedIndex)}
//                 error={getError(fileUploadResponses, selectedIndex)}
//                 onCancel={() =>
//                   onRemove(
//                     files,
//                     setFiles,
//                     fileUploadResponses,
//                     setFileUploadResponses,
//                     selectedIndex,
//                   )
//                 }
//               />
//               <View style={styles.imageDescriptionBox}>
//                 {files[selectedIndex] && files[selectedIndex].uri && (
//                   <Image
//                     borderRadius={10}
//                     resizeMode="stretch"
//                     style={styles.uploadImage}
//                     source={{uri: files[selectedIndex].uri}}
//                   />
//                 )}
//                 <View style={styles.descriptionTextInput}>
//                   <TextInput
//                     isTextArea
//                     value={descriptions[selectedIndex]}
//                     placeholder="Add Description"
//                     onChangeText={(val) =>
//                       handleChangeDescription(
//                         val,
//                         selectedIndex,
//                         descriptions,
//                         setDescriptions,
//                       )
//                     }
//                   />
//                 </View>
//               </View>
//               <ImageTagInput
//                 tags={tags[selectedIndex]}
//                 commonTags={commonTags}
//                 onChangeTags={(val) =>
//                   handleChangeTags(val, selectedIndex, tags, setTags)
//                 }
//                 onChangeCommonTags={setCommonTags}
//                 tagsPlaceholder="Enter Tags"
//                 commonTagsPlaceholder="Enter Common Tags"
//               />
//               <MultiSelectDropDown
//                 textColor={theme.APP_COLOR}
//                 placeholder="Choose PII"
//                 options={piiOptions}
//                 selectedIndices={pii[selectedIndex]}
//                 onSelect={(val) =>
//                   handlePiiSelect(val, selectedIndex, pii, setPii)
//                 }
//               />
//               <MultiSelectDropDown
//                 textColor="#ED8495"
//                 options={bountyOptions}
//                 selectedIndices={bounties[selectedIndex]}
//                 placeholder="Choose Bounties"
//                 onSelect={(val) =>
//                   handleBountySelect(val, selectedIndex, bounties, setBounties)
//                 }
//               />
//               <View style={styles.rowSpaceBetween}>
//                 <Button
//                   color={theme.APP_COLOR}
//                   title="Upload"
//                   style={styles.width49p}
//                   buttonStyle={styles.button}
//                   onPress={() =>
//                     onPickFile(
//                       files,
//                       setFiles,
//                       fileUploadResponses,
//                       setFileUploadResponses,
//                       setUploadingImageIndex,
//                     )
//                   }
//                   textStyle={styles.buttonText}
//                 />
//                 <Button
//                   color={theme.APP_COLOR}
//                   title="Next"
//                   disabled={!canProceed(fileUploadResponses)}
//                   style={styles.width49p}
//                   buttonStyle={styles.button}
//                   onPress={() => {
//                     if (
//                       verifyFields(
//                         dispatch,
//                         fileUploadResponses,
//                         descriptions,
//                         tags,
//                         setSelectedIndex,
//                       )
//                     ) {
//                       const allFiles = [],
//                         allFileUploadResponses = [],
//                         allDescriptions = [],
//                         allTags = [],
//                         allPiiTags = [],
//                         allBountyTags = [];
//                       for (const [
//                         index,
//                         fileUploadResponse,
//                       ] of fileUploadResponses.entries()) {
//                         if (fileUploadResponse && fileUploadResponse.id) {
//                           allFiles.push(files[index]);
//                           allFileUploadResponses.push(fileUploadResponse);
//                           allDescriptions.push(descriptions[index]);
//                           allTags.push(tags[index]);
//                           allPiiTags.push(pii[index]);
//                           allBountyTags.push(bounties[index]);
//                         }
//                       }
//                       setFiles(allFiles);
//                       setFileUploadResponses(allFileUploadResponses);
//                       setDescriptions(allDescriptions);
//                       setTags(allTags);
//                       setPii(allPiiTags);
//                       setBounties(allBountyTags);
//                       setSelectedIndex(0);
//                       setReadOnly(true);
//                     }
//                   }}
//                   textStyle={styles.buttonText}
//                 />
//               </View>
//             </>
//           ) : null}
//           <DotNavigation
//             count={files && files.length ? files.length : 0}
//             onChange={setSelectedIndex}
//             selectedIndex={selectedIndex}
//           />
//         </ScrollView>
//       ) : (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.uploadContainer}>
//           <View style={styles.uploadBorderContainer}>
//             <Image
//               resizeMode="stretch"
//               source={CloudUpload}
//               style={styles.imageIcon}
//             />
//             <Text style={[styles.uploadText, styles.marginBottom3p]}>
//               <Text
//                 onPress={() => {
//                   navigation.navigate('Legal', {screen: 'ImageCategorization'});
//                 }}>
//                 Personal Information,{' '}
//               </Text>
//               <Text
//                 onPress={() => {
//                   navigation.navigate('About');
//                 }}>
//                 Tutorial,{' '}
//               </Text>
//               <Text
//                 onPress={() => {
//                   navigation.navigate('Legal', {screen: 'Bounty'});
//                 }}>
//                 Data Bounties
//               </Text>
//             </Text>
//             <Button
//               title="Upload"
//               onPress={() =>
//                 onPickFile(
//                   files,
//                   setFiles,
//                   fileUploadResponses,
//                   setFileUploadResponses,
//                   setUploadingImageIndex,
//                 )
//               }
//               color={theme.APP_COLOR}
//               buttonStyle={styles.button}
//               textStyle={styles.buttonText}
//             />
//           </View>
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// export default Upload;
