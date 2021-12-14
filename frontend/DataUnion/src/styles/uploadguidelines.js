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
    backgroundColor: theme.COLORS.WHITE,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    color: '#41474E',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    marginBottom: '5%',
    fontFamily: 'Cochin',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: theme.COLORS.BLACK,
    fontWeight: Platform.OS === 'android' ? 'bold' : '500',
    marginBottom: '6%',
    fontFamily: 'Cochin',
    textAlign: 'center',
  },
  marginBottom3p: {
    marginBottom: '3%',
  },
  bulletContainer: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Cochin',
    fontSize: 12,
    fontWeight: '300',
  },
  bulletIcon: {
    paddingTop: Platform.OS === 'ios' ? '1.5%' : '2.3%',
    marginRight: '1%',
  },
  bulletText: {
    color: '#000',
    fontSize: 12,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontFamily: 'Cochin',
  },
  linkText: {
    color: theme.APP_COLOR,
    fontFamily: 'Cochin',
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
    fontFamily: 'Cochin',
  },
});
