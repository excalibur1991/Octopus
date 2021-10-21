import {Platform, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '8%',
    paddingHorizontal: '5.3%',
    backgroundColor: theme.APP_COLOR_2,
  },
  marginBottom3p: {
    marginBottom: '3%',
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
    color: theme.COLORS.WHITE,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
  },
  imageIcon: {
    height: 70,
    width: 90,
    marginBottom: '3%',
  },
  button: {
    marginTop: '2%',
    borderRadius: 15,
  },
  buttonText: {
    color: theme.COLORS.WHITE,
    fontSize: 19,
    textAlign: 'center',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontFamily: 'Inter-Bold',
  },
  uploadScrollContainer: {
    paddingBottom: 10,
  },
  readOnlyContainer: {
    paddingHorizontal: '4%',
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
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    color: theme.COLORS.WHITE,
  },
  descriptionContainer: {
    borderColor: theme.COLORS.LIGHT_GREY,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
    maxHeight: 100,
  },
  text: {
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.WHITE,
  },
  imageDescriptionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadImage: {
    flex: 1,
    height: 120,
    alignSelf: 'center',
    marginBottom: '2%',
    marginRight: 5,
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
  borderRadius25: {
    borderRadius: 25,
    marginVertical: 10,
  },
  uploadButton: {
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
