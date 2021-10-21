import {StyleSheet, Platform} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '4%',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: '4.3%',
    marginHorizontal: '2%',
  },
  headerText: {
    fontSize: 24,
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
  },
  headerActionContainer: {
    alignItems: 'flex-end',
  },
  headerActionText: {
    fontSize: 8,
    fontWeight: '300',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
  },
  contentContainer: {
    paddingTop: '5%',
    paddingBottom: '11%',
  },
  quicraContainer: {
    paddingTop: 30,
    borderRadius: 25,
    paddingBottom: 11,
    paddingHorizontal: 22,
    backgroundColor: theme.APP_COLOR_2,
  },
  quicraText: {
    fontSize: 27,
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  oceanPortfolioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oceanText: {
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.LIGHT_BLUE,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  portfolioText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'right',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.LIGHT_GREY,
  },
  percentText: {
    fontSize: 20,
    textAlign: 'right',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.SUCCESS_COLOR,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  bottomContainer: {
    marginTop: '9%',
    marginHorizontal: '2.5%',
  },
  bigTextView: {
    fontSize: 12,
    marginBottom: 15,
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  sendToInput: {
    padding: 0,
    borderBottomWidth: 1,
    color: theme.COLORS.WHITE,
    borderColor: theme.COLORS.WHITE,
  },
  input: {
    padding: 0,
    width: '60%',
    color: theme.COLORS.WHITE,
  },
  inputEndLabel: {
    fontSize: 10,
    fontWeight: '300',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.LIGHT_GREY,
  },
  amountSendContainer: {
    marginTop: 17,
  },
  endLabeledInput: {
    borderBottomWidth: 1,
    borderColor: theme.COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountStakeUnstakeContainer: {
    marginTop: 44,
  },
  stakeUnstakeButtons: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: '30%',
    marginTop: 10,
    borderRadius: 25,
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
    color: theme.COLORS.LIGHT_BLUE,
  },
  unStakeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
    color: theme.COLORS.LIGHT_RED,
  },
  stakeUnstakeButton: {
    width: 100,
    marginLeft: 10,
    borderRadius: 25,
    alignSelf: 'flex-end',
  },
});
