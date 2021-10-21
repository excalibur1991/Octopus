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
              backgroundColor={theme.COLORS.LIGHT_GREY}
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
          placeholderTextColor={theme.COLORS.LIGHT_GREY}
          style={[styles.inputSingleline, {minWidth: 100}]}
          returnKeyType="default"
          autoCapitalize="none"
          onSubmitEditing={(e) => {
            const newTag = tag.trim().toLowerCase();
            if (
              newTag &&
              !tags.includes(newTag) &&
              !commonTags.includes(newTag)
            ) {
              setTimeout(() => {
                tagInputRef.current.focus();
              }, 1);
              const allTags = tags.slice();
              allTags.push(newTag);
              onChangeTags(allTags);
            }
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
              backgroundColor={theme.COLORS.DARK_PURPLE}
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
          placeholderTextColor={theme.COLORS.LIGHT_GREY}
          style={[styles.inputSingleline, {minWidth: 145}]}
          returnKeyType="default"
          autoCapitalize="none"
          onSubmitEditing={(e) => {
            const newCommonTag = commonTag.trim().toLowerCase();
            if (
              newCommonTag &&
              !tags.includes(newCommonTag) &&
              !commonTags.includes(newCommonTag)
            ) {
              setTimeout(() => {
                commonTagInputRef.current.focus();
              }, 1);
              const allCommonTags = commonTags.slice();
              allCommonTags.push(newCommonTag);
              onChangeCommonTags(allCommonTags);
            }
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
    borderColor: theme.COLORS.LIGHT_GREY,
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: theme.COLORS.LIGHT_GREY,
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
    color: theme.COLORS.WHITE,
  },
});
