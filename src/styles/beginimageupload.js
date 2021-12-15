import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 5,
    borderWidth: 3,
    borderRadius: 250,
    borderColor: theme.COLORS.DARK_PURPLE,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 250,
  },
  levelContainer: {
    top: 10,
    left: 10,
    right: 10,
    position: 'absolute',
    alignItems: 'center',
  },
  levelChip: {
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: theme.APP_COLOR_2,
  },
  levelText: {
    fontSize: 10,
    lineHeight: 10,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  titleContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  subTitle: {
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  progressContainer: {
    marginTop: 20,
  },
  progressChip: {
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 30,
    backgroundColor: theme.COLORS.DARK_PURPLE,
  },
  progressText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },

  divider: {
    height: 2,
    width: '100%',
    marginVertical: 20,
    backgroundColor: theme.APP_COLOR_2,
  },

  statusContainer: {
    alignItems: 'center',
    paddingHorizontal: '4%',
    justifyContent: 'center',
  },
  statusTitle: {
    fontSize: 24,
    lineHeight: 26,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  statusDescription: {
    fontSize: 16,
    marginTop: 15,
    lineHeight: 26,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },

  actionsContainer: {
    marginTop: 50,
  },
  button: {
    marginTop: 10,
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
  gradientButtonInnerDisabled: {
    width: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.MID_GREY,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
  },
});
