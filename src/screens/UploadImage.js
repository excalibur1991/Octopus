/* eslint-disable no-shadow */

import Tag from '../components/Tag';
import Button from '../components/Button';
import {theme} from '../services/Common/theme';
import TextInput from '../components/TextInput';
import ImageTagInput from '../components/ImageTagInput';
import React, {useEffect, useState} from 'react';
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
} from '../functions/uploadimage';

const Upload = () => {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(
    'Image width too small, minimum allowed [400]',
  );
  const [readOnly, setReadOnly] = useState(false);
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [pii, setPii] = useState([]);
  const [bounties, setBounties] = useState([]);

  const piiOptions = [
    'This image contains PII of faces',
    'This image contains PII of non-faces',
    'Copyright',
  ];
  const bountyOptions = ['Traffic sign bounty', 'Food bounty'];

  useEffect(() => {
    if (files && files.length > 0 && files[0] && files[0].uri) {
      setTimeout(() => {
        setSuccess(true);
        // setError(true);
      }, 2000);
    } else {
      setSuccess(false);
    }
  }, [files]);

  return (
    <View style={styles.container}>
      {readOnly ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.uploadScrollContainer}>
          <View style={styles.readOnlyContainer}>
            {files && files[0] && files[0].uri && (
              <Image
                borderRadius={10}
                resizeMode="stretch"
                style={styles.image}
                source={{uri: files[0].uri}}
              />
            )}
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
            onPress={() => {}}
            color={theme.APP_COLOR}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            title={'Submit Description & Tags'}
          />
        </ScrollView>
      ) : files && files.length > 0 ? (
        files.length === 1 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.uploadScrollContainer}>
            <UploadProgress
              file={files[0]}
              progress={progress || 0.5}
              success={success}
              error={error}
              errorText={errorText}
              onCancel={() => setFiles([])}
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
                  onPickFile(files, setFiles, setProgress);
                } else if (success) {
                  setReadOnly(true);
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
              <UploadProgressTile file={file} success={index % 2 === 0} />
            ))}
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
                onPress={() => onPickFile(files, setFiles, setProgress, true)}
                color={theme.APP_COLOR}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
              />
            </View>
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
              onPress={() => onPickFile(files, setFiles, setProgress)}
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
