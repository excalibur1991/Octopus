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
    progressTotal = 0,
    progressCompleted = 0,
    status = 'inprogress',
  } = mission || {};

  return (
    <View style={styles.container}>
      <View
        style={
          type === 'upload'
            ? styles.uploadImageContainer
            : styles.verifyImageContainer
        }>
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

      {['inprogress', 'pending', 'readytogetreward'].includes(
        status.toLowerCase(),
      ) ? (
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
          {type.toLowerCase() === 'upload' ? (
            <View style={styles.dividerCompletedUpload}>
              <LinearGradient
                style={styles.dividerShadow}
                colors={[theme.COLORS.TRANSPARENT, theme.COLORS.DARK_PURPLE]}
              />
            </View>
          ) : (
            <View style={styles.dividerCompletedVerify}>
              <LinearGradient
                style={styles.dividerShadow}
                colors={[theme.COLORS.TRANSPARENT, theme.COLORS.DARK_BLUE]}
              />
            </View>
          )}
        </>
      )}

      <View style={styles.statusContainer}>
        {status.toLowerCase() === 'inprogress' ? (
          <>
            <Text style={styles.statusTitle}>
              {progressCompleted > 0 ? 'Almost There!' : 'Keep it up!'}
            </Text>
            <Text style={styles.statusDescription}>
              {`You have ${
                type === 'upload' ? 'uploaded' : 'verified'
              }\n${progressCompleted} out of ${progressTotal} images.`}
            </Text>
            <Text style={styles.statusDescription}>
              {progressTotal - progressCompleted} more image(s) to go.
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
              disabled={['pending', 'readytogetreward'].includes(
                status.toLowerCase(),
              )}
              onPress={() => {
                if (type.toLowerCase() === 'upload') {
                  if (status.toLowerCase() === 'rewardgiven') {
                    navigation.navigate('Wallet');
                  } else {
                    navigation.navigate('BeginImageUpload', {mission});
                  }
                } else {
                  if (status.toLowerCase() === 'rewardgiven') {
                    navigation.navigate('MyMissions');
                  } else {
                    navigation.navigate('BeginImageVerify', {mission});
                  }
                }
              }}
              style={
                ['pending', 'readytogetreward'].includes(status.toLowerCase())
                  ? styles.gradientButtonInnerDisabled
                  : styles.gradientButtonInner
              }>
              {type.toLowerCase() === 'upload' ? (
                <>
                  {status.toLowerCase() !== 'inprogress' ? (
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
                </>
              ) : (
                <>
                  {status.toLowerCase() !== 'inprogress' ? (
                    <>
                      <Image
                        resizeMode="stretch"
                        style={styles.buttonIconImage}
                        source={require('../assets/MyMissions.png')}
                      />
                      <Text style={styles.buttonText}>My Missions</Text>
                    </>
                  ) : (
                    <>
                      <FeatherIcon
                        size={20}
                        name="upload"
                        color={theme.COLORS.WHITE}
                        style={styles.buttonIcon}
                      />
                      <Text style={styles.buttonText}>Verify</Text>
                    </>
                  )}
                </>
              )}
            </Ripple>
          </LinearGradient>
        </View>
        <View style={styles.button}>
          <Ripple
            onPress={() =>
              type.toLowerCase() === 'upload'
                ? navigation.navigate('ImageUploadMission')
                : navigation.navigate('ImageVerifyMission')
            }
            style={styles.buttonOuter}>
            <FontAwesome5Icon
              size={24}
              name="list-alt"
              color={theme.COLORS.WHITE}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {type === 'upload' ? 'About Mission' : 'Mission Page'}
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