import {Platform, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: '4.3%',
    marginHorizontal: '5.2%',
  },
  headerText: {
    fontSize: 24,
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
  },
  scrollContainer: {
    flex: 1,
    paddingVertical: '3%',
    paddingHorizontal: '6%',
    backgroundColor: theme.APP_COLOR_2,
  },
  subHeader: {
    fontSize: 16,
    color: theme.COLORS.WHITE,
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
    color: theme.COLORS.WHITE,
  },
  bulletIcon: {
    paddingTop: Platform.OS === 'ios' ? '1.5%' : '2.3%',
    marginRight: '1%',
  },
  bulletText: {
    color: theme.COLORS.WHITE,
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
});
