import {Text, View, Platform, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Ripple from './Ripple';
import {theme} from '../services/Common/theme';
import AntIcon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  divider1Bottom: {
    marginBottom: 7,
    borderTopWidth: 0.5,
    borderColor: theme.COLORS.SKY_BLUE_DARK,
  },
  divider2Bottom: {
    borderTopWidth: 0.5,
    borderColor: theme.COLORS.MEDIUM_PURPLE,
  },
  divider1Top: {
    borderTopWidth: 0.5,
    borderColor: theme.COLORS.SKY_BLUE_DARK,
  },
  divider2Top: {
    marginBottom: 7,
    borderTopWidth: 0.5,
    borderColor: theme.COLORS.MEDIUM_PURPLE,
  },

  step1_1: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step1_1_inner: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '25%' : '30%',
  },
  step1TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: Platform.OS === 'ios' ? '9%' : '10%',
  },

  step2_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.535 : 0.565),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    paddingBottom: '5%',
  },
  step2_1_inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  step2_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '19%' : '20%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step2TextContainer: {
    paddingHorizontal: '10%',
    paddingBottom: Platform.OS === 'ios' ? '12.5%' : '12.5%',
  },

  step3_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.1 : 0.13),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step3_2: {
    flex: 1,
    paddingTop: '10%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    marginTop: Platform.OS === 'ios' ? '94%' : '92%',
  },
  step3Line: {
    top: 0,
  },
  step3_2_inner: {
    flex: 1,
  },
  step3TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: Platform.OS === 'ios' ? '8.8%' : '9.5%',
  },

  step4_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.1 : 0.13),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step4_2: {
    flex: 1,
    paddingTop: '10%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    marginTop: Platform.OS === 'ios' ? '94%' : '92%',
  },
  step4Line: {
    top: 0,
  },
  step4_2_inner: {
    flex: 1,
  },
  step4TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: Platform.OS === 'ios' ? '8.8%' : '9.5%',
  },

  step5_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.65 : 0.695),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    paddingBottom: '5%',
  },
  step5_1_inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  step5_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '19%' : '18.5%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step5TextContainer: {
    paddingHorizontal: '10%',
    paddingBottom: Platform.OS === 'ios' ? '14.5%' : '14%',
  },

  step6_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.65 : 0.695),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    paddingBottom: '5%',
  },
  step6_1_inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  step6_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '19%' : '18.5%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step6TextContainer: {
    paddingHorizontal: '10%',
    paddingBottom: Platform.OS === 'ios' ? '14.5%' : '14%',
  },

  lineTop: {
    width: 1,
    left: '7%',
    position: 'absolute',
    backgroundColor: theme.COLORS.MEDIUM_PURPLE,
    height: Platform.OS === 'ios' ? '20%' : '20%',
  },
  lineTopTip: {
    top: 0,
    right: 0,
    left: -2,
    width: 5,
    height: 5,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.MEDIUM_PURPLE,
  },
  lineBottom: {
    top: 8,
    width: 1,
    left: '7%',
    height: 50,
    position: 'absolute',
    backgroundColor: theme.COLORS.MEDIUM_PURPLE,
  },
  lineBottomTip: {
    right: 0,
    left: -2,
    width: 5,
    height: 5,
    bottom: 0,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.MEDIUM_PURPLE,
  },
  heading: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
  },
  description: {
    fontSize: 12,
    marginTop: 5,
    lineHeight: 14,
    fontFamily: 'Moon-Light',
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
  },

  completedComtainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  completedHeading: {
    fontSize: 36,
    lineHeight: 43,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  completedDescription: {
    fontSize: 16,
    marginTop: 20,
    lineHeight: 19,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  closeButtonContainer: {
    marginTop: 20,
  },
  closeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_2,
  },
});

const steps = [
  {
    heading: 'About Annotation',
    description:
      'Annotation missions helps DU ensure users upload correct kind of data and labeled them accurately. Donec iaculis et tortor non porta. Donec suscipit fermentum purus, in dictum mi consequat ut. Mauris vulputate turpis vestibulum tortor pretium condimentum. Donec leo elit, luctus et feugiat sit amet, vulputate nec est. Mauris bibendum ante ultrices tellus laoreet.\n\nClick on next button to go through the steps.',
  },
  {
    heading: 'Select a Tag',
    description: 'Select a tag to annotate',
  },
  {
    heading: 'Zoom In',
    description: 'Zoom in with two fingers to enlarge an area of the image.',
  },
  {
    heading: 'Cover the object',
    description:
      'Zoom in and draw with one finger to cover all ‘butterfly’ objects in this image with green blocks.',
  },
  {
    heading: 'Submit annotation ',
    description: 'Click on the annotate button to submit your input.',
  },
  {
    heading: 'Onto the next image',
    description: 'Click on next to proceed to continue the mission.',
  },
];

const AnnotateImagePageWalkthrough = ({step, onExitWalkthrough}) => {
  const step1 = (
    <View style={styles.step1_1}>
      <View style={styles.step1_1_inner}>
        <View style={styles.divider1Bottom} />
        <View style={styles.divider2Bottom} />
        <View style={styles.lineBottom}>
          <View style={styles.lineBottomTip} />
        </View>
        <View style={styles.step1TextContainer}>
          <Text style={styles.heading}>{steps[0].heading}</Text>
          <Text style={styles.description}>{steps[0].description}</Text>
        </View>
      </View>
    </View>
  );

  const step2 = (
    <>
      <View style={styles.step2_1}>
        <View style={styles.step2_1_inner}>
          <View style={styles.lineTop}>
            <View style={styles.lineTopTip} />
          </View>
          <View style={styles.step2TextContainer}>
            <Text style={styles.heading}>{steps[1].heading}</Text>
            <Text style={styles.description}>{steps[1].description}</Text>
          </View>
        </View>
        <View style={styles.divider2Top} />
        <View style={styles.divider1Top} />
      </View>
      <View style={styles.step2_2} />
    </>
  );

  const step3 = (
    <>
      <View style={styles.step3_1} />
      <View style={styles.step3_2}>
        <View style={styles.divider1Bottom} />
        <View style={styles.divider2Bottom} />
        <View style={styles.step3_2_inner}>
          <View style={[styles.lineBottom, styles.step3Line]}>
            <View style={styles.lineBottomTip} />
          </View>
          <View style={styles.step3TextContainer}>
            <Text style={styles.heading}>{steps[2].heading}</Text>
            <Text style={styles.description}>{steps[2].description}</Text>
          </View>
        </View>
      </View>
    </>
  );

  const step4 = (
    <>
      <View style={styles.step4_1} />
      <View style={styles.step4_2}>
        <View style={styles.divider1Bottom} />
        <View style={styles.divider2Bottom} />
        <View style={styles.step4_2_inner}>
          <View style={[styles.lineBottom, styles.step4Line]}>
            <View style={styles.lineBottomTip} />
          </View>
          <View style={styles.step4TextContainer}>
            <Text style={styles.heading}>{steps[3].heading}</Text>
            <Text style={styles.description}>{steps[3].description}</Text>
          </View>
        </View>
      </View>
    </>
  );

  const step5 = (
    <>
      <View style={styles.step5_1}>
        <View style={styles.step5_1_inner}>
          <View style={styles.lineTop}>
            <View style={styles.lineTopTip} />
          </View>
          <View style={styles.step5TextContainer}>
            <Text style={styles.heading}>{steps[4].heading}</Text>
            <Text style={styles.description}>{steps[4].description}</Text>
          </View>
        </View>
        <View style={styles.divider2Top} />
        <View style={styles.divider1Top} />
      </View>
      <View style={styles.step5_2} />
    </>
  );

  const step6 = (
    <>
      <View style={styles.step6_1}>
        <View style={styles.step6_1_inner}>
          <View style={styles.lineTop}>
            <View style={styles.lineTopTip} />
          </View>
          <View style={styles.step6TextContainer}>
            <Text style={styles.heading}>{steps[5].heading}</Text>
            <Text style={styles.description}>{steps[5].description}</Text>
          </View>
        </View>
        <View style={styles.divider2Top} />
        <View style={styles.divider1Top} />
      </View>
      <View style={styles.step6_2} />
    </>
  );

  const completed = (
    <View style={styles.completedComtainer}>
      <Text style={styles.completedHeading}>Tutorial Completed</Text>
      <Text style={styles.completedDescription}>
        Exit tutorial mode by clicking the button below.
      </Text>
      <View style={styles.closeButtonContainer}>
        <Ripple onPress={onExitWalkthrough} style={styles.closeButton}>
          <AntIcon size={20} name="close" color={theme.COLORS.WHITE} />
        </Ripple>
      </View>
    </View>
  );

  const getStepView = () => {
    switch (step) {
      case 0:
        return step1;
      case 1:
        return step2;
      case 2:
        return step3;
      case 3:
        return step4;
      case 4:
        return step5;
      case 5:
        return step6;
      case 6:
        return completed;
      default:
        return null;
    }
  };

  return getStepView(step);
};

export default AnnotateImagePageWalkthrough;
