import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 11,
  },
  headerText: {
    fontSize: 18,
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
  },
  textBold: {
    fontWeight: 'bold',
  },
  statsLabel: {
    fontSize: 24,
    paddingVertical: '2%',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
  },
  statsValue: {
    color: theme.COLORS.PURPLE,
  },
  statsContainer: {
    backgroundColor: theme.APP_COLOR_2,
    alignItems: 'center',
    display: 'flex',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
  },
  menuContainer: {
    flex: 1,
    marginTop: '4%',
    paddingHorizontal: '4%',
    backgroundColor: theme.APP_COLOR_2,
  },
  menuContainerInner: {
    paddingTop: '9%',
    paddingBottom: '15%',
  },
  listItemOuterFull: {
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
    margin: '2%',
    borderRadius: 13,
    backgroundColor: theme.APP_COLOR_1,
  },
  listItemOuter: {
    width: '45.9%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
    margin: '2%',
    borderRadius: 13,
    backgroundColor: theme.APP_COLOR_1,
  },
  listItemInner: {
    alignItems: 'center',
    // padding: '10%',
    // marginBottom: '28.5%',
  },
  itemTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.WHITE,
    fontWeight: '500',
    // marginTop: '9%',
    paddingVertical: 18,
  },
  icon: {
    marginVertical: '5%',
  },
  buttonText: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    alignSelf: 'flex-end',
  },
});
