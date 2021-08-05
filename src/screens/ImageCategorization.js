import {
    View,
    StyleSheet,
    Text,
    Linking,
    Dimensions,
    VirtualizedList,
    useNavigation
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import {theme} from '../services/Common/theme';
import {withTranslation} from 'react-i18next';
import HTML from 'react-native-render-html';

import MultiSelect from '../components/Multiselect'

const ImageCategorization = ({navigation, t}) => {

    return (
        <>
        </>
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
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold'

    },
    column: {
        width: '100%', 
         flex: 1,
         height: 100
    },
    headerLink: {
        color:'#ff4092'
    },
    bodyLink: {
        color:'#ff4092'
    },
    styleDropdownMenuSubsection: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DADADA',
        paddingLeft: 10
      },
      styleInputGroup: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DADADA',
        paddingLeft: 10
      },
});


export default withTranslation()(ImageCategorization);