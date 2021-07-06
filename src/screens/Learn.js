import React, {useRef, useState} from 'react';
import {theme} from '../services/Common/theme';
import YoutubePlayer from 'react-native-youtube-iframe';
import Ripple from '../components/Ripple';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Text, View, FlatList} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/learn';

const Learn = ({t}) => {
  const flatListRef = useRef(null);
  const iconListRef = useRef(null);
  const iconSize = 28;
  const sections = [
    {
      icon: MaterialIcon,
      name: 'info',
    },
    {
      icon: MaterialIcon,
      name: 'analytics',
    },
    {
      icon: MaterialIcon,
      name: 'swipe',
    },
    {
      icon: MaterialIcon,
      name: 'subscriptions',
    },
    {
      icon: MaterialIcon,
      name: 'account-balance-wallet',
    },
    {
      icon: IonIcon,
      name: 'analytics-sharp',
    },
    {
      icon: MaterialIcon,
      name: 'info',
    },
    {
      icon: IonIcon,
      name: 'analytics-sharp',
    },
  ];

  const sectionsContent = [
    {
      title: t('landing.info'),
      description: t('learn.para'),
      extra: (
        <View style={styles.playerBox}>
          <YoutubePlayer height={170} videoId={'LXb3EKWsInQ'} play={false} />
        </View>
      ),
    },
    {
      title: t('landing.stats'),
      description: t('learn.para'),
      extra: null,
    },
    {
      title: t('landing.swipeAI'),
      description: t('learn.para'),
      extra: null,
    },
    {
      title: t('landing.learn'),
      description: t('learn.para'),
      extra: null,
    },
    {
      title: t('landing.wallet'),
      description: t('learn.para'),
      extra: null,
    },
    {
      title: t('landing.myStats'),
      description: t('learn.para'),
      extra: null,
    },
  ];

  const [iconIndex, setIconIndex ]= useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('learn.heading')}</Text>
      <View style={styles.row}>
        <MaterialIcon name="arrow-left" size={30} onPress={()=>{
           if (iconListRef.current && iconIndex-2 >=0) {
            iconListRef.current.scrollToIndex({
              animated: true,
              index: iconIndex-2,
            });
            setIconIndex(iconIndex-2);
          }
        }} />
        <FlatList
          ref={iconListRef}
          horizontal
          data={sections}
          contentContainerStyle={styles.sectionsContainer}
          renderItem={({item, index}) => (
            <Ripple
              outerStyle={styles.sectionOuter}
              onPress={() => {
                if (flatListRef.current && index < sectionsContent.length) {
                  flatListRef.current.scrollToIndex({
                    animated: true,
                    index: index,
                  });
                }
              }}>
              <item.icon
                name={item.name}
                size={iconSize}
                color={theme.APP_COLOR}
              />
            </Ripple>
          )}
        />
        <MaterialIcon name="arrow-right" size={30} onPress={()=>{
           if (iconListRef.current && iconIndex+2 < sections.length) {
            iconListRef.current.scrollToIndex({
              animated: true,
              index: iconIndex+2,
            });
            setIconIndex(iconIndex+2);
          }
        }}/>
      </View>
      <FlatList
        horizontal
        ref={flatListRef}
        data={sectionsContent}
        showsVerticalScrollIndicator={false}
        style={styles.sectionContentContainer}
        scrollEnabled={false}
        renderItem={({item}) => (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>{item.title}</Text>
            <Text style={styles.sectionText}>{item.description}</Text>
            {item.extra}
          </View>
        )}
      />
    </View>
  );
};

export default Learn;
