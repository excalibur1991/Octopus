/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useRef} from 'react';
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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import {getMissionInfo} from '../services/API/APIManager';
const MissionCard1 = require('../assets/image_upload_mission_test.png');
const MissionCard2 = require('../assets/company_icon.png');
const MissionCard3 = require('../assets/dashboard_image.png');
const MissionCard4 = require('../assets/image_upload_mission_test.png');
const MissionCard5 = require('../assets/image_verify_mission_test.png');

const UploadImage = require('../assets/image_upload_mission_test.png');
const VerifyImage = require('../assets/image_verify_mission_test.png');
const AnnotationImage = require('../assets/image_verify_mission_test.png');
const PlayAIImage = require('../assets/dashboard_image.png');

const Tab = ({title, value, isSelected, setTab, count}) => {
  return (
    <Ripple
      style={StyleSheet.flatten([
        styles.tab,
        isSelected ? styles.tabActive : {},
      ])}
      onPress={() => setTab(value, title)}>
      <Text style={styles.tabText}>
        {title} {/*(!!count || count === 0) && `(${count})`*/}
      </Text>
    </Ripple>
  );
};

const MissionCard = (item) => {
  const mission = item.mission;
  const navigation = useNavigation();
  const isOngoingMission =
    mission.status === 'in_progress' || mission.status === 'ready_to_start';
  const getImage = () => {
    return mission.type === 'upload'
      ? UploadImage
      : mission.type === 'verify'
      ? VerifyImage
      : mission.type === 'annotation'
      ? AnnotationImage
      : PlayAIImage;
  };

  return (
    <Ripple
      style={styles.missionCard}
      onPress={() => navigation.navigate('MissionStatus', {mission})}>
      <View>
        <Image
          resizeMode="stretch"
          source={getImage()}
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
          }>{`${mission.title} - ${mission.description}`}</Text>
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
                  mission.progress / mission.criteria.target,
                  10,
                )}
                width={Dimensions.get('screen').width * 0.42}
              />
              <Text style={styles.progressText}>
                {`${mission.progress}/${mission.criteria.target}`}
              </Text>
            </View>
          ) : mission.status === 'pending' ? (
            <Text style={styles.pendingText}>
              {'Pending for Verification...'}
            </Text>
          ) : (
            <Ripple
              disabled={mission.status === 'completed'}
              onPress={() => {}}
              style={
                mission.status === 'completed'
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
};

const MissionListView = ({type, status}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [canFetchMore, setCanFetchMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const listRef = useRef(null);

  const fetchMore = async (_type, _status, _page) => {
    setTimeout(() => {
      setIsFetchingNextPage(true);
    }, 0);
    const response = await getMissionInfo(_type, _status, _page);
    console.log(response, _type, _status, _page);

    setTimeout(() => {
      setIsFetchingNextPage(false);
    }, 0);

    if (response.length) {
      if (_page === 1) {
        setData(response);
      } else {
        setData([...data, ...response]);
      }
      setPage(page + 1);
      setCanFetchMore(true);
    } else {
      if (_page === 1) {
        setData([]);
      }
      setCanFetchMore(false);
    }
  };

  useEffect(() => {
    if (isFetchingNextPage) {
      return;
    }
    fetchMore(type, status, 1);
    // queryClient.resetQueries('mission');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const renderData = (row) => {
    const mission = row.item;
    return <MissionCard mission={mission} />;
  };

  const loadMore = () => {
    if (canFetchMore) {
      fetchMore();
    }
  };

  const renderSpinner = () => {
    return <ActivityIndicator color="emerald.500" size="small" />;
  };

  const renderEmpty = () => {
    if (data.length !== 0 || isFetchingNextPage) {
      return null;
    }
    return (
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
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.missionCardsContainer}
      ref={listRef}
      data={data}
      renderItem={renderData}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
    />
  );
};

const MyMissions = ({navigation}) => {
  const [tab, setTab] = useState('Ongoing');

  const [, dispatch] = useStateValue();
  const [status, setStatus] = useState(['ready_to_start', 'in_progress']);
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

  const [ongoingMissionsCount] = useState(0);
  const [completedMissionsCount] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Tab
          count={ongoingMissionsCount}
          setTab={(value) => {
            setTab(value);
            setStatus(['ready_to_start', 'in_progress']);
          }}
          value="Ongoing"
          title="Ongoing"
          isSelected={tab === 'Ongoing'}
        />
        <Tab
          count={completedMissionsCount}
          setTab={(value) => {
            setTab(value);
            setStatus(['completed']);
          }}
          value="Completed"
          title="Completed"
          isSelected={tab === 'Completed'}
        />
      </View>
      <MissionListView
        type={['upload', 'verify', 'annotation']}
        status={status}
      />
    </View>
  );
};

export default MyMissions;
