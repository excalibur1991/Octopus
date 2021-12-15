import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import PropTypes from 'prop-types';
import {theme} from '../services/Common/theme';

const AddTag = (props) => {
  const {handleNewTag = () => {}} = props || {};

  return (
    <View width={60} height={50}>
      <View style={styles.ChipWrapper}>
        <IconButton
          icon="plus"
          color={theme.COLORS.WHITE}
          textStyle={styles.ChipText}
          style={{backgroundColor: theme.APP_COLOR_2}}
          onPress={() => {
            props.handleNewTag();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ChipWrapper: {
    marginHorizontal: 2,
    marginVertical: 3,
    flexWrap: 'wrap',
    position: 'absolute',
    left: 0,
    top: -3,
    width: 60,
    height: 60,
    zIndex: 1000,
  },
  ChipText: {
    fontSize: 15,
    color: '#ffffff',
  },
});

AddTag.propTypes = {
  handleNewTag: PropTypes.func,
};

export default AddTag;
