import Tag from '../components/Tag';
import Button from '../components/Button';
import {theme} from '../services/Common/theme';
import TextInput from '../components/TextInput';
import ImageTagInput from '../components/ImageTagInput';
import React, {useState} from 'react';
import MultiSelectDropDown from '../components/MultiSelectDropDown';
import UploadProgress from '../components/UploadProgress';
const CloudUpload = require('../assets/cloud_upload.png');
import {ScrollView, Text, View, Image} from 'react-native';
import DotNavigation from '../components/DotNavigation';
import styles from '../styles/uploadimage';
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

const Upload = ({navigation}) => {
  const [files, setFiles] = useState([]);
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
              <UploadProgress
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
              />
              <View style={styles.imageDescriptionBox}>
                {files[selectedIndex] && files[selectedIndex].uri && (
                  <Image
                    borderRadius={10}
                    resizeMode="stretch"
                    style={styles.uploadImage}
                    source={{uri: files[selectedIndex].uri}}
                  />
                )}
                <View style={styles.descriptionTextInput}>
                  <TextInput
                    isTextArea
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
              <ImageTagInput
                tags={tags[selectedIndex]}
                commonTags={commonTags}
                onChangeTags={(val) =>
                  handleChangeTags(val, selectedIndex, tags, setTags)
                }
                onChangeCommonTags={setCommonTags}
                tagsPlaceholder="Enter Tags"
                commonTagsPlaceholder="Enter Common Tags"
              />
              <MultiSelectDropDown
                textColor={theme.APP_COLOR}
                placeholder="Choose PII"
                options={piiOptions}
                selectedIndices={pii[selectedIndex]}
                onSelect={(val) =>
                  handlePiiSelect(val, selectedIndex, pii, setPii)
                }
              />
              <MultiSelectDropDown
                textColor="#ED8495"
                options={bountyOptions}
                selectedIndices={bounties[selectedIndex]}
                placeholder="Choose Bounties"
                onSelect={(val) =>
                  handleBountySelect(val, selectedIndex, bounties, setBounties)
                }
              />
              <View style={styles.rowSpaceBetween}>
                <Button
                  color={theme.APP_COLOR}
                  title="Upload"
                  style={styles.width49p}
                  buttonStyle={styles.button}
                  onPress={() =>
                    onPickFile(
                      files,
                      setFiles,
                      fileUploadResponses,
                      setFileUploadResponses,
                      setUploadingImageIndex,
                    )
                  }
                  textStyle={styles.buttonText}
                />
                <Button
                  color={theme.APP_COLOR}
                  title="Next"
                  disabled={!canProceed(fileUploadResponses)}
                  style={styles.width49p}
                  buttonStyle={styles.button}
                  onPress={() => {
                    if (
                      verifyFields(
                        dispatch,
                        fileUploadResponses,
                        descriptions,
                        tags,
                        setSelectedIndex,
                      )
                    ) {
                      const allFiles = [],
                        allFileUploadResponses = [],
                        allDescriptions = [],
                        allTags = [],
                        allPiiTags = [],
                        allBountyTags = [];
                      for (const [
                        index,
                        fileUploadResponse,
                      ] of fileUploadResponses.entries()) {
                        if (fileUploadResponse && fileUploadResponse.id) {
                          allFiles.push(files[index]);
                          allFileUploadResponses.push(fileUploadResponse);
                          allDescriptions.push(descriptions[index]);
                          allTags.push(tags[index]);
                          allPiiTags.push(pii[index]);
                          allBountyTags.push(bounties[index]);
                        }
                      }
                      setFiles(allFiles);
                      setFileUploadResponses(allFileUploadResponses);
                      setDescriptions(allDescriptions);
                      setTags(allTags);
                      setPii(allPiiTags);
                      setBounties(allBountyTags);
                      setSelectedIndex(0);
                      setReadOnly(true);
                    }
                  }}
                  textStyle={styles.buttonText}
                />
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
              Personal Information, Tutorial, Data Bounties
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
