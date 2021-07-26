import {Platform, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

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
    color: theme.APP_COLOR,
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
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
  multipleFilesHeader: {
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    marginTop: 10,
    fontFamily: 'Inter-Bold',
  },
  descroptionContainer: {
    borderColor: 'lightgray',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
    maxHeight: 100,
  },
  text: {
    fontFamily: 'Inter-Regular',
  },
});
