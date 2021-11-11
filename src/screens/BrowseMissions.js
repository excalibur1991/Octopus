import React, {useState} from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import {theme} from '../services/Common/theme';
import {styles} from '../styles/browsemissions';
import Ripple from '../components/Ripple';
import LinearGradient from 'react-native-linear-gradient';

const UploadIcon = require('../assets/mission_upload.png');
const AnnotateIcon = require('../assets/mission_annotate.png');
const VerifyIcon = require('../assets/mission_verify.png');
const UploadMission = require('../assets/mission_upload_test.png');
const VerificationMission = require('../assets/mission_verification_test.png');
const AnnotationMission = require('../assets/mission_annotation_test.png');

const filters = ['Nature', 'Popular', 'Scenery & Views', 'Popular'];

const missions = [
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
    type: 'verification',
    cover: VerificationMission,
    coverTitle: 'Verification     Lv.1',
    title: 'Company Name - Butterfly',
    description: 'Description Text Here',
  },
  {
    value: 2.1,
    type: 'annotation',
    cover: AnnotationMission,
    coverTitle: 'Annotation     Lv.1',
    title: 'Company Name - Butterfly',
    description: 'Description Text Here',
  },
];

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
            : type === 'verification'
            ? styles.verificationCoverTitle
            : type === 'annotation'
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

const BrowseMissions = ({navigation}) => {
  const [type, setType] = useState('Upload');
  const [filter, setFilter] = useState(filters[0]);

  return (
    <View style={styles.container}>
      <View style={styles.typeContainer}>
        <TypeBox
          title="Upload"
          badgeCount={2}
          icon={UploadIcon}
          onSelect={setType}
          isSelected={type === 'Upload'}
        />
        <TypeBox
          title="Verify"
          badgeCount={0}
          icon={VerifyIcon}
          onSelect={setType}
          isSelected={type === 'Verify'}
        />
        <TypeBox
          title="Annotate"
          badgeCount={0}
          icon={AnnotateIcon}
          onSelect={setType}
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
      <ScrollView contentContainerStyle={styles.missionCardsContainer}>
        {missions.map((mission) => (
          <MissionCard
            type={mission.type}
            cover={mission.cover}
            title={mission.title}
            value={mission.value}
            coverTitle={mission.coverTitle}
            description={mission.description}
            onPress={() => navigation.navigate('ImageUploadMission')}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default BrowseMissions;
