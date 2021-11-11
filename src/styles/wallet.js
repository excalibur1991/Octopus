import {StyleSheet, Platform, Dimensions} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5.5%',
    paddingHorizontal: '4.2%',
  },
  contentContainer: {
    paddingBottom: '10%',
  },
  quicraContainer: {
    marginVertical: 9,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  quicraText: {
    fontSize: 27,
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  oceanPortfolioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oceanText: {
    fontSize: 20,
    color: theme.COLORS.BLUE,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  portfolioText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'right',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
  },
  percentText: {
    fontSize: 20,
    textAlign: 'right',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.SUCCESS_COLOR,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  sendAmountInputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 10,
    borderColor: theme.COLORS.BLUE,
  },
  inputLabel: {
    fontSize: 10,
    lineHeight: 11.5,
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  input: {
    padding: 0,
    marginTop: 11,
    lineHeight: 15.1,
    color: theme.COLORS.WHITE,
  },
  inputDivider: {
    height: 1,
    marginVertical: 18,
    backgroundColor: theme.COLORS.BLUE,
  },
  mainDivider: {
    height: 2,
    marginVertical: 28,
    marginHorizontal: -15,
    backgroundColor: theme.APP_COLOR_2,
  },
  buttonStyle: {
    width: 138,
    marginTop: 21,
    borderRadius: 30,
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontSize: 18,
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    textAlignVertical: 'center',
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  stakeUnstakeContainer: {
    padding: 10,
    minHeight: 94,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.COLORS.BLUE,
  },
  stakeUnstakeButtons: {
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stakeUnstakeButtonStyle: {
    borderRadius: 30,
    // alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.44,
  },
  stakeButtonText: {
    fontSize: 18,
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    textAlignVertical: 'center',
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  unstakeButtonText: {
    fontSize: 18,
    textTransform: 'uppercase',
    textAlignVertical: 'center',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.LIGHT_RED,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
});
