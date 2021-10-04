import React from 'react';
import {ScrollView, Text, View, Linking} from 'react-native';
import Panel from '../components/Panel';
import CheckBox from '../components/CheckBox';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/uploadguidelines';
import {saveUsageFlag} from '../services/API/APIManager';
import {getDataUsageFlag, setDataUsageFlag} from '../services/DataManager';

const Upload = ({navigation, ...props}) => {
  const {isDataUsageAvailable, setDataUsageAvailable} = props;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        
        <Text style={styles.header}>Upload Data</Text>
        <Text style={styles.subHeader}>
          Upload, Describe & Tag Data for the DataUnion image dataset &
          receive rewards.
        </Text>
        <Panel title="Read the Terms and Upload Guidelines">
          <Text style={[styles.marginBottom3p, styles.text]}>
            We at DataUnion respect the privacy and intellectual property of
            our users. We expect that you do the same.
          </Text>
          <Text style={[styles.marginBottom3p, styles.text]}>
            We expect that you do not upload images:
          </Text>
          <View style={styles.bulletContainer}>
            <FontAwesomeIcon name="circle" style={styles.bulletIcon} size={7} />
            <Text style={styles.bulletText}>
              Where you do not own the rights to
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <FontAwesomeIcon name="circle" style={styles.bulletIcon} size={7} />
            <Text style={styles.bulletText}>
              That contain personally identifiable information of others or
              interfere with the privacy of others
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <FontAwesomeIcon name="circle" style={styles.bulletIcon} size={7} />
            <Text style={styles.bulletText}>
              That contain portrayals of pornography or violence
            </Text>
          </View>
          <View style={[styles.bulletContainer, styles.marginBottom3p]}>
            <FontAwesomeIcon name="circle" style={styles.bulletIcon} size={7} />
            <Text style={styles.bulletText}>That contain legal violations</Text>
          </View>
          <Text style={styles.text}>
            We reserve the right to terminate accounts (and block Ethereum
            addresses) of users who appear to be responsible for legal
            violations or violations of our
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL('https://alpha.dataunion.app/terms')}>
              {' Terms of service.'}
            </Text>
          </Text>
          <View style={styles.checkBoxContainer}>
            <CheckBox

              onChange={async (e) => {
                if (e) {
                  const res = await saveUsageFlag({flag: 'ACCEPTED'});
                  if (
                    res &&
                    res.status &&
                    res.status.toLowerCase() === 'success'
                  ) {
                    //navigation.navigate('UploadImage');
                    setDataUsageAvailable();
                  }
                }
              }}
              title="I accept DataUnion's Guidelines and Terms of Service"
            />
          </View>
        </Panel>
 
     </ScrollView>
    </View>
  );
};

export default Upload;
