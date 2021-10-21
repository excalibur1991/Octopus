/* eslint-disable no-unused-vars */
import {View, StyleSheet, Text, Linking, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import {theme} from '../services/Common/theme';
import {withTranslation} from 'react-i18next';

/**
 * Term of Servvice
 * https://alpha.dataunion.app/terms/
 *
 * @param {*} param0
 * @returns
 */

const TOS = ({navigation, t}) => {
  const [, dispatch] = useStateValue();

  useEffect(() => {}, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>{t('tos.header')}</Text>
      <Text style={styles.body}>{t('tos.body')}</Text>
      <Text style={styles.contactHeader}>{t('tos.contactHeader')}</Text>
      <Text
        onPress={() => {
          Linking.openURL('mailto:copyright@dataunion.app');
        }}
        style={styles.contactMail}>
        {t('tos.copyrightMail')}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    marginTop: '2.2%',
    paddingHorizontal: 25,
    backgroundColor: theme.APP_COLOR_2,
  },
  scrollContainer: {
    paddingBottom: '25%',
    alignItems: 'center',
  },
  header: {
    color: theme.COLORS.WHITE,
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    color: theme.COLORS.WHITE,
    marginTop: 20,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
  contactHeader: {
    color: theme.COLORS.WHITE,
    fontSize: 14,
    marginTop: 25,
  },
  contactMail: {
    color: theme.COLORS.LIGHT_RED,
    fontSize: 16,
  },
});

export default withTranslation()(TOS);
