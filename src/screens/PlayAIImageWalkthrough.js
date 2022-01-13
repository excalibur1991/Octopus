/* eslint-disable no-unused-vars */
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    Platform,
  } from 'react-native';
  import React, {useState} from 'react';
  import {useStateValue} from '../services/State/State';
  import {Chip} from 'react-native-paper';
  import Svg, {Defs, Pattern, Rect, Path, G} from 'react-native-svg';
  import {theme} from '../services/Common/theme';
  import * as Progress from 'react-native-progress';
  import Ripple from '../components/Ripple';
  const annotateImage1 = require('../assets/annotate_image_1.png');
  const annotateImage2 = require('../assets/annotate_image_2.png');
  const annotationTags = ['butterfly', 'flower', 'leaf'];
  
  const PlayAIImage = () => {
    const [{showAnnotateImagePageWalkthrough, walkthroughCurrentStep}] =
      useStateValue();
  
    const butterflyRects = Platform.select({
      android: [
        {x: 0, y: 90, width: 30, height: 30},
        {x: 0, y: 120, width: 30, height: 30},
        {x: 0, y: 150, width: 30, height: 30},
  
        {x: 30, y: 90, width: 30, height: 30},
        {x: 30, y: 120, width: 30, height: 30},
        {x: 30, y: 150, width: 30, height: 30},
  
        {x: 60, y: 90, width: 30, height: 30},
        {x: 60, y: 120, width: 30, height: 30},
        {x: 60, y: 150, width: 30, height: 30},
        {x: 60, y: 180, width: 30, height: 30},
        {x: 60, y: 210, width: 30, height: 30},
  
        {x: 90, y: 90, width: 30, height: 30},
        {x: 90, y: 120, width: 30, height: 30},
        {x: 90, y: 150, width: 30, height: 30},
        {x: 90, y: 180, width: 30, height: 30},
        {x: 90, y: 210, width: 30, height: 30},
  
        {x: 120, y: 90, width: 30, height: 30},
        {x: 120, y: 120, width: 30, height: 30},
        {x: 120, y: 150, width: 30, height: 30},
        {x: 120, y: 180, width: 30, height: 30},
        {x: 120, y: 210, width: 30, height: 30},
  
        {x: 150, y: 120, width: 30, height: 30},
        {x: 150, y: 150, width: 30, height: 30},
        {x: 150, y: 180, width: 30, height: 30},
        {x: 150, y: 210, width: 30, height: 30},
  
        {x: 180, y: 90, width: 30, height: 30},
        {x: 180, y: 120, width: 30, height: 30},
        {x: 180, y: 150, width: 30, height: 30},
        {x: 180, y: 180, width: 30, height: 30},
        {x: 180, y: 210, width: 30, height: 30},
  
        {x: 210, y: 90, width: 30, height: 30},
        {x: 210, y: 120, width: 30, height: 30},
        {x: 210, y: 150, width: 30, height: 30},
        {x: 210, y: 180, width: 30, height: 30},
        {x: 210, y: 210, width: 30, height: 30},
  
        {x: 240, y: 90, width: 30, height: 30},
        {x: 240, y: 120, width: 30, height: 30},
        {x: 240, y: 150, width: 30, height: 30},
        {x: 240, y: 180, width: 30, height: 30},
        {x: 240, y: 210, width: 30, height: 30},
  
        {x: 270, y: 90, width: 30, height: 30},
        {x: 270, y: 120, width: 30, height: 30},
        {x: 270, y: 150, width: 30, height: 30},
        {x: 270, y: 180, width: 30, height: 30},
  
        {x: 300, y: 90, width: 30, height: 30},
        {x: 300, y: 120, width: 30, height: 30},
        {x: 300, y: 150, width: 30, height: 30},
  
        {x: 330, y: 90, width: 30, height: 30},
        {x: 330, y: 120, width: 30, height: 30},
        {x: 330, y: 150, width: 30, height: 30},
      ],
      ios: [
        {x: 0, y: 90, width: 30, height: 30},
        {x: 0, y: 120, width: 30, height: 30},
        {x: 0, y: 150, width: 30, height: 30},
  
        {x: 30, y: 90, width: 30, height: 30},
        {x: 30, y: 120, width: 30, height: 30},
        {x: 30, y: 150, width: 30, height: 30},
  
        {x: 60, y: 90, width: 30, height: 30},
        {x: 60, y: 120, width: 30, height: 30},
        {x: 60, y: 150, width: 30, height: 30},
        {x: 60, y: 180, width: 30, height: 30},
        {x: 60, y: 210, width: 30, height: 30},
  
        {x: 90, y: 90, width: 30, height: 30},
        {x: 90, y: 120, width: 30, height: 30},
        {x: 90, y: 150, width: 30, height: 30},
        {x: 90, y: 180, width: 30, height: 30},
        {x: 90, y: 210, width: 30, height: 30},
  
        {x: 120, y: 120, width: 30, height: 30},
        {x: 120, y: 150, width: 30, height: 30},
        {x: 120, y: 180, width: 30, height: 30},
        {x: 120, y: 210, width: 30, height: 30},
        {x: 120, y: 240, width: 30, height: 30},
  
        {x: 150, y: 120, width: 30, height: 30},
        {x: 150, y: 150, width: 30, height: 30},
        {x: 150, y: 180, width: 30, height: 30},
        {x: 150, y: 210, width: 30, height: 30},
        {x: 150, y: 240, width: 30, height: 30},
  
        {x: 180, y: 120, width: 30, height: 30},
        {x: 180, y: 150, width: 30, height: 30},
        {x: 180, y: 180, width: 30, height: 30},
        {x: 180, y: 210, width: 30, height: 30},
        {x: 180, y: 240, width: 30, height: 30},
  
        {x: 210, y: 90, width: 30, height: 30},
        {x: 210, y: 120, width: 30, height: 30},
        {x: 210, y: 150, width: 30, height: 30},
        {x: 210, y: 180, width: 30, height: 30},
        {x: 210, y: 210, width: 30, height: 30},
        {x: 210, y: 240, width: 30, height: 30},
  
        {x: 240, y: 90, width: 30, height: 30},
        {x: 240, y: 120, width: 30, height: 30},
        {x: 240, y: 150, width: 30, height: 30},
        {x: 240, y: 180, width: 30, height: 30},
        {x: 240, y: 210, width: 30, height: 30},
        {x: 240, y: 240, width: 30, height: 30},
  
        {x: 270, y: 90, width: 30, height: 30},
        {x: 270, y: 120, width: 30, height: 30},
        {x: 270, y: 150, width: 30, height: 30},
        {x: 270, y: 180, width: 30, height: 30},
        {x: 270, y: 210, width: 30, height: 30},
  
        {x: 300, y: 90, width: 30, height: 30},
        {x: 300, y: 120, width: 30, height: 30},
        {x: 300, y: 150, width: 30, height: 30},
        {x: 300, y: 180, width: 30, height: 30},
        {x: 300, y: 210, width: 30, height: 30},
  
        {x: 330, y: 90, width: 30, height: 30},
        {x: 330, y: 120, width: 30, height: 30},
        {x: 330, y: 150, width: 30, height: 30},
      ],
    });
  
    const butterfliesRects = Platform.select({
      android: [
        {x: 120, y: 90, width: 30, height: 30},
        {x: 150, y: 90, width: 30, height: 30},
        {x: 180, y: 90, width: 30, height: 30},
        {x: 120, y: 120, width: 30, height: 30},
        {x: 150, y: 120, width: 30, height: 30},
        {x: 180, y: 120, width: 30, height: 30},
  
        {x: 210, y: 120, width: 30, height: 30},
        {x: 240, y: 120, width: 30, height: 30},
        {x: 150, y: 150, width: 30, height: 30},
        {x: 180, y: 150, width: 30, height: 30},
        {x: 210, y: 150, width: 30, height: 30},
        {x: 240, y: 150, width: 30, height: 30},
  
        {x: 90, y: 210, width: 30, height: 30},
        {x: 120, y: 210, width: 30, height: 30},
        {x: 150, y: 210, width: 30, height: 30},
        {x: 180, y: 210, width: 30, height: 30},
  
        {x: 120, y: 240, width: 30, height: 30},
        {x: 150, y: 240, width: 30, height: 30},
        {x: 180, y: 240, width: 30, height: 30},
      ],
      ios: [
        {x: 180, y: 100, width: 30, height: 20},
        {x: 130, y: 120, width: 20, height: 30},
        {x: 150, y: 120, width: 30, height: 30},
        {x: 180, y: 120, width: 30, height: 30},
  
        {x: 180, y: 150, width: 30, height: 30},
        {x: 180, y: 180, width: 30, height: 30},
        {x: 210, y: 150, width: 30, height: 30},
        {x: 210, y: 180, width: 30, height: 30},
        {x: 240, y: 150, width: 30, height: 30},
        {x: 240, y: 180, width: 30, height: 30},
        {x: 270, y: 150, width: 30, height: 30},
  
        {x: 120, y: 240, width: 30, height: 30},
        {x: 120, y: 270, width: 30, height: 10},
        {x: 150, y: 240, width: 30, height: 30},
        {x: 150, y: 270, width: 30, height: 20},
        {x: 180, y: 240, width: 30, height: 30},
        {x: 180, y: 270, width: 30, height: 20},
        {x: 210, y: 230, width: 20, height: 40},
      ],
    });
  
    const annotationImage =
      showAnnotateImagePageWalkthrough &&
      walkthroughCurrentStep &&
      walkthroughCurrentStep === 3
        ? annotateImage2
        : annotateImage1;
  
    const showClearButton =
      (showAnnotateImagePageWalkthrough &&
        walkthroughCurrentStep &&
        (walkthroughCurrentStep === 3 || walkthroughCurrentStep === 4)) ||
      false;
  
    const showAnnotating =
      (showAnnotateImagePageWalkthrough &&
        walkthroughCurrentStep &&
        walkthroughCurrentStep > 4) ||
      false;
  
    const annoRect =
      showAnnotateImagePageWalkthrough && walkthroughCurrentStep
        ? walkthroughCurrentStep === 3
          ? butterflyRects
          : walkthroughCurrentStep > 3
          ? butterfliesRects
          : []
        : [];
  
    return (
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Progress.Bar
            height={8}
            width={150}
            progress={0.2}
            borderWidth={0}
            color={theme.COLORS.CORNFLOWER_BLUE}
            unfilledColor={theme.COLORS.MID_GRAY}
          />
          <Text style={styles.progressText}>1 / 5 images</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={annotationImage}
          />
          <View style={styles.imageOverlay} pointerEvents={'none'}>
            <Svg
              width={'100%'}
              height={Dimensions.get('window').height * 0.4}
              style={styles.svgRect}>
              <G>
                <Defs>
                  <Pattern
                    id="grid"
                    width={30}
                    height={30}
                    patternUnits="userSpaceOnUse">
                    <Path
                      d="M 30 0 L 0 0 0 30"
                      fill="none"
                      stroke="gray"
                      stroke-width="1"
                    />
                  </Pattern>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grid)" />
              </G>
              <G>
                {annoRect.map((rect, index) => (
                  <Rect
                    key={'annoRect' + index}
                    x={(rect.x - 0) * 1.0}
                    y={(rect.y - 0) * 1.0}
                    width={rect.width * 1.0}
                    height={rect.height * 1.0}
                    fill={theme.COLORS.HARLEQUIN_OPACITY_54P}
                    stroke="none"
                    strokeWidth="0"
                  />
                ))}
              </G>
            </Svg>
          </View>
          {showClearButton && (
            <View style={styles.clearButtonContainer}>
              <Ripple style={styles.rippleButton}>
                <Text style={styles.rippleButtonText}>Clear</Text>
              </Ripple>
            </View>
          )}
        </View>
  
        <View style={styles.scrollContainer}>
          <View style={styles.tagWrapper}>
            {annotationTags.map((annoTag, index) => (
              <Chip
                key={annoTag}
                style={index === 0 ? styles.tagActive : styles.tag}
                textStyle={styles.tagText}>
                {annoTag}
              </Chip>
            ))}
          </View>
          <Text style={styles.tagsNote}>Choose a tag to add annotations.</Text>
  
          {!showAnnotating ? (
            <Ripple style={styles.annotateButton}>
              <Text style={styles.buttonText}>Annotate</Text>
            </Ripple>
          ) : (
            <View style={styles.annotatingContainer}>
              <View style={styles.row}>
                <Ripple style={styles.cancelNextButton}>
                  <Text style={styles.nextButtonText}>Next</Text>
                </Ripple>
                <Progress.Bar
                  height={13}
                  progress={1}
                  borderWidth={0}
                  borderRadius={30}
                  color={theme.COLORS.CORNFLOWER_BLUE}
                  width={Dimensions.get('window').width * 0.68}
                  unfilledColor={theme.COLORS.SKY_BLUE_DARK_OPACITY_20P}
                />
              </View>
              <Text style={styles.annotationProgressText}>Annotated</Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  
  export default PlayAIImage;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 17,
      backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    },
    progressContainer: {
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressText: {
      fontSize: 12,
      marginTop: 5,
      lineHeight: 14,
      fontFamily: 'Moon-Bold',
      color: theme.COLORS.WHITE,
      textTransform: 'uppercase',
    },
    imageContainer: {
      marginTop: 20,
    },
    image: {
      width: '100%',
      height: Dimensions.get('window').height * 0.4,
    },
    imageOverlay: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
    },
    svgRect: {
      left: 0,
      right: 0,
      position: 'absolute',
    },
    scrollContainer: {
      marginTop: 20,
    },
    tagWrapper: {
      borderWidth: 1,
      borderRadius: 8,
      flexWrap: 'wrap',
      paddingVertical: 10,
      flexDirection: 'row',
      paddingHorizontal: 14,
      justifyContent: 'flex-start',
      borderColor: theme.COLORS.FIORD_1,
    },
    tag: {
      padding: 3,
      marginRight: 5,
      borderRadius: 30,
      backgroundColor: theme.APP_COLOR_2,
    },
    tagActive: {
      borderWidth: 3,
      marginRight: 5,
      borderRadius: 30,
      backgroundColor: theme.APP_COLOR_2,
      borderColor: theme.COLORS.SKY_BLUE,
    },
    tagText: {
      fontSize: 14,
      color: theme.COLORS.WHITE,
    },
    tagsNote: {
      marginTop: 5,
      fontSize: 12,
      marginLeft: 2,
      lineHeight: 14,
      fontFamily: 'Moon-Bold',
      color: theme.COLORS.WHITE,
      textTransform: 'uppercase',
    },
  
    annotateButton: {
      margin: 3,
      marginVertical: 20,
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: '5%',
      paddingHorizontal: '1%',
      justifyContent: 'center',
      backgroundColor: theme.COLORS.SKY_BLUE_DARK,
    },
    buttonText: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'Moon-Bold',
      textTransform: 'uppercase',
      color: theme.COLORS.WHITE,
    },
    clearButtonContainer: {
      top: 5,
      left: 5,
      position: 'absolute',
    },
    rippleButton: {
      padding: 10,
      minWidth: 70,
      borderWidth: 0,
      borderRadius: 30,
      backgroundColor: theme.APP_COLOR_2,
    },
    rippleButtonText: {
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Moon-Bold',
      textTransform: 'uppercase',
      color: theme.COLORS.WHITE,
    },
  
    annotatingContainer: {
      marginVertical: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cancelNextButton: {
      padding: 10,
      minWidth: 70,
      borderWidth: 0,
      borderRadius: 30,
      backgroundColor: theme.APP_COLOR_2,
    },
    nextButtonText: {
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Moon-Bold',
      textTransform: 'uppercase',
      color: theme.COLORS.WHITE,
    },
    annotationProgressText: {
      fontSize: 14,
      textAlign: 'right',
      fontFamily: 'Moon-Light',
      textTransform: 'uppercase',
      color: theme.COLORS.WHITE,
    },
  });
  