import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: '2%',
    // paddingTop: '5%',
    // alignItems: 'center',
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    // backgroundColor: theme.COLORS.WHITE,
  },
  topImage: {
    height: '100%',
    width: 160,
    marginVertical: 20,
    flex: 0.25,
  },
  gestureContiner: {
    height: '100%',
    width: '100%',
    flex: 0.6,
  },
  bottomImage: {
    height: '100%',
    width: '100%',
  },
  actionsContainer: {
    marginTop: '5%',
    flex: 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniButtonInner: {
    padding: 7,
  },
  largeButtonInner: {
    padding: 10,
  },
  miniLeftButton: {
    borderWidth: 4,
    borderRadius: 25,
    borderColor: '#F3F0F3',
    marginTop: '-5%',
    marginRight: '-1%',
  },
  miniRightButton: {
    borderWidth: 4,
    borderRadius: 25,
    borderColor: '#F3F0F3',
    marginTop: '-5%',
    marginLeft: '-1%',
  },
  largeLeftButton: {
    borderWidth: 6,
    borderRadius: 50,
    borderColor: '#F3F0F3',
    marginRight: '-0.5%',
  },
  largeRightButton: {
    borderWidth: 6,
    borderRadius: 50,
    borderColor: '#F3F0F3',
    marginLeft: '-0.5%',
  },
});
