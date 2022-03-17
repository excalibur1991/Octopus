import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../services/Common/theme';

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
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  oceanPortfolioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oceanText: {
    fontSize: 20,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.BLUE,
  },
  portfolioText: {
    fontSize: 16,
    textAlign: 'right',
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
  },
  percentText: {
    fontSize: 20,
    textAlign: 'right',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.SUCCESS_COLOR,
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
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
  },
  input: {
    padding: 0,
    marginTop: 11,
    lineHeight: 15.1,
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
  },
  inputDivider: {
    height: 1,
    marginVertical: 10,
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
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    textAlignVertical: 'center',
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
    width: Dimensions.get('screen').width * 0.44,
  },
  stakeButtonText: {
    fontSize: 18,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    textAlignVertical: 'center',
  },
  unstakeButtonText: {
    fontSize: 18,
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    textAlignVertical: 'center',
    color: theme.COLORS.LIGHT_RED,
  },
  approveSendButtonStyle: {
    alignItems: "center",
    backgroundColor: theme.COLORS.BLUE,
    padding: 20,
    borderRadius: 30,
    width: Dimensions.get('screen').width * 0.44,
    alignSelf: 'center',
    //marginTop: '5%',
    height: 55,
  },
  liquidityHText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
   // paddingTop:10
  },
  liquidityText:{
    fontSize: 15,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  oceanPoolText: {
    fontSize: 16,
    textAlign: 'right',
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
  },
  liquidityContainer: {
    paddingHorizontal: 10,
  }

});
