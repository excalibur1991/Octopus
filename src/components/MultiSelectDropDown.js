import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import CheckBox from './CheckBox';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {theme} from '../services/Common/theme';

const MultiSelect = ({
  placeholder = '',
  options = [],
  selectedIndices = [],
  onSelect = () => {},
  textColor = theme.APP_COLOR,
}) => {
  return (
    <Menu renderer={renderers.ContextMenu}>
      <MenuTrigger
        customStyles={{
          triggerOuterWrapper: {
            ...styles.container,
            overflow: 'hidden',
          },
        }}>
        <View style={styles.box}>
          {selectedIndices && selectedIndices.length > 0 ? (
            <View style={styles.valueContainer}>
              <CheckBox isChecked={true} />
              <Text
                style={[styles.valueText, {color: textColor}]}
                numberOfLines={1}>
                {options &&
                  options.length > 0 &&
                  options
                    .filter((option, index) => selectedIndices.includes(index))
                    .join(', ')}
              </Text>
            </View>
          ) : (
            <Text style={[styles.placeholderText, {color: textColor}]}>
              {placeholder}
            </Text>
          )}
          <EntypoIcon
            size={20}
            name="chevron-down"
            color={theme.COLORS.WHITE}
          />
        </View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            width: '90%',
            borderRadius: 10,
            backgroundColor: theme.APP_COLOR_2,
          },
        }}>
        {options &&
          options.length > 0 &&
          options.map((item, index) => (
            <MenuOption
              disableTouchable={true}
              onSelect={() => onSelect(index)}>
              <View style={styles.option}>
                <CheckBox
                  title={item}
                  textColor={
                    selectedIndices.includes(index) ? textColor : '#8C98A9'
                  }
                  fontSize={14}
                  onChange={() => onSelect(index)}
                  isChecked={selectedIndices.includes(index)}
                />
              </View>
            </MenuOption>
          ))}
      </MenuOptions>
    </Menu>
  );
};

export default MultiSelect;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: theme.COLORS.BLUE,
  },
  box: {
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  option: {
    paddingHorizontal: 3,
    justifyContent: 'center',
  },
  placeholderText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'android' ? 'normal' : '400',
  },
  valueText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
