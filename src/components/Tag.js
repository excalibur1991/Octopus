import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { dark_theme } from '../services/Common/theme';

const Tag = ({
  title = '',
  onRemove = null,
  backgroundColor = '#E3E7FF',
  textColor = '#FFF',
  iconColor = '#4E9CF9',
  isGradient = false,
}) => {
  return (
    (!isGradient) ? (
      <TouchableWithoutFeedback onPress={onRemove}>
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        {onRemove ? (
          <IonIcon
            size={12}
            color={iconColor}
            onPress={onRemove}
            name="close-circle-outline"
          />
        ) : null}
        <Text style={[styles.tagText, {color: textColor}]}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
    ) : (
      <TouchableWithoutFeedback 
        onPress={onRemove}
      >
        <LinearGradient colors={dark_theme.GRADIENTS.BUTTON}
      start={{
        x: 0,
        y: 0
      }}
      end={{
        x: 1,
        y: 1
      }}
          style={styles.container}
        >
          <Text style={[styles.tagText, {color: textColor}]}>{title}</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    )
      );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    height: 30,
    marginBottom: 10,
    marginRight: 8,
    borderRadius: 25,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    paddingHorizontal: 18,
  },
  tagText: {
    fontSize: 10,
    marginLeft: 3,
    lineHeight: 12,
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
  },
});
