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


  infoModalContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || '10%',
  },
  infoModalContentContainer: {
    flex: 1,
    marginTop: '8%',
    borderRadius: 30,
    marginBottom: '11.2%',
    marginHorizontal: '4.5%',
    backgroundColor: theme.APP_COLOR_2,
  },
  header: {
    height: '18%',
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingHorizontal: '1%',
    justifyContent: 'center',
    borderBottomColor: theme.COLORS.LIGHT_GREY,
  },
  headerTitle: {
    fontSize: 24,
    marginTop: 13,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '700' : 'normal',
  },
  infoContainerItems: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '4.5%',
    width: Dimensions.get('screen').width * 0.91,
  },
  infoContainerItem: {
    paddingTop: '13%',
  },
  infoContentItemTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
  infoContentItemDescription: {
    fontSize: 12,
    lineHeight: 19,
    marginTop: '6%',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.COLORS.WHITE,
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
  },
  bottomContainer: {
    flex: 1,
    marginBottom: '10%',
    paddingHorizontal: '9%',
    justifyContent: 'flex-end',
  },
  dots: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '2%',
    paddingVertical: '1.25%',
    marginVertical: '13.5%',
    justifyContent: 'center',
  },
  dotOuter: {
    width: 12,
    height: 12,
    elevation: 5,
    borderRadius: 15,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    marginHorizontal: '1.25%',
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 4},
    backgroundColor: theme.COLORS.PURPLE,
  },
  dotOuterActive: {
    width: 12,
    height: 12,
    elevation: 5,
    borderRadius: 15,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    marginHorizontal: '1.25%',
    shadowColor: theme.COLORS.BLACK,
    backgroundColor: theme.COLORS.GREY,
    shadowOffset: {width: 0, height: 4},
  },
  modalButtonGradient: {
    borderRadius: 30,
    marginVertical: '1.25%',
  },
  modalButton: {
    margin: 2,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_2,
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
