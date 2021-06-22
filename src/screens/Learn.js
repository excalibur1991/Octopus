import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {ScrollView, Text, View} from 'react-native';
import {styles} from '../styles/learn';

const Learn = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Welcome to the learning center</Text>
        <Text style={styles.text}>
          {
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu tempor incididunt ut labore et veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."'
          }
        </Text>
        <View style={styles.box}>
          <YoutubePlayer height={180} videoId={'LXb3EKWsInQ'} play={false} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Learn;
