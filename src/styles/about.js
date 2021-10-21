import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    display: 'flex',
    fontWeight: '500',
    flexDirection: 'row',
    marginVertical: '4.3%',
    marginHorizontal: '5.2%',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
  },
  contentContainer: {
    flex: 1,
    paddingTop: '5%',
    paddingHorizontal: 25,
    backgroundColor: theme.APP_COLOR_2,
  },
  contentInnerContainer: {
    paddingBottom: '20%',
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'justify',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
  },
});
