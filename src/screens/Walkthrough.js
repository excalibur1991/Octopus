import React, {useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import LandingPageWalkthrough from '../components/LandingPageWalkthrough';
import {useStateValue} from '../services/State/State';
import {actions} from '../services/State/Reducer';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const Walkthrough = ({navigation}) => {
  const [{showLandingPageWalkthrough, walkthroughCurrentStep}, dispatch] =
    useStateValue();
  const [step, setStep] = useState(0);

  const totalSteps = showLandingPageWalkthrough ? 4 : 0;

  const onNext = () => {
    if (step === totalSteps - 1) {
      setStep(0);
      dispatch({
        type: actions.SET_WALKTHROUGH_CURRENT_STEP,
        walkthroughCurrentStep: 0,
      });
      exitWalkthrough();
    } else {
      setStep(step + 1);
      dispatch({
        type: actions.SET_WALKTHROUGH_CURRENT_STEP,
        walkthroughCurrentStep: step + 1,
      });
    }
  };

  const onBack = () => {
    if (step === 0) {
      exitWalkthrough();
    } else {
      setStep(step - 1);
      dispatch({
        type: actions.SET_WALKTHROUGH_CURRENT_STEP,
        walkthroughCurrentStep: step - 1,
      });
    }
  };

  const exitWalkthrough = () => {
    navigation.goBack();
    dispatch({type: actions.EXIT_WALKTHROUGH});
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <Ripple onPress={onBack} style={styles.backButton}>
          <EntypoIcon
            size={25}
            name="chevron-left"
            color={theme.COLORS.WHITE}
          />
        </Ripple>
      </View>

      {showLandingPageWalkthrough && (
        <LandingPageWalkthrough
          step={step}
          onExitWalkthrough={exitWalkthrough}
        />
      )}

      {/* Next Button */}
      {step < totalSteps && (
        <>
          <View style={styles.nextContainer}>
            <LinearGradient
              end={{x: 1, y: 0.9}}
              start={{x: 0.15, y: 0}}
              colors={[theme.COLORS.TULIP_TREE, theme.COLORS.WELL_READ]}
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
        </>
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
  backButtonContainer: {
    left: 20,
    zIndex: 1,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 1 : 7,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_2,
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
