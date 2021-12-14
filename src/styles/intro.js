import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
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
        color: '#FFF',
        lineHeight: 23,
        textAlign: 'justify',
    },
    contactHeader: {
        fontSize: 14,
        marginTop: 25,
        color: '#FFF',
    },
    contactMail: {
        color: '#FF4092',
        fontSize: 16
    }
});