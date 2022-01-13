import {Text, View, Platform, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Ripple from '../components/Ripple';
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
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.72 : 0.8),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    paddingBottom: '5%',
  },
  step2_1_inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  step2_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '19%' : '19%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step2TextContainer: {
    paddingHorizontal: '10%',
    paddingBottom: Platform.OS === 'ios' ? '10%' : '7%',
  },

  step3_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.075 : 0.1),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step3_2: {
    flex: 1,
    paddingTop: '10%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    marginTop: Platform.OS === 'ios' ? '83%' : '81%',
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
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.465 : 0.495),
  },
  step4_1_inner: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '60%' : '60%',
  },
  step4_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '45%' : '48%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step4TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: Platform.OS === 'ios' ? '9%' : '10%',
  },

  step5_1: {
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.465 : 0.495),
  },
  step5_1_inner: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '60%' : '60%',
  },
  step5_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '45%' : '48%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step5TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: Platform.OS === 'ios' ? '9%' : '10%',
  },

  step6_1: {
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.465 : 0.495),
  },
  step6_1_inner: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '60%' : '60%',
  },
  step6_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '45%' : '48%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step6TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: Platform.OS === 'ios' ? '9%' : '10%',
  },

  step7_1: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step7_1_inner: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '119%' : '123%',
  },
  step7TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: Platform.OS === 'ios' ? '9%' : '10%',
  },
  addButtonContainer: {
    position: 'absolute',
    left: Platform.OS === 'ios' ? '4.4%' : '4.7%',
    top: Platform.OS === 'ios' ? '51.2%' : '51.2%',
  },
  addButton: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: theme.APP_COLOR_2,
  },

  step8_1: {
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.465 : 0.495),
  },
  step8_1_inner: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '60%' : '60%',
  },
  step8_2: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    marginTop: Platform.OS === 'ios' ? '15.3%' : '15.3%',
  },
  step8TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: Platform.OS === 'ios' ? '9%' : '10%',
  },

  step9_1: {
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.465 : 0.495),
  },
  step9_1_inner: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '60%' : '60%',
  },
  step9_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '45%' : '48%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step9TextContainer: {
    paddingHorizontal: '10%',
    paddingTop: Platform.OS === 'ios' ? '9%' : '10%',
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
  descriptionGreen: {
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.SUCCESS_COLOR,
  },
  descriptionRed: {
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.ERROR_COLOR,
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
    heading: 'About Verification',
    description:
      'Verification helps DU ensure users upload correct kind of data and labeled them accurately. Donec iaculis et tortor non porta. Donec suscipit fermentum purus, in dictum mi consequat ut. \n\nClick on next button to go through the steps.',
  },
  {
    heading: 'Step 1\nBounty and PII',
    description:
      'Select your verification mission and whether if the picture contains biometric information...etc',
  },
  {
    heading: 'Step 2\nSwipe the images',
    description: (
      <Text style={styles.description}>
        {'Swipe image the '}
        <Text style={styles.descriptionGreen}>green</Text>
        {' area on the right to verify.\n\nSwipe left to the '}
        <Text style={styles.descriptionRed}>red</Text>
        {
          ' area to report inappropriate/spam contents.\n\nYou can see your streak bar at the top. more verifications you do, closer you are to complete the mission !'
        }
      </Text>
    ),
  },
  {
    heading: 'Step 3\nTags',
    description: 'Tags describe things in an image.',
  },
  {
    heading: 'Step 4\nSpot incorrect tags',
    description:
      'The ‘nightlife’ tag is irrelevant in this image.\n\nHold and long press on tAG to delete it.',
  },
  {
    heading: 'Step 4\nSpot incorrect tags',
    description: 'The ‘nightlife’ tag now disappeared.',
  },
  {
    heading: 'Step 5\nAdd missing tags',
    description:
      'Tags describe things in an image. If you see something missing, add and create your own tags by  pressing this icon.',
  },
  {
    heading: '',
    description: '',
  },
  {
    heading: 'Step 5\nAdd missing tags',
    description: 'The ‘cheeries’ tag is now added to the section.',
  },
];

const VerifyImagePageWalkthrough = ({step, onExitWalkthrough}) => {
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
            {steps[2].description}
          </View>
        </View>
      </View>
    </>
  );

  const step4 = (
    <>
      <View style={styles.step4_1}>
        <View style={styles.step4_1_inner}>
          <View style={styles.divider1Bottom} />
          <View style={styles.divider2Bottom} />
          <View style={styles.lineBottom}>
            <View style={styles.lineBottomTip} />
          </View>
          <View style={styles.step4TextContainer}>
            <Text style={styles.heading}>{steps[3].heading}</Text>
            <Text style={styles.description}>{steps[3].description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.step4_2} />
    </>
  );

  const step5 = (
    <>
      <View style={styles.step5_1}>
        <View style={styles.step5_1_inner}>
          <View style={styles.divider1Bottom} />
          <View style={styles.divider2Bottom} />
          <View style={styles.lineBottom}>
            <View style={styles.lineBottomTip} />
          </View>
          <View style={styles.step5TextContainer}>
            <Text style={styles.heading}>{steps[4].heading}</Text>
            <Text style={styles.description}>{steps[4].description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.step5_2} />
    </>
  );

  const step6 = (
    <>
      <View style={styles.step6_1}>
        <View style={styles.step6_1_inner}>
          <View style={styles.divider1Bottom} />
          <View style={styles.divider2Bottom} />
          <View style={styles.lineBottom}>
            <View style={styles.lineBottomTip} />
          </View>
          <View style={styles.step6TextContainer}>
            <Text style={styles.heading}>{steps[5].heading}</Text>
            <Text style={styles.description}>{steps[5].description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.step6_2} />
    </>
  );

  const step7 = (
    <View style={styles.step7_1}>
      <View style={styles.addButtonContainer}>
        <View style={styles.addButton}>
          <AntIcon name="plus" size={18} color={theme.COLORS.WHITE} />
        </View>
      </View>
      <View style={styles.step7_1_inner}>
        <View style={styles.divider1Bottom} />
        <View style={styles.divider2Bottom} />
        <View style={styles.lineBottom}>
          <View style={styles.lineBottomTip} />
        </View>
        <View style={styles.step7TextContainer}>
          <Text style={styles.heading}>{steps[6].heading}</Text>
          <Text style={styles.description}>{steps[6].description}</Text>
        </View>
      </View>
    </View>
  );

  const step8 = (
    <>
      <View style={styles.step8_1} />
      <View style={styles.step8_2} />
    </>
  );

  const step9 = (
    <>
      <View style={styles.step9_1}>
        <View style={styles.step9_1_inner}>
          <View style={styles.divider1Bottom} />
          <View style={styles.divider2Bottom} />
          <View style={styles.lineBottom}>
            <View style={styles.lineBottomTip} />
          </View>
          <View style={styles.step9TextContainer}>
            <Text style={styles.heading}>{steps[8].heading}</Text>
            <Text style={styles.description}>{steps[8].description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.step9_2} />
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
        return step7;
      case 7:
        return step8;
      case 8:
        return step9;
      case 9:
        return completed;
      default:
        return null;
    }
  };

  return getStepView(step);
};

export default VerifyImagePageWalkthrough;
