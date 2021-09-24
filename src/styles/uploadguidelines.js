import {Platform, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '8%',
    paddingHorizontal: '8%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.SCREEN_BACK_COLOR_1,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    color: '#6C6C6C',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    marginBottom: '5%',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#4a4a4a',
    fontWeight: Platform.OS === 'android' ? 'bold' : '500',
    marginBottom: '6%',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  marginBottom3p: {
    marginBottom: '3%',
  },
  bulletContainer: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight: '300',
    color: '#1b1d1e',
  },
  bulletIcon: {
    paddingTop: Platform.OS === 'ios' ? '1.5%' : '2.3%',
    marginRight: '1%',
  },
  bulletText: {
    color: '#1b1d1e',
    fontSize: 12,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontFamily: 'Inter-Regular',
  },
  linkText: {
    color: theme.APP_COLOR,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight: '400',
  },
  checkBoxContainer: {
    marginTop: '3%',
    marginHorizontal: 1,
  },
  acceptButton: {
    borderRadius: 15,
    marginTop: '3%',
  },
  acceptButtonText: {
    color: theme.COLORS.WHITE,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontFamily: 'Inter-Bold',
  },
});
