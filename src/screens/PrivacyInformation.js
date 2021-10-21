/* eslint-disable no-unused-vars */
import {View, StyleSheet, Dimensions, Linking, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import {theme} from '../services/Common/theme';
import {withTranslation} from 'react-i18next';
import HTML from 'react-native-render-html';
/**
 * Privacy Information
 * https://alpha.dataunion.app/privacy/
 *
 * @param {*} param0
 * @returns
 */

const PrivacyInformation = ({navigation, t}) => {
  const [, dispatch] = useStateValue();

  useEffect(() => {}, []);

  const classesStyles = {};

  const tagsStyles = {
    h1: {
      color: theme.COLORS.WHITE,
      textAlign: 'center',
      marginBottom: 10,
    },
    h2: {
      color: theme.COLORS.WHITE,
    },
    h4: {
      color: theme.COLORS.WHITE,
      fontSize: 16,
      textAlign: 'center',
    },
    img: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20,
      width: '80%',
      backgroundColor: 'red',
    },
    label: {
      color: '#41474E',
    },
    b: {
      color: theme.COLORS.WHITE,
    },
    a: {
      color: theme.COLORS.LIGHT_RED,
    },
    p: {
      color: theme.COLORS.WHITE,
      textAlign: 'left',
    },
  };

  const renderersProps = {
    a: {
      onPress(event, url, htmlAttribs, target) {
        Linking.openURL(url);
      },
    },
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <HTML
        source={{html: t('privacy.content')}}
        imagesMaxWidth={Dimensions.get('window').width * 0.9}
        staticContentMaxWidth={Dimensions.get('window').width * 0.9}
        tagsStyles={tagsStyles}
        classesStyles={classesStyles}
        renderersProps={renderersProps}
      />
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
    textAlign: 'center',
  },
});

export default withTranslation()(PrivacyInformation);
