import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  bigTextView: {
    fontFamily: 'Cochin',
    fontSize: 15,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '5%',
    paddingHorizontal: '4%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.COLORS.WHITE,
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickra: {
    fontSize: 27,
    fontWeight: '600',
    lineHeight: 33,
    color: theme.APP_COLOR,
    fontFamily: 'Inter-Bold',
  },
  ocean: {
    color: '#8C98A9',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '600',
  },
  txtPortfolio: {
    color: theme.COLORS.BLACK,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  txtOceanDelta: {
    color: '#84c380',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  containers: {
    flex: 2,
    backgroundColor: '#9999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperStyle: {
    backgroundColor: '#00000000',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  buttons: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    shadowColor: 'rgba(0,0,0,.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 25,
    width: '70%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '600',
    color: theme.APP_COLOR,
    fontFamily: 'Inter-Bold',
  },
});
