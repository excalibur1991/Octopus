import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {theme} from '../services/Common/theme';
import {styles} from '../styles/mymissions';
import Ripple from '../components/Ripple';
import LinearGradient from 'react-native-linear-gradient';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const UploadMission = require('../assets/image_upload_mission_test.png');
const CompanyIcon = require('../assets/company_icon.png');

const InfoModal = ({open = false, onClose = () => {}}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Modal transparent visible={open} statusBarTranslucent animationType="fade">
      <View style={styles.infoModalContainer}>
        <View style={styles.infoModalContentContainer}>
          <View style={styles.header}>
            <FontAwesome5Icon
              size={42}
              name="list-alt"
              color={theme.COLORS.WHITE}
              style={styles.buttonIcon}
            />
            <Text style={styles.headerTitle}>About Mission</Text>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            nestedScrollEnabled
            onScroll={(e) => {
              const index = Math.round(
                (e.nativeEvent.contentOffset.x /
                  Dimensions.get('screen').width) *
                  0.9,
              );
              setCurrentIndex(index);
            }}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.infoContainerItems}>
              <View style={styles.infoContainerItem}>
                <Text style={styles.infoContentItemTitle}>Title1</Text>
                <Text style={styles.infoContentItemDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean et tellus justo. Sed nec sodales est. Nunc venenatis
                  tellus at leo posuere, vitae interdum mi consequat.
                  Pellentesque nec lacus
                </Text>
              </View>
              <View style={styles.infoContainerItem}>
                <Text style={styles.infoContentItemTitle}>Rewards</Text>
                <Text style={styles.infoContentItemDescription}>
                  lacinia, congue sapien quis, dapibus Duis et molestie
                  ligula,nec maximus erat. Donec dapibus, justo sed viverra
                  sagittis, eros sapien consequat nunc, Duis et molestie
                  ligula,nec maximus erat. Donec dapibus, justo sed viverra.
                </Text>
              </View>
            </View>
            <View style={styles.infoContainerItems}>
              <View style={styles.infoContainerItem}>
                <Text style={styles.infoContentItemTitle}>Requirements</Text>
                <Text style={styles.infoContentItemDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean et tellus justo. Sed nec sodales est. Nunc venenatis
                  tellus at leo posuere, vitae interdum mi consequat.
                  Pellentesque nec lacus
                </Text>
              </View>
              <View style={styles.infoContainerItem}>
                <Text style={styles.infoContentItemTitle}>Rewards</Text>
                <Text style={styles.infoContentItemDescription}>
                  lacinia, congue sapien quis, dapibus Duis et molestie
                  ligula,nec maximus erat. Donec dapibus, justo sed viverra
                  sagittis, eros sapien consequat nunc, Duis et molestie
                  ligula,nec maximus erat. Donec dapibus, justo sed viverra.
                </Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <View style={styles.dots}>
              {Array.from(Array(2).keys()).map((_, index) => (
                <Ripple
                  key={index}
                  outerStyle={
                    currentIndex === index
                      ? styles.dotOuter
                      : styles.dotOuterActive
                  }
                  innerStyle={styles.dotInner}
                />
              ))}
            </View>
            <LinearGradient
              end={{x: 1, y: 0}}
              start={{x: 0.15, y: 0}}
              colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}
              style={styles.modalButtonOuter}>
              <Ripple
                onPress={onClose}
                outerStyle={styles.radius30}
                innerStyle={styles.modalButtonInner}>
                <Text
                  style={{
                    ...styles.itemTitle,
                    color: theme.COLORS.WHITE,
                  }}>
                  Got It
                </Text>
              </Ripple>
            </LinearGradient>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const RadioButton = ({checked, onCheckChange}) => {
  return (
    <Ripple
      outerStyle={styles.radioButtonOuter}
      innerStyle={styles.radioButton}
      onPress={() => onCheckChange(!checked)}>
      {checked && (
        <LinearGradient
          end={{x: 1, y: 0}}
          start={{x: 0.15, y: 0}}
          style={styles.radioButtonInner}
          colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}
        />
      )}
    </Ripple>
  );
};

const TCModal = ({open = false, onClose = () => {}}) => {
  return (
    <Modal
      transparent
      visible={open}
      statusBarTranslucent
      animationType="slide">
      <View style={styles.tcModalContainer}>
        <View style={styles.tcModalContentContainer}>
          <Text style={styles.tcHeaderTitle}>Terms &amp; Conditions</Text>
          <View style={styles.mainDivider} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tcContainerItems}>
            <View style={styles.tcContainerItem}>
              <Text style={styles.tcContentItemTitle}>
                Vivamus pulvinar neque
              </Text>
              <Text style={styles.tcContentItemDescription}>
                Lorem ipsum dolor sit amet, consectetu r adipiscing elit. Aenean
                et tellus justo. Sed nec sodales est. Nunc venenatis tellus at
                leo posuere, vitae interdum mi consequat. Pellentesque nec lacus
                Lorem ipsum dolor sit amet, consectetu r adipiscing elit. Aenean
                et tellus justo. Sed nec sodales est. Nunc venenatis tellus at
                leo posuere, vitae interdum mi consequat. Pellentesque nec lacus
                Lorem ipsum dolor sit amet, consectetu r adipiscing elit. Aenean
                et tellus justo. Sed nec sodales est. Nunc venenatis tellus at
                leo posuere, vitae interdum mi consequat. Pellentesque nec lacus
              </Text>
            </View>
            <View style={styles.tcContainerItem}>
              <Text style={styles.tcContentItemTitle}>
                Vestibulum ante ipsum
              </Text>
              <Text style={styles.tcContentItemDescription}>
                lacinia, congue sapien quis, dapibus Duis et molestie ligula,nec
                maximus erat. Donec dapibus, justo sed viverra sagittis, eros
                sapien consequat nunc, Duis et molestie ligula,nec maximus erat.
                Donec dapibus, justo sed viverra . Lorem ipsum dolor sit amet,
                consectetu r adipiscing elit. Aenean et tellus justo. Sed nec
                sodales est. Nunc venenatis tellus at leo posuere, vitae
                interdum mi consequat. Pellentesque nec lacus
              </Text>
            </View>
          </ScrollView>
          <LinearGradient
            colors={['transparent', theme.COLORS.BLACK]}
            style={styles.tcCloseButtonContainer}>
            <Ripple
              onPress={onClose}
              outerStyle={styles.radius30}
              innerStyle={styles.tcCloseButton}>
              <AntIcon size={23} name="close" color={theme.COLORS.WHITE} />
            </Ripple>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

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
  const [missions, setMissions] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Tab
          count={0}
          setTab={setTab}
          value="Ongoing"
          title="Ongoing"
          isSelected={tab === 'Ongoing'}
        />
        <Tab
          count={5}
          setTab={setTab}
          value="Completed"
          title="Completed"
          isSelected={tab === 'Completed'}
        />
      </View>
      {missions && missions.length > 0 ? (
        <ScrollView
          style={styles.missionCards}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.companyInfoContentContainer}>
          <Ripple
            outerStyle={styles.radius30}
            innerStyle={styles.missionCard}
            onPress={() => {}}>
            <Text style={styles.emptyTitle}>OOps, its empty here!</Text>
          </Ripple>
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
