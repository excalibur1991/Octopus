import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Keyboard} from 'react-native';
import {theme} from '../services/Common/theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {getUsageFlag} from '../services/API/APIManager';
const background = require('../assets/uploadgradient.png');

const Footer = () => {
  const navigation = useNavigation();
  const [focusedRoute, setFocusedRoute] = useState('');
  const [isKeyboardOpened, setIskeyboardOpened] = useState(false);
  const [usageFlag, setUsageFlag] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      if (
        e.data &&
        e.data.state &&
        e.data.state.routes &&
        e.data.state.routes.length > 0 &&
        e.data.state.routes[0].state
      ) {
        const {index, routeNames} = e.data.state.routes[0].state || {};
        setFocusedRoute(routeNames[index]);
      }
    });
    Keyboard.addListener('keyboardDidShow', (e) => setIskeyboardOpened(true));
    Keyboard.addListener('keyboardDidHide', (e) => setIskeyboardOpened(false));
    return unsubscribe;
  }, [navigation]);

  const onCaptureImage = async () => {
    try {
      getUsageFlag().then((res) => {
        if (
          res &&
          res.usage_flag &&
          res.usage_flag.toLowerCase() === 'accepted'
        ) {
          setUsageFlag(true);
        }
      });
      ImagePicker.openCamera({
        cropping: true,
        freeStyleCropEnabled: true,
      }).then((image) => {
        if (image && image.path) {
          const fileName =
            image.path.split('/')[image.path.split('/').length - 1];
          const file = {
            name: fileName,
            size: image.size,
            type: image.mime,
            uri: image.path,
          };
          navigation.navigate(usageFlag ? 'UploadImage' : 'UploadGuidelines', {
            file,
          });
        }
      });
    } catch (error) {}
  };

  const showFooter = !(
    isKeyboardOpened ||
    ['UploadGuidelines', 'UploadImage', 'Verification'].includes(focusedRoute)
  );

  return (
    showFooter && (
      <Pressable style={styles.container} onPress={onCaptureImage}>
        <View style={styles.iconContainer}>
          <IonIcon
            size={30}
            name="md-camera-outline"
            color={theme.COLORS.WHITE}
          />
        </View>
        <Image
          source={background}
          resizeMode="stretch"
          style={styles.backgroundImage}
        />
      </Pressable>
    )
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    bottom: 1,
    width: '100%',
    position: 'absolute',
  },
  backgroundImage: {
    height: 45,
  },
  iconContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
