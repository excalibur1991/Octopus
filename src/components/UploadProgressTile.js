import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import IonIcon from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {theme} from '../services/Common/theme';

const UploadProgress = ({
  file = null,
  progress = 0.1,
  success = false,
  error = '',
  onRemove = () => {},
}) => {
  return (
    <View style={styles.container}>
      <OctIcon name="file-media" size={45} color="lightgray" />
      <View style={styles.uploadContainer}>
        <View style={styles.upperContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            style={styles.fileNameText}>
            {file && file.name}
          </Text>
          {success ? (
            <>
              <Text style={styles.statusText}>Uploaded</Text>
              <AntIcon
                size={18}
                name="delete"
                onPress={onRemove}
                color={theme.APP_COLOR}
              />
            </>
          ) : (
            <>
              <Text style={styles.percentageText}>{`${progress * 100}%`}</Text>
              <IonIcon
                size={18}
                onPress={onRemove}
                color={theme.APP_COLOR}
                name="close-circle-outline"
              />
            </>
          )}
        </View>
        <Progress.Bar
          borderWidth={0}
          color="#4e9cf9"
          progress={progress}
          unfilledColor="#e0eeff"
          width={220}
        />
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : !(progress === 1) ? (
          <Text style={styles.timeText}>{'2 min remaining'}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default UploadProgress;

const styles = StyleSheet.create({
  container: {
    marginVertical: '1.5%',
    borderRadius: 15,
    backgroundColor: theme.COLORS.WHITE,
    elevation: 3,
    shadowOffset: {height: 4, width: 4},
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    marginHorizontal: '0.5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadContainer: {
    flex: 1,
    paddingVertical: '3%',
    paddingHorizontal: '3%',
    justifyContent: 'center',
  },
  upperContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileNameText: {
    flex: 1,
    fontSize: 12,
    color: '#41474E',
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
  statusText: {
    fontSize: 11,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    marginRight: 5,
    color: theme.APP_COLOR,
    fontFamily: 'Inter-Regular',
  },
  percentageText: {
    fontSize: 11,
    fontWeight: '400',
    marginRight: 5,
    color: '#BDC4CD',
    fontFamily: 'Inter-Regular',
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#BDC4CD',
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#D60E18',
    fontFamily: 'Inter-Regular',
  },
});