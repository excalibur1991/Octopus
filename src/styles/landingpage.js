import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '3%',
  },
  centered: {
    alignItems: 'center',
  },
  infoIcon: {
    left: 43,
    position: 'absolute',
  },
  imageContainer: {
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  image: {
    height: 160,
    width: 160,
  },
  levelChip: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#3B6BD0',
    minWidth: 108,
    marginTop: '4.5%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 16,
    lineHeight: 18,
    color: theme.COLORS.WHITE,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 18,
    color: theme.COLORS.WHITE,
    textAlign: 'center',
  },
  expText: {
    marginTop: 12,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  text: {
    color: '#7EC7FC',
    fontFamily: 'Moon-Bold',
  },
  divider: {
    height: 2,
    width: '100%',
    marginTop: 11,
    marginBottom: 22,
    backgroundColor: '#25262B',
  },
  countGroup: {
    flexDirection: 'row',
  },
  countBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '6%',
  },
  countValue: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  countLabel: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  menuContainer: {
    marginTop: '5.5%',
  },
  swipeAiOuter: {
    marginTop: '-25%',
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    shadowOffset: {width: 0, height: 4},
    backgroundColor: '#F5F6FC',
    marginVertical: 10,
    marginHorizontal: '5%',
  },
  swipeAiInner: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: '10%',
  },
  swipeAiIcon: {
    marginRight: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Container: {
    flex: 1,
    paddingTop: '3%',
  },
  listContainer: {
    paddingBottom: '5%',
  },
  listItem: {
    marginHorizontal: '4%',
    marginVertical: '2%',
  },
  listItemButton: {
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
    borderRadius: 15,
    backgroundColor: theme.APP_COLOR_2,
    flexDirection: 'row',
    paddingVertical: 18,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  textContainer: {
    width: '70%',
  },
  titleText: {
    fontSize: 18,
    lineHeight: 21,
    color: '#B592FF',
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
  },
  subTitleText: {
    fontSize: 11,
    lineHeight: 13,
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
});
