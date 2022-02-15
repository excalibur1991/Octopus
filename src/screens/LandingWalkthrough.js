import React from 'react';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {withTranslation} from 'react-i18next';
import * as Progress from 'react-native-progress';
import {useStateValue} from '../services/State/State';
import VerificationWhite from '../assets/verification_white.png';

const LandingWalkthrough = ({navigation}) => {
  const [, dispatch] = useStateValue();
  const options = [
    {
      title: 'Classify Images',
      subTitle: 'Whether the image is a knee or a shoulder',
      screen: 'BrowseMissions',
      icon: require('../assets/verification_yellow.png'),
      width: 25,
      height: 25,
    },
    {
      title: 'Stats',
      subTitle: 'See your total verifications  and more',
      screen: 'MyMissions',
      icon: require('../assets/stats_yellow.png'),
      width: 36,
      height: 20,
    },
    {
      title: 'My wallet',
      subTitle: 'See your earnings',
      screen: 'Wallet',
      icon: require('../assets/my_wallet_yellow.png'),
      width: 34,
      height: 30,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.userTile}>
          <Text style={styles.userTitle}>User2304</Text>
          <AntIcon
            size={20}
            name="questioncircleo"
            color={theme.COLORS.WHITE}
          />
        </View>
        <View style={styles.upperContainerDivider} />
        <View style={styles.verificationTile}>
          <View style={styles.rowCenterBetween}>
            <Text style={styles.verificationCount}>230489</Text>
            <Image
              resizeMode="stretch"
              source={VerificationWhite}
              style={styles.verificationIcon}
            />
          </View>
          <Text style={styles.myVerifications}>My Verifications</Text>
        </View>
        <View style={styles.upperContainerDivider} />
        <View style={styles.successRateTile}>
          <Progress.Bar
            height={14}
            progress={0.7}
            borderWidth={3}
            borderRadius={15}
            color={theme.COLORS.TULIP_TREE}
            borderColor={theme.COLORS.BLACK}
            unfilledColor={theme.COLORS.BLACK}
            width={Dimensions.get('window').width * 0.8}
          />
          <View style={styles.successRateTileInner}>
            <Text style={styles.successRatePercentage}>%90</Text>
            <Text style={styles.successRate}>Success Rate</Text>
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
              <View style={styles.titleContainer}>
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

export default withTranslation()(LandingWalkthrough);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '3%',
    paddingHorizontal: 16,
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  upperContainer: {
    borderRadius: 15,
    backgroundColor: theme.APP_COLOR_2,
  },
  userTile: {
    marginVertical: 22,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 18,
    justifyContent: 'space-between',
  },
  userTitle: {
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  upperContainerDivider: {
    height: 4,
    backgroundColor: theme.APP_COLOR_1,
  },
  verificationTile: {
    marginVertical: 22,
    marginHorizontal: 18,
  },
  verificationCount: {
    fontSize: 36,
    lineHeight: 41,
    textAlign: 'center',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  rowCenterBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verificationIcon: {
    height: 25,
    width: 25,
  },
  myVerifications: {
    fontSize: 15,
    marginTop: 15,
    lineHeight: 17,
    textAlign: 'right',
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  successRateTile: {
    marginVertical: 22,
    marginHorizontal: 18,
  },
  successRateTileInner: {
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successRatePercentage: {
    fontSize: 36,
    lineHeight: 41,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  successRate: {
    fontSize: 15,
    marginTop: 15,
    lineHeight: 17,
    fontFamily: 'Moon-Bold',
    color: theme.COLORS.WHITE,
  },
  listContainer: {
    paddingBottom: '3%',
  },
  menuContainer: {
    marginTop: 17,
  },
  listItem: {
    marginVertical: 12,
  },
  listItemButton: {
    elevation: 5,
    borderRadius: 15,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    paddingVertical: 18,
    shadowColor: '#000',
    flexDirection: 'row',
    shadowOffset: {width: 0, height: 4},
    backgroundColor: theme.APP_COLOR_2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  textContainer: {
    width: '70%',
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: 'Moon-Bold',
    textTransform: 'uppercase',
    color: theme.COLORS.TULIP_TREE,
  },
  subTitleText: {
    fontSize: 9,
    marginTop: 5,
    lineHeight: 10,
    fontFamily: 'Moon-Light',
    color: theme.COLORS.WHITE,
    textTransform: 'uppercase',
  },
});
