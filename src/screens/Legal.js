import {View, StyleSheet, Text, ScrollView} from 'react-native';
import React from 'react';
import {theme} from '../services/Common/theme';
import {withTranslation} from 'react-i18next';
import Button from '../components/Button';

const Legal = ({navigation, t}) => {
  const options = [
    {
      title: 'Bounty Information',
      screen: 'Bounty',
    },
    {
      title: 'Personal Information',
      screen: 'ImageCategorization',
    },
    {
      title: 'Privacy Policy',
      screen: 'PrivacyInformation',
    },
    {
      title: 'Terms of Service',
      screen: 'TOS',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Legal Info</Text>
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.contentInnerContainer}>
        {options.map((option) => {
          return (
            <Button
              title={option.title}
              style={styles.buttonWrapper}
              buttonStyle={styles.button}
              onPress={() => navigation.navigate(option.screen)}
              textStyle={styles.buttonText}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    display: 'flex',
    fontWeight: '500',
    flexDirection: 'row',
    marginVertical: '4.3%',
    marginHorizontal: '5.2%',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
  },
  contentContainer: {
    flex: 1,
    paddingTop: '5%',
    paddingHorizontal: 25,
    backgroundColor: theme.APP_COLOR_2,
  },
  contentInnerContainer: {
    alignItems: 'center',
    paddingBottom: '23%',
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '500',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.WHITE,
  },
  buttonWrapper: {
    width: '90%',
  },
  button: {
    borderRadius: 25,
    alignSelf: 'center',
    backgroundColor: theme.APP_COLOR_1,
  },
});

export default withTranslation()(Legal);
