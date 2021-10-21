/* eslint-disable no-unused-vars */
import {
  View,
  StyleSheet,
  Dimensions,
  VirtualizedList,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import {theme} from '../services/Common/theme';
import {withTranslation} from 'react-i18next';
import HTML from 'react-native-render-html';
/**
 * Privacy Information
 * https://alpha.dataunion.app/image_categorization/
 *
 * @param {*} param0
 * @returns
 */

const ImageCategorization = ({navigation, t}) => {
  const [, dispatch] = useStateValue();
  const [listView, setListView] = useState(null);

  const image_categorization = [
    {
      tag: 'header',
      content: t('ImageCategorization.mainHeader.content'),
    },
    {
      tag: 'info',
      content: t('ImageCategorization.info.content'),
    },
    {
      tag: 'why',
      content: t('ImageCategorization.why.content'),
    },
    {
      tag: 'how',
      content: t('ImageCategorization.how.content'),
    },
    {
      tag: 'biometric',
      content: t('ImageCategorization.biometric.content'),
    },
    {
      tag: 'faces',
      content: t('ImageCategorization.faces.content'),
    },
    {
      tag: 'nonFaces',
      content: t('ImageCategorization.nonFaces.content'),
    },
    {
      tag: 'nonPII',
      content: t('ImageCategorization.nonPII.content'),
    },
  ];

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
      width: Dimensions.get('window').width * 0.85,
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
      textAlign: 'justify',
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
    <VirtualizedList
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      ref={(view) => {
        setListView(view);
      }}
      data={image_categorization}
      keyExtractor={(item, index) => index}
      renderItem={(item) => {
        if (item.item.tag === 'header') {
          return (
            <HTML
              source={{html: item.item.content}}
              imagesMaxWidth={Dimensions.get('window').width * 0.9}
              staticContentMaxWidth={Dimensions.get('window').width * 0.9}
              tagsStyles={tagsStyles}
              classesStyles={classesStyles}
              renderersProps={renderersProps}
            />
          );
        } else {
          return (
            <HTML
              source={{html: item.item.content}}
              imagesMaxWidth={Dimensions.get('window').width * 0.9}
              staticContentMaxWidth={Dimensions.get('window').width * 0.9}
              tagsStyles={tagsStyles}
              classesStyles={classesStyles}
              renderersProps={renderersProps}
            />
          );
        }
      }}
      getItem={(data, index) => data[index]}
      getItemCount={() => image_categorization.length}
    />
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
  },
});

export default withTranslation()(ImageCategorization);
