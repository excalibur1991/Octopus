import React from 'react';
import Ripple from '../components/Ripple';
import {styles} from '../styles/classifyimagereward';
import {View, Image, Text} from 'react-native';

const ClassifyImageReward = ({navigation}) => {
  const options = [
    {
      width: 25,
      height: 25,
      screen: 'ClassifyImage',
      title: 'Continue verifiying',
      icon: require('../assets/verification_yellow.png'),
      subTitle: 'Whether the image is a knee or a shoulder',
    },
    {
      width: 34,
      height: 30,
      screen: 'Wallet',
      title: 'View my earnings',
      subTitle: 'See your earnings',
      icon: require('../assets/my_wallet_yellow.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.congratulationsText}>Congratulations !</Text>
      <Text style={styles.goalReachedText}>
        You have reached your daily goal
      </Text>
      <Text style={styles.earnedText}>You have earned</Text>
      <Text style={styles.earnedTokenText}>0.2 rebpra-22 tokens</Text>
      {options &&
        options.length > 0 &&
        options.map((item) => (
          <View style={styles.listItem}>
            <Ripple
              onPress={() => navigation.navigate(item.screen)}
              key={item.id}
              style={styles.listItemButton}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="stretch"
                  source={item.icon}
                  style={{width: item.width, height: item.height}}
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.subTitleText}>{item.subTitle}</Text>
              </View>
            </Ripple>
          </View>
        ))}
    </View>
  );
};

export default ClassifyImageReward;
