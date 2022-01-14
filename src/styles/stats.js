import {StyleSheet, Platform, Dimensions} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5.5%',
    paddingHorizontal: '4.2%',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    padding: 10,
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.4,
  },
  tabActive: {
    backgroundColor: theme.APP_COLOR_2,
  },
  tabText: {
    fontSize: 10,
    lineHeight: 11.5,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  tabTextActive: {
    fontSize: 12,
    lineHeight: 13.8,
  },
  statsContainer: {
    borderRadius: 8,
    backgroundColor: theme.APP_COLOR_2,
  },
  uavContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  uavItem: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uavCenterItem: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uavItemDivider: {
    width: 1,
    height: '105%',
    marginTop: -22,
    marginBottom: -45,
    backgroundColor: theme.APP_COLOR_1,
  },
  imageIcon: {
    height: 30,
    width: 30,
  },
  uavItemTitle: {
    fontSize: 10,
    marginTop: 9,
    lineHeight: 12,
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  uavItemValue: {
    fontSize: 13,
    marginTop: 10,
    lineHeight: 15,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  uavItemQuicraValue: {
    fontSize: 9,
    marginTop: 34,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  uavItemQuicra: {
    fontSize: 6,
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  uavStatsDivider: {
    height: 1,
    backgroundColor: theme.APP_COLOR_1,
  },
  quicraContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quicraValue: {
    fontSize: 17,
    lineHeight: 20.57,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  quicra: {
    fontSize: 6,
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  mainDivider: {
    height: 2,
    marginVertical: 29,
    marginHorizontal: -15,
    backgroundColor: theme.APP_COLOR_2,
  },
  graph: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 20.71,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  graphContainer: {
    borderRadius: 8,
    marginTop: 22,
    paddingVertical: 12,
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_2,
  },
  graphTitle: {
    fontSize: 11,
    lineHeight: 13,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  graphQuicra: {
    fontSize: 6,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  rewardbtn: {
    alignItems: "center",
    backgroundColor: theme.APP_COLOR_2,
    padding: 15,
    borderRadius: 25,
    width: '70%',
    alignSelf: 'center',

  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    textAlignVertical: 'center',
  },
});
