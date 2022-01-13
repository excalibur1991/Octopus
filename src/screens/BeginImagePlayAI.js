import React from 'react';
import Ripple from '../components/Ripple';
import {styles} from '../styles/beginimageplayai';
import {Text, View, Image} from 'react-native';
import {theme} from '../services/Common/theme';
import LinearGradient from 'react-native-linear-gradient';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useStateValue} from '../services/State/State';
import {actions} from '../services/State/Reducer';

const BeginImagePlayAI = ({navigation, route}) => {
  const [, dispatch] = useStateValue();
  const {params} = route || {};
  const {mission = {}} = params || {};
  const {
    type = 'ongoing',
    image,
    level = '',
    title1 = '',
    title2 = '',
    status = 'pending',
    progressTotal = 0,
    progressCompleted = 0,
  } = mission || {};

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image resizeMode="stretch" source={image} style={styles.image} />
        <View style={styles.levelContainer}>
          <View style={styles.levelChip}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title2}</Text>
        <Text style={styles.subTitle}>{title1}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressChip}>
          <Text style={styles.progressText}>{`0/${progressTotal}`}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Lets Begin</Text>
        <Text style={styles.statusDescription}>
          {`You are about to complete\n${progressTotal} images for this mission.`}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.button}>
          <LinearGradient
            end={{x: 1, y: 0}}
            start={{x: 0.15, y: 0}}
            colors={[theme.COLORS.DARK_PURPLE_1, theme.COLORS.DARK_BLUE_1]}
            style={styles.radius30}>
            <Ripple
              style={styles.gradientButtonInner}
              onPress={() => navigation.navigate('PlayAI')}>
              <Text style={styles.buttonText}>Start</Text>
            </Ripple>
          </LinearGradient>
        </View>
        <View style={styles.button}>
          <Ripple
            onPress={() => {
              navigation.navigate('PlayAIImageWalkthrough');
              /*
              setTimeout(
                () =>
                  dispatch({
                    type: actions.SET_SHOW_UPLOAD_IMAGE_WALKTHROUGH,
                  }),
                100,
              );*/
            }}
            style={styles.buttonOuter}>
            <EntypoIcon
              size={24}
              name="video"
              color={theme.COLORS.WHITE}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Tutorial (1 min)</Text>
          </Ripple>
        </View>
      </View>
    </View>
  );
};

export default BeginImagePlayAI;
