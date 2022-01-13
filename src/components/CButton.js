import React from 'react';
import {ToastAndroid} from 'react-native';
import Ripple from '../components/Ripple';
import Clipboard from '@react-native-community/clipboard';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../services/Common/theme';

const CButton = ({text, onCopied = () => {}}) => {
  const onCopy = () => {
    onCopied();
    Clipboard.setString(text);
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
  };

  return (
    <Ripple onPress={onCopy}>
      <MaterialIcon size={15} name="content-copy" color={theme.COLORS.BLUE} />
    </Ripple>
  );
};

export default CButton;
