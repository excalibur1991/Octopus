import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '8%',
    paddingHorizontal: '4%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.SCREEN_BACK_COLOR_1,
  },
  header: {
    fontSize: 20,
    color: '#6C6C6C',
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'justify',
    color: '#4a4a4a',
    fontFamily: 'Inter-Regular',
  },
});
