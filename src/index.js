/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens();
import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabComponent from './components/Tab';
import {StyleSheet, Image, View, Text} from 'react-native';
import Loading from './screens/Loading';
import LandingPage from './screens/LandingPage';
import LandingPageWalkthrough from './screens/LandingPageWalkthrough';
// import About from './screens/About';
import Information from './screens/Information';
import Stats from './screens/Stats';
// import SwipeAI from './screens/SwipeAI';
// import Learn from './screens/Learn';
// import Verification from './screens/Verification';
// import Annotation from './screens/Annotation';
import Wallet from './screens/Wallet';
// import Upload from './screens/Upload';
// import RomanNumberUpload from './screens/RomanNumberUpload';
// import RomanNumberStats from './screens/RomanNumberStats';
import WalletSettings from './screens/WalletSettings';
import ExtConnections from './screens/ExtConnections';
//import CeloApp from './extConnect/CeloApp'
// import MyStats from './screens/MyStats';
// import Bounty from './screens/Bounty';
import BrowseMissions from './screens/BrowseMissions';
import ImageUploadMission from './screens/ImageUploadMission';
import ImageVerifyMission from './screens/ImageVerifyMission';
import ImageAnnotateMission from './screens/ImageAnnotateMission';
import ImagePlayAIMission from './screens/ImagePlayAIMission';
import MyMissions from './screens/MyMissions';
import MissionStatus from './screens/MissionStatus';
import BeginImageUpload from './screens/BeginImageUpload';
import UploadImage from './screens/UploadImage';
import BeginImageVerify from './screens/BeginImageVerify';
import VerifyImage from './screens/VerifyImage';
import BeginImageAnnotate from './screens/BeginImageAnnotate';
import AnnotateImage from './screens/AnnotateImage';
import BeginImagePlayAI from './screens/BeginImagePlayAI';
import PlayAI from './screens/PlayAI';
import VerifyImageWalkthrough from './screens/VerifyImageWalkthrough';
import AnnotateImageWalkthrough from './screens/AnnotateImageWalkthrough';
import PlayAIImageWalkthrough from './screens/PlayAIImageWalkthrough';
import Walkthrough from './screens/Walkthrough';
// import ImageCategorization from './screens/ImageCategorization';
// import TOS from './screens/TOS';
// import PrivacyInformation from './screens/PrivacyInformation';
// import Legal from './screens/Legal'; 
import Ripple from './components/Ripple';
import {dark_theme, theme} from './services/Common/theme';
import i18n from './languages/i18n';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons'
import {useStateValue} from './services/State/State';
import {actions} from './services/State/Reducer';
import {setLanguage} from './services/DataManager';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import English from './assets/english.png';
import Chinese from './assets/chinese.png';
import Deutsch from './assets/deutsch.png';
import Japanese from './assets/japanese.png';
import Spanish from './assets/spanish.png';
import { MissionComplete } from './screens/playAI/MissionComplete';
import PlayAITutorial from './screens/playAI/PlayAITutorial';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const styles = StyleSheet.create({
  leftIcon: {
    width: 40,
    height: 24,
  },
  rightIcon: {
    width: 32,
    height: 30,
  },
  leftButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_2,
  },
  languageButtonOuter: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: theme.APP_COLOR_2,
  },
  languageButtonOuterOpen: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
    backgroundColor: theme.APP_COLOR_2,
  },

  rightButton: {
    padding: 5,
    borderRadius: 30,
  },
  languageOptionsContainer: {
    marginTop: -7,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: theme.COLORS.BLACK,
  },
  flagIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  languageBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  languageOption: {
    padding: 10,
    borderColor: theme.COLORS.WHITE_OPACITY_3P,
  },
  languageOptionText: {
    fontSize: 14,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE_OPACITY_3P,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const LanguageMenu = (props) => {
  const { 
    selectedLanguage, 
    languageOptions, 
    dispatch 
  } = props;
  const langMenuRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Menu
      ref={langMenuRef}
      onOpen={()=>{ setIsMenuOpen(true); }}
      onClose={()=>{ setIsMenuOpen(false); }}
      renderer={renderers.Popover}
      rendererProps={{anchorStyle: {backgroundColor: 'transparent'}}}>
      <MenuTrigger
        customStyles={{triggerOuterWrapper: isMenuOpen? styles.languageButtonOuterOpen: styles.languageButtonOuter}}>
        <View style={styles.languageBox}>
          <Image
            resizeMode="stretch"
            style={styles.flagIcon}
            source={selectedLanguage.icon}
          />
          <EntypoIcon
            size={20}
            name="chevron-down"
            color={theme.COLORS.WHITE}
          />
        </View>
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.languageOptionsContainer}>
        {languageOptions.map((item, index) => (
          <MenuOption
            key={index}
            style={{
              ...styles.languageOption,
              borderBottomWidth:
                index < languageOptions.length - 1 ? 0.3 : 0,
            }}
            onSelect={async () => {
              await setLanguage(item.value);
              dispatch({
                type: actions.SET_LANGUAGE,
                selectedLanguage: item.value,
              });
            }}>
            <View style={styles.row}>
              <Image
                source={item.icon}
                resizeMode="stretch"
                style={styles.flagIcon}
              />
              <Text style={styles.languageOptionText}>
                {item.value.toUpperCase()}
              </Text>
            </View>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
}

const Header = (
  {
    title = null,
    showBackButton = false,
    isTransparent = false,
    isFullScreenHeader = false,
    showRightButton = false,
    rightButtonIcon = null,
    rightButtonOnPress = () => {},
    showLanguageDropdown = false,
    selectedLanguage = null,
    dispatch = null,
    languageOptions = [],
  },
  navigation,
) => ({
  title: title ? title : null,
  headerTitleStyle: {
    fontSize: 18,
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'Moon-Bold',
  },
  headerTitleAlign: 'center',
  headerStyle: {
    shadowOpacity: 0,
    elevation: isTransparent ? 0 : 4,
    backgroundColor: isTransparent ? 'transparent' : theme.APP_COLOR_1,
  },
  headerShown: true,
  headerTransparent: isFullScreenHeader ? true : false,
  headerLeftContainerStyle: {
    marginLeft: 20,
  },
  headerRightContainerStyle: {
    marginRight: 20,
  },
  headerLeft: showBackButton
    ? () => (
        <Ripple onPress={() => navigation.goBack()} style={styles.leftButton}>
          <EntypoIcon
            size={25}
            name="chevron-left"
            color={theme.COLORS.WHITE}
          />
        </Ripple>
      )
    : null,
  headerRight: showLanguageDropdown
    ? () => (
      <LanguageMenu 
        selectedLanguage={selectedLanguage}
        languageOptions={languageOptions}
        dispatch={dispatch}
      />
      )
    : showRightButton
    ? () => (
        <Ripple onPress={rightButtonOnPress} style={styles.rightButtonOuter}>
          {rightButtonIcon}
        </Ripple>
      )
    : null,
});


const FullScreenHeader = (
  {
    title = null,
    showTitle = false,
    showAppIcon = false,
    isTransparent = false,
    showRightButton = false,
    showLanguageDropdown = false,
    selectedLanguage = null,
    dispatch = null,
    languageOptions = [],
  },
  navigation,
) => ({
  title: showTitle ? title : null,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: theme.COLORS.WHITE,
  },
  headerBackVisible:false,
  headerShown: true,
  headerTransparent: true,
  headerStyle: {
    shadowOpacity: 1,
    elevation: isTransparent ? 0 : 4,
  },
  headerLeft: showAppIcon 
    ? () => (
        <Ripple
          onPress={() => navigation.navigate('LandingPage')}
          outerStyle={{
            borderRadius: 30,
            marginLeft: 20,
            backgroundColor: dark_theme.COLORS.BG_GREY
          }}
          innerStyle={styles.leftButtonInner}>
            <MaterialIcon
            name="chevron-left"
            size={24}
            color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
          />
        </Ripple>
      )
    : null,
  });

const LandingPageStack = () => {
  const languageOptions = [
    {
      icon: English,
      label: i18n.t('landing.english'),
      value: 'en',
    },
    /*
    {
      icon: Chinese,
      label: i18n.t('landing.chinese'),
      value: 'zh',
    },
    {
      icon: Deutsch,
      label: i18n.t('landing.deutsch'),
      value: 'de',
    },
    {
      icon: Japanese,
      label: i18n.t('landing.japanese'),
      value: 'ja',
    },
    {
      icon: Spanish,
      label: i18n.t('landing.spanish'),
      value: 'es',
    }, */
  ];
  const [{selectedLanguage}, dispatch] = useStateValue();
  const language = languageOptions.find((l) => l.value === selectedLanguage);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={({navigation}) => {
          return Header(
            {
              title: 'Dashboard',
              isTransparent: true,
              showLanguageDropdown: true,
              selectedLanguage: language,
              dispatch,
              languageOptions,
            },
            navigation,
          );
        }}
      />
      <Stack.Screen
        name="LandingPageWalkthrough"
        component={LandingPageWalkthrough}
        options={({navigation}) => {
          return Header(
            {
              title: 'Dashboard',
              isTransparent: true,
              showLanguageDropdown: true,
              selectedLanguage: language,
              dispatch,
              languageOptions,
              isFullScreenHeader: true,
            },
            navigation,
          );
        }}
      />
      
      <Stack.Screen
        name="Information"
        component={Information}
        options={({navigation}) => {
          return Header(
            {
              title: 'Information',
              showBackButton: true,
              isTransparent: true,
            },
            navigation,
          );
        }}
      />
    </Stack.Navigator>
  );
};

// const AboutStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="About"
//       component={About}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: false,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//   </Stack.Navigator>
// );

// const VerificationStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Verification"
//       component={Verification}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: false,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//   </Stack.Navigator>
// );

// const AnnotationStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Annotation"
//       component={Annotation}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: false,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//   </Stack.Navigator>
// );

const StatsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Stats"
      component={Stats}
      options={({navigation}) => {
        return Header(
          {
            title: 'Global Stats',
            showBackButton: true,
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
  </Stack.Navigator>
);

// const UploadStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Upload"
//       component={Upload}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: false,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//   </Stack.Navigator>
// );

const BrowseMissionsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BrowseMissions"
      component={BrowseMissions}
      options={({navigation}) => {
        return Header(
          {
            title: 'Browse Missions',
            showBackButton: true,
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="ImageUploadMission"
      component={ImageUploadMission}
      options={({navigation}) => {
        return Header(
          {
            title: 'Image Upload',
            showBackButton: true,
            isTransparent: true,
            isFullScreenHeader: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="ImageVerifyMission"
      component={ImageVerifyMission}
      options={({navigation}) => {
        return Header(
          {
            title: 'Verifying Images',
            showBackButton: true,
            isTransparent: true,
            isFullScreenHeader: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="ImageAnnotateMission"
      component={ImageAnnotateMission}
      options={({navigation}) => {
        return Header(
          {
            title: 'Annotating Images Lv.2',
            showBackButton: true,
            isTransparent: true,
            isFullScreenHeader: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="ImagePlayAIMission"
      component={ImagePlayAIMission}
      options={({navigation})=> {
        return Header(
          {
            title: 'PlayAI Upload Lv.2',
            showBackButton: true,
            isTransparent: true,
            isFullScreenHeader: true,
          },
          navigation,
        );
      }}
    />
  </Stack.Navigator>
);

const MyMissionsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyMissions"
      component={MyMissions}
      options={({navigation}) => {
        return Header(
          {
            title: 'My Missions',
            showBackButton: true,
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="MissionStatus"
      component={MissionStatus}
      options={({navigation}) => {
        return Header(
          {
            title: 'Mission Status',
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="ImageUploadMission"
      component={ImageUploadMission}
      options={({navigation}) => {
        return Header(
          {
            title: 'Image Upload',
            showBackButton: true,
            isTransparent: true,
            isFullScreenHeader: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="BeginImageUpload"
      component={BeginImageUpload}
      options={({navigation}) => {
        return Header(
          {
            title: 'Uploading Images',
            showBackButton: true,
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="ImageUpload"
      component={UploadImage}
      options={({navigation}) => {
        return Header(
          {
            title: 'Image Uploads',
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="ImageVerifyMission"
      component={ImageVerifyMission}
      options={({navigation}) => {
        return Header(
          {
            title: 'Verifying Images',
            showBackButton: true,
            isTransparent: true,
            isFullScreenHeader: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="BeginImageVerify"
      component={BeginImageVerify}
      options={({navigation}) => {
        return Header(
          {
            title: 'Verifying Images',
            showBackButton: true,
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="ImageVerify"
      component={VerifyImage}
      options={({navigation}) => {
        return Header(
          {
            title: 'Verifying Images',
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="BeginImageAnnotate"
      component={BeginImageAnnotate}
      options={({navigation}) => {
        return Header(
          {
            title: 'Annotating Images',
            showBackButton: true,
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="ImageAnnotate"
      component={AnnotateImage}
      options={({navigation}) => {
        return Header(
          {
            title: 'Annotating Images',
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name='BeginImagePlayAI'
      component={BeginImagePlayAI}
      options={({navigation}) => {
        return Header(
          {
            title: 'PlayAI Mission',
            showBackButton: true,
            isTransparent: true
          },
          navigation
        );
      }}
    />
    <Stack.Screen
      name="PlayAI"
      component={PlayAI}
      options={({navigation}) => {
        return Header(
          {
            title: 'PlayAI Mission',
            isTransparent: true
          },
          navigation
        );
      }}
    />
    <Stack.Screen
      name="ImageAnnotateMission"
      component={ImageAnnotateMission}
      options={({navigation}) => {
        return Header(
          {
            title: 'Annotating Images Lv.2',
            showBackButton: true,
            isTransparent: true,
            isFullScreenHeader: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="ImagePlayAIMission"
      component={ImagePlayAIMission}
      options={({navigation}) => {
        return Header(
          {
            title: 'PlayAI Mission',
            showBackButton: true,
            isTransparent: true,
            isFullScreenHeader: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="VerifyImageWalkthrough"
      component={VerifyImageWalkthrough}
      options={({navigation}) => {
        return Header(
          {
            title: 'Verifying Images',
            showBackButton: true,
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="AnnotateImageWalkthrough"
      component={AnnotateImageWalkthrough}
      options={({navigation}) => {
        return Header(
          {
            title: 'annotating images',
            showBackButton: true,
            isTransparent: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="PlayAIImageWalkthrough"
      component={PlayAITutorial}
      options={({navigation}) => {
        return Header(
          {
            title: i18n.t('playAI.playAIMission'),
            showBackButton: true,
            isTransparent: true,
            isFullScreenHeader: true,
          },
          navigation,
        );
      }}
    />
  </Stack.Navigator>
);

/*
const UploadGuidelinesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="UploadGuidelines"
      component={UploadGuidelines}
      options={({navigation}) => {
        return Header(
          {
            showTitle: false,
            showAppIcon: true,
            isTransparent: true,
            showRightButton: true,
          },
          navigation,
        );
      }}
    />
  </Stack.Navigator>
);

const UploadImageStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="UploadImage"
      component={UploadImage}
      options={({navigation}) => {
        return Header(
          {
            showTitle: false,
            showAppIcon: true,
            isTransparent: true,
            showRightButton: true,
          },
          navigation,
        );
      }}
    />
  </Stack.Navigator>
);
*/

// const RomanNumberUploadStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="RomanNumberUpload"
//       component={RomanNumberUpload}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: false,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//   </Stack.Navigator>
// );

// const RomanNumberStatsStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="RomanNumberStats"
//       component={RomanNumberStats}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: false,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//   </Stack.Navigator>
// );

// const LearnStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Learn"
//       component={Learn}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: false,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//   </Stack.Navigator>
// );

// const SwipeAIStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="SwipeAI"
//       component={SwipeAI}
//       options={({navigation}) =>
//         Header(
//           {
//             showTitle: false,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         )
//       }
//     />
//   </Stack.Navigator>
// );

const WalletStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Wallet"
      component={Wallet}
      options={({navigation}) => {
        return Header(
          {
            title: 'My Wallet',
            showBackButton: true,
            isTransparent: true,
            showRightButton: true,
            rightButtonIcon: (
              <IonIcons
                size={25}
                name="settings-outline"
                color={theme.COLORS.WHITE}
              />
            ),
            rightButtonOnPress: () => navigation.navigate('WalletSettings'),
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="WalletSettings"
      component={WalletSettings}
      options={({navigation}) => {
        return Header(
          {
            title: 'Wallet Setting',
            showBackButton: true,
            isTransparent: true,
            showRightButton: true,
            rightButtonIcon: (
              <MaterialIcon
                size={25}
                name="connect-without-contact"
                color={theme.COLORS.WHITE}
              />
            ),
            rightButtonOnPress: () => navigation.navigate('ExtConnections'),
          },
          navigation,
        );
      }}
    />
     <Stack.Screen
      name="ExtConnections"
      component={ExtConnections}
      options={({navigation}) => {
        return Header(
          {
            title: 'External Connections',
            showBackButton: true,
            isTransparent: true,
            showRightButton: true,
    
          },
          navigation,
        );
      }}
     />
  </Stack.Navigator>
);

// const MyStatsStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="MyStats"
//       component={MyStats}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: false,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//   </Stack.Navigator>
// );

//please ensure these information pages should be in here?
// const LegalStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Legal"
//       component={Legal}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: true,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//     <Stack.Screen
//       name="Bounty"
//       component={Bounty}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: true,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//     <Stack.Screen
//       name="PrivacyInformation"
//       component={PrivacyInformation}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: true,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//     <Stack.Screen
//       name="ImageCategorization"
//       component={ImageCategorization}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: true,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//     <Stack.Screen
//       name="TOS"
//       component={TOS}
//       options={({navigation}) => {
//         return Header(
//           {
//             showTitle: true,
//             showAppIcon: true,
//             isTransparent: true,
//             showRightButton: true,
//           },
//           navigation,
//         );
//       }}
//     />
//   </Stack.Navigator>
// );

/**
 * check 
 * @param {*} navigation 
 * @returns 
 */
const getTabBarVisible=(navigation) =>{
  return (navigation.route.state && navigation.route.state.index != 0) ? false: true;
};

const BottomTabs = ({navigation}) => {
  const [
    {
      showLandingPageWalkthrough,
      showUploadImagePageWalkthrough,
      showVerifyImagePageWalkthrough,
      showAnnotateImagePageWalkthrough,
      showPlayaiImagePageWalkthrough,
    },
  ] = useStateValue();

  const showWalkthrough =
    showLandingPageWalkthrough ||
    showUploadImagePageWalkthrough ||
    showVerifyImagePageWalkthrough ||
    showAnnotateImagePageWalkthrough ||
    showPlayaiImagePageWalkthrough;

  return (
    <>
      {showWalkthrough && <Walkthrough navigation={navigation} />}
      <Tab.Navigator
        tabBarOptions={{
          style: {
            zIndex: 1,
            height: 80,
            backgroundColor: 'transparent',
            elevation: 3,
            shadowColor: theme.APP_COLOR_1,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.5,
            paddingBottom: 20,
            paddingVertical: 20,
          },
        }}>
        <Tab.Screen
          name="LandingPage"
          component={LandingPageStack}
          options={{
            unmountOnBlur: true,
            tabBarButton: (props) => (
              <TabComponent label="Dashboard" {...props} />
            ),
          }}
        />
        <Tab.Screen
          name="BrowseMissions"
          component={BrowseMissionsStack}
          options={(navigation)=>{
            return {
            unmountOnBlur: true,
            tabBarVisible: getTabBarVisible(navigation),
            tabBarButton: (props) => (
              <TabComponent label="BrowseMissions" {...props} />
            ),
          };
          }}
        />
        <Tab.Screen
          name="MyMissions"
          component={MyMissionsStack}
          options={(navigation)=>{
            return {
              unmountOnBlur: true,
              tabBarVisible: getTabBarVisible(navigation),
              tabBarButton: (props) => (
                <TabComponent label="MyMissions" {...props} />
              ),
            }
          } }
        />
        <Tab.Screen
          name="Stats"
          component={StatsStack}
          options={{
            unmountOnBlur: true,
            tabBarButton: (props) => <TabComponent label="Stats" {...props} />,
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletStack}
          options={{
            unmountOnBlur: true,
            tabBarButton: (props) => (
              <TabComponent label="MyWallet" {...props} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="LandingPage"
          component={LandingPageStack}
          options={{
            unmountOnBlur: true,
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutStack}
          options={{
            unmountOnBlur: true,
            tabBarButton: (props) => <TabComponent label="About" {...props} />,
          }}
        />
        <Tab.Screen
          name="Upload"
          component={UploadStack}
          options={{
            unmountOnBlur: true,
            tabBarButton: (props) => <TabComponent label="Upload" {...props} />,
          }}
        />
        <Tab.Screen
          name="Verification"
          component={VerificationStack}
          options={{
            unmountOnBlur: true,
            tabBarVisible: false,
            tabBarButton: (props) => (
              <TabComponent label="Verification" {...props} />
            ),
          }}
        />
        <Tab.Screen
          name="Annotation"
          component={AnnotationStack}
          options={{
            unmountOnBlur: true,
            tabBarVisible: false,
            tabBarButton: (props) => (
              <TabComponent label="Annotation" {...props} />
            ),
          }}
        />
        <Tab.Screen
          name="MyStats"
          component={MyStatsStack}
          options={{
            unmountOnBlur: true,
            tabBarButton: (props) => (
              <TabComponent label="MyStats" {...props} />
            ),
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsStack}
          options={{
            unmountOnBlur: true,
            tabBarButton: (props) => <TabComponent label="Stats" {...props} />,
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletStack}
          options={{
            unmountOnBlur: true,
            tabBarButton: (props) => <TabComponent label="Wallet" {...props} />,
          }}
        />
        <Tab.Screen
          name="Legal"
          component={LegalStack}
          options={{
            unmountOnBlur: true,
            tabBarVisible: false,
            tabBarButton: (props) => <TabComponent label="Legal" {...props} />,
          }}
        /> */}
      </Tab.Navigator>
    </>
  );
};

const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Loading"
      component={Loading}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Home"
      component={BottomTabs}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const CreateRootNavigator = () => {
  return (
    <NavigationContainer theme={{colors: {background: theme.APP_COLOR_1}}}>
      <RootStack />
    </NavigationContainer>
  );
};

export default CreateRootNavigator;
