/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Text, View, FlatList} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/landingpage';
import {withTranslation} from 'react-i18next';
import {getUsageFlag} from '../services/API/APIManager';

const LandingPage = ({navigation, t}) => {
  const [options, setOptions] = useState([
    /*
    {
      title: 'Roman Number Upload',
      screen: 'RomanNumberUpload',
      icon: 'analytics',
      Icon: MaterialIcon,
    },
    */
    {
      title: t('landing.upload'),
      screen: 'Upload',
      icon: 'cloud-upload',
      Icon: MaterialIcon,
    },
    {
      title: t('landing.annotation'),
      screen: 'Annotation',
      icon: 'note-add',
      Icon: MaterialIcon,
    },
    {
      title: t('landing.verification'),
      screen: 'Verification',
      icon: 'fingerprint',
      Icon: MaterialIcon,
    },
    {
      title: t('landing.myStats'),
      screen: 'MyStats',
      icon: 'analytics-sharp',
      Icon: IonIcon,
    },
    /*
    {
      title: t('landing.learn'),
      screen: 'Learn',
      icon: 'subscriptions',
      Icon: MaterialIcon,
    },
    */
    {
      title: t('landing.stats'),
      screen: 'Stats',
      icon: 'analytics',
      Icon: MaterialIcon,
    },
    /*
    {
      icon: 'info',
      title: t('landing.info'),
      screen: 'About',
      Icon: MaterialIcon,
    },
    */
    {
      title: t('landing.wallet'),
      screen: 'Wallet',
      icon: 'account-balance-wallet',
      Icon: MaterialIcon,
    },
    {
      title: t('Legal'),
      screen: 'Legal',
      icon: 'privacy-tip',
      Icon: MaterialIcon,
    },
  ]);

  useEffect(() => {
    const setup = async () => {
      const res = await getUsageFlag();
      const item = {
        title: t('landing.upload'),
        screen: 'UploadGuidelines',
        icon: 'analytics',
        Icon: MaterialIcon,
      };
      if (
        res &&
        res.usage_flag &&
        res.usage_flag.toLowerCase() === 'accepted'
      ) {
        item.screen = 'UploadImage';
      }
      const allOptions = options.slice();
      allOptions.splice(0, 0, item);
      setOptions(allOptions);
    };
    //setup();
  }, []);

  return (
    <View style={styles.container}>
      <Ripple
        outerStyle={styles.swipeAiOuter}
        innerStyle={styles.swipeAiInner}
        onPress={() => navigation.navigate('About')}>
        <View style={styles.swipeAiIcon}>
          <MaterialIcon size={50} name="info" color={theme.APP_COLOR} />
        </View>
        <Text style={styles.buttonText}>{t('landing.info')}</Text>
      </Ripple>
      <FlatList
        style={styles.Container}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        data={options}
        renderItem={({item}) => (
          <Ripple
            onPress={() => navigation.navigate(item.screen)}
            key={item.id}
            outerStyle={styles.listItemOuter}
            innerStyle={styles.listItemInner}>
            <item.Icon
              style={styles.icon}
              name={item.icon}
              size={39}
              color={theme.APP_COLOR}
            />
            <Text style={styles.itemTitle}>{item.title}</Text>
          </Ripple>
        )}
        numColumns={2}
      />
    </View>
  );
};

export default withTranslation()(LandingPage);
