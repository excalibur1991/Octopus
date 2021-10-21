/* eslint-disable no-unused-vars */
import {StyleSheet, processColor, Dimensions} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: '4.3%',
    marginHorizontal: '5.2%',
    justifyContent: 'space-between',
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
  statsGraphContainer: {
    paddingBottom: '15%',
  },
  statsContainer: {
    paddingVertical: '3%',
    paddingHorizontal: '6%',
    backgroundColor: theme.APP_COLOR_2,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boxContainer: {
    flex: 0.333,
    margin: '1%',
  },
  bottomContainer: {
    flex: 1,
    marginTop: '2.5%',
    paddingVertical: '3%',
    backgroundColor: theme.APP_COLOR_2,
  },
  graphContainer: {
    width: Dimensions.get('screen').width * 0.92,
    height: 280,
    backgroundColor: theme.APP_COLOR_1,
    borderRadius: 25,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  marginRight10: {
    marginRight: 10,
  },
  box: {
    paddingTop: '20%',
    borderRadius: 25,
    paddingBottom: '25%',
    alignItems: 'center',
    backgroundColor: theme.APP_COLOR_1,
  },
  imageIcon: {
    height: 24,
    width: 24,
  },
  boxMini: {
    marginTop: '10%',
    borderRadius: 25,
    alignItems: 'center',
    paddingVertical: '3%',
    backgroundColor: theme.APP_COLOR_1,
  },
  fullWidthBox: {
    marginTop: '2%',
    borderRadius: 25,
    alignItems: 'center',
    paddingVertical: '2%',
    backgroundColor: theme.APP_COLOR_1,
  },
  itemTitle: {
    fontSize: 10,
    marginTop: '5%',
    color: theme.COLORS.WHITE,
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
  },
  miniBoxValue: {
    fontSize: 9,
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
    color: theme.COLORS.WHITE,
  },
  miniBoxFooter: {
    fontSize: 6,
    fontWeight: '300',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.WHITE,
  },
  fullWidthBoxValue: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
    color: theme.COLORS.LIGHT_BLUE,
  },
  fullWidthBoxFooter: {
    fontSize: 6,
    fontWeight: '300',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.LIGHT_BLUE,
  },
  itemValue: {
    fontSize: 17,
    marginTop: '20%',
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
    color: theme.COLORS.WHITE,
  },
  graphTitle: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    color: theme.COLORS.WHITE,
  },
});
