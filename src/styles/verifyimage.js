import {Platform, StyleSheet, Dimensions, StatusBar} from 'react-native';
import {theme} from '../services/Common/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeContainer: {
    marginVertical: 15,
    height: Dimensions.get('window').height * 0.35,
  },
  divider: {
    height: 2,
    marginVertical: 1,
    backgroundColor: theme.APP_COLOR_2,
  },
  leftBar: {
    top: 0,
    left: 0,
    bottom: 0,
    height: '100%',
    position: 'absolute',
  },
  rightBar: {
    top: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    position: 'absolute',
  },
  tagsContainer: {
    paddingHorizontal: 10,
  },
  tagsContentContainer: {
    paddingBottom: 10,
  },
  actionsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDownBounty: {
    width: '70%',
  },
  dropDownPii: {
    width: '25%',
  },
  button: {
    marginTop: 10,
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
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
  },
  buttonIconRight: {
    marginLeft: 5,
  },

  reportModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  reportModalContentContainer: {
    width: '80%',
    borderRadius: 20,
    paddingVertical: 37,
    paddingHorizontal: 20,
    marginVertical: '20%',
    backgroundColor: theme.APP_COLOR_2,
  },
  closeButton: {
    top: 10,
    right: 10,
    position: 'absolute',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: theme.COLORS.LIGHT_GREY,
  },
  headerTitle: {
    fontSize: 14,
    lineHeight: 17,
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  subTitle: {
    fontSize: 12,
    marginTop: 17,
    lineHeight: 14,
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
  },
  radioButtons: {
    marginVertical: 20,
  },
  reportOptionRow: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 23,
    height: 23,
    marginRight: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.BLACK_04,
  },
  radioButtonDot: {
    width: 13,
    height: 13,
    borderRadius: 25,
    backgroundColor: theme.APP_COLOR_2,
  },
  reportOptionLabel: {
    fontSize: 10,
    lineHeight: 11,
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
  },
  reportOther: {
    padding: 10,
    height: 100,
    borderRadius: 8,
    marginBottom: 20,
    textAlignVertical: 'top',
    color: theme.COLORS.WHITE,
    backgroundColor: theme.APP_COLOR_1,
  },
  headerTitleReported: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  subTitleReported: {
    fontSize: 12,
    marginTop: 17,
    lineHeight: 14,
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
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
    backgroundColor: theme.APP_COLOR_2,
  },
  tcCloseButtonContainer: {
    marginTop: 60,
    alignSelf: 'center',
  },
  tcCloseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_1,
  },

  CardWrapper: {
    marginTop: '5%',
    height: '30%',
    zIndex: 1000,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  CardView: {
    zIndex: 1000,
  },
  TagsView: {
    flexDirection: 'row',
    zIndex: 0,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
});
