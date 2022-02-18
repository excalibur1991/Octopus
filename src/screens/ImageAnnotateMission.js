import React, {useState} from 'react';
import {Text, View, ScrollView, Image, Modal, Dimensions} from 'react-native';
import {theme} from '../services/Common/theme';
import {styles} from '../styles/imageannotatemission';
import Ripple from '../components/Ripple';
import LinearGradient from 'react-native-linear-gradient';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const VerifyMission = require('../assets/image_verify_mission_test.png');
const CompanyIcon = require('../assets/company_icon.png');
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import { TCModal } from '../components/TCModal';
import { AboutMissionModal } from '../components/AboutMissionModal';

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

const ImageAnnotateMission = ({navigation}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showTCButton, setShowTCButton] = useState(false);
  const [tcAgreed, setTCAgreed] = useState(false);
  const [showTC, setShowTC] = useState(false);
  const [, dispatch] = useStateValue();

  return (
    <>
      <AboutMissionModal open={showInfo} onClose={() => setShowInfo(false)} />
      <TCModal open={showTC} onClose={() => setShowTC(false)} />
      <View style={styles.container}>
        <Image
          resizeMode="stretch"
          source={VerifyMission}
          style={styles.cardCover}
        />
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
                    onPress={() => {
                      dispatch({
                        type: actions.SET_ALERT_SETTINGS,
                        alertSettings: {
                          show: true,
                          type: 'success',
                          message: 'Mission has been added to your board.',
                          confirmText: 'Got It',
                          cancelText: 'Got It',
                          title: 'New Mission Accepted!',
                          showCancelButton: true,
                          onCancelPressed: () => {
                            navigation.navigate('MyMissions');
                          },
                        },
                      });
                    }}
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

export default ImageAnnotateMission;
