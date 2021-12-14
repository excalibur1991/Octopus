import React from 'react';
import {View, TextInput as TI, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';

const TextInput = ({
  isTextArea = false,
  placeholder = '',
  value = '',
  onChangeText = '',
  ...props
}) => {
  return (
    <View style={styles.container}>
      {!isTextArea ? (
        <TI
          value={value}
          style={styles.inputSingleline}
          placeholder={placeholder}
          onChangeText={onChangeText}
          {...props}
        />
      ) : (
        <TI
          multiline
          value={value}
          style={styles.inputMultiline}
          placeholder={placeholder}
          onChangeText={onChangeText}
          {...props}
        />
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DADADA',
  },
  inputSingleline: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: theme.COLORS.BLACK,
  },
  inputMultiline: {
    minHeight: 120,
    maxHeight: 120,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    color: theme.COLORS.BLACK,
  },
});
