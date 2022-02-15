import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '3%',
    paddingHorizontal: 16,
  },
  upperContainer: {
    borderRadius: 15,
    backgroundColor: theme.APP_COLOR_2,
  },
  userTile: {
    marginVertical: 22,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 18,
    justifyContent: 'space-between',
  },
  userTitle: {
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  upperContainerDivider: {
    height: 4,
    backgroundColor: theme.APP_COLOR_1,
  },
  verificationTile: {
    marginVertical: 22,
    marginHorizontal: 18,
  },
  verificationCount: {
    fontSize: 36,
    lineHeight: 41,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  rowCenterBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verificationIcon: {
    height: 25,
    width: 25,
  },
  myVerifications: {
    fontSize: 15,
    marginTop: 15,
    lineHeight: 17,
    textAlign: 'right',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  successRateTile: {
    marginVertical: 22,
    marginHorizontal: 18,
  },
  successRateTileInner: {
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successRatePercentage: {
    fontSize: 36,
    lineHeight: 41,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  successRate: {
    fontSize: 15,
    marginTop: 15,
    lineHeight: 17,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  listContainer: {
    paddingBottom: '3%',
  },
  menuContainer: {
    marginTop: 17,
  },
  listItem: {
    marginVertical: 12,
  },
  listItemButton: {
    elevation: 5,
    borderRadius: 15,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    paddingVertical: 18,
    shadowColor: '#000',
    flexDirection: 'row',
    shadowOffset: {width: 0, height: 4},
    backgroundColor: theme.APP_COLOR_2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  textContainer: {
    width: '70%',
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.TULIP_TREE,
  },
  subTitleText: {
    fontSize: 9,
    marginTop: 5,
    lineHeight: 10,
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
});
