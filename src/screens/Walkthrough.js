import React, {useState} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import LandingPageWalkthrough from '../components/LandingPageWalkthrough';
import {useStateValue} from '../services/State/State';
import {actions} from '../services/State/Reducer';

const Walkthrough = () => {
  const [, dispatch] = useStateValue();
  const [step, setStep] = useState(0);

  const onNext = () => {
    if (step > 7) {
      setStep(0);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Exit Walkthrough Button */}
      {step < 8 && (
        <View style={styles.exitContainer}>
          <Ripple
            style={styles.exitButton}
            onPress={() =>
              dispatch({
                type: actions.SET_SHOW_WALKTHROUGH,
                showWalkthrough: false,
              })
            }>
            <MaterialCommunityIcon
              size={26}
              name="login-variant"
              color={theme.COLORS.GREY_A5}
            />
            <Text style={styles.exitButtonText}>Exit Walkthrough</Text>
          </Ripple>
        </View>
      )}

      <LandingPageWalkthrough step={step} />

      {/* Next Button */}
      {step < 8 && (
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
    zIndex: 1,
    position: 'absolute',
    // display: 'none',
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
    textTransform: 'uppercase',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.GREY_A5,
    fontWeight: Platform.OS === 'ios' ? '700' : 'normal',
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
