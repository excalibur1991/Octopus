/* eslint-disable react-native/no-inline-styles */
import Button from '../components/Button';
import {theme} from '../services/Common/theme';
import React, {useRef, useState} from 'react';
import {ScrollView, Text, View, Image, Platform} from 'react-native';
import {actions} from '../services/State/Reducer';
import styles from '../styles/romannumberupload';
import * as Progress from 'react-native-progress';
import {
  onPickFile,
  clearAll,
  uploadRomanNumber,
  saveCanvasImage,
  next,
} from '../functions/romannumberupload';
import {useStateValue} from '../services/State/State';
import Ripple from '../components/Ripple';
import NumberScroll from '../components/NumberScroll';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

const Upload = ({navigation}) => {
  const [file, setFile] = useState(null);
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [, dispatch] = useStateValue();
  const canvasRef = useRef();
  const romanNumbers = [
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.uploadScrollContainer}>
        <Text style={styles.head}>Draw Selected Number</Text>
        <View style={styles.rowFlexAlignCenter}>
          <View style={styles.rowFlexAlignCenter}>
            <Text style={styles.orText}>or</Text>
            <Ripple
              onPress={() => onPickFile(setFile)}
              outerStyle={styles.buttonOuter}
              innerStyle={styles.buttonInner}>
              <Text style={styles.galleryButtonText}>Choose from Gallery</Text>
            </Ripple>
          </View>
          <Ripple
            onPress={() =>
              clearAll(
                setFile,
                canvasRef,
                setLoading,
                setProgress,
                setSelectedNumberIndex,
              )
            }
            outerStyle={styles.buttonOuter}
            innerStyle={styles.clearButtonInner}>
            <Text style={styles.galleryButtonText}>Clear</Text>
          </Ripple>
        </View>
        <View style={file && file.uri ? {} : styles.drawingContainer}>
          {file && file.uri ? (
            <Image
              borderRadius={5}
              resizeMode="stretch"
              source={{uri: file.uri}}
              style={styles.uploadImage}
            />
          ) : (
            <SketchCanvas
              ref={canvasRef}
              strokeWidth={10}
              style={{flex: 1}}
              onSketchSaved={(success, path) => {
                //console.log('onSketchSaved: ',success, path);
                if (success) {
                  const uploadFile = {
                    uri: 'file://' + path,
                    name: 'RomanNumberFile.jpg',
                    type: 'image/jpg',
                  };
                  const romanNumber = romanNumbers[selectedNumberIndex];
                  uploadRomanNumber(
                    uploadFile,
                    ['roman-letter-bounty', romanNumber.toLowerCase()],
                    dispatch,
                    setLoading,
                    navigation,
                    setProgress,
                  );
                } else {
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
                }
              }}
            />
          )}
        </View>
        <View style={styles.numberScrollContainer}>
          <NumberScroll
            style={styles.numberScroll}
            data={romanNumbers}
            renderItem={(item) => (
              <Text style={styles.numberScrollText}>{item}</Text>
            )}
            itemWidth={Platform.OS === 'android' ? 50 : 58}
            initialIndex={0}
            selectedIndex={selectedNumberIndex}
            onChange={(val) => setSelectedNumberIndex(val)}
          />
        </View>
        <View style={styles.rowSpaceBetween}>
          {loading || progress === 1 ? (
            <>
              {progress && progress === 1 ? (
                <Button
                  title="Next"
                  color={theme.APP_COLOR}
                  style={styles.width30p}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                  onPress={() => {
                    clearAll(
                      setFile,
                      canvasRef,
                      setLoading,
                      setProgress,
                      setSelectedNumberIndex,
                    );
                    next(
                      romanNumbers,
                      selectedNumberIndex,
                      setSelectedNumberIndex,
                    );
                  }}
                />
              ) : (
                <Button
                  title="Cancel"
                  color={theme.APP_COLOR}
                  style={styles.width30p}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                  onPress={() =>
                    clearAll(
                      setFile,
                      canvasRef,
                      setLoading,
                      setProgress,
                      setSelectedNumberIndex,
                    )
                  }
                />
              )}
              <View style={styles.width70p}>
                <View style={styles.progressContainer}>
                  <Text style={styles.uploadText}>
                    {progress && progress === 1
                      ? 'Uploaded'
                      : `Uploading... (${Math.floor(progress * 100)}%)`}
                  </Text>
                  <Progress.Bar
                    width={185}
                    height={6}
                    progress={progress}
                    color="#4e9cf9"
                    borderWidth={0}
                    unfilledColor="#e0eeff"
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <Button
                title="Stats"
                color={theme.APP_COLOR}
                style={styles.width30p}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                onPress={() => navigation.navigate('RomanNumberStats')}
                disabled={loading}
              />
              <Button
                title="Upload"
                color={theme.APP_COLOR}
                style={styles.width70p}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                onPress={() => {
                  if (file && file.uri) {
                    const romanNumber = romanNumbers[selectedNumberIndex];
                    uploadRomanNumber(
                      file,
                      ['roman-letter-bounty', romanNumber.toLowerCase()],
                      dispatch,
                      setLoading,
                      navigation,
                      setProgress,
                    );
                  } else {
                    saveCanvasImage(canvasRef);
                  }
                }}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Upload;
