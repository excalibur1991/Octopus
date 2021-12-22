import {
  SafeAreaView,
  StatusBar,
  LogBox,
  NativeModules,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import CreateRootNavigator from './src/index';
import {StateProvider} from './src/services/State/State';
import {initialState} from './src/services/State/InitialState';
import {reducer, actions} from './src/services/State/Reducer';
import {useStateValue} from './src/services/State/State';
import ModalActivityIndicator from './src/components/ModalActivityIndicator';
import AppAlert from './src/components/AppAlert';
import {theme} from './src/services/Common/theme';
import {getLanguage, getUserInfo} from './src/services/DataManager';
import {store} from './src/store/store.js';
import {getWeb3_} from './src/web3/getWeb3';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import i18next from 'i18next';
import {I18nextProvider} from 'react-i18next';
import {MenuProvider} from 'react-native-popup-menu';


getWeb3_.catch((err) => console.warn('Error in web3 initialization.', err));
const persistor = persistStore(store);

const RootNavigator = () => {
  useEffect(() => {
    checkLanguage();
    checkStatus();
  }, []);

  const [{progressSettings, alertSettings}, dispatch] = useStateValue();
  const {show = false} = progressSettings || {};
  const {settings} = alertSettings || {};

  const checkLanguage = async () => {
    let language = await getLanguage();
    if (!language) {
      const deviceLanguage =
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
          : NativeModules.I18nManager.localeIdentifier;
      language = deviceLanguage.split('_')[0];
    }
    i18next.changeLanguage(language);
    dispatch({
      type: actions.SET_LANGUAGE,
      selectedLanguage: language,
    });
  };

  const checkStatus = async () => {
    try {
      const userInfo = await getUserInfo();
      if (userInfo && userInfo.id) {
        dispatch({
          type: actions.SET_USER,
          user: userInfo,
        });
      } else {
        dispatch({
          type: actions.SET_USER,
          user: '',
        });
      }
    } catch (err) {}
  };

  const getAlertSettings = () => {
    const onConfirmPressed =
        settings && settings.onConfirmPressed
          ? settings.onConfirmPressed
          : () => {},
      onCancelPressed =
        settings && settings.onCancelPressed
          ? settings.onCancelPressed
          : () => {};
    return {
      ...settings,
      onConfirmPressed: () => {
        dispatch({
          type: actions.SET_ALERT_SETTINGS,
          alertSettings: null,
        });
        onConfirmPressed();
      },
      onCancelPressed: () => {
        dispatch({
          type: actions.SET_ALERT_SETTINGS,
          alertSettings: null,
        });
        onCancelPressed();
      },
    };
  };

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: theme.APP_COLOR}} />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.COLORS.WHITE}}>
        <StatusBar backgroundColor={theme.APP_COLOR} barStyle="dark-content" />
        <AppAlert {...getAlertSettings()} />
        <ModalActivityIndicator modalVisible={show} />
        <CreateRootNavigator />
      </SafeAreaView>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <MenuProvider>
            <I18nextProvider i18n={i18next}>
              <RootNavigator />
            </I18nextProvider>
          </MenuProvider>
        </StateProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

LogBox.ignoreAllLogs(true);