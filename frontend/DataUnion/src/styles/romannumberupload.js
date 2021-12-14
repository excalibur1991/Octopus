import {Dimensions, StyleSheet, Platform} from 'react-native';
import {theme} from '../services/Common/theme';

const minHeight = Dimensions.get('screen').height * 0.48;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '8%',
    paddingHorizontal: '8%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.COLORS.WHITE,
  },
  head: {
    fontSize: 24,
    color: theme.COLORS.BLACK,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontFamily: 'Cochin',
  },
  rowFlexAlignCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orText: {
    marginRight: 10,
    fontWeight: '600',
    color: theme.COLORS.BLACK,
    fontFamily: 'Cochin',
  },
  buttonOuter: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 25,
    marginVertical: 5,
  },
  clearButtonInner: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  buttonInner: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  galleryButtonText: {
    color: '#6dacc3',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontFamily: 'Cochin',
  },
  drawingContainer: {
    minHeight: minHeight,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E3E7FF',
    borderRadius: 10,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 15,
  },
  buttonText: {
    color: theme.COLORS.WHITE,
    fontSize: 19,
    textAlign: 'center',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontFamily: 'Cochin',
  },
  uploadImage: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: '2%',
    minHeight: minHeight,
  },
  numberScrollContainer: {
    marginVertical: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E3E7FF',
    borderRadius: 10,
  },
  numberScroll: {
    flex: 1,
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  numberScrollText: {
    width: Platform.OS === 'android' ? 50 : 58,
    paddingVertical: Platform.OS === 'android' ? 0 : 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Cochin',
  },
  width30p: {
    width: '29%',
  },
  width70p: {
    width: '69%',
  },
  uploadText: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
    alignSelf: 'flex-end',
    color: theme.COLORS.BLACK,
    fontFamily: 'Cochin',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
  progressContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
