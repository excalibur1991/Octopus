import {
    View, 
    Image,
    Text,
    StyleSheet,
    ScrollView,
    Linking
} from 'react-native';
import {theme} from '../services/Common/theme';
import React, {useEffect, useState} from 'react';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import {Checkbox, } from 'react-native-paper';
import {isPrivacyAndTermsAccepted, setPrivacyAndTermsAccepted} from '../services/DataManager'

const TOC = (props) => {

    const [checked, setChecked] = useState(false);

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 20,
            paddingTop: 20,
        },
        title: {
            textAlign: 'center',
            fontSize: 24,
            color: '#41474E',
            marginTop: 25,
            lineHeight: 22,
            fontWeight: "600",
            fontFamily: 'Cochin',
        },
        description: {
            textAlign: 'center',
            fontSize: 16,
            fontWeight: "400",
            color: '#41474E',
            marginLeft:47,
            marginRight: 47,
            marginTop: 17,
            fontFamily: 'Cochin',
        },
        boxContainer: {
            marginLeft: 25,
            marginRight: 25,
            marginBottom: 25
        },
        boxHeader: {
            marginTop: 25,
            height: 50,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: "#E3E7FF",
            justifyContent: 'center',
        },
        boxHeaderText: {
            textAlign: 'center',
            fontSize: 13,
            color: '#000000',
            fontWeight: '500',
            fontFamily: 'Cochin',
        },
        boxContent: {
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            backgroundColor: "#F5F6FC",
            padding: 24,
        },
        textNormal: {
            fontSize: 12,
            lineHeight: 20,
            fontWeight: '300',
            fontFamily: 'Cochin',
        },
        textBold: {
            fontSize: 12,
            lineHeight: 20,
            fontWeight: '600',
            fontFamily: 'Cochin',
        },
        checkTOC: {
            marginTop: 15,
            fontSize: 12,
        }




    });

  useEffect(() => {
      setChecked(props.isTOCChecked)
  }, []);

  const onCheck = (value)=>{
    setPrivacyAndTermsAccepted();
    setChecked(value);
    props.setTOCChecked();
  };


    return (
        <ScrollView style={styles.mainCotainer}>
            <Text style={styles.title}>Verify data</Text>
            <Text 
                style={styles.description}
            >Improve the DataUnion.app image dataset &nbsp; receive rewards. Flag inappropriate images, check that tags &nbsp; descriptions are fitting, and add missing tags. If a description is not fitting you can add another one. Bad actors will be weeded out by the democratic system.</Text>

            <View style={styles.boxContainer}>
                <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>▼ Read the Terms and Upload Guidelines</Text>
                </View>
                <View style={styles.boxContent}>
                    <Text style={styles.textNormal}>We at DataUnion.app respect the privacy and intellectual property of our users. We expect that you do the same.</Text>
                    <Text style={styles.textNormal}>We expect that you do not upload images:</Text>
                    <Text style={styles.textBold}>
                        • Where you do not own the rights to{'\n'}
                        • That contain personally identifiable information of others or interfere with the privacy of others{'\n'}
                        • That contain portrayals of pornography or violence{'\n'}
                        • That contain legal violations {'\n'}
                    </Text>
                    <Text style={styles.textNormal}>
                    We reserve the right to terminate accounts (and block Ethereum addresses) of users who appear to be responsible for legal violations or violations of our 
                    <Text color={''} onPress={()=> {Linking.openURL('https://alpha.dataunion.app/terms/')}}> Terms of service.</Text> 
                    </Text>
                    <Checkbox.Item
                        onPress={()=>onCheck(!checked)}
                        status={ checked ? 'checked': 'unchecked'}
                        labelStyle={{
                            fontSize: 10
                        }}
                        color='#ccc'
                        position='leading'
                        label={'I accept DataUnion\'s Guidelines and Terms of Service'}
                        
                    />
                </View>
            </View>

        </ScrollView>
    );
};

export default TOC;