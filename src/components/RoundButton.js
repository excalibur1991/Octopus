import React from 'react';
import {Text, ActivityIndicator, View} from 'react-native';
import Ripple from './Ripple';
import PropTypes from 'prop-types';

const RoundButton = props => {
  const {
    title = '',
    onPress = () => {},
    loading = false,
    color = '#2bae6a',
    icon = null,
    height = null,
    style = {},
    variant = 'default',
    textStyle = {},
    buttonStyle = {},
    disabled = false,
    isBottomButton = false,
    type= 'primary', // prmiary | secondary | light
  } = props || {};

  const isOutlined = variant === 'outlined';

  return (
    <View style={style}>
      <Ripple
        outerStyle={{
          width: '100%',
          borderWidth: 0,  //!disabled && isOutlined ? 2 : 0,
          borderColor: color,
          backgroundColor: disabled ? '#cccccc' : isOutlined ? '#fff' : color,
          borderRadius: isBottomButton ? 0 : 5,
          marginVertical: 5,
          ...buttonStyle,
        }}
        innerStyle={{
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
        onPress={onPress}
        disabled={disabled}>
        {loading ? (
          <ActivityIndicator color={isOutlined ? '#000' : '#fff'} />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 10,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {icon}
            </View>
            <Text
              style={{
                color: disabled ? '#90a2bb' : isOutlined ? color : '#fff',
                fontSize: 13,
                ...textStyle,
              }}>
              {title}
            </Text>
          </View>
        )}
      </Ripple>
    </View>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  style: PropTypes.object,
  color: PropTypes.string,
  height: PropTypes.number,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  textStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  type: PropTypes.string,
};

export default Button;
