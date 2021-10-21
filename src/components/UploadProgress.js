import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import {theme} from '../services/Common/theme';
import Button from '../components/Button';

const UploadProgress = ({
  progress = 0,
  success = false,
  error = false,
  onNext = () => {},
  nextDisabled = true,
  onCancel = () => {},
}) => {
  return (
    <View style={styles.rowSpaceBetween}>
      {success || error ? (
        <Button
          title="Next"
          onPress={onNext}
          disabled={nextDisabled}
          color={theme.APP_COLOR}
          style={styles.buttonContainer}
          buttonStyle={styles.button}
          textStyle={styles.nextButtonText}
        />
      ) : (
        !error && (
          <Button
            title="Cancel"
            onPress={onCancel}
            color={theme.APP_COLOR}
            style={styles.buttonContainer}
            buttonStyle={styles.button}
            textStyle={styles.cancelButtonText}
          />
        )
      )}
      <View style={styles.progressContainer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : success ? (
          <Text style={styles.successText}>Uploaded</Text>
        ) : (
          <Text style={styles.uploadText}>{`Uploading... (${Math.floor(
            progress * 100,
          )}%)`}</Text>
        )}
        {!error && (
          <Progress.Bar
            height={6}
            width={220}
            borderWidth={0}
            progress={progress}
            style={styles.progress}
            color={theme.APP_COLOR_1}
            unfilledColor={theme.COLORS.LIGHT_GREY}
          />
        )}
      </View>
    </View>
  );
};

export default UploadProgress;

const styles = StyleSheet.create({
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '25%',
  },
  progressContainer: {
    width: '73%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 15,
    backgroundColor: theme.COLORS.LIGHT_GREY,
  },
  nextButtonText: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.LIGHT_BLUE,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
  cancelButtonText: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.LIGHT_RED,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
  center: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    color: theme.COLORS.WHITE,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.ERROR_COLOR,
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
    fontFamily: 'Inter-Regular',
    color: theme.COLORS.SUCCESS_COLOR,
  },
  progress: {
    marginTop: 2,
  },
});
