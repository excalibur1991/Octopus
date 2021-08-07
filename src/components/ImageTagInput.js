/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';
import Tag from './Tag';

const ImageTagInput = ({
  tags = [],
  commonTags = [],
  onChangeTags = () => {},
  onChangeCommonTags = () => {},
  tagsPlaceholder = '',
  commonTagsPlaceholder = '',
}) => {
  const [tag, setTag] = useState('');
  const [commonTag, setCommonTag] = useState('');
  const tagInputRef = useRef(null);
  const commonTagInputRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        {tags &&
          tags.length > 0 &&
          tags.map((tag, index) => (
            <Tag
              title={tag}
              iconColor="#fff"
              textColor="#fff"
              backgroundColor="#405570"
              onRemove={() => {
                const allTags = tags.slice();
                allTags.splice(index, 1);
                onChangeTags(allTags);
              }}
            />
          ))}
        <TextInput
          value={tag}
          ref={tagInputRef}
          onChangeText={setTag}
          placeholder={tagsPlaceholder}
          style={[styles.inputSingleline, {minWidth: 100}]}
          returnKeyType="default"
          onSubmitEditing={(e) => {
            setTimeout(() => {
              tagInputRef.current.focus();
            }, 1);
            const allTags = tags.slice();
            allTags.push(tag);
            onChangeTags(allTags);
            setTag('');
          }}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.childContainer}>
        {commonTags &&
          commonTags.length > 0 &&
          commonTags.map((commonTag, index) => (
            <Tag
              title={commonTag}
              iconColor="#fff"
              textColor="#fff"
              backgroundColor="#663b69"
              onRemove={() => {
                const allCommonTags = commonTags.slice();
                allCommonTags.splice(index, 1);
                onChangeCommonTags(allCommonTags);
              }}
            />
          ))}
        <TextInput
          value={commonTag}
          ref={commonTagInputRef}
          onChangeText={setCommonTag}
          placeholder={commonTagsPlaceholder}
          style={[styles.inputSingleline, {minWidth: 145}]}
          returnKeyType="default"
          onSubmitEditing={(e) => {
            setTimeout(() => {
              commonTagInputRef.current.focus();
            }, 1);
            const allCommonTags = commonTags.slice();
            allCommonTags.push(commonTag);
            onChangeCommonTags(allCommonTags);
            setCommonTag('');
          }}
        />
      </View>
    </View>
  );
};

export default ImageTagInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DADADA',
    marginVertical: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#DADADA',
    marginHorizontal: '5%',
  },
  childContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 5,
  },
  inputSingleline: {
    flex: 1,
    paddingHorizontal: 10,
    borderColor: 'lightgray',
    borderRadius: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 5,
    color: theme.COLORS.BLACK,
  },
});
