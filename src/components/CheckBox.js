import React, {useState} from 'react';
import {Text, Animated, TouchableOpacity, StyleSheet} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {theme} from '../services/Common/theme';

const CheckBox = ({
  title = '',
  disabled = false,
  isChecked = false,
  onChange = () => {},
  textColor = 'black',
  fontSize = 11,
}) => {
  const [springValue] = useState(new Animated.Value(1));
  const spring = () => {
    if (onChange) {
      onChange(!isChecked);
    }
    springValue.setValue(0.7);
    Animated.spring(springValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const checkBoxStyle = {
    borderColor: isChecked ? theme.APP_COLOR : '#949aa2',
    backgroundColor: isChecked ? theme.APP_COLOR : '#e3e7ff',
    transform: [{scale: springValue}],
  };

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      onPress={spring}>
      <Animated.View style={[styles.checkBox, checkBoxStyle]}>
        {isChecked ? <EntypoIcon name="check" color="#fff" size={13} /> : null}
      </Animated.View>
      <Text style={[styles.text, {color: textColor, fontSize: fontSize}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  checkBox: {
    width: 16,
    height: 16,
    borderRadius: 5,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    marginTop: -3,
    marginLeft: '2%',
    fontFamily: 'Inter-Regular',
    fontWeight: '300',
  },
});
