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
import Button from '../components/Button';

const Legal = ({navigation, t}) => {

    const [, dispatch] = useStateValue();

    const options = [
        {
            title: 'Bounty Information',
            screen: 'Bounty'
        },
        {
            title: 'Personal Information',
            screen: 'ImageCategorization'
        },
        {
            title: 'Privacy Policy',
            screen: 'PrivacyInformation'
        },
        {
            title:'Terms of Service',
            screen: 'TOS',
        }
    ];
   
    useEffect(()=>{

    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Legal Info</Text>
            {
                options.map((option)=>{
                    return (
                        <Button
                            color="#f2f2f2"
                            title={option.title}
                            style={styles.buttonWrapper}
                            buttonStyle={styles.button}
                            onPress={() =>
                                navigation.navigate(option.screen)
                            }
                            textStyle={styles.buttonText}
                        />
                    )
                })
            }
            
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
        marginBottom: 30,
        color: '#6C6C6C',
    },
    buttonText: {
        fontSize: 19,
        fontWeight: '600',
        color: theme.APP_COLOR,
        fontFamily: 'Inter-Bold',
    },
    buttonWrapper: {
        width: '90%'
    },
    button: {
        borderRadius: 25,
        alignSelf: 'center',
    },
});


export default withTranslation()(Legal);