/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet, Text, Platform} from 'react-native';
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
      <Text style={styles.label}>Tags</Text>
      <View style={styles.childContainer}>
        {tags &&
          tags.length > 0 &&
          tags.map((tag, index) => (
            <Tag
              title={tag}
              iconColor={theme.COLORS.WHITE}
              textColor={theme.COLORS.WHITE}
              backgroundColor={theme.COLORS.ROYAL_BLUE}
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
          placeholderTextColor={theme.COLORS.WHITE}
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
      <Text style={styles.label}>Common Tags</Text>
      <View style={styles.childContainer}>
        {commonTags &&
          commonTags.length > 0 &&
          commonTags.map((commonTag, index) => (
            <Tag
              title={commonTag}
              iconColor={theme.COLORS.WHITE}
              textColor={theme.COLORS.WHITE}
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
          placeholderTextColor={theme.COLORS.WHITE}
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
    borderRadius: 8,
    marginVertical: 5,
    paddingVertical: '3%',
    paddingHorizontal: '4%',
    borderColor: theme.COLORS.BLUE,
  },
  divider: {
    height: 1,
    marginVertical: 10,
    backgroundColor: theme.COLORS.BLUE,
  },
  childContainer: {
    marginTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputSingleline: {
    flex: 1,
    padding: 0,
    borderRadius: 10,
    fontFamily: 'Moon-Light',
    borderColor: 'lightgray',
    color: theme.COLORS.WHITE,
  },
  label: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
});
