import {Platform, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
  },
  imageDescriptionContainer: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  uploadImage: {
    flex: 1,
    height: 140,
    marginRight: 15,
    borderRadius: Platform.OS === 'ios' ? 8 : 20,
  },
  imageCount: {
    left: 25,
    bottom: 8,
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    position: 'absolute',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  tagsContainer: {
    paddingHorizontal: '5%',
  },
  actionsContainer: {
    paddingHorizontal: '5%',
  },
  button: {
    marginTop: 10,
  },
  buttonIconRight: {
    marginLeft: 5,
  },
  buttonIconLeft: {
    marginRight: 5,
  },
  buttonOuter: {
    width: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_2,
  },
  radius30: {
    borderRadius: 30,
  },
  gradientButtonInner: {
    width: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
  },
  modalButtonGradient: {
    borderRadius: 30,
    marginVertical: '1.25%',
  },
  modalButton: {
    margin: 3,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_1,
  },

  marginBottom3p: {
    marginBottom: '3%',
  },
  divider: {
    height: 2,
    marginVertical: 16,
    backgroundColor: theme.APP_COLOR_2,
  },
  uploadContainer: {
    flex: 1,
  },
  uploadBorderContainer: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderColor: '#E3E7FF',
    marginVertical: '10%',
  },
  uploadText: {
    color: theme.APP_COLOR,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Moon-Light',
    fontWeight: '400',
  },
  imageIcon: {
    height: 70,
    width: 90,
    marginBottom: '3%',
  },
  // button: {
  //   marginTop: '2%',
  //   borderRadius: 15,
  // },
  // buttonText: {
  //   color: theme.COLORS.WHITE,
  //   fontSize: 19,
  //   textAlign: 'center',
  //   fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  //   fontFamily: 'Moon-Bold',
  // },
  uploadScrollContainer: {
    paddingBottom: '15%',
  },
  readOnlyContainer: {
    borderRadius: 15,
    paddingVertical: '8%',
    paddingHorizontal: '4%',
    backgroundColor: '#F5F6FC',
    marginBottom: '3%',
  },
  readOnlyTagsContainer: {
    flexWrap: 'wrap',
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },
  image: {
    height: 200,
    width: '100%',
  },
  space: {
    marginBottom: 15,
  },
  textFieldHeader: {
    fontSize: 12,
    marginTop: 10,
    fontFamily: 'Moon-Light',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
  descriptionContainer: {
    borderColor: 'lightgray',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
    maxHeight: 100,
  },
  text: {
    fontFamily: 'Moon-Light',
  },

  descriptionTextInput: {
    flex: 1,
  },
  marginTop3p: {
    marginTop: '3%',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  width49p: {
    width: '49%',
  },
});
