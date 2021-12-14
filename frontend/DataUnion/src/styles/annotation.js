import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: '2%',
      paddingTop: '5%',
      paddingHorizontal: 25,
      alignItems: 'center',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: theme.COLORS.WHITE,
    },
    column: {
      width: '100%', 
      flexDirection: 
      'column', flex: 1,
      paddingBottom: 20
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
    tagWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#DADADA',
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginBottom: 10
    },
    imageView: {
      marginTop: 10,
      width: '100%',
      aspectRatio: 1.2
    },
    imageZoom: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      borderColor: '#DADADA',
      borderWidth: 1
    },
    imageContainer: {
      width: '100%',
      height: '100%',
    },
    svgStyle:{
      position: "absolute",  
      left: 0,
      top: 0,
      
    },
    button: {
      width: '100%',
      backgroundColor: '#4E9CF9',
      borderRadius: 16,
      marginTop: 20,
    },
    svgRect: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0
    }
});