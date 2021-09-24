import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {theme} from '../services/Common/theme';
import Ripple from './Ripple';

const UploadProgress = ({
  progress = 0,
  success = false,
  error = false,
  onCancel = () => {},
}) => {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>{success ? 'Uploaded' : 'Uploading'}</Text>
      {error ? (
        <>
          <IonIcon name="close" size={40} color="#D60E18" />
          <Text style={styles.errorText}>{error}</Text>
        </>
      ) : success ? (
        <IonIcon name="checkmark-circle" size={40} color="#62B25D" />
      ) : (
        <Text style={styles.text}>{Math.floor(progress * 100) + '%'}</Text>
      )}
      {!error && (
        <>
          <Progress.Bar
            width={300}
            borderWidth={0}
            height={6}
            color="#4a4a4a"
            progress={progress}
            unfilledColor="#6C6C6C"
          />
          {!success && (
            <Ripple
              onPress={onCancel}
              innerStyle={styles.cancelInnerContainer}
              outerStyle={styles.cancelOuterContainer}>
              <IonIcon
                size={18}
                color={theme.APP_COLOR}
                name="close-circle-outline"
              />
              <Text style={styles.cancelText}>Cancel</Text>
            </Ripple>
          )}
        </>
      )}
    </View>
  );
};

export default UploadProgress;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#6C6C6C',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 12,
    color: '#D60E18',
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  cancelOuterContainer: {
    borderRadius: 10,
    marginTop: 10,
  },
  cancelInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  cancelText: {
    marginLeft: 2,
    color: theme.APP_COLOR,
    fontFamily: 'Inter-Regular',
  },
});
