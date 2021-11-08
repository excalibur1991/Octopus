import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.APP_COLOR_1,
    fontFamily: 'Inter-Regular',
    fontSize: 19,
    fontWeight: '600',
  },
  image: {
    height: 60,
    width: 110,
  },
  creatingWallet: {
    marginTop: 70,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: theme.COLORS.WHITE,
  },
});
