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
            color: '#6C6C6C',
            marginTop: 25,
            lineHeight: 25,
            fontWeight: "600",
            fontFamily: 'Inter-Regular',
        },
        description: {
            textAlign: 'center',
            fontSize: 16,
            fontWeight: "400",
            color: '#4a4a4a',
            marginLeft:47,
            marginRight: 47,
            marginTop: 17,
            fontFamily: 'Inter-Regular',
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
            backgroundColor: '#fff',
            justifyContent: 'center',
        },
        boxHeaderText: {
            textAlign: 'center',
            fontSize: 13,
            color: '#6C6C6C',
            fontWeight: '500',
            fontFamily: 'Inter-Regular',
        },
        boxContent: {
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            backgroundColor: '#4a4a4a',
            padding: 24,
        },
        textNormal: {
            fontSize: 12,
            lineHeight: 20,
            fontWeight: '300',
            fontFamily: 'Inter-Regular',
            color: '#1b1d1e',
        },
        textBold: {
            fontSize: 12,
            lineHeight: 20,
            fontWeight: '600',
            fontFamily: 'Inter-Regular',
            color: '#1b1d1e',
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
            >Improve the VisioTherapy video dataset &nbsp; receive rewards. Flag inappropriate images, check that tags &nbsp; descriptions are fitting, and add missing tags. If a description is not fitting you can add another one. Bad actors will be weeded out by the democratic system.</Text>

            <View style={styles.boxContainer}>
                <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>▼ Read the Terms and Upload Guidelines</Text>
                </View>
                <View style={styles.boxContent}>
                    <Text style={styles.textNormal}>We at VisioTherapy respect the privacy and intellectual property of our users. We expect that you do the same.</Text>
                    <Text style={styles.textNormal}>We expect that you do not upload images:</Text>
                    <Text style={styles.textBold}>
                        • Where you do not own the rights to{'\n'}
                        • That contain personally identifiable information of others or interfere with the privacy of others{'\n'}
                        • That contain portrayals of pornography or violence{'\n'}
                        • That contain legal violations {'\n'}
                    </Text>
                    <Text style={styles.textNormal}>
                    We reserve the right to terminate accounts (and block Ethereum addresses) of users who appear to be responsible for legal violations or violations of our 
                        <Text
                         onPress={()=>{
                           navigation.navigate('Legal', {screen: 'TOS'});
                         }}
                        > Terms of service.</Text>
                    </Text>
                    <Checkbox.Item
                        onPress={()=>onCheck(!checked)}
                        status={ checked ? 'checked': 'unchecked'}
                        labelStyle={{
                            fontSize: 10,
                            color:'#1b1d1e'    
                        }}
                        color='#1b1d1e'
                        position='leading'
                        label={'I accept VisioTherapy\'s Guidelines and Terms of Service'}
                        
                    />
                </View>
            </View>

        </ScrollView>
    );
};

export default TOC;