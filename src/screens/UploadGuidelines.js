import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, Linking, Platform} from 'react-native';
//import Panel from '../components/Panel';
import CheckBox from '../components/CheckBox';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/uploadguidelines';
import {saveUsageFlag} from '../services/API/APIManager';
import {getDataUsageFlag, setDataUsageFlag} from '../services/DataManager';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Checkbox, } from 'react-native-paper';

const Panel = ({title, children})=>{
  return (
    <>
      <View
        style={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: '#E3E7FF',
            paddingHorizontal: '4%',
            paddingVertical: 10,
            marginTop: '4%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        }}
        >
          <AntIcon
            name={'caretdown'}
            style={{
              textAlign: 'center',
              marginRight: 5,
            }}
            size={13}
          />
          <Text style={{
            fontSize: 13,
            color: '#000',
            fontWeight: Platform.OS === 'android' ? 'bold' : '500',
            textAlign: 'center',
            fontFamily: 'Inter-Regular',
          }}>{title}</Text>
        </View>
        <View 
        style={{
            backgroundColor: '#f2f2f2',
            paddingHorizontal: '4%',
            paddingVertical: '2%',
        }}>
          {children}
        </View>
        </>
  )
}

const Upload = ({navigation, ...props}) => {
  const {isDataUsageAvailable, setDataUsageAvailable} = props;
  const [checked, setChecked] = useState(false);
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
          <Checkbox.Item
            mode='android'
            onPress={async (e) => {
              setChecked(!checked);
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
            status={ checked ? 'checked': 'unchecked'}
            labelStyle={{
                fontSize: 10, textAlign: 'left'
            }}
            style={{
                flex: 1,
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 0,
                marginLeft: 0,
                marginRight: 16,
            }}
            color='#ccc'
            position='leading'
            label={'I accept DataUnion\'s Guidelines and Terms of Service'}
            />
          </View>
        </Panel>
 
     </ScrollView>
    </View>
  );
};

export default Upload;
