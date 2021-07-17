import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Tag = ({title = '', onRemove = null, color = '#E3E7FF'}) => {
  return (
    <TouchableWithoutFeedback onPress={onRemove}>
      <View style={[styles.container, {backgroundColor: color}]}>
        {onRemove ? (
          <IonIcon
            size={18}
            color="#4E9CF9"
            onPress={onRemove}
            name="close-circle-outline"
          />
        ) : null}
        <Text style={styles.tagText}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    margin: 3,
    borderRadius: 8,
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
    color: '#4E9CF9',
    marginLeft: 3,
  },
});
