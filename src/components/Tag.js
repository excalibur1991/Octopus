import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Tag = ({
  title = '',
  onRemove = null,
  backgroundColor = '#E3E7FF',
  textColor = '#4E9CF9',
  iconColor = '#4E9CF9',
}) => {
  return (
    <TouchableWithoutFeedback onPress={onRemove}>
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        {onRemove ? (
          <IonIcon
            size={18}
            color={iconColor}
            onPress={onRemove}
            name="close-circle-outline"
          />
        ) : null}
        <Text style={[styles.tagText, {color: textColor}]}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    margin: 3,
    borderRadius: 25,
    paddingVertical: 5,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
    marginLeft: 3,
  },
});
