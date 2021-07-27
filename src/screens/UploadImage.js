/* eslint-disable no-shadow */

import Tag from '../components/Tag';
import Button from '../components/Button';
import {theme} from '../services/Common/theme';
import TextInput from '../components/TextInput';
import ImageTagInput from '../components/ImageTagInput';
import React, {useState} from 'react';
import MultiSelect from '../components/MultiSelect';
import UploadProgress from '../components/UploadProgress';
import UploadProgressTile from '../components/UploadProgressTile';
const CloudUpload = require('../assets/cloud_upload.png');
import {ScrollView, Text, View, Image} from 'react-native';
import styles from '../styles/uploadimage';
import {
  onPickFile,
  handlePiiSelect,
  handleBountySelect,
  verifyFields,
  submitTags,
  getSuccess,
  getError,
  onRemove,
  canProceed,
  submitMultipleImageTags,
} from '../functions/uploadimage';
import {useStateValue} from '../services/State/State';

const Upload = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [fileUploadResponses, setFileUploadResponses] = useState([]);
  const [uploadingImageIndex, setUploadingImageIndex] = useState(null);
  const [imageId, setImageId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [readOnly, setReadOnly] = useState(false);
  const [multipleFileInputMode, setMultipleFileInputMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [pii, setPii] = useState([]);
  const [bounties, setBounties] = useState([]);
  const [, dispatch] = useStateValue();

  const piiOptions = [
    'This image contains biometric information',
    'This image contains PII of faces',
    'This image contains PII of non-faces',
    'Copyright',
  ];
  const bountyOptions = ['Anonymization Bounty (photos of faces)',
  'Traffic sign bounty', 
  'Food bounty',
  'Project.bb bounty(cigarette butts on the beach)',
  'NFT Bounty (photos of NFTs)',
  'OCR Bounty (photos with text in them)',
  'Meme Bounty',
  'Product Bounty (photos of products)'
];

  return (
    <View style={styles.container}>
      {readOnly ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.uploadScrollContainer}>
          <View style={styles.readOnlyContainer}>
            {files && files.length > 0
              ? fileUploadResponses && fileUploadResponses.length > 0
                ? files.map((file, index) =>
                    fileUploadResponses[index].id ? (
                      <Image
                        borderRadius={10}
                        resizeMode="stretch"
                        style={[styles.image, styles.space]}
                        source={{uri: file.uri}}
                      />
                    ) : null,
                  )
                : files[0] &&
                  files[0].uri && (
                    <Image
                      borderRadius={10}
                      resizeMode="stretch"
                      style={styles.image}
                      source={{uri: files[0].uri}}
                    />
                  )
              : null}
            <Text style={styles.textFieldHeader}>Description</Text>
            <View style={styles.descroptionContainer}>
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}>
                <Text style={styles.text}>{description}</Text>
              </ScrollView>
            </View>
            <Text style={styles.textFieldHeader}>Tags</Text>
            <View style={styles.readOnlyTagsContainer}>
              {tags &&
                tags.length > 0 &&
                tags.map((tag) => <Tag title={tag} />)}
              {pii &&
                pii.length > 0 &&
                piiOptions &&
                piiOptions.length > 0 &&
                pii.map((index) => <Tag title={piiOptions[index]} />)}
              {bounties &&
                bounties.length > 0 &&
                bountyOptions &&
                bountyOptions.length > 0 &&
                bounties.map((index) => (
                  <Tag title={bountyOptions[index]} color="#F5C3CB" />
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
              if (fileUploadResponses && fileUploadResponses.length > 0) {
                submitMultipleImageTags(
                  dispatch,
                  setLoading,
                  fileUploadResponses,
                  navigation,
                  description,
                  tags,
                );
              } else {
                submitTags(
                  dispatch,
                  setLoading,
                  navigation,
                  imageId,
                  description,
                  tags,
                );
              }
            }}
          />
        </ScrollView>
      ) : files && files.length > 0 ? (
        files.length === 1 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.uploadScrollContainer}>
            <UploadProgress
              file={files[0]}
              progress={progress}
              success={success}
              error={error}
              errorText={errorText}
              onCancel={() => {
                setProgress(0);
                setSuccess(false);
                setError(false);
                setErrorText('');
                setFiles([]);
              }}
            />
            <TextInput
              isTextArea
              value={description}
              placeholder="Add Description"
              onChangeText={setDescription}
            />
            <ImageTagInput
              tags={tags}
              onChange={setTags}
              placeholder="Enter tags"
              onSubmitEditing={() => {
                const allTags = tags.slice();
                allTags.push(tag);
                setTag('');
                setTags(allTags);
              }}
            />
            <MultiSelect
              textColor={theme.APP_COLOR}
              placeholder="Choose PII"
              options={piiOptions}
              selectedIndices={pii}
              onSelect={(val) => handlePiiSelect(val, pii, setPii)}
            />
            <MultiSelect
              textColor="#ED8495"
              options={bountyOptions}
              selectedIndices={bounties}
              placeholder="Choose Bounties"
              onSelect={(val) => handleBountySelect(val, bounties, setBounties)}
            />
            <Button
              color={theme.APP_COLOR}
              title={error ? 'Upload' : success ? 'Next' : 'Back'}
              buttonStyle={styles.button}
              onPress={() => {
                if (error) {
                  onPickFile(
                    dispatch,
                    files,
                    setFiles,
                    fileUploadResponses,
                    setFileUploadResponses,
                    setUploadingImageIndex,
                    setProgress,
                    setSuccess,
                    setError,
                    setErrorText,
                    setImageId,
                  );
                } else if (success) {
                  if (verifyFields(dispatch, description, tags)) {
                    setReadOnly(true);
                  }
                } else {
                  setFiles([]);
                }
              }}
              textStyle={styles.buttonText}
            />
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.uploadScrollContainer}>
            <Text style={styles.multipleFilesHeader}>Files</Text>
            {files.map((file, index) => (
              <UploadProgressTile
                file={file}
                progress={
                  index === uploadingImageIndex
                    ? 0.8
                    : fileUploadResponses &&
                      fileUploadResponses.length > 0 &&
                      fileUploadResponses[index]
                    ? 1
                    : 0
                }
                success={getSuccess(fileUploadResponses, index)}
                error={getError(fileUploadResponses, index)}
                onRemove={() =>
                  onRemove(
                    files,
                    setFiles,
                    fileUploadResponses,
                    setFileUploadResponses,
                    index,
                  )
                }
              />
            ))}
            {multipleFileInputMode ? (
              <>
                <TextInput
                  isTextArea
                  value={description}
                  placeholder="Add Description"
                  onChangeText={setDescription}
                />
                <ImageTagInput
                  tags={tags}
                  onChange={setTags}
                  placeholder="Enter tags"
                  onSubmitEditing={() => {
                    const allTags = tags.slice();
                    allTags.push(tag);
                    setTag('');
                    setTags(allTags);
                  }}
                />
                <MultiSelect
                  textColor={theme.APP_COLOR}
                  placeholder="Choose PII"
                  options={piiOptions}
                  selectedIndices={pii}
                  onSelect={(val) => handlePiiSelect(val, pii, setPii)}
                />
                <MultiSelect
                  textColor="#ED8495"
                  options={bountyOptions}
                  selectedIndices={bounties}
                  placeholder="Choose Bounties"
                  onSelect={(val) =>
                    handleBountySelect(val, bounties, setBounties)
                  }
                />
                <Button
                  color={theme.APP_COLOR}
                  title="Next"
                  buttonStyle={styles.button}
                  onPress={() => {
                    if (verifyFields(dispatch, description, tags)) {
                      setReadOnly(true);
                    }
                  }}
                  textStyle={styles.buttonText}
                />
              </>
            ) : (
              <>
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
                    title="Upload Image"
                    onPress={() =>
                      onPickFile(
                        dispatch,
                        files,
                        setFiles,
                        fileUploadResponses,
                        setFileUploadResponses,
                        setUploadingImageIndex,
                        setProgress,
                        setSuccess,
                        setError,
                        setErrorText,
                        setImageId,
                        true,
                      )
                    }
                    color={theme.APP_COLOR}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                  />
                </View>
                <Button
                  title="Next"
                  color={theme.APP_COLOR}
                  disabled={!canProceed(fileUploadResponses)}
                  buttonStyle={styles.button}
                  onPress={() => setMultipleFileInputMode(true)}
                  textStyle={styles.buttonText}
                />
              </>
            )}
          </ScrollView>
        )
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
                  dispatch,
                  files,
                  setFiles,
                  fileUploadResponses,
                  setFileUploadResponses,
                  setUploadingImageIndex,
                  setProgress,
                  setSuccess,
                  setError,
                  setErrorText,
                  setImageId,
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
