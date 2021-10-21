import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
            color="#A2A2A2"
            style={styles.icon}
            name="chevron-down"
          />
        </View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            width: '85%',
            elevation: 10,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: theme.APP_COLOR_1,
            borderColor: theme.COLORS.LIGHT_GREY,
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
                    selectedIndices.includes(index)
                      ? textColor
                      : theme.COLORS.WHITE
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
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: theme.COLORS.LIGHT_GREY,
  },
  box: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  option: {
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  placeholderText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  icon: {
    alignSelf: 'center',
  },
  valueText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  valueContainer: {
    flex: 1,
    height: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
