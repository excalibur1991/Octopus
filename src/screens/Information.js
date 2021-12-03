import React, {useState} from 'react';
import {
  Text,
  FlatList,
  Modal,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {styles} from '../styles/information';
import {withTranslation} from 'react-i18next';
import Ripple from '../components/Ripple';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../services/Common/theme';
import {useStateValue} from '../services/State/State';
import {actions} from '../services/State/Reducer';

const buttons = [
  {title: 'What is Data Union?', action: () => {}},
  {title: 'What is DU Coin?', action: () => {}},
  {title: 'How does this works?', action: () => {}},
  {title: 'How to Collect my earnings?', action: () => {}},
  {title: 'Where does my data go?', action: () => {}},
  {title: 'Is this platform safe?', action: () => {}},
  {
    title: 'App Tutorial Walkthrough',
    action: () => {},
    useGradientColors: true,
  },
];

const InfoModal = ({open = false, onClose = () => {}}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Modal transparent visible={open} statusBarTranslucent animationType="fade">
      <View style={styles.infoModalContainer}>
        <View style={styles.infoModalContentContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>What is Data Union?</Text>
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
              style={styles.buttonOuter}>
              <Ripple onPress={onClose} style={styles.buttonInner}>
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

const Information = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [, dispatch] = useStateValue();

  return (
    <>
      <InfoModal open={open} onClose={() => setOpen(false)} />
      <FlatList
        data={buttons}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item, index}) =>
          !item.useGradientColors ? (
            <View style={styles.listItemOuter}>
              <Ripple
                key={index}
                onPress={() => setOpen(true)}
                style={styles.listItemInner}>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </Ripple>
            </View>
          ) : (
            <LinearGradient
              end={{x: 1, y: 0}}
              start={{x: 0.15, y: 0}}
              colors={[theme.COLORS.LIGHT_PURPLE, theme.COLORS.LIGHT_BLUE]}
              style={styles.listItemOuter}>
              <Ripple
                key={index}
                onPress={() => {
                  navigation.navigate('LandingPage');
                  setTimeout(
                    () =>
                      dispatch({
                        type: actions.SET_SHOW_LANDING_PAGE_WALKTHROUGH,
                      }),
                    100,
                  );
                }}
                style={styles.listItemInner}>
                <Text
                  style={{
                    ...styles.itemTitle,
                    color: theme.COLORS.WHITE,
                  }}>
                  {item.title}
                </Text>
              </Ripple>
            </LinearGradient>
          )
        }
      />
    </>
  );
};

export default withTranslation()(Information);
