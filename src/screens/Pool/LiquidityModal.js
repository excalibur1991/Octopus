import React, { useState } from "react";
import {Text, View, ScrollView, Image, Modal, Dimensions} from 'react-native';
import Ripple from "../../components/Ripple";
import LinearGradient from 'react-native-linear-gradient';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const VerifyMission = require('../../assets/image_verify_mission_test.png');
const CompanyIcon = require('../../assets/company_icon.png');
import {actions} from '../../services/State/Reducer';
import {useStateValue} from '../../services/State/State';
import {styles} from '../../styles/imageannotatemission';
import { theme } from "../../services/Common/theme";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from "react-native-gesture-handler";


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
  
  export const LiquidityModal = (amount) => {
    const [showInfo, setShowInfo] = useState(false);
    const [showTCButton, setShowTCButton] = useState(false);
    const [tcAgreed, setTCAgreed] = useState(false);
    const [showTC, setShowTC] = useState(false);
    const [, dispatch] = useStateValue();
    const [coin, setCoin] = useState('OCEAN')
  
    return (
      <>
        {/* <InfoModal open={showInfo} onClose={() => setShowInfo(false)} /> */}
        {/* <TCModal open={showTC} onClose={() => setShowTC(false)} /> */}
        <View style={styles.container}>
          <ScrollView
            style={styles.companyInfoContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.companyInfoContentContainer}>
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
                <LinearGradient
                    end={{x: 1, y: 0}}
                    start={{x: 0.15, y: 0}}
                    colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}
                    style={styles.modalButtonGradient}>
              <Ripple
                onPress={() => {
                dispatch({
                  type: actions.SET_ALERT_SETTINGS,
                  alertSettings: {
                    show: true,
                    type: 'warn',
                    message: `Authorize this site to access your ${coin} `,                
                    confirmText: 'Authorize',
                    title: 'Confirm Transaction',
                    showConfirmButton: true,
                    showCancelButton: true,
                    onConfirmPressed: () => alert(amount.amount),
                    onCancelPressed: () => {},
                  },
                  });
                }}
               style={styles.modalButton}>
              <Text style={styles.buttonText}>Continue</Text>
              <MaterialIcon
                size={20}
                name="double-arrow"
                color={theme.COLORS.WHITE}
                style={styles.buttonIconRight}
              />
              </Ripple>
               </LinearGradient>

            <TouchableOpacity
            
            >
                
            {/* <Text style={styles.buttonText}>UnStake {amount} {coin}</Text>  */}
            </TouchableOpacity>    
            
    
          </ScrollView>
        </View>
      </>
    );
  };
  