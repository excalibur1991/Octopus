import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import LinearGradient from 'react-native-linear-gradient';

import {theme} from '../services/Common/theme';
import {styles} from '../styles/browsemissions';
import Ripple from '../components/Ripple';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import {getMissionInfo} from '../services/API/APIManager';
import {decryptData} from '@celo/utils/lib/commentEncryption';

import {useQueryClient} from 'react-query';
 
const UploadIcon = require('../assets/mission_upload.png');
const AnnotateIcon = require('../assets/mission_annotate.png');
const VerifyIcon = require('../assets/mission_verify.png');
const UploadMission = require('../assets/mission_upload_test.png');
const VerificationMission = require('../assets/mission_verification_test.png');
const AnnotationMission = require('../assets/mission_annotation_test.png');

const filters = ['Nature', 'Popular', 'Scenery & Views', 'Popular'];

/* const missions = [
  {
    value: 1.5,
    type: 'upload',
    cover: UploadMission,
    coverTitle: 'Image Upload     Lv.3',
    title: 'Company Name - Butterfly',
    description: 'Description Text Here',
  },
  {
    value: 2.1,
    type: 'verify',
    cover: VerificationMission,
    coverTitle: 'Verification     Lv.1',
    title: 'Company Name - Butterfly',
    description: 'Description Text Here',
  },
  {
    value: 2.1,
    type: 'annotate',
    cover: AnnotationMission,
    coverTitle: 'Annotation     Lv.1',
    title: 'Company Name - Butterfly',
    description: 'Description Text Here',
  },
]; */

const TypeBox = ({icon, title, badgeCount, isSelected, onSelect}) => {
  return (
    <View style={styles.typeBox}>
      {!!badgeCount && (
        <LinearGradient
          end={{x: 1, y: 0}}
          start={{x: 0.15, y: 0}}
          style={styles.badge}
          colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}>
          <Text style={styles.badgeCount}>{badgeCount}</Text>
        </LinearGradient>
      )}
      <LinearGradient
        end={{x: 1, y: 0}}
        start={{x: 0.15, y: 0}}
        style={styles.typeBoxGradient}
        colors={
          isSelected
            ? [theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]
            : [theme.APP_COLOR_2, theme.APP_COLOR_2]
        }>
        <Ripple onPress={() => onSelect(title)} style={styles.typeBoxButton}>
          <Image
            source={icon}
            resizeMode="stretch"
            style={styles.uploadImageIcon}
          />
          <Text style={styles.typeText}>{title}</Text>
        </Ripple>
      </LinearGradient>
    </View>
  );
};

const FilterBox = ({title, isSelected, onSelect}) => {
  return (
    <LinearGradient
      end={{x: 1, y: 0}}
      start={{x: 0.15, y: 0}}
      style={styles.filterGradient}
      colors={
        isSelected
          ? [theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]
          : [theme.APP_COLOR_2, theme.APP_COLOR_2]
      }>
      <Ripple onPress={() => onSelect(title)} style={styles.filterButton}>
        <Text style={styles.filterText}>{title}</Text>
      </Ripple>
    </LinearGradient>
  );
};

const MissionCard = ({
  type,
  cover,
  coverTitle,
  title,
  description,
  value,
  onPress,
}) => {
  return (
    <Ripple style={styles.missionCard} onPress={onPress}>
      <View
        style={[
          styles.coverTitle,
          type === 'upload'
            ? styles.uploadCoverTitle
            : type === 'verify'
            ? styles.verificationCoverTitle
            : type === 'annotate'
            ? styles.annotationCoverTitle
            : {},
        ]}>
        <Text style={styles.coverTitleText}>{coverTitle}</Text>
      </View>
      <Image source={cover} resizeMode="stretch" style={styles.cardCover} />
      <View style={styles.cardFooter}>
        <View style={styles.cardTitleDescription}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
        <LinearGradient
          end={{x: 1, y: 0}}
          start={{x: 0.15, y: 0}}
          style={styles.cardValueGradient}
          colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}>
          <View style={styles.cardValueSign}>
            <Text style={styles.cardValueSignText}>$</Text>
          </View>
          <Text style={styles.cardValue}>{value}</Text>
        </LinearGradient>
      </View>
    </Ripple>
  );
};

const MissionListView = ({navigation, type, status}) => {
  const queryClient = useQueryClient();

  const {data, fetchMore, canFetchMore, isFetchingNextPage} = useInfiniteQuery(
    'mission',
    //
    async (key, page = 1) => {
      const response = await getMissionInfo(type, status, page);
      return {items: response, page};
    },
    {
      getFetchMore: ({items, page}) => {
        if (items.length) {
          return page + 1; // This will be sent as the LAST parameter to your query function
        }
        return false;
      },
    },
  );

  useEffect(() => {
    queryClient.resetQueries('mission');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const renderData = (row) => {
    const mission = row.item;
    return (
      <MissionCard
        type={mission.type}
        cover={
          mission.cover
            ? mission.cover
            : mission.type === 'upload'
            ? UploadMission
            : mission.type === 'verify'
            ? VerificationMission
            : mission.type === 'annotation'
            ? AnnotationMission
            : UploadMission
        }
        title={mission.title || 'Company Name - Butterfly'}
        value={mission.value || '1'}
        coverTitle={
          mission.type === 'upload'
            ? 'Image Upload'
            : mission.type === 'verify'
            ? 'Verify'
            : mission.type === 'annotation'
            ? 'Annotation'
            : ''
        }
        description={mission.description}
        onPress={() =>
          navigation.navigate(
            mission.type === 'upload'
              ? 'ImageUploadMission'
              : mission.type === 'verify'
              ? 'ImageVerifyMission'
              : 'ImageAnnotateMission',
          )
        }
      />
    );
  };

  const loadMore = () => {
    if (canFetchMore) {
      fetchMore();
    }
  };

  const renderSpinner = () => {
    return <ActivityIndicator color="emerald.500" size="small" />;
  };

  return (
    <FlatList
      contentContainerStyle={styles.missionCardsContainer}
      data={
        data && data.pages ? data.pages.map((page) => page.items).flat() : []
      }
      renderItem={renderData}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
    />
  );
};

const BrowseMissions = (props) => {
  const {navigation} = props;
  const [type, setType] = useState('upload');
  const [filter, setFilter] = useState(filters[0]);
  const [, dispatch] = useStateValue();

  return (
    <View style={styles.container}>
      <View style={styles.typeContainer}>
        <TypeBox
          title="Upload"
          badgeCount={2}
          icon={UploadIcon}
          onSelect={() => setType('upload')}
          isSelected={type === 'Upload'}
        />
        <TypeBox
          title="Verify"
          badgeCount={0}
          icon={VerifyIcon}
          onSelect={() => setType('verify')}
          isSelected={type === 'Verify'}
        />
        <TypeBox
          title="Annotate"
          badgeCount={0}
          icon={AnnotateIcon}
          onSelect={() => setType('annotation')}
          isSelected={type === 'Annotate'}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}>
        {filters.map((item) => (
          <FilterBox
            title={item}
            onSelect={setFilter}
            isSelected={filter === item}
          />
        ))}
      </ScrollView>
      <MissionListView status={'ready_to_start'} type={type} {...props} />
    </View>
  );
};

export default BrowseMissions;