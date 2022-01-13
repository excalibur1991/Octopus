import React, {useEffect, useRef} from 'react';
import {View, TouchableWithoutFeedback, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';

/**
 *
 * @param {
 * bEditEnabled //show|hide this input
 * tagEditValue //tag Value
 * onChangeText //
 * onSubmitEditing //
 * } props
 * @returns
 */

const TagInput = (props) => {
  const {
    bEditEnabled = false,
    tagEditValue = '',
    filteredTags = [],
    onChangeText = () => {},
    onSubmitEditing = () => {},
    setTextEditor = () => {},
    setTagEditValue = () => {},
    keyboardOffset = () => {},
  } = props || {};

  const inputRef = useRef(null);

  useEffect(() => {
    setTextEditor(inputRef.current);
  }, [setTextEditor]);

  return (
    <>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          top: '60%',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          // bottom: props.keyboardOffset,
          // backgroundColor: 'red',
        }}>
        {/* {props.filteredTags.map((item, index) => (
          <TouchableWithoutFeedback
            style={{
              width: '100%',
            }}
            onPress={() => {
              props.setTagEditValue(item);
            }}
            key={index}>
            <Text
              style={{
                backgroundColor: '#F2F2F2',
                fontSize: 16,
                borderColor: '#dddddd',
                borderTopWidth: 1,
                paddingVertical: 5,
                paddingLeft: 10,
              }}>
              {item}
            </Text>
          </TouchableWithoutFeedback>
        ))} */}

        <TextInput
          ref={inputRef}
          value={props.tagEditValue}
          blurOnSubmit={true}
          autoCorrect={false}
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onSubmitEditing}
          returnKeyType="done"
          style={{
            paddingHorizontal: 10,
            borderRadius: 50,
            height: 40,
            width: '30%',
            marginBottom: 0,
            marginTop: 10,
            backgroundColor: '#25262B',
            color: 'white',
            display: bEditEnabled ? 'flex' : 'none',
            textAlign:'center'
          }}
        />
      </View>
    </>
  );
};

TagInput.propTypes = {
  filteredTags: PropTypes.array,
  bEditEnabled: PropTypes.bool,
  tagEditValue: PropTypes.string,
  keyboardOffset: PropTypes.number,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  setTextEditor: PropTypes.func,
  setTagEditValue: PropTypes.func,
};

export default TagInput;
