import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '5%',
    paddingHorizontal: '4%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.COLORS.WHITE,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  head1: {
    fontSize: 27,
    fontWeight: '600',
    lineHeight: 33,
    color: theme.APP_COLOR,
    fontFamily: 'Inter-Bold',
  },
  head2: {
    color: '#8C98A9',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '600',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  head3: {
    color: theme.COLORS.BLACK,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  head4: {
    color: '#84c380',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  credentialsContainer: {
    marginTop: '8%',
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
