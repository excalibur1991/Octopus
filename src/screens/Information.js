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
import { AboutMissionModal } from '../components/AboutMissionModal';

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


const Information = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [, dispatch] = useStateValue();

  return (
    <>
      <AboutMissionModal open={open} onClose={() => setOpen(false)} />
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
                  navigation.navigate('LandingPageWalkthrough');
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
