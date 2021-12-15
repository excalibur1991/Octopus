import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import LandingPageWalkthrough from '../components/LandingPageWalkthrough';
import UploadImagePageWalkthrough from '../components/UploadImagePageWalkthrough';
import VerifyImagePageWalkthrough from '../components/VerifyImagePageWalkthrough';
import {useStateValue} from '../services/State/State';
import {actions} from '../services/State/Reducer';

const Walkthrough = ({navigation}) => {
  const [
    {
      showLandingPageWalkthrough,
      showUploadImagePageWalkthrough,
      showVerifyImagePageWalkthrough,
    },
    dispatch,
  ] = useStateValue();
  const [step, setStep] = useState(0);

  const totalSteps = showLandingPageWalkthrough
    ? 9
    : showUploadImagePageWalkthrough
    ? 5
    : showVerifyImagePageWalkthrough
    ? 10
    : 0;

  const onNext = () => {
    if (step > totalSteps - 1) {
      setStep(0);
      dispatch({
        type: actions.SET_WALKTHROUGH_CURRENT_STEP,
        walkthroughCurrentStep: 0,
      });
    } else {
      setStep(step + 1);
      dispatch({
        type: actions.SET_WALKTHROUGH_CURRENT_STEP,
        walkthroughCurrentStep: step + 1,
      });
    }
  };

  const exitWalkthrough = () => {
    navigation.goBack();
    dispatch({type: actions.EXIT_WALKTHROUGH});
  };

  return (
    <View style={styles.container}>
      {/* Exit Walkthrough Button */}
      {step < totalSteps - 1 && (
        <View style={styles.exitContainer}>
          <Ripple style={styles.exitButton} onPress={exitWalkthrough}>
            <MaterialCommunityIcon
              size={26}
              name="login-variant"
              color={theme.COLORS.GREY_A5}
            />
            <Text style={styles.exitButtonText}>Exit Walkthrough</Text>
          </Ripple>
        </View>
      )}

      {showLandingPageWalkthrough && (
        <LandingPageWalkthrough
          step={step}
          onExitWalkthrough={exitWalkthrough}
        />
      )}

      {showUploadImagePageWalkthrough && (
        <UploadImagePageWalkthrough
          step={step}
          onExitWalkthrough={exitWalkthrough}
        />
      )}

      {showVerifyImagePageWalkthrough && (
        <VerifyImagePageWalkthrough
          step={step}
          onExitWalkthrough={exitWalkthrough}
        />
      )}

      {/* Next Button */}
      {step < totalSteps - 1 && (
        <View style={styles.nextContainer}>
          <LinearGradient
            end={{x: 1, y: 0.9}}
            start={{x: 0.15, y: 0}}
            colors={[theme.COLORS.LIGHT_BLUE, theme.COLORS.LIGHT_PURPLE]}
            style={styles.nextButton}>
            <Ripple onPress={onNext} style={styles.buttonInner}>
              <View style={styles.buttonIconContainer}>
                <MaterialCommunityIcon
                  size={20}
                  color={theme.COLORS.WHITE}
                  name="chevron-double-right"
                />
              </View>
            </Ripple>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

export default Walkthrough;

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    position: 'absolute',
  },
  exitContainer: {
    top: 5,
    right: 20,
    zIndex: 1,
    position: 'absolute',
  },
  exitButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  exitButtonText: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.GREY_A5,
  },
  nextContainer: {
    top: 0,
    bottom: 0,
    right: -40,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    borderRadius: 50,
    transform: [{scaleY: 2}],
  },
  buttonInner: {
    width: 75,
    height: 150,
    borderRadius: 50,
  },
  buttonIconContainer: {
    top: 0,
    left: 10,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
