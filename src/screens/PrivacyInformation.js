import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Linking,
    ScrollView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import {theme} from '../services/Common/theme';
import {withTranslation} from 'react-i18next';
import HTML from 'react-native-render-html';
/**
 * Privacy Information
 * https://alpha.dataunion.app/privacy/
 * 
 * @param {*} param0 
 * @returns 
 */


const PrivacyInformation = ({navigation, t}) => {

    const [, dispatch] = useStateValue();
   
    useEffect(()=>{
        }, []);

    const classesStyles = {
    
    }
        
    const tagsStyles = {
        h1: {
            color: '#000000',
            textAlign: 'center',
            marginBottom: 10
        },
        h4: {
            color: '#41474E',
            fontSize: 16,
            textAlign: 'center'
        },
        img: {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 20,
            width: '80%',
            backgroundColor: 'red'
        },
        label: {
            color: '#41474E',
        },
        b: {
            color: '#000000'
        },
        a: {
            color: '#ff4092'
        },
        p: {
            textAlign: 'left'
        }
    };

    const renderersProps = {
        a: {
          onPress(event, url, htmlAttribs, target) {
            Linking.openURL(url)
          }
        }
    };
     
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <HTML 
                    source={{html: t('privacy.content')}} 
                    imagesMaxWidth={Dimensions.get('window').width * .9 } 
                    staticContentMaxWidth={Dimensions.get('window').width * .9 }
                    tagsStyles={tagsStyles}
                    classesStyles={classesStyles}
                    renderersProps={renderersProps}
                /> 
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
      paddingHorizontal: 25,
      alignItems: 'center',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: theme.COLORS.WHITE,
    }
});


export default withTranslation()(PrivacyInformation);