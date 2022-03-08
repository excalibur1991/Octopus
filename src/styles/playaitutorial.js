import {StyleSheet, Dimensions, Platform} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 0,
      backgroundColor: theme.COLORS.BACKGROUND,
    },
    marginBottom3p: {
      marginBottom: '3%',
    },
    uploadContainer: {
      flex: 1,
    },
    uploadBorderContainer: {
      flex: 1,
      paddingHorizontal: '10%',
      paddingVertical: '5%',
      borderWidth: 2,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      borderColor: '#E3E7FF',
      marginVertical: '10%',
    },
    uploadText: {
      color: theme.APP_COLOR,
      fontSize: 12,
      textAlign: 'center',
      fontFamily: 'Inter-Regular',
      fontWeight: '400',
    },
    imageIcon: {
      height: 70,
      width: 90,
      marginBottom: '3%',
    },
    button: {
      marginTop: '2%',
      borderRadius: 15,
    },
    buttonText: {
      color: theme.COLORS.WHITE,
      fontSize: 19,
      textAlign: 'center',
      fontWeight: Platform.OS === 'android' ? 'bold' : '600',
      fontFamily: 'Inter-Bold',
    },

    smallButton: {
      marginTop: '1%',
      borderRadius: 25,
      width: 70,
    },
    smallButtonText: {
      color: '#EB5454',
      fontSize: 13,
      textAlign: 'center',
      fontWeight: Platform.OS === 'android' ? 'bold' : '600',
      fontFamily: 'Inter',
    },

    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    uploadScrollContainer: {
      flex: 1,
      flexGrow: 1,
      width: '100%',
      height: '100%',
      paddingTop:'25%',
      paddingHorizontal: '5%',
    },
    readOnlyContainer: {
      borderRadius: 15,
      backgroundColor: '#F5F6FC',
      marginBottom: '3%',
    },
    readOnlyTagsContainer: {
      flexWrap: 'wrap',
      borderRadius: 10,
      marginVertical: 5,
      flexDirection: 'row',
    },
    image: {
      height: 200,
      width: '100%',
    },
    space: {
      marginBottom: 15,
    },
    textFieldHeader: {
      fontSize: 12,
      marginTop: 10,
      fontFamily: 'Inter-Regular',
      fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    },
    multipleFilesHeader: {
      fontSize: 18,
      fontWeight: Platform.OS === 'android' ? 'bold' : '600',
      marginTop: 10,
      fontFamily: 'Inter-Bold',
    },
    descroptionContainer: {
      borderColor: 'lightgray',
      borderRadius: 10,
      borderWidth: 1,
      marginVertical: 5,
      padding: 5,
      maxHeight: 100,
    },
    text: {
      fontFamily: 'Inter-Regular',
    },
    colorPicker:  {
      height: 200,
      marginVertical: 10,
    },
    colorPickerView: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderColor: '#e9e9e9',
      borderRadius: 5,
      borderWidth: 1,
      padding: 10,
      marginTop: 10,
    },
    skinButton: {
      borderColor: '#e9e9e9',
      borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 10,
      paddingLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
      height: 53

    },
    ageInput: {
      borderColor: '#e9e9e9',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
    },
    tagWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#3A506B',
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 10
    },
    leftbar: {

    },
    rightbar: {

    },
    CardWrapper: {
      height: '70%',
      zIndex: 1000,
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingTop:'25%',
    },
    leftbar: {
      zIndex: 0,
      height: '100%',
      left: 0
    },
    rightbar: {
      zIndex: 0,  
      right: 0,
      height: '100%',
    },
    CardView: {
      zIndex: 1000
    },

    tut_overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      flex: 1,
      height: '100%',
      //height:  Dimensions.get('window').height, //'100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      opacity: 0.78,
      zIndex: 10
    },
    tut_overlay_completed: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      flex: 1,
      height: '100%',
      //height:  Dimensions.get('window').height, //'100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      opacity: 0.4,
      zIndex: 999
    },
    tut_exit: {
      position: 'absolute',
      alignItems: 'flex-end',
      right: 24,
      top: Platform.OS === 'ios' ? 6: 42,
    },
    tut_content: {
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
      marginLeft: 0,
    },
    nextContainer: {
      top: 0,
      bottom: 0,
      right: -40,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    nextButton: {
      borderRadius: 50,
      transform: [{scaleY: 2}],
    },
    buttonInner: {
      width: 75,
      height: 150,
      borderRadius: 50,
    },
    buttonIconContainer: {
      top: 0,
      left: 10,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    next_tut_btn: {
      position: 'absolute',
      right: -40
    },
    tut_desc_heading: {
      color: '#FFF',
      fontFamily: 'Moon-Bold',
      fontSize: 24,
      lineHeight: 24,
    },
    tut_description: {
      marginTop: 15,
      color: '#FFF',
      fontFamily: 'Moon-Light',
      fontSize: 12,
      lineHeight: 20,
    },
    tut_center: {
      position: 'absolute',
      flex: 1, 
      width: '100%',
      height: '100%',
      justifyContent: 'center', 
      alignContent:'center', 
      alignItems: 'center'
    },
    tut_text_big: {
      color: '#FFF',
      fontFamily: 'Moon-Bold',
      fontSize: 32,
      textAlign: 'center'
    },
    tut_text_big_desc: {
      color: '#FFF',
      fontFamily: 'Moon-Bold',
      fontSize: 14,
      textAlign: 'center',
      marginVertical: 20
    }
  
  });
  