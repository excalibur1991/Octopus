import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from '../styles/about';
import {withTranslation} from 'react-i18next';

const About = ({t}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>{t('about.heading')}</Text>
        <Text style={styles.text}>{t('about.para1')}</Text>
        <Text style={styles.text}>{t('about.para2')}</Text>
        <Text style={styles.text}>{t('about.para3')}</Text>
        <Text style={styles.text}>{t('about.para4')}</Text>
        <Text style={styles.text}>{t('about.para5')}</Text>
      </ScrollView>
    </View>
  );
};

export default withTranslation()(About);
