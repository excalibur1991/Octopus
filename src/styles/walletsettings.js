import {StyleSheet, Platform} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5.5%',
    paddingHorizontal: '4.2%',
  },
  readOnlyBox: {
    padding: 10,
    minHeight: 94,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: '9.2%',
    borderColor: theme.COLORS.BLUE,
    backgroundColor: theme.APP_COLOR_1,
  },
  readOnlyBoxShadow: {
    shadowColor: theme.COLORS.BLUE,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    elevation: 4,
  },
  titleCopyButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBoxTitle: {
    fontSize: 10,
    lineHeight: 11.5,
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '700' : 'normal',
  },
  textBoxValue: {
    fontSize: 11,
    lineHeight: 15.1,
    marginTop: '3.5%',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
  },
  buttonStyle: {
    width: '70%',
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    textTransform: 'uppercase',
    textAlignVertical: 'center',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.LIGHT_RED,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
});
