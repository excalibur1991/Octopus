import React from 'react';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import {Text, View, FlatList, Image, Dimensions} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {styles} from '../styles/landingpage';
import {withTranslation} from 'react-i18next';
import * as Progress from 'react-native-progress';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import VerificationWhite from '../assets/verification_white.png';

const LandingPage = ({navigation, t}) => {
  const [, dispatch] = useStateValue();
  const options = [
    {
      width: 25,
      height: 25,
      screen: 'ClassifyImages',
      title: 'Classify Images',
      icon: require('../assets/verification_yellow.png'),
      subTitle: 'Whether the image is a knee or a shoulder',
    },
    {
      width: 36,
      height: 20,
      title: 'Stats',
      screen: 'Stats',
      icon: require('../assets/stats_yellow.png'),
      subTitle: 'See your total verifications  and more',
    },
    {
      width: 34,
      height: 30,
      screen: 'Wallet',
      title: 'My wallet',
      subTitle: 'See your earnings',
      icon: require('../assets/my_wallet_yellow.png'),
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
            onPress={() => {
              navigation.navigate('LandingWalkthrough');
              setTimeout(
                () =>
                  dispatch({
                    type: actions.SET_SHOW_LANDING_PAGE_WALKTHROUGH,
                  }),
                100,
              );
            }}
          />
        </View>
        <View style={styles.upperContainerDivider} />
        <View style={styles.verificationTile}>
          <View style={styles.rowCenterBetween}>
            <Text style={styles.verificationCount}>360</Text>
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

export default withTranslation()(LandingPage);
