import {StyleSheet, Platform} from 'react-native';
import {theme} from '../services/Common/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '8%',
    paddingHorizontal: '5%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.COLORS.WHITE,
  },
  head: {
    fontSize: 24,
    color: theme.COLORS.BLACK,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontFamily: 'Inter-Bold',
  },
  chart: {
    height: '85%',
    width: '100%',
  },
  button: {
    borderRadius: 15,
  },
  buttonText: {
    color: theme.COLORS.WHITE,
    fontSize: 19,
    textAlign: 'center',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontFamily: 'Inter-Bold',
  },
  width30p: {
    marginHorizontal: '4%',
    width: '30%',
  },
});
