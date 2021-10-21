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
import {ScrollView} from 'react-native-gesture-handler';
import {fetchOverall} from '../functions/mystats';

const LandingPage = ({navigation, t}) => {
  const [uploadsCount, setUploadsCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [options, setOptions] = useState([
    /*
    {
      title: t('landing.annotation'),
      screen: 'Annotation',
      icon: 'note-add',
      Icon: MaterialIcon,
    },
    */
    /*
    {
      title: 'Roman Number Upload',
      screen: 'RomanNumberUpload',
      icon: 'analytics',
      Icon: MaterialIcon,
    },
    */
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
    fetchOverall(
      () => {},
      () => {},
      setUploadsCount,
      setVerifiedCount,
      [],
      [],
      [],
      [],
      [],
      () => {},
      () => {},
      () => {},
      () => {},
      () => {},
      () => {},
      () => {},
      () => {},
      () => {},
    );
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
    setup();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          <Text style={styles.textBold}>Hi !</Text> HoneyBadger98
        </Text>
        <MaterialIcon
          size={20}
          name="info"
          onPress={() => {}}
          color={theme.COLORS.WHITE}
        />
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsLabel}>
          <Text style={styles.statsValue}>{uploadsCount}</Text> Uploads
        </Text>
        <Text style={styles.statsLabel}>
          <Text style={styles.statsValue}>{verifiedCount}</Text> Verified
        </Text>
      </View>
      <ScrollView
        style={styles.menuContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuContainerInner}>
        {options.slice(0, 2).map((item) => (
          <Ripple
            onPress={() => {
              if (['UploadGuidelines', 'UploadImage'].includes(item.screen)) {
                navigation.navigate(item.screen, {file: null});
              } else {
                navigation.navigate(item.screen);
              }
            }}
            outerStyle={styles.listItemOuterFull}
            innerStyle={styles.listItemInner}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </Ripple>
        ))}
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={options.slice(2)}
          renderItem={({item}) => (
            <Ripple
              key={item.id}
              outerStyle={styles.listItemOuter}
              innerStyle={styles.listItemInner}
              onPress={() => navigation.navigate(item.screen)}>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </Ripple>
          )}
          numColumns={2}
        />
      </ScrollView>
    </View>
  );
};

export default withTranslation()(LandingPage);
