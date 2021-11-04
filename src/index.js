import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens();
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabComponent from './components/Tab';
import {StyleSheet, Image, Alert, View, Text} from 'react-native';
import Loading from './screens/Loading';
import LandingPage from './screens/LandingPage';
import About from './screens/About';
import Stats from './screens/Stats';
import SwipeAI from './screens/SwipeAI';
import Learn from './screens/Learn';
import Verification from './screens/Verification';
import Annotation from './screens/Annotation';
import PlayAI from './screens/PlayAI';
import Wallet from './screens/Wallet';
//import UploadGuidelines from './screens/UploadGuidelines';
//import UploadImage from './screens/UploadImage';
import Upload from './screens/Upload';
import RomanNumberUpload from './screens/RomanNumberUpload';
import RomanNumberStats from './screens/RomanNumberStats';
//import Wallets from './screens/Wallets';
//import MyWallet from '../wallet/App';
//import myApp from '../myApp'
import walletEntry from '../walletEntry';
import Staking from './screens/Staking';
import MyStats from './screens/MyStats';
import Bounty from './screens/Bounty';
import ImageCategorization from './screens/ImageCategorization';
import TOS from './screens/TOS';
import PrivacyInformation from './screens/PrivacyInformation';
import Legal from './screens/Legal';
import Ripple from './components/Ripple';
import {theme} from './services/Common/theme';
import i18n from './languages/i18n';
import EntypoIcon from 'react-native-vector-icons/Entypo';
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
  leftButtonOuter: {
    marginLeft: 5,
    borderRadius: 10,
  },
  leftButtonInner: {
    padding: 10,
  },
  rightButtonOuter: {
    marginRight: 5,
    borderRadius: 10,
  },
  rightButtonInner: {
    padding: 5,
  },
  flagIcon: {
    width: 20,
    height: 20,
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
  },
  row: {
    flexDirection: 'row',
  },
});

const Header = (
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
  headerTitleStyle: {
    color: theme.COLORS.WHITE,
  },
  headerStyle: {
    shadowOpacity: 0,
    elevation: isTransparent ? 0 : 4,
    backgroundColor: theme.APP_COLOR,
  },
  headerLeft: showAppIcon
    ? () => (
        <Ripple
          onPress={() => navigation.navigate('LandingPage')}
          outerStyle={styles.leftButtonOuter}
          innerStyle={styles.leftButtonInner}>
          <Image
            style={styles.leftIcon}
            resizeMode="stretch"
            source={require('./assets/icon.png')}
          />
        </Ripple>
      )
    : null,
  headerRight
    : showLanguageDropdown
    ? () => (
        <Menu renderer={renderers.Popover}>
          <MenuTrigger
            customStyles={{
              triggerOuterWrapper: {
                ...styles.rightButtonOuter,
                backgroundColor: theme.COLORS.WHITE,
                overflow: 'hidden',
              },
            }}>
            <View style={styles.languageBox}>
              <Image
                style={styles.flagIcon}
                resizeMode="stretch"
                source={selectedLanguage.icon}
              />
              <Text style={{color: theme.COLORS.BLACK}}>
                {selectedLanguage.label}
              </Text>
              <EntypoIcon name="chevron-down" size={20} />
            </View>
          </MenuTrigger>
          <MenuOptions>
            {languageOptions.map((item, index) => (
              <MenuOption
                key={index}
                // eslint-disable-next-line react-native/no-inline-styles
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
                    style={styles.flagIcon}
                    resizeMode="stretch"
                    source={item.icon}
                  />
                  <Text>{item.label}</Text>
                </View>
              </MenuOption>
            ))}
          </MenuOptions>
        </Menu>
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
    /*{
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
              showTitle: false,
              showAppIcon: true,
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
    </Stack.Navigator>
  );
};

const AboutStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="About"
      component={About}
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

const VerificationStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Verification"
      component={Verification}
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

const AnnotationStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Annotation"
      component={Annotation}
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

const StatsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Stats"
      component={Stats}
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

const UploadStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Upload"
      component={Upload}
      options={{
        headerShown: true,
        headerTransparent: true
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

const RomanNumberUploadStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="RomanNumberUpload"
      component={RomanNumberUpload}
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

const RomanNumberStatsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="RomanNumberStats"
      component={RomanNumberStats}
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

const LearnStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Learn"
      component={Learn}
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

const SwipeAIStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SwipeAI"
      component={SwipeAI}
      options={({navigation}) =>
        Header(
          {
            showTitle: false,
            showAppIcon: true,
            isTransparent: true,
            showRightButton: true,
          },
          navigation,
        )
      }
    />
  </Stack.Navigator>
);

const WalletStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Wallet"
      component={walletEntry}
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

const MyStatsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyStats"
      component={MyStats}
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

//please ensure these information pages should be in here?
const LegalStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Legal"
      component={Legal}
      options={({navigation}) => {
        return Header(
          {
            showTitle: true,
            showAppIcon: true,
            isTransparent: true,
            showRightButton: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="Bounty"
      component={Bounty}
      options={({navigation}) => {
        return Header(
          {
            showTitle: true,
            showAppIcon: true,
            isTransparent: true,
            showRightButton: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="PrivacyInformation"
      component={PrivacyInformation}
      options={({navigation}) => {
        return Header(
          {
            showTitle: true,
            showAppIcon: true,
            isTransparent: true,
            showRightButton: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="ImageCategorization"
      component={ImageCategorization}
      options={({navigation}) => {
        return Header(
          {
            showTitle: true,
            showAppIcon: true,
            isTransparent: true,
            showRightButton: true,
          },
          navigation,
        );
      }}
    />
    <Stack.Screen
      name="TOS"
      component={TOS}
      options={({navigation}) => {
        return Header(
          {
            showTitle: true,
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


const PlayAIStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PlayAI"
      component={PlayAI}
      options={({navigation}) => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
        });
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


const BottomTabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      style: {
        height: 60,
        backgroundColor: '#F2F2F2',
        elevation: 3,
        shadowColor: theme.APP_COLOR,
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.5,
        borderTopColor: '#C2C2C2',
        borderTopWidth: 1,
      },
    }}>
    <Tab.Screen
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
        tabBarButton: (props) => <TabComponent label="Upload" {...props} />
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
        tabBarButton: props => <TabComponent label="Annotation" {...props} />,
      }}
    />
    <Tab.Screen
      name="MyStats"
      component={MyStatsStack}
      options={{
        unmountOnBlur: true,
        tabBarButton: (props) => <TabComponent label="MyStats" {...props} />,
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
        tabBarButton: props => <TabComponent label="Legal" {...props} />,
      }}
    />
    <Tab.Screen
      name="PlayAI"
      component={PlayAIStack}
      options={{
        unmountOnBlur: true,
        tabBarVisible: false,
        tabBarButton: () => null}}
    />
  </Tab.Navigator>
);

const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Loading"
      component={Loading}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Home"
      component={BottomTabs}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const CreateRootNavigator = () => {
  return (
    <NavigationContainer theme={{colors: {background: theme.APP_COLOR}}}>
      <RootStack />
    </NavigationContainer>
  );
};

export default CreateRootNavigator;
