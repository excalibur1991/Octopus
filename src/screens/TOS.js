import {
    View,
    StyleSheet,
    Text,
    Linking,
    ScrollView
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>
                    {t('tos.header')}
                </Text>
                <Text style={styles.body}>
                    {t('tos.body')}
                </Text>
                <Text style={styles.contactHeader}>
                    {t('tos.contactHeader')}
                </Text>
                <Text onPress={() => { Linking.openURL('mailto:copyright@dataunion.app') }}
                    style={styles.contactMail}>
                    {t('tos.copyrightMail')}
                </Text>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      marginTop: '2%',
      paddingTop: '5%',
      paddingBottom: '5%',
      paddingHorizontal: '5%',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: theme.COLORS.WHITE,
    },
    content: {

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold'

    },
    body: {
        marginTop: 20,
        fontSize: 16,
        lineHeight: 23,
        textAlign: 'justify',
    },
    contactHeader: {
        fontSize: 14,
        marginTop: 25
    },
    contactMail: {
        color: '#FF4092',
        fontSize: 16
    }
});


export default withTranslation()(TOS);