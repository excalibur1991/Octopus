import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  bigTextView: {
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  
  sendTo: {
    //marginTop: '0.1%',
    fontFamily: 'Cochin',
    fontSize: 15,
    fontWeight: 'bold',
    
  },

  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '5%',
    paddingHorizontal: '2%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.COLORS.WHITE,
  },
  rows: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
   // borderRadius: 25,
   
    
  },
  quickra: {
    fontSize: 27,
    fontWeight: '600',
    lineHeight: 33,
    color: theme.APP_COLOR,
    fontFamily: 'Inter-Bold',
  },
  ocean: {
    color: '#8C98A9',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '600',
  },
  txtPortfolio: {
    color: theme.COLORS.BLACK,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  txtOceanDelta: {
    color: '#84c380',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  containers: {
    flex: 2,
    backgroundColor: '#9999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperStyle: {
    backgroundColor: '#00000000',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  buttons: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    shadowColor: 'rgba(0,0,0,.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 25,
    width: '70%',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  buttonRight: {
    borderRadius: 25,
    width: '40%',
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 20,
  },
  buttonLeft: {
    borderRadius: 25,
    width: '40%',
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '600',
    color: theme.APP_COLOR,
    fontFamily: 'Inter-Bold',
   // alignItems: 'center',

  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    height: 20, width: 80, alignSelf:'flex-end'
  },
  head1: {
    fontSize: 27,
    fontWeight: '600',
    lineHeight: 33,
    color: theme.APP_COLOR,
    fontFamily: 'Inter-Bold',
  },
  head2: {
    color: '#8C98A9',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '600',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  head3: {
    color: theme.COLORS.BLACK,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  head4: {
    color: '#84c380',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  head5: {
    color: theme.APP_COLOR,
    fontSize: 15,
    fontFamily: 'Inter-Bold',
  },
  head6: {
    color: '#8C98A9',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  parent: {
    flexDirection: 'row',
   // borderWidth: 2,
    borderWidth: 1,
    borderColor: theme.APP_COLOR,
    borderRadius: 8,
    //marginBottom: 6,
    marginBottom: 20,
    //width: Dimensions.get('window').width * 0.9
    width: 300
  },
  boxText: {
    //marginTop: '3%',
    //width: Dimensions.get('window').width * 0.9,
    marginTop: '4%',
    width: 250,
  },
});
