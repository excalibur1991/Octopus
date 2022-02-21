import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 13,
    justifyContent: 'center',
  },
  image: {
    borderRadius: 250,
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').width * 0.9,
  },
  buttonsContainer: {
    height: 108,
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width * 0.9,
  },
  kneeButton: {
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 40,
    backgroundColor: theme.APP_COLOR_2,
    borderColor: theme.COLORS.WELL_READ,
    width: Dimensions.get('screen').width * 0.42,
  },
  shoulderButton: {
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 40,
    backgroundColor: theme.APP_COLOR_2,
    borderColor: theme.COLORS.TULIP_TREE,
    width: Dimensions.get('screen').width * 0.42,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  resultContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 250,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.BLACK_OPACITY_49P,
  },
  resultText: {
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 6,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
});
