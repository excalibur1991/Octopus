import {Text, View, Platform, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import AntIcon from 'react-native-vector-icons/AntDesign';

const steps = [
  {
    heading: 'About Uploading',
    description:
      'Uploading is a mission that helps Donec iaculis et tortor non porta. Donec suscipit fermentum purus, in dictum mi consequat ut. \n\n\nClick on next button to go through the steps.',
  },
  {
    heading: 'Description',
    description:
      'Add a description about what the image consist of about the image you want to upload.',
  },
  {
    heading: 'Tags',
    description:
      'Enter the relevant tags of the displayed image above.if you are uploading multiple images, you can also add common tags that are present in all images.',
  },
  {
    heading: 'Bounty and PII',
    description:
      'select different bounties to upload and whether if the picture contains biometric information...etc',
  },
];

const UploadImagePageWalkthrough = ({step, onExitWalkthrough}) => {
  const step1 = (
    <View style={styles.step1_1}>
      <View style={styles.step1_1_inner}>
        <View style={styles.divider1Bottom} />
        <View style={styles.divider2Bottom} />
        <View style={[styles.lineBottom, styles.step1_line]}>
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
      <View style={styles.step2_1} />
      <View style={styles.step2_2}>
        <View style={styles.divider1Bottom} />
        <View style={styles.divider2Bottom} />
        <View style={styles.step2_2_inner}>
          <View style={styles.lineBottom}>
            <View style={styles.lineBottomTip} />
          </View>
          <View style={styles.step2TextContainer}>
            <Text style={styles.heading}>{steps[1].heading}</Text>
            <Text style={styles.description}>{steps[1].description}</Text>
          </View>
        </View>
      </View>
    </>
  );

  const step3 = (
    <>
      <View style={styles.step3_1} />
      <View style={styles.step3_2}>
        <View style={styles.divider1Bottom} />
        <View style={styles.divider2Bottom} />
        <View style={styles.step3_2_inner}>
          <View style={styles.lineBottom}>
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
      <View style={styles.step4_1}>
        <View style={styles.step4_1_inner}>
          <View style={styles.lineTop}>
            <View style={styles.lineTopTip} />
          </View>
          <View style={styles.step4TextContainer}>
            <Text style={styles.heading}>{steps[3].heading}</Text>
            <Text style={styles.description}>{steps[3].description}</Text>
          </View>
        </View>
        <View style={styles.divider2Top} />
        <View style={styles.divider1Top} />
      </View>
      <View style={styles.step4_2} />
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
        return completed;
      default:
        return null;
    }
  };

  return getStepView(step);
};

export default UploadImagePageWalkthrough;

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
  step1_line: {
    top: 8,
  },
  step1TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: '14%',
  },

  step2_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.055 : 0.07),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step2_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '39%' : '44%',
    paddingTop: '10%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step2_2_inner: {
    flex: 1,
  },
  step2TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: '10%',
  },

  step3_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.26 : 0.3),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step3_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '39%' : '49%',
    paddingTop: '10%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step3_2_inner: {
    flex: 1,
  },
  step3TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: Platform.OS === 'ios' ? '5.2%' : '4.5%',
  },

  step4_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.455 : 0.55),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    paddingBottom: '5%',
  },
  step4_1_inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  step4_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '58.5%' : '61.5%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step4TextContainer: {
    paddingHorizontal: '10%',
    paddingBottom: Platform.OS === 'ios' ? '11.5%' : '18.5%',
  },

  lineTop: {
    width: 1,
    left: '7%',
    position: 'absolute',
    backgroundColor: theme.COLORS.MEDIUM_PURPLE,
    height: Platform.OS === 'ios' ? '30%' : '33%',
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
    width: 1,
    left: '7%',
    height: '10%',
    position: 'absolute',
    backgroundColor: theme.COLORS.MEDIUM_PURPLE,
  },
  lineBottomTip: {
    bottom: 0,
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
