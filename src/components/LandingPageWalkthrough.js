import {
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import AntIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const steps = [
  {
    heading: 'Dashboard Metrics',
    description:
      'Keep track on your performance with a general overview of data.',
  },
  {
    heading: 'Main Activities',
    description:
      'Quick access to main daily activities, including browsing new missions, view current missions, and check earnings from completing missions..',
  },
  {
    heading: 'Profile Status',
    description:
      'Display profile pictures and keep track on expreience needed to level up.',
  },
  {
    heading: 'Dashboard',
    description:
      'Ongoing and completed missions, earnings and everything about your profile is displayed here.',
  },
  {
    heading: 'Find Missions',
    description:
      'Browse all types of missions including vrification, uploading and annotation, and mini quests.',
  },
  {
    heading: 'My Missions',
    description:
      'View your list of ongoing and completed missions,and collect rewards.',
  },
  {
    heading: 'Statistics',
    description: 'View personal and global statistic data and analysis.',
  },
  {
    heading: 'My wallet',
    description: 'View, convert and payout earnings.',
  },
];

const LandingPageWalkthrough = ({step}) => {
  const [, dispatch] = useStateValue();

  const step1 = (
    <>
      <View style={styles.step1_1}>
        <View style={styles.lineTop}>
          <View style={styles.lineTopTip} />
        </View>
        <View style={styles.step1_1_inner}>
          <Text style={styles.heading}>{steps[0].heading}</Text>
          <Text style={styles.description}>{steps[0].description}</Text>
        </View>
      </View>
      <View style={styles.step1_2} />
    </>
  );

  const step2 = (
    <>
      <View style={styles.step2_1}>
        <View style={styles.lineTop}>
          <View style={styles.lineTopTip} />
        </View>
        <View style={styles.step2_1_inner}>
          <Text style={styles.heading}>{steps[1].heading}</Text>
          <Text style={styles.description}>{steps[1].description}</Text>
        </View>
      </View>
      <View style={styles.step2_2} />
    </>
  );

  const step3 = (
    <>
      <View style={styles.step3_1} />
      <View style={styles.step3_2}>
        <View style={styles.lineBottom}>
          <View style={styles.lineBottomTip} />
        </View>
        <View style={styles.step3_1_inner}>
          <Text style={styles.heading}>{steps[2].heading}</Text>
          <Text style={styles.description}>{steps[2].description}</Text>
        </View>
      </View>
    </>
  );

  const step4 = (
    <>
      <View style={styles.step4_circle}>
        <View style={styles.step4_circle_inner}>
          <Image
            resizeMode="stretch"
            style={styles.step4MenuIcon}
            source={require('../assets/dashboard.png')}
          />
        </View>
      </View>
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

  const step5 = (
    <>
      <View style={styles.step5_circle}>
        <View style={styles.step5_circle_inner}>
          <Image
            resizeMode="stretch"
            style={styles.step5MenuIcon}
            source={require('../assets/browseMissions.png')}
          />
        </View>
      </View>
      <View style={styles.step5_1}>
        <View style={styles.lineTop}>
          <View style={styles.lineTopTip} />
        </View>
        <View style={styles.step5_1_inner}>
          <Text style={styles.heading}>{steps[4].heading}</Text>
          <Text style={styles.description}>{steps[4].description}</Text>
        </View>
      </View>
      <View style={styles.step5_2} />
    </>
  );

  const step6 = (
    <>
      <View style={styles.step6_circle}>
        <View style={styles.step6_circle_inner}>
          <LinearGradient
            end={{x: 1, y: 0}}
            start={{x: 0.15, y: 0}}
            colors={['#3B6BD0', '#A147D7']}
            style={styles.step6Gradient}>
            <Image
              resizeMode="stretch"
              style={styles.step6MenuIcon}
              source={require('../assets/MyMissions.png')}
            />
          </LinearGradient>
        </View>
      </View>
      <View style={styles.step6_1}>
        <View style={styles.lineTop}>
          <View style={styles.lineTopTip} />
        </View>
        <View style={styles.step6_1_inner}>
          <Text style={styles.heading}>{steps[5].heading}</Text>
          <Text style={styles.description}>{steps[5].description}</Text>
        </View>
      </View>
      <View style={styles.step6_2} />
    </>
  );

  const step7 = (
    <>
      <View style={styles.step7_circle}>
        <View style={styles.step7_circle_inner}>
          <Image
            resizeMode="stretch"
            style={styles.step7MenuIcon}
            source={require('../assets/Stats.png')}
          />
        </View>
      </View>
      <View style={styles.step7_1}>
        <View style={styles.lineTop}>
          <View style={styles.lineTopTip} />
        </View>
        <View style={styles.step7_1_inner}>
          <Text style={styles.heading}>{steps[6].heading}</Text>
          <Text style={styles.description}>{steps[6].description}</Text>
        </View>
      </View>
      <View style={styles.step7_2} />
    </>
  );

  const step8 = (
    <>
      <View style={styles.step8_circle}>
        <View style={styles.step8_circle_inner}>
          <Image
            resizeMode="stretch"
            style={styles.step8MenuIcon}
            source={require('../assets/MyWallet.png')}
          />
        </View>
      </View>
      <View style={styles.step8_1}>
        <View style={styles.lineTop}>
          <View style={styles.lineTopTip} />
        </View>
        <View style={styles.step8_1_inner}>
          <Text style={styles.heading}>{steps[7].heading}</Text>
          <Text style={styles.description}>{steps[7].description}</Text>
        </View>
      </View>
      <View style={styles.step8_2} />
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
          onPress={() =>
            dispatch({
              type: actions.SET_SHOW_WALKTHROUGH,
              showWalkthrough: false,
            })
          }
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
      case 4:
        return step5;
      case 5:
        return step6;
      case 6:
        return step7;
      case 7:
        return step8;
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
    borderBottomWidth: 0.5,
    borderColor: theme.COLORS.SKY_BLUE_DARK,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.41 : 0.48),
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step1_1_inner: {
    flex: 1,
    marginBottom: 6,
    marginTop: '30%',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
  },
  step1_2: {
    flex: 1,
    marginTop: '20%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },

  step2_1: {
    borderBottomWidth: 0.5,
    borderColor: theme.COLORS.SKY_BLUE_DARK,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.51 : 0.57),
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step2_1_inner: {
    flex: 1,
    marginBottom: 6,
    marginTop: '42%',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
  },
  step2_2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '67%' : '70%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },

  step3_1: {
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.06 : 0.07),
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step3_1_inner: {
    flex: 1,
    marginTop: 6,
    marginBottom: '42%',
    borderTopWidth: 0.5,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
  },
  step3_2: {
    flex: 1,
    borderTopWidth: 0.5,
    borderColor: theme.COLORS.SKY_BLUE_DARK,
    marginTop: Platform.OS === 'ios' ? '74%' : '82%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },

  step4_1: {
    paddingTop: '80%',
    borderBottomWidth: 0.5,
    borderColor: theme.COLORS.SKY_BLUE_DARK,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.81 : 0.9),
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step4_2: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step4_1_inner: {
    flex: 1,
    marginBottom: 6,
    marginTop: '35%',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
  },
  step4_circle: {
    zIndex: 1,
    width: 60,
    height: 60,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 30,
    position: 'absolute',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
    left: Platform.OS === 'ios' ? '1.5%' : '1%',
    bottom: Platform.OS === 'ios' ? '5.5%' : '1.3%',
  },
  step4_circle_inner: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.COLORS.SKY_BLUE_DARK,
  },
  step4MenuIcon: {
    width: 24,
    height: 24,
  },

  step5_1: {
    paddingTop: '80%',
    borderBottomWidth: 0.5,
    borderColor: theme.COLORS.SKY_BLUE_DARK,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.81 : 0.9),
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step5_2: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step5_1_inner: {
    flex: 1,
    marginBottom: 6,
    marginTop: '35%',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
  },
  step5_circle: {
    zIndex: 1,
    width: 60,
    height: 60,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 30,
    position: 'absolute',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
    left: Platform.OS === 'ios' ? '20%' : '19.5%',
    bottom: Platform.OS === 'ios' ? '5.5%' : '1.3%',
  },
  step5_circle_inner: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.COLORS.SKY_BLUE_DARK,
  },
  step5MenuIcon: {
    width: 20,
    height: 28,
  },

  step6_1: {
    paddingTop: '80%',
    borderBottomWidth: 0.5,
    borderColor: theme.COLORS.SKY_BLUE_DARK,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.81 : 0.9),
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step6_2: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step6_1_inner: {
    flex: 1,
    marginBottom: 6,
    marginTop: '31%',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
  },
  step6_circle: {
    zIndex: 1,
    width: 60,
    height: 60,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 30,
    position: 'absolute',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
    left: Platform.OS === 'ios' ? '41.3%' : '40.6%',
    bottom: Platform.OS === 'ios' ? '5.5%' : '1.3%',
  },
  step6_circle_inner: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.COLORS.SKY_BLUE_DARK,
  },
  step6Gradient: {
    padding: 10,
    borderRadius: 25,
  },
  step6MenuIcon: {
    width: 31,
    height: 31,
  },

  step7_1: {
    paddingTop: '80%',
    borderBottomWidth: 0.5,
    borderColor: theme.COLORS.SKY_BLUE_DARK,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.81 : 0.9),
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step7_2: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step7_1_inner: {
    flex: 1,
    marginBottom: 6,
    marginTop: '31%',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
  },
  step7_circle: {
    zIndex: 1,
    width: 60,
    height: 60,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 30,
    position: 'absolute',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
    left: Platform.OS === 'ios' ? '63.6%' : '63.25%',
    bottom: Platform.OS === 'ios' ? '5.5%' : '1.3%',
  },
  step7_circle_inner: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.COLORS.SKY_BLUE_DARK,
  },
  step7MenuIcon: {
    width: 26,
    height: 23,
  },

  step8_1: {
    paddingTop: '80%',
    borderBottomWidth: 0.5,
    borderColor: theme.COLORS.SKY_BLUE_DARK,
    height:
      Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.81 : 0.9),
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step8_2: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  step8_1_inner: {
    flex: 1,
    marginBottom: 6,
    marginTop: '27%',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
  },
  step8_circle: {
    zIndex: 1,
    width: 60,
    height: 60,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 30,
    position: 'absolute',
    borderColor: theme.COLORS.MEDIUM_PURPLE,
    left: Platform.OS === 'ios' ? '82.7%' : '82%',
    bottom: Platform.OS === 'ios' ? '5.5%' : '1.3%',
  },
  step8_circle_inner: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.COLORS.SKY_BLUE_DARK,
  },
  step8MenuIcon: {
    width: 26,
    height: 20,
  },

  lineTop: {
    width: 1,
    bottom: 7,
    left: '7%',
    position: 'absolute',
    backgroundColor: theme.COLORS.MEDIUM_PURPLE,
    height: Platform.OS === 'ios' ? '37%' : '40%',
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
    top: 7,
    left: '7%',
    position: 'absolute',
    backgroundColor: theme.COLORS.MEDIUM_PURPLE,
    height: Platform.OS === 'ios' ? '28%' : '27%',
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
    textTransform: 'uppercase',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.WHITE,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  description: {
    fontSize: 12,
    marginTop: 5,
    lineHeight: 14,
    textTransform: 'uppercase',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.WHITE,
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
  },

  completedComtainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%',
    backgroundColor: theme.COLORS.BLACK_OPACITY_78P,
  },
  completedHeading: {
    fontSize: 36,
    lineHeight: 43,
    textAlign: 'center',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  completedDescription: {
    fontSize: 16,
    marginTop: 20,
    lineHeight: 19,
    textAlign: 'center',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
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
