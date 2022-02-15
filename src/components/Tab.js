import React, {useRef} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../services/Common/theme';
import {Transition, Transitioning} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
const indicator = require('../assets/active_tab.png');
const dashboardIcon = require('../assets/dashboard_white.png');
const verifications = require('../assets/verification_white.png');
const myWalletIcon = require('../assets/my_wallet_white.png');

const styles = StyleSheet.create({
  indicatorContainer: {
    bottom: 1,
    width: '100%',
    marginBottom: -35,
    position: 'absolute',
  },
  indicator: {
    height: 30,
    width: '100%',
  },
  dashboardIcon: {
    width: 24,
    height: 24,
  },
  classifyImagesIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  classifyImagesIcon: {
    width: 20,
    height: 20,
  },
  myWalletIcon: {
    width: 26,
    height: 23,
  },
});

const icons = {
  Dashboard: (
    <Image
      resizeMode="stretch"
      source={dashboardIcon}
      style={styles.dashboardIcon}
    />
  ),
  ClassifyImages: (
    <LinearGradient
      end={{x: 1, y: 1}}
      start={{x: 0.15, y: 0}}
      style={styles.classifyImagesIconContainer}
      colors={[theme.COLORS.TULIP_TREE, theme.COLORS.WELL_READ]}>
      <Image
        resizeMode="stretch"
        source={verifications}
        style={styles.classifyImagesIcon}
      />
    </LinearGradient>
  ),
  MyWallet: (
    <Image
      resizeMode="stretch"
      source={myWalletIcon}
      style={styles.myWalletIcon}
    />
  ),
};

const Container = styled.TouchableWithoutFeedback``;
const Background = styled(Transitioning.View)`
  flex: auto;
  margin: 8px;
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
  justify-content: center;
  background: ${(props) => (props.focused ? theme.APP_COLOR_1 : 'transparent')};
`;

function Tab({label, accessibilityState, onPress}) {
  const focused = accessibilityState.selected;
  const icon = icons[label];

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={0} />
      <Transition.Change interpolation="easeInOut" durationMs={100} />
      <Transition.In type="fade" durationMs={10} />
    </Transition.Sequence>
  );

  const ref = useRef();

  return (
    <Container
      onPress={() => {
        ref.current.animateNextTransition();
        onPress();
      }}>
      <Background
        ref={ref}
        label={label}
        focused={focused}
        transition={transition}>
        {icon}
        {focused && (
          <View style={styles.indicatorContainer}>
            <Image
              source={indicator}
              resizeMode="stretch"
              style={styles.indicator}
            />
          </View>
        )}
      </Background>
    </Container>
  );
}

export default Tab;
