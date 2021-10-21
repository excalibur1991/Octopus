import React from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import Ripple from '../components/Ripple';
import Clipboard from '@react-native-community/clipboard';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../services/Common/theme';

const CButton = ({text}) => {
  const onCopy = () => {
    Clipboard.setString(text);
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
  };

  return (
    <Ripple
      onPress={onCopy}
      outerStyle={styles.buttonOuterStyle}
      innerStyle={styles.buttonInnerStyle}>
      <MaterialIcon
        size={25}
        name="content-copy"
        color={theme.COLORS.LIGHT_GREY}
      />
    </Ripple>
  );
};

const styles = StyleSheet.create({
  buttonOuterStyle: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'flex-end',
  },
  buttonInnerStyle: {
    padding: 10,
  },
});

export default CButton;
