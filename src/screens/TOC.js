/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import {theme} from '../services/Common/theme';
import React, {useEffect, useState} from 'react';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import {Checkbox} from 'react-native-paper';
import {
  isPrivacyAndTermsAccepted,
  setPrivacyAndTermsAccepted,
} from '../services/DataManager';
import Panel from '../components/Panel';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '../components/CheckBox';

const TOC = (props) => {
  const [checked, setChecked] = useState(false);

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    headerContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      marginVertical: '4.3%',
      marginHorizontal: '5.2%',
    },
    headerText: {
      fontSize: 24,
      color: theme.COLORS.WHITE,
      fontFamily: 'Inter-Regular',
    },
    scrollContainer: {
      flex: 1,
      paddingVertical: '3%',
      paddingHorizontal: '6%',
      backgroundColor: theme.APP_COLOR_2,
    },
    subHeader: {
      fontSize: 16,
      color: theme.COLORS.WHITE,
      fontWeight: Platform.OS === 'android' ? 'bold' : '500',
      marginBottom: '6%',
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
    },
    marginBottom3p: {
      marginBottom: '3%',
    },
    bulletContainer: {
      flexDirection: 'row',
    },
    text: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      fontWeight: '300',
      color: theme.COLORS.WHITE,
    },
    bulletIcon: {
      paddingTop: Platform.OS === 'ios' ? '1.5%' : '2.3%',
      marginRight: '1%',
    },
    bulletText: {
      color: theme.COLORS.WHITE,
      fontSize: 12,
      fontWeight: Platform.OS === 'android' ? 'bold' : '600',
      fontFamily: 'Inter-Regular',
    },
    linkText: {
      color: theme.APP_COLOR,
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      fontWeight: '400',
    },
    checkBoxContainer: {
      marginTop: '3%',
      marginHorizontal: 1,
    },
  });

  useEffect(() => {
    setChecked(props.isTOCChecked);
  }, []);

  const onCheck = (value) => {
    setPrivacyAndTermsAccepted();
    setChecked(value);
    props.setTOCChecked();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Verify data</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.subHeader}>
          Improve the DataUnion.app image dataset &amp; receive rewards. Flag
          inappropriate images, check that tags &amp; descriptions are fitting,
          and add missing tags. If a description is not fitting you can add
          another one. Bad actors will be weeded out by the democratic system.
        </Text>
        <Panel title="Read the Terms and Upload Guidelines">
          <Text style={[styles.marginBottom3p, styles.text]}>
            We at DataUnion.app respect the privacy and intellectual property of
            our users. We expect that you do the same.
          </Text>
          <Text style={[styles.marginBottom3p, styles.text]}>
            We expect that you do not upload images:
          </Text>
          <View style={styles.bulletContainer}>
            <FontAwesomeIcon
              name="circle"
              color={theme.COLORS.WHITE}
              style={styles.bulletIcon}
              size={7}
            />
            <Text style={styles.bulletText}>
              Where you do not own the rights to
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <FontAwesomeIcon
              name="circle"
              color={theme.COLORS.WHITE}
              style={styles.bulletIcon}
              size={7}
            />
            <Text style={styles.bulletText}>
              That contain personally identifiable information of others or
              interfere with the privacy of others
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <FontAwesomeIcon
              name="circle"
              color={theme.COLORS.WHITE}
              style={styles.bulletIcon}
              size={7}
            />
            <Text style={styles.bulletText}>
              That contain portrayals of pornography or violence
            </Text>
          </View>
          <View style={[styles.bulletContainer, styles.marginBottom3p]}>
            <FontAwesomeIcon
              name="circle"
              color={theme.COLORS.WHITE}
              style={styles.bulletIcon}
              size={7}
            />
            <Text style={styles.bulletText}>That contain legal violations</Text>
          </View>
          <Text style={styles.text}>
            We reserve the right to terminate accounts (and block Ethereum
            addresses) of users who appear to be responsible for legal
            violations or violations of our
            <Text
              style={styles.linkText}
              onPress={() =>
                Linking.openURL('https://alpha.dataunion.app/terms/')
              }>
              {' Terms of service.'}
            </Text>
          </Text>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              size={18}
              isChecked={checked}
              textColor={theme.COLORS.WHITE}
              onChange={() => onCheck(!checked)}
              title="I accept DataUnion's Guidelines and Terms of Service"
            />
          </View>
        </Panel>
      </ScrollView>
    </View>
  );
};

export default TOC;
