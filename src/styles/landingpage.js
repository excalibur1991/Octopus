import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '20%',
    paddingTop: '5%',
    paddingHorizontal: '4%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.SCREEN_BACK_COLOR_2,
  },
  swipeAiOuter: {
    marginTop: '-25%',
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    shadowOffset: {width: 0, height: 4},
    backgroundColor: '#1b1d1e',
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
  listItemOuter: {
    width: '45.9%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
    margin: '2%',
    borderRadius: 25,
    backgroundColor: '#1b1d1e',
  },
  listItemInner: {
    padding: '10%',
    marginBottom: '28.5%',
  },
  itemTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#4a4a4a',
    fontWeight: '600',
    marginTop: '9%',
  },
  icon: {
    marginVertical: '5%',
  },
  buttonText: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    alignSelf: 'flex-end',
    color: '#4a4a4a',
  },
});
