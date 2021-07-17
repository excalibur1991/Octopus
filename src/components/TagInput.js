/* eslint-disable no-shadow */
import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';
import Tag from './Tag';

const TagInput = ({tags = [], onChange = () => {}, placeholder = ''}) => {
  const [tag, setTag] = useState('');
  const inputRef = useRef(null);

  return (
    <View style={styles.container}>
      {tags &&
        tags.length > 0 &&
        tags.map((tag, index) => (
          <Tag
            title={tag}
            onRemove={() => {
              const allTags = tags.slice();
              delete allTags[index];
              onChange(allTags);
            }}
          />
        ))}
      <TextInput
        value={tag}
        ref={inputRef}
        onChangeText={setTag}
        placeholder={placeholder}
        style={styles.inputSingleline}
        returnKeyType="default"
        onSubmitEditing={(e) => {
          setTimeout(() => {
            inputRef.current.focus();
          }, 1);
          const allTags = tags.slice();
          allTags.push(tag);
          onChange(allTags);
          setTag('');
        }}
      />
    </View>
  );
};

export default TagInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DADADA',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 5,
  },
  inputSingleline: {
    flex: 1,
    minWidth: 100,
    paddingHorizontal: 10,
    borderColor: 'lightgray',
    borderRadius: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 5,
    color: theme.COLORS.BLACK,
  },
});
