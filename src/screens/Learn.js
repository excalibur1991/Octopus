import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {ScrollView, Text, View} from 'react-native';
import {styles} from '../styles/learn';
import {withTranslation} from 'react-i18next';

const Learn = ({t}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>{t('learn.heading')}</Text>
        <Text style={styles.text}>{t('learn.para')}</Text>
        <View style={styles.box}>
          <YoutubePlayer height={180} videoId={'LXb3EKWsInQ'} play={false} />
        </View>
      </ScrollView>
    </View>
  );
};

export default withTranslation()(Learn);
