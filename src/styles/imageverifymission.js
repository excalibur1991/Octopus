import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardCover: {
    height: '50%',
    width: '100%',
  },
  companyInfoContainer: {
    marginTop: '-8%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: theme.APP_COLOR_1,
  },
  companyInfoContentContainer: {
    paddingBottom: '10%',
  },
  info: {
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoImage: {
    width: 80,
    height: 80,
    marginRight: 22,
  },
  compantTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  tags: {
    marginTop: 9,
    flexDirection: 'row',
  },
  tag: {
    marginRight: 8,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10.5,
    backgroundColor: theme.COLORS.DARK_BLUE,
  },
  tagText: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  mainDivider: {
    height: 2,
    backgroundColor: theme.APP_COLOR_2,
  },

  button: {
    marginTop: 30,
    marginHorizontal: '10%',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonOuter: {
    width: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_2,
  },
  radius30: {
    borderRadius: 30,
  },
  gradientButtonInner: {
    width: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  tcText: {
    padding: 38,
    fontSize: 16,
    lineHeight: 29,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  actionContainer: {
    paddingHorizontal: 40,
  },
  radioButtonContainer: {
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonText: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'left',
    paddingHorizontal: 16,
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.SILVER,
  },
  radioButtonTextLink: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'left',
    paddingHorizontal: 16,
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.DARK_BLUE,
    textDecorationLine: 'underline',
  },

  //RadioButton Styling
  radioButton: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_2,
    borderColor: theme.COLORS.LIGHT_GREY,
  },
  radioButtonDot: {
    width: 16,
    height: 16,
    borderRadius: 25,
    backgroundColor: theme.APP_COLOR_2,
  },
});
