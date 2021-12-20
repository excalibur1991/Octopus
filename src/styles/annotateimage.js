import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
  },
  progressContainer: {
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 12,
    marginTop: 5,
    lineHeight: 14,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  imageView: {
    marginTop: 20,
  },
  imageZoom: {
    height: 200,
    borderRadius: 8,
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  svgRect: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  scrollContainer: {
    marginTop: 20,
  },

  column: {
    width: '100%',
    flexDirection: 'column',
    flex: 1,
    paddingBottom: 20,
  },
  styleDropdownMenuSubsection: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingLeft: 10,
  },
  styleInputGroup: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingLeft: 10,
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.COLORS.FIORD_1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  tag: {
    padding: 3,
    borderRadius: 30,
    backgroundColor: theme.APP_COLOR_2,
  },
  tagActive: {
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: theme.APP_COLOR_2,
    borderColor: theme.COLORS.SKY_BLUE,
  },
  tagText: {
    padding: 0,
    margin: 0,
    fontSize: 14,
    color: theme.COLORS.WHITE,
  },
  tagsNote: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
    marginTop: 5,
    marginLeft: 2,
  },

  annotateButton: {
    margin: 3,
    marginVertical: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.SKY_BLUE_DARK,
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
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
  },
  buttonIconRight: {
    marginLeft: 5,
  },

  imageContainer: {
    width: '100%',
    height: '100%',
  },
  svgStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  button: {
    width: '100%',
    backgroundColor: '#4E9CF9',
    borderRadius: 16,
    marginTop: 20,
  },

  ageInput: {
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
  },
  skinButton: {
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorPickerView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: '#e9e9e9',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
  colorPicker: {
    height: 300,
    marginVertical: 10,
  },
});
