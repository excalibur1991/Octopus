/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import Ripple from '../components/Ripple';
import {styles} from '../styles/mymissions';
import {theme} from '../services/Common/theme';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import {getMissionInfo} from '../services/API/APIManager';
const MissionCard1 = require('../assets/image_upload_mission_test.png');
const MissionCard2 = require('../assets/company_icon.png');
const MissionCard3 = require('../assets/dashboard_image.png');
const MissionCard4 = require('../assets/image_upload_mission_test.png');
const MissionCard5 = require('../assets/image_verify_mission_test.png');

const Tab = ({title, value, isSelected, setTab, count}) => {
  return (
    <Ripple
      style={StyleSheet.flatten([
        styles.tab,
        isSelected ? styles.tabActive : {},
      ])}
      onPress={() => setTab(value, title)}>
      <Text style={styles.tabText}>
        {title} {(!!count || count === 0) && `(${count})`}
      </Text>
    </Ripple>
  );
};

const MyMissions = ({navigation}) => {
  const [tab, setTab] = useState('Ongoing');
  const [missions, setMissions] = useState([
    {
      type: 'upload',
      image: MissionCard1,
      level: 'Lv. 3',
      title1: 'Butterflies',
      title2: 'Company Name',
      status: 'inprogress',
      progressTotal: 5,
      progressCompleted: 2,
    },
    {
      type: 'verify',
      image: MissionCard5,
      level: 'Lv. 2',
      title1: 'Foods',
      title2: 'Liddl',
      status: 'inprogress',
      progressTotal: 5,
      progressCompleted: 4,
    },
    {
      type: 'annotate',
      image: MissionCard1,
      level: 'Lv. 3',
      title1: 'Natureyou',
      title2: 'Butterflies',
      status: 'inprogress',
      progressTotal: 5,
      progressCompleted: 0,
    },
    {
      type: 'upload',
      image: MissionCard1,
      level: 'Lv. 2',
      title1: 'Butterflies',
      title2: 'Company Name',
      status: 'inprogress',
      progressTotal: 5,
      progressCompleted: 0,
    },
    {
      type: 'verify',
      image: MissionCard5,
      level: 'Lv. 3',
      title1: 'Foods',
      title2: 'Liddl',
      status: 'inprogress',
      progressTotal: 5,
      progressCompleted: 0,
    },
    {
      type: 'annotate',
      image: MissionCard1,
      level: 'Lv. 2',
      title1: 'Natureyou',
      title2: 'Butterflies',
      status: 'inprogress',
      progressTotal: 5,
      progressCompleted: 4,
    },
    {
      type: 'upload',
      image: MissionCard2,
      level: 'Lv. 7',
      title1: 'Butterflies',
      title2: 'Company Name',
      status: 'pending',
      progressTotal: 5,
      progressCompleted: 5,
    },
    {
      type: 'upload',
      image: MissionCard3,
      level: 'Lv. 8',
      title1: 'Banana Peels',
      title2: 'Mini Quest',
      status: 'readytogetreward',
      progressTotal: 5,
      progressCompleted: 5,
    },
    {
      type: 'upload',
      image: MissionCard4,
      level: 'Lv. 10',
      title1: 'Food',
      title2: 'Liddl',
      status: 'rewardgiven',
      progressTotal: 5,
      progressCompleted: 5,
    },
    {
      type: 'verify',
      image: MissionCard5,
      level: 'Lv. 7',
      title1: 'Food',
      title2: 'Liddl',
      status: 'pending',
      progressTotal: 5,
      progressCompleted: 5,
    },
    {
      type: 'verify',
      image: MissionCard5,
      level: 'Lv. 8',
      title1: 'Food',
      title2: 'Liddl',
      status: 'readytogetreward',
      progressTotal: 5,
      progressCompleted: 5,
    },
    {
      type: 'verify',
      image: MissionCard5,
      level: 'Lv. 10',
      title1: 'Food',
      title2: 'Liddl',
      status: 'rewardgiven',
      progressTotal: 5,
      progressCompleted: 5,
    },
    {
      type: 'upload',
      image: MissionCard2,
      level: 'Lv. 10',
      title1: 'Natureyou',
      title2: 'Butterflies',
      status: 'rewardgiven',
      progressTotal: 5,
      progressCompleted: 5,
    },
    {
      type: 'annotate',
      image: MissionCard1,
      level: 'Lv. 7',
      title1: 'Natureyou',
      title2: 'Butterflies',
      status: 'pending',
      progressTotal: 5,
      progressCompleted: 5,
    },
    {
      type: 'annotate',
      image: MissionCard1,
      level: 'Lv. 8',
      title1: 'Natureyou',
      title2: 'Butterflies',
      status: 'readytogetreward',
      progressTotal: 5,
      progressCompleted: 5,
    },
    {
      type: 'annotate',
      image: MissionCard1,
      level: 'Lv. 10',
      title1: 'Natureyou',
      title2: 'Butterflies',
      status: 'rewardgiven',
      progressTotal: 5,
      progressCompleted: 5,
    },
    {
      type: 'playai',
      image: MissionCard1,
      level: 'Lv. 10',
      title1: 'Natureyou',
      title2: 'Butterflies',
      status: 'inprogress',
      progressTotal: 5,
      progressCompleted: 3,
    },
  ]);

  const [page, setPage] = useState(0);
  const [, dispatch] = useStateValue();

  const filteredMissions = missions.filter((m) =>
    tab.toLowerCase() === 'ongoing'
      ? m.status.toLowerCase() === 'inprogress'
      : m.status.toLowerCase() !== 'inprogress',
  );
  const ongoingMissionsCount = missions.filter(
    (m) => m.status.toLowerCase() === 'inprogress',
  ).length;
  const completedMissionsCount = missions.filter(
    (m) => m.status.toLowerCase() !== 'inprogress',
  ).length;

  const fetchMissions = async () => {
    try {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: true,
      });

      const response = await getMissionInfo('upload', 'ready_to_start', 1);
      console.log(response);

      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: false,
      });
    } catch (e) {
      dispatch({
        type: actions.SET_ALERT_SETTINGS,
        alertSettings: {
          show: true,
          type: 'error',
          title: 'Error Occured',
          message:
            'This Operation Could Not Be Completed. Please Try Again Later.',
          showConfirmButton: true,
          confirmText: 'Ok',
        },
      });
    } finally {
      dispatch({
        type: actions.SET_PROGRESS_SETTINGS,
        show: false,
      });
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Tab
          count={ongoingMissionsCount}
          setTab={setTab}
          value="Ongoing"
          title="Ongoing"
          isSelected={tab === 'Ongoing'}
        />
        <Tab
          count={completedMissionsCount}
          setTab={setTab}
          value="Completed"
          title="Completed"
          isSelected={tab === 'Completed'}
        />
      </View>
      {filteredMissions && filteredMissions.length > 0 ? (
        <ScrollView
          style={styles.missionCards}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.missionCardsContentContainer}>
          {filteredMissions.map((mission) => {
            const isOngoingMission =
              mission.status.toLowerCase() === 'inprogress';
            return (
              <Ripple
                style={styles.missionCard}
                onPress={() => navigation.navigate('MissionStatus', {mission})}>
                <View>
                  <Image
                    resizeMode="stretch"
                    source={mission.image}
                    style={styles.cardImage}
                  />
                  <View style={styles.levelContainer}>
                    <View style={styles.levelChip}>
                      <Text style={styles.levelText}>{mission.level}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cardInfoContainer}>
                  <Text
                    style={
                      styles.cardTitle
                    }>{`${mission.title2} - ${mission.title1}`}</Text>
                  {mission.type === 'upload' ? (
                    <View style={styles.uploadTypeChip}>
                      <Text style={styles.typeText}>Image Upload</Text>
                    </View>
                  ) : mission.type === 'verify' ? (
                    <View style={styles.verifyTypeChip}>
                      <Text style={styles.typeText}>Image Verify</Text>
                    </View>
                  ) : mission.type === 'playai' ? (
                    <View style={styles.verifyTypeChip}>
                      <Text style={styles.typeText}>Play AI</Text>
                    </View>
                  ) : (
                    <View style={styles.annotateTypeChip}>
                      <Text style={styles.typeText}>Image Annotate</Text>
                    </View>
                  )}
                  <View style={styles.statusContainer}>
                    {isOngoingMission ? (
                      <View style={styles.progressContainer}>
                        <Progress.Bar
                          height={12}
                          borderWidth={0}
                          borderRadius={30}
                          color={theme.COLORS.DARK_BLUE}
                          unfilledColor={theme.COLORS.MID_GREY}
                          progress={parseFloat(
                            mission.progressCompleted / mission.progressTotal,
                            10,
                          )}
                          width={Dimensions.get('screen').width * 0.42}
                        />
                        <Text style={styles.progressText}>
                          {`${mission.progressCompleted}/${mission.progressTotal}`}
                        </Text>
                      </View>
                    ) : mission.status === 'pending' ? (
                      <Text style={styles.pendingText}>
                        Pending for Verification...
                      </Text>
                    ) : (
                      <Ripple
                        disabled={mission.status === 'rewardgiven'}
                        onPress={() => {}}
                        style={
                          mission.status === 'rewardgiven'
                            ? styles.rewardButtonDisabled
                            : styles.rewardButton
                        }>
                        <FontAwesome5Icon
                          size={20}
                          name="hand-holding-usd"
                          color={theme.COLORS.WHITE}
                        />
                      </Ripple>
                    )}
                  </View>
                </View>
              </Ripple>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>OOps, its empty here!</Text>
          <Text style={styles.emptyDescription}>
            {'You have no missions yet.\nclick here to find new missions.'}
          </Text>
          <LinearGradient
            end={{x: 1, y: 0}}
            start={{x: 0.15, y: 0}}
            colors={[theme.COLORS.DARK_PURPLE_1, theme.COLORS.DARK_BLUE_1]}
            style={styles.buttonOuter}>
            <Ripple
              style={styles.gradientButtonInner}
              onPress={() => navigation.navigate('BrowseMissions')}>
              <Image
                resizeMode="stretch"
                style={styles.buttonIcon}
                source={require('../assets/browseMissions.png')}
              />
            </Ripple>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

export default MyMissions;