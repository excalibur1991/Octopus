import {StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '8%',
    paddingHorizontal: '4%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.COLORS.WHITE,
  },
  header: {
    fontSize: 22,
    //color: '#6C6C6C',
    fontWeight: 'bold',
    fontFamily: 'Inter-Regular',
    color: '#000000',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'justify',
    color: theme.COLORS.BLACK,
    fontFamily: 'Inter-Regular',
  },
  link: {
    color: '#FF4092'
  },
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
});
