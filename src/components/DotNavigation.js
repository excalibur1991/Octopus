/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Ripple from './Ripple';
import {View, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

const DotNavigation = ({count = 0, selectedIndex = 0, onChange = () => {}}) => {
  return (
    <View style={styles.contrainer}>
      {Array.from(Array(count).keys()).map((_, index) => (
        <Ripple
          outerStyle={styles.dotOuter}
          onPress={() => onChange(index)}
          innerStyle={[
            styles.dotInner,
            {
              backgroundColor:
                index === selectedIndex
                  ? theme.COLORS.LIGHT_GREY
                  : 'transparent',
            },
          ]}
        />
      ))}
    </View>
  );
};

export default DotNavigation;

const styles = StyleSheet.create({
  contrainer: {
    flex: 1,
    flexWrap: 'wrap',
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dotOuter: {
    borderRadius: 25,
    marginVertical: '1.5%',
    marginHorizontal: '0.5%',
  },
  dotInner: {
    width: 20,
    height: 20,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: theme.COLORS.LIGHT_GREY,
  },
});
