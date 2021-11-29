import React from 'react';
import Ripple from '../components/Ripple';
import {styles} from '../styles/missionstatus';
import {Text, View, Image} from 'react-native';
import {theme} from '../services/Common/theme';
import LinearGradient from 'react-native-linear-gradient';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const MissionStatus = ({navigation, route}) => {
  const {params} = route || {};
  const {mission = {}} = params || {};
  const {
    type = 'ongoing',
    image,
    level = '',
    title1 = '',
    title2 = '',
    status = 'pending',
    progressTotal = 0,
    progressCompleted = 0,
  } = mission || {};

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image resizeMode="stretch" source={image} style={styles.image} />
        <View style={styles.levelContainer}>
          <View style={styles.levelChip}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title2}</Text>
        <Text style={styles.subTitle}>{title1}</Text>
      </View>

      {type.toLowerCase() === 'ongoing' ||
      ['pending', 'readytogetreward'].includes(status.toLowerCase()) ? (
        <>
          <View style={styles.progressContainer}>
            <View style={styles.progressChip}>
              <Text
                style={
                  styles.progressText
                }>{`${progressCompleted}/${progressTotal}`}</Text>
            </View>
          </View>
          <View style={styles.divider} />
        </>
      ) : (
        <>
          <View style={styles.progressContainer}>
            <Text style={styles.doneText}>You did it!</Text>
          </View>
          <View style={styles.dividerCompleted}>
            <LinearGradient
              style={styles.dividerShadow}
              colors={[theme.COLORS.TRANSPARENT, theme.COLORS.DARK_PURPLE]}
            />
          </View>
        </>
      )}

      <View style={styles.statusContainer}>
        {type.toLowerCase() === 'ongoing' ? (
          <>
            <Text style={styles.statusTitle}>
              {progressCompleted > 0 ? 'Almost There!' : 'Keep it up!'}
            </Text>
            <Text style={styles.statusDescription}>
              {`You have uploaded\n${progressCompleted} out of ${progressTotal} images.`}
            </Text>
            <Text style={styles.statusDescription}>
              {progressTotal - progressCompleted} more images to go.
            </Text>
          </>
        ) : (
          <>
            {['pending', 'readytogetreward'].includes(status.toLowerCase()) && (
              <Text style={styles.statusTitle}>MISSION COMPLETED!</Text>
            )}
            {status === 'rewardgiven' && (
              <Text style={styles.completedDescription}>
                {'Your Mission has been\nverfied. You are rewarded:'}
              </Text>
            )}
            {status === 'rewardgiven' && (
              <View style={styles.rewardContainer}>
                <View style={styles.expContainer}>
                  <Text style={styles.rewardValue}>1000</Text>
                  <Text style={styles.rewardLabel}>Exp</Text>
                </View>
                <View style={styles.expContainer}>
                  <Text style={styles.rewardSign}>$</Text>
                  <Text style={styles.xLabel}>x</Text>
                  <Text style={styles.rewardValue}>1.21</Text>
                  <Text style={styles.rewardLabel}>DU Coins</Text>
                </View>
              </View>
            )}
            {['pending', 'readytogetreward'].includes(status.toLowerCase()) && (
              <Text style={styles.statusDescription}>
                {
                  'Collect rewards on\n‘my missions > REWARDS’\nonce your mission HAS BEEN approved.'
                }
              </Text>
            )}
          </>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.button}>
          <LinearGradient
            end={{x: 1, y: 0}}
            start={{x: 0.15, y: 0}}
            colors={[theme.COLORS.DARK_PURPLE_1, theme.COLORS.DARK_BLUE_1]}
            style={styles.radius30}>
            <Ripple
              disabled={
                type.toLowerCase() === 'completed' &&
                ['pending', 'readytogetreward'].includes(status.toLowerCase())
              }
              onPress={() => {
                if (
                  type.toLowerCase() === 'completed' &&
                  status.toLowerCase() === 'rewardgiven'
                ) {
                  navigation.navigate('Wallet');
                } else {
                  navigation.navigate('BeginImageUpload', {mission});
                }
              }}
              style={
                type.toLowerCase() === 'completed' &&
                ['pending', 'readytogetreward'].includes(status.toLowerCase())
                  ? styles.gradientButtonInnerDisabled
                  : styles.gradientButtonInner
              }>
              {type.toLowerCase() === 'completed' &&
              status.toLowerCase() === 'rewardgiven' ? (
                <>
                  <Image
                    resizeMode="stretch"
                    style={styles.buttonIconImage}
                    source={require('../assets/MyWallet.png')}
                  />
                  <Text style={styles.buttonText}>Wallet</Text>
                </>
              ) : (
                <>
                  <FeatherIcon
                    size={20}
                    name="upload"
                    color={theme.COLORS.WHITE}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Upload</Text>
                </>
              )}
            </Ripple>
          </LinearGradient>
        </View>
        <View style={styles.button}>
          <Ripple
            onPress={() => navigation.navigate('ImageUploadMission')}
            style={styles.buttonOuter}>
            <FontAwesome5Icon
              size={24}
              name="list-alt"
              color={theme.COLORS.WHITE}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {type.toLowerCase() === 'completed' &&
              ['pending', 'readytogetreward'].includes(status.toLowerCase())
                ? 'About Mission'
                : 'Mission Page'}
            </Text>
          </Ripple>
        </View>
      </View>
      <Ripple onPress={() => navigation.goBack()} style={styles.closeButton}>
        <AntIcon size={23} name="close" color={theme.COLORS.WHITE} />
      </Ripple>
    </View>
  );
};

export default MissionStatus;
