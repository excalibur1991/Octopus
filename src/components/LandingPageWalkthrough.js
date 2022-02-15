import {Text, View, Platform, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import AntIcon from 'react-native-vector-icons/AntDesign';

const steps = [
  {
    heading: 'About ncight',
    description:
      'Believe in using data as a tool, enabling businesses to unlock innovative revenues that drive growth.\n\nClick next to see more',
  },
  {
    heading: 'Classify images',
    description:
      'Image classification from domain experts help to train machine learning algorithms.  Contribute your expertise by selecting whether the displayed image is from a knee or shoulder arthroscopy. Your accuracy will be collected and you will receive a token credit for each correct answer.',
  },
  {
    heading: 'Stats',
    description:
      'See the number of labels you have contributed and your accuracy results.',
  },
  {
    heading: 'My wallet',
    description:
      'Receive rewards for accurately classifying images.  Your wallet show your accumulated earnings in Ocean cryptocurrency tokens.',
  },
];

const LandingPageWalkthrough = ({step, onExitWalkthrough}) => {
  const [, dispatch] = useStateValue();

  const step1 = (
    <>
      <View style={styles.step1_1} />
      <View style={styles.step1_2}>
        <View style={styles.lineBottom}>
          <View style={styles.lineBottomTip} />
        </View>
        <View style={styles.step1_1_inner}>
          <Text style={styles.heading}>{steps[0].heading}</Text>
          <Text style={styles.description}>{steps[0].description}</Text>
        </View>
      </View>
    </>
  );

  const step2 = (
    <>
      <View style={styles.step2_1} />
      <View style={styles.step2_2}>
        <View style={styles.lineBottom}>
          <View style={styles.lineBottomTip} />
        </View>
        <View style={styles.step2_1_inner}>
          <Text style={styles.heading}>{steps[1].heading}</Text>
          <Text style={styles.description}>{steps[1].description}</Text>
        </View>
      </View>
    </>
  );

  // const step2 = (
  //   <>
  //     <View style={styles.step2_1}>
  //       <View style={styles.lineTop}>
  //         <View style={styles.lineTopTip} />
  //       </View>
  //       <View style={styles.step2_1_inner}>
  //         <Text style={styles.heading}>{steps[1].heading}</Text>
  //         <Text style={styles.description}>{steps[1].description}</Text>
  //       </View>
  //     </View>
  //     <View style={styles.step2_2} />
  //   </>
  // );

  const step3 = (
    <>
      <View style={styles.step3_1}>
        <View style={styles.lineTop}>
          <View style={styles.lineTopTip} />
        </View>
        <View style={styles.step3_1_inner}>
          <Text style={styles.heading}>{steps[2].heading}</Text>
          <Text style={styles.description}>{steps[2].description}</Text>
        </View>
      </View>
      <View style={styles.step3_2} />
    </>
  );

  const step4 = (
    <>
      <View style={styles.step4_1}>
        <View style={styles.lineTop}>
          <View style={styles.lineTopTip} />
        </View>
        <View style={styles.step4_1_inner}>
          <Text style={styles.heading}>{steps[3].heading}</Text>
          <Text style={styles.description}>{steps[3].description}</Text>
        </View>
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
        <Ripple
          onPress={() => dispatch({type: actions.EXIT_WALKTHROUGH})}
          style={styles.closeButton}>
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
      case 8:
        return completed;
      default:
        return null;
    }
  };

  return getStepView(step);
};

export default LandingPageWalkthrough;

const styles = StyleSheet.create({
  step1_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.06 : 0.08),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step1_1_inner: {
    flex: 1,
    marginTop: 6,
    paddingTop: '6%',
    borderTopWidth: 0.5,
    paddingHorizontal: '10%',
    borderColor: theme.COLORS.TULIP_TREE,
  },
  step1_2: {
    flex: 1,
    borderTopWidth: 0.5,
    borderColor: theme.COLORS.WELL_READ,
    marginTop: Platform.OS === 'ios' ? '88%' : '94%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },

  step2_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.45 : 0.52),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step2_1_inner: {
    flex: 1,
    marginTop: 6,
    paddingTop: '3.5%',
    borderTopWidth: 0.5,
    paddingHorizontal: '10%',
    borderColor: theme.COLORS.TULIP_TREE,
  },
  step2_2: {
    flex: 1,
    borderTopWidth: 0.5,
    borderColor: theme.COLORS.WELL_READ,
    marginTop: Platform.OS === 'ios' ? '26%' : '25%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },

  step3_1: {
    borderBottomWidth: 0.5,
    borderColor: theme.COLORS.WELL_READ,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.57 : 0.64),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step3_2: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    marginTop: Platform.OS === 'ios' ? '24%' : '27%',
  },
  step3_1_inner: {
    flex: 1,
    marginBottom: 6,
    paddingBottom: '19%',
    borderBottomWidth: 0.5,
    paddingHorizontal: '10%',
    justifyContent: 'flex-end',
    borderColor: theme.COLORS.TULIP_TREE,
  },

  step4_1: {
    borderBottomWidth: 0.5,
    borderColor: theme.COLORS.WELL_READ,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.68 : 0.77),
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  step4_2: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
    marginTop: Platform.OS === 'ios' ? '25%' : '26%',
  },
  step4_1_inner: {
    flex: 1,
    marginBottom: 6,
    paddingBottom: '19%',
    borderBottomWidth: 0.5,
    paddingHorizontal: '10%',
    justifyContent: 'flex-end',
    borderColor: theme.COLORS.TULIP_TREE,
  },

  lineTop: {
    width: 1,
    bottom: 7,
    left: '7%',
    height: '25%',
    position: 'absolute',
    backgroundColor: theme.COLORS.TULIP_TREE,
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
    backgroundColor: theme.COLORS.TULIP_TREE,
  },
  lineBottom: {
    width: 1,
    top: 7,
    left: '7%',
    position: 'absolute',
    backgroundColor: theme.COLORS.TULIP_TREE,
    height: Platform.OS === 'ios' ? '10%' : '10%',
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
    backgroundColor: theme.COLORS.TULIP_TREE,
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
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
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
