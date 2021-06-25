import {StyleSheet, Platform} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  boxText: {
    marginTop: '4%',
    width: 100,
  },
  container_: {
    flex: 2,
    backgroundColor: '#9999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperStyle :{
    backgroundColor: '#00000000',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  button1 :{
    width: '100%',
    backgroundColor: "#ffffff",
    borderRadius: 2,
    borderColor: "#ffffff",
    borderWidth: 1,
    shadowColor: "rgba(0,0,0,.12)",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    justifyContent: 'space-between'
  },
  bigTextView: {
    fontFamily: "Cochin",
    fontSize: 15,
    fontWeight: "bold",
   // position:'relative',
    //left:10,
    //top:'-5%'
  },
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '5%',
    paddingHorizontal: '4%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.COLORS.WHITE,
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  wrapperStyle :{
    backgroundColor: '#00000000',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  button1 :{
    width: '100%',
    backgroundColor: "#ffffff",
    borderRadius: 2,
    borderColor: "#ffffff",
    borderWidth: 1,
    shadowColor: "rgba(0,0,0,.12)",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    justifyContent: 'space-between'
  },
  MainContainer:
  {
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputStyle: {
    textAlign: 'center',
    height: 41,
    width: '82%',
    borderWidth: 1,
    borderColor: '#AA00FF',
    borderRadius: 8,
    marginBottom: 20
  },
  button: {
    width: '92%',
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#AA00FF',
    borderRadius: 5,
    marginBottom: 20
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  Ccontainer: {
    flex: 1,
  },
  parent: {
    //flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.APP_COLOR,
    borderRadius: 8,
    marginBottom: 20
   // justifyContent: 'flex-start'
  }
});