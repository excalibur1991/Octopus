import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 13,
    justifyContent: 'center',
  },
  congratulationsText: {
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  goalReachedText: {
    fontSize: 18,
    marginTop: 20,
    lineHeight: 21,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  earnedText: {
    fontSize: 18,
    marginTop: 40,
    lineHeight: 21,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.TULIP_TREE,
  },
  earnedTokenText: {
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.TULIP_TREE,
  },
  listContainer: {
    paddingBottom: '3%',
  },
  menuContainer: {
    marginTop: 17,
  },
  listItem: {
    marginTop: 40,
    width: Dimensions.get('screen').width * 0.9,
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
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
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
