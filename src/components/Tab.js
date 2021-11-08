import React, {useRef} from 'react';
import {Image, View} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../services/Common/theme';
import {Transition, Transitioning} from 'react-native-reanimated';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const icons = {
  Dashboard: (
    <Image
      resizeMode="stretch"
      source={require('../assets/dashboard.png')}
      style={{width: 24, height: 24}}
    />
  ),
  BrowseMissions: (
    <Image
      resizeMode="stretch"
      style={{width: 20, height: 28}}
      source={require('../assets/browseMissions.png')}
    />
  ),
  MyMissions: (
    <LinearGradient
      end={{x: 1, y: 0}}
      start={{x: 0.15, y: 0}}
      colors={['#3B6BD0', '#A147D7']}
      style={{borderRadius: 25, padding: 10}}>
      <Image
        resizeMode="stretch"
        style={{width: 31, height: 31}}
        source={require('../assets/MyMissions.png')}
      />
    </LinearGradient>
  ),
  MyWallet: (
    <Image
      resizeMode="stretch"
      style={{width: 26, height: 20}}
      source={require('../assets/MyWallet.png')}
    />
  ),
  Stats: (
    <Image
      resizeMode="stretch"
      style={{width: 26, height: 23}}
      source={require('../assets/Stats.png')}
    />
  ),
  // About: (
  //   <MaterialIcon
  //     name="info"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
  //   />
  // ),
  // AboutFocused: (
  //   <MaterialIcon
  //     name="info"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_ICON_FOCUSED}
  //   />
  // ),
  // Stats: (
  //   <MaterialIcon
  //     name="analytics"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
  //   />
  // ),
  // StatsFocused: (
  //   <MaterialIcon
  //     name="analytics"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_ICON_FOCUSED}
  //   />
  // ),
  // SwipeAI: (
  //   <MaterialIcon
  //     name="swipe"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
  //   />
  // ),
  // SwipeAIFocused: (
  //   <MaterialIcon
  //     name="swipe"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_ICON_FOCUSED}
  //   />
  // ),
  // Learn: (
  //   <MaterialIcon
  //     name="subscriptions"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
  //   />
  // ),
  // LearnFocused: (
  //   <MaterialIcon
  //     name="subscriptions"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_ICON_FOCUSED}
  //   />
  // ),
  // Wallet: (
  //   <MaterialIcon
  //     name="account-balance-wallet"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
  //   />
  // ),
  // WalletFocused: (
  //   <MaterialIcon
  //     name="account-balance-wallet"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_ICON_FOCUSED}
  //   />
  // ),
  // MyStats: (
  //   <IonIcon
  //     name="analytics-sharp"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
  //   />
  // ),
  // MyStatsFocused: (
  //   <IonIcon
  //     name="analytics-sharp"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_ICON_FOCUSED}
  //   />
  // ),
  // Verification: (
  //   <MaterialIcon
  //     name="fingerprint"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
  //   />
  // ),
  // VerificationFocused: (
  //   <MaterialIcon
  //     name="fingerprint"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_ICON_FOCUSED}
  //   />
  // ),
  // Annotation: (
  //   <MaterialIcon
  //     name="note-add"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
  //   />
  // ),
  // AnnotationFocused: (
  //   <MaterialIcon
  //     name="note-add"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_ICON_FOCUSED}
  //   />
  // ),
  // Legal: (
  //   <MaterialIcon
  //     name="privacy-tip"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
  //   />
  // ),
  // LegalFocused: (
  //   <MaterialIcon
  //     name="privacy-tip"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_ICON_FOCUSED}
  //   />
  // ),
  // Upload: (
  //   <MaterialIcon
  //     name="cloud-upload"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
  //   />
  // ),
  // UploadFocused: (
  //   <MaterialIcon
  //     name="cloud-upload"
  //     size={24}
  //     color={theme.COLORS.BOTTOM_TAB_ICON_FOCUSED}
  //   />
  // ),
};

const Container = styled.TouchableWithoutFeedback``;
const Background = styled(Transitioning.View)`
  flex: auto;
  margin: 8px;
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
  justify-content: center;
  background: ${(props) => (props.focused ? theme.APP_COLOR : 'transparent')};
`;

function Tab({label, accessibilityState, onPress}) {
  const focused = accessibilityState.selected;
  // const icon = focused ? icons[label] : icons[`${label}Focused`];
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
          <View
            style={{
              bottom: 1,
              width: '100%',
              marginBottom: -30,
              position: 'absolute',
            }}>
            <Image
              resizeMode="stretch"
              style={{width: '100%', height: 25}}
              source={require('../assets/active-tab.png')}
            />
          </View>
        )}
      </Background>
    </Container>
  );
}

export default Tab;
