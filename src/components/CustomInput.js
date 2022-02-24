import React, { forwardRef, useState, useEffect } from 'react';
import { 
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity, 
  Animated, 
  TouchableWithoutFeedback,
  Text,
  Keyboard
 } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from '../styles/walletsettings';
import { theme } from '../services/Common/theme';
import CButton from './CButton';


export const WriteInput = forwardRef(({ icon, error, touched, ...otherProps }, ref) => {
  const validationColor = !touched ? theme.COLORS.BLUE : error ? '#FF5A5F' : '#223e4b';
  const hasError = error && touched

  return (

    <View style={{...styles.readOnlyBox, borderColor:validationColor}}>
      <View style={{ padding: 8 }}>
        <IonIcon name={icon} color={validationColor} size={16} />
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          underlineColorAndroid='transparent'
          placeholderTextColor={theme.COLORS.WHITE}
          ref={ref}
          {...otherProps}
        />
      </View>
    </View>
  );
});


export const MessageBox = ({ title, value,error, success}) => {
  const msgColor = success 
                   ? theme.COLORS.SUCCESS_COLOR 
                   : error 
                   ? theme.COLORS.ERROR_COLOR 
                   : '#223e4b';

  return (
    <TouchableOpacity
      style={[styles.readOnlyBox, {borderColor:theme.COLORS.SUCCESS_COLOR}]}
    // onPressIn={updateSecureTextEntry}
    >
       <View style={styles.titleCopyButton}>
        <Text style={{color:theme.COLORS.SUCCESS_COLOR,}}>{title}</Text>
        <CButton text={value} onCopied={(value) => (value)} />
      </View>
      <TextInput
       // numberOfLines={2}
        style={{color:theme.COLORS.WHITE}}
        value={value}
        maxLength={42}
        //showSoftInputOnFocus={false}
        onFocus = {()=> Keyboard.dismiss()}
       // placeholderTextColor={theme.COLORS.WHITE}
        //secureTextEntry={true}
      />
    </TouchableOpacity>
  );
};


export const AnimatedButton = ({}) => {

  const [animation, setAnimation] = useState(0)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
      setAnimation(new Animated.Value(0))
      setOpacity(new Animated.Value(1))
  },[])

  const handlePress = () => {

    setAnimation(animation.setValue(0))
    setOpacity(opacity.setValue(1))

    Animated.timing(animation, {
      duration: 1500,
      toValue: 1,
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
        }).start();
      }
    });
  };

  const progressInterpolate = animation.interpolateNode({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  const colorInterpolate = animation.interpolateNode({
    inputRange: [0, 1],
    outputRange: ["rgb(71,255,99)", "rgb(99,71,255)"],
  });

  const progressStyle = {
    width: progressInterpolate,
    bottom: 0,

    // height: progressInterpolate,
    // right: 0,

    // top: null,
    // bottom: 0,
    // width: progressInterpolate,
    // height: 5,

    opacity: opacity,
    backgroundColor: colorInterpolate,
  };

  return (
    <View style={styles.container}>
    <TouchableWithoutFeedback onPress={() => handlePress()}>
      <View style={styles.button}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.progress, progressStyle, styles.opacityBackground]} />
        </View>
        <Text style={styles.buttonText}>Get it!</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
  )

}



export const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <>
      <TextInput
        style={[
          styles_.textInput,
          props.multiline && { height: props.numberOfLines * 40 },
          hasError && styles_.errorInput
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles_.errorText}>{errors[name]}</Text>}
    </>
  )
}

const styles_ = StyleSheet.create({
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  }
})

