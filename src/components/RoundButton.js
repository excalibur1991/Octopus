import React from 'react';
import {Text, ActivityIndicator, View, TouchableOpacity} from 'react-native';
import Ripple from './Ripple';
import PropTypes from 'prop-types';
import { dark_theme } from '../services/Common/theme';
import { CommonStyles } from '../services/Common/styles';
import LinearGradient from 'react-native-linear-gradient';

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
    <>
    { type === 'primary' ? (
      <TouchableOpacity 
        onPress={onPress}
        disabled={disabled}
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
          style={{
            borderRadius: 30,
            width: '100%',
            borderWidth: 0,
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginVertical: 5,
            ...buttonStyle
          }}
        >
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
        </LinearGradient>
      </TouchableOpacity>
      ) : (
    <View style={style}>
      <Ripple
        outerStyle={{
          width: '100%',
          borderWidth: 0,  //!disabled && isOutlined ? 2 : 0,
          borderColor: color,
          backgroundColor: '#26252B', //disabled ? '#cccccc' : isOutlined ? '#fff' : color,
          borderRadius: 30,
          marginVertical: 5,
          ...buttonStyle,
        }}
        innerStyle={{
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
        onPress={onPress}
        disabled={disabled}>
        {/*loading ? (
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
        )*/}
      </Ripple>
    </View>
      )
    }
    </>
    
  );
};

RoundButton.propTypes = {
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

export default RoundButton;
