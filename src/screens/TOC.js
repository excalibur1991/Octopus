import {
    View, 
    Image,
    Text,
    StyleSheet,
    ScrollView,
    Linking,
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
            width: '100%',
            paddingHorizontal: '5%',
            paddingVertical: '2%',
        },
        title: {
            textAlign: 'center',
            fontSize: 24,
            color: '#41474E',
            lineHeight: 24,
            fontWeight: "600",
            fontFamily: 'Inter-Regular',
        },
        description: {
            textAlign: 'center',
            fontSize: 16,
            fontWeight: "400",
            color: '#41474E',
            flexWrap: 'wrap',
            flex: 1,
            flexGrow: 1,
            paddingHorizontal: 25,
            marginTop: 17,
            fontFamily: 'Inter-Regular',
        },
        boxContainer: {
            marginBottom: 25,
        },
        boxHeader: {
            marginTop: 25,
            paddingVertical: 16,
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
            fontFamily: 'Inter-Regular',
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
            fontFamily: 'Inter-Regular',
        },
        textBold: {
            fontSize: 12,
            lineHeight: 20,
            fontWeight: '600',
            fontFamily: 'Inter-Regular',
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
    <ScrollView 
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Verify data</Text>
        <Text 
            style={styles.description}
        >Improve the DataUnion image dataset &nbsp; receive rewards. Flag inappropriate images, check that tags &nbsp; descriptions are fitting, and add missing tags. If a description is not fitting you can add another one. Bad actors will be weeded out by the democratic system.</Text>

        <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
                <Text style={styles.boxHeaderText}>▼ Read the Terms and Upload Guidelines</Text>
            </View>
            <View style={styles.boxContent}>
                <Text style={styles.textNormal}>We at DataUnion respect the privacy and intellectual property of our users. We expect that you do the same.</Text>
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
                <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
                <Checkbox.Item
                    onPress={()=>onCheck(!checked)}
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
            </View>
        </View>
    </ScrollView>
    );
};

export default TOC;