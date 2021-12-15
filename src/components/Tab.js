import React, {useRef} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../services/Common/theme';
import {Transition, Transitioning} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
const indicator = require('../assets/active-tab.png');
const dashboardIcon = require('../assets/dashboard.png');
const browseMissionsIcon = require('../assets/browseMissions.png');
const myMissionsIcon = require('../assets/MyMissions.png');
const myWalletIcon = require('../assets/MyWallet.png');
const statsIcon = require('../assets/Stats.png');

const styles = StyleSheet.create({
  indicatorContainer: {
    bottom: 1,
    width: '100%',
    marginBottom: -30,
    position: 'absolute',
  },
  indicator: {
    height: 25,
    width: '100%',
  },
  dashboardIcon: {
    width: 24,
    height: 24,
  },
  browseMissionsIcon: {
    width: 20,
    height: 28,
  },
  myMissionsIconContainer: {
    padding: 10,
    borderRadius: 25,
  },
  myMissionsIcon: {
    width: 31,
    height: 31,
  },
  myWalletIcon: {
    width: 26,
    height: 20,
  },
  statsIcon: {
    width: 26,
    height: 20,
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
  BrowseMissions: (
    <Image
      resizeMode="stretch"
      source={browseMissionsIcon}
      style={styles.browseMissionsIcon}
    />
  ),
  MyMissions: (
    <LinearGradient
      end={{x: 1, y: 0}}
      start={{x: 0.15, y: 0}}
      style={styles.myMissionsIconContainer}
      colors={[theme.COLORS.DARK_BLUE, theme.COLORS.MEDIUM_PURPLE_1]}>
      <Image
        resizeMode="stretch"
        source={myMissionsIcon}
        style={styles.myMissionsIcon}
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
  Stats: (
    <Image resizeMode="stretch" source={statsIcon} style={styles.statsIcon} />
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
