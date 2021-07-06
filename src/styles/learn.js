import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '8%',
    paddingHorizontal: '8%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.COLORS.WHITE,
  },
  header: {
    fontSize: 20,
    color: '#6C6C6C',
    fontWeight: '600',
    marginBottom: '6%',
    fontFamily: 'Inter-Regular',
  },
  row: {
    flexDirection: 'row',
  },
  sectionContainer: {
    width: Dimensions.get('window').width * 0.84,
    marginRight: Dimensions.get('window').width * 0.01,
  },
  sectionsContainer: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  sectionOuter: {
    borderRadius: 5,
    marginRight: 15,
  },
  sectionContentContainer: {
    marginTop: 10,
  },
  sectionHeader: {
    color: theme.APP_COLOR,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
  },
  sectionText: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: '400',
    textAlign: 'justify',
    color: theme.COLORS.BLACK,
    fontFamily: 'Inter-Regular',
  },
  playerBox: {
    backgroundColor: '#f2f2f2',
  },
});
