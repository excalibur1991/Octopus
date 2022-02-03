import React from 'react';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import {Text, View, FlatList, Image} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/landingpage';
import {withTranslation} from 'react-i18next';
import * as Progress from 'react-native-progress';
import Nft from '../components/Nft';

const LandingPage = ({navigation, t}) => {
  const options = [
    {
      title: 'Browse Missions',
      subTitle: 'Trophies, NFT items & Vouchers',
      screen: 'BrowseMissions',
      icon: require('../assets/search.png'),
      width: 22,
      height: 32,
    },
    {
      title: 'My Missions',
      subTitle: 'Trophies, NFT items & Vouchers',
      screen: 'MyMissions',
      icon: require('../assets/ellipse.png'),
      width: 32,
      height: 32,
    },
    {
      title: 'My Wallet',
      subTitle: 'Trophies, NFT items & Vouchers',
      screen: 'Wallet',
      icon: require('../assets/dollar.png'),
      width: 32,
      height: 30,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <MaterialIcon
          size={40}
          name="info"
          style={styles.infoIcon}
          color={theme.COLORS.WHITE}
          onPress={() => navigation.navigate('Information')}
        />
        <View>
          <Progress.Circle
            size={200}
            progress={0.7}
            thickness={10}
            borderWidth={0}
            strokeCap="round"
            unfilledColor="transparent"
            direction="counter-clockwise"
            color={theme.COLORS.DARK_BLUE}
          />
          <View style={styles.imageContainer}>
            <Nft />
          </View>
        </View>
        <Text style={styles.levelChip}>LV. 3</Text>
        <Text style={styles.expText}>
          EXP <Text style={styles.text}>550</Text>/800
        </Text>
        <View style={styles.divider} />
        <View style={styles.countGroup}>
          <View style={styles.countBox}>
            <Text style={styles.countValue}>38</Text>
            <Text style={styles.countLabel}>Missions</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countValue}>01</Text>
            <Text style={styles.countLabel}>Ongoing</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countValue}>20</Text>
            <Text style={styles.countLabel}>Earnings</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={options}
        style={styles.menuContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
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
              <View>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.subTitleText}>{item.subTitle}</Text>
              </View>
            </Ripple>
          </View>
        )}
      />
    </View>
  );
};

export default withTranslation()(LandingPage);
