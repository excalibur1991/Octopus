import {
    View,
    StyleSheet,
    Text,
    Linking,
} from 'react-native';
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
   
    useEffect(()=>{
        }, []);

     
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                {t('tos.header')}
            </Text>
            <Text style={styles.body}>
                {t('tos.body')}
            </Text>
            <Text style={styles.contactHeader}>
                {t('tos.contactHeader')}
            </Text>
            <Text onPress={()=>{Linking.openURL('mailto:info@visiotherapy.io')}}
            style={styles.contactMail}>
                {t('tos.copyrightMail')}
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      marginTop: '2%',
      paddingTop: '5%',
      paddingHorizontal: 25,
      alignItems: 'center',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: theme.SCREEN_BACK_COLOR_1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6C6C6C',
    },
    body: {
        marginTop: 20,
        fontSize: 16,
        lineHeight: 23,
        textAlign: 'center',
        color: '#4a4a4a',
    },
    contactHeader: {
        fontSize: 14,
        marginTop: 25,
        color: '#4a4a4a',
    },
    contactMail: {
        color: theme.APP_COLOR,
        fontSize: 16
    }
});


export default withTranslation()(TOS);