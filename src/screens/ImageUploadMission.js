import React, {useState} from 'react';
import {Text, View, ScrollView, Image, Modal, Dimensions} from 'react-native';
import {theme} from '../services/Common/theme';
import {styles} from '../styles/imageuploadmission';
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
                  style={currentIndex === index ? styles.dot : styles.dotActive}
                />
              ))}
            </View>
            <LinearGradient
              end={{x: 1, y: 0}}
              start={{x: 0.15, y: 0}}
              colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}
              style={styles.modalButtonGradient}>
              <Ripple onPress={onClose} style={styles.modalButton}>
                <Text style={styles.buttonText}>Got It</Text>
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
    <Ripple style={styles.radioButton} onPress={() => onCheckChange(!checked)}>
      {checked && (
        <LinearGradient
          end={{x: 1, y: 0}}
          start={{x: 0.15, y: 0}}
          style={styles.radioButtonDot}
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
            <Ripple onPress={onClose} style={styles.tcCloseButton}>
              <AntIcon size={23} name="close" color={theme.COLORS.WHITE} />
            </Ripple>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const ImageUploadMission = ({navigation}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showTCButton, setShowTCButton] = useState(false);
  const [tcAgreed, setTCAgreed] = useState(false);
  const [showTC, setShowTC] = useState(false);

  return (
    <>
      <InfoModal open={showInfo} onClose={() => setShowInfo(false)} />
      <TCModal open={showTC} onClose={() => setShowTC(false)} />
      <View style={styles.container}>
        <Image
          resizeMode="stretch"
          source={UploadMission}
          style={styles.cardCover}
        />
        <View style={styles.countdownContainer}>
          <AntIcon name="clockcircleo" size={22} color={theme.COLORS.WHITE} />
          <View style={styles.countdownItem}>
            <Text style={styles.countdownLabel}>Days</Text>
            <Text style={styles.countdownvalue}>03</Text>
          </View>
          <View style={styles.countdownItem}>
            <Text style={styles.countdownLabel}>Hours</Text>
            <Text style={styles.countdownvalue}>16</Text>
          </View>
          <View style={styles.countdownItem}>
            <Text style={styles.countdownLabel}>Minutes</Text>
            <Text style={styles.countdownvalue}>59</Text>
          </View>
        </View>
        <ScrollView
          style={styles.companyInfoContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.companyInfoContentContainer}>
          {!showTCButton ? (
            <>
              <View style={styles.info}>
                <Image
                  resizeMode="stretch"
                  source={CompanyIcon}
                  style={styles.infoImage}
                />
                <View>
                  <Text style={styles.compantTitle}>Company Name Here</Text>
                  <Text style={styles.compantTitle}>Butterfly Images</Text>
                  <View style={styles.tags}>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>Common</Text>
                    </View>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>Common2</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.mainDivider} />
              <View style={styles.rewardContainer}>
                <Text style={styles.rewardTitle}>Rewards</Text>
                <View style={styles.rewardItem}>
                  <View style={styles.exp}>
                    <Text style={styles.expText}>Exp</Text>
                  </View>
                  <Text style={styles.x}>x</Text>
                  <Text style={styles.rewardTitle}>1000</Text>
                </View>
                <View style={styles.rewardItem}>
                  <View style={styles.rewardSign}>
                    <Text style={styles.rewardSignText}>$</Text>
                  </View>
                  <Text style={styles.x}>x</Text>
                  <Text style={styles.rewardTitle}>1.21</Text>
                </View>
              </View>
              <View style={styles.mainDivider} />
              <View style={styles.button}>
                <Ripple
                  onPress={() => setShowInfo(true)}
                  style={styles.buttonOuter}>
                  <FontAwesome5Icon
                    size={24}
                    name="list-alt"
                    color={theme.COLORS.WHITE}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>About Mission</Text>
                </Ripple>
              </View>
              <View style={styles.button}>
                <LinearGradient
                  end={{x: 1, y: 0}}
                  start={{x: 0.15, y: 0}}
                  colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}
                  style={styles.radius30}>
                  <Ripple
                    onPress={() => setShowTCButton(true)}
                    style={styles.gradientButtonInner}>
                    <Text style={styles.buttonText}>Claim Mission</Text>
                  </Ripple>
                </LinearGradient>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.tcText}>Terms &amp; Conditions</Text>
              <View style={styles.mainDivider} />
              <View style={styles.actionContainer}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton checked={tcAgreed} onCheckChange={setTCAgreed} />
                  <Text
                    style={styles.radioButtonText}
                    onPress={() => setTCAgreed(!tcAgreed)}>
                    {'By checking this box I agree to\nData Union’s '}
                    <Text
                      onPress={() => setShowTC(true)}
                      style={styles.radioButtonTextLink}>
                      {'Terms & Conditions'}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.button}>
                <LinearGradient
                  end={{x: 1, y: 0}}
                  start={{x: 0.15, y: 0}}
                  colors={[
                    theme.COLORS.DARK_PURPLE_1,
                    theme.COLORS.DARK_BLUE_1,
                  ]}
                  style={styles.radius30}>
                  <Ripple
                    disabled={!tcAgreed}
                    onPress={() => navigation.navigate('MyMissions')}
                    style={
                      tcAgreed ? styles.gradientButtonInner : styles.buttonOuter
                    }>
                    <Text style={styles.buttonText}>Continue</Text>
                  </Ripple>
                </LinearGradient>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default ImageUploadMission;
