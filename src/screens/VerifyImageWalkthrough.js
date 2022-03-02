import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  TextInput,
  BackHandler
} from 'react-native';
import {useStateValue} from '../services/State/State';
import {Chip} from 'react-native-paper';
import SwipeCards from 'react-native-swipe-cards';
import {theme} from '../services/Common/theme';
import * as Progress from 'react-native-progress';
import MultiSelectDropDown from '../components/MultiSelectDropDown';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {actions} from '../services/State/Reducer';


const VerifyImageWalkthrough = ({navigation}) => {
  const [{showVerifyImagePageWalkthrough, walkthroughCurrentStep}, dispatch] =
    useStateValue();

  const tagsWithIrrelevantTag = [
    'Avocado',
    'Fruit',
    'Cereal',
    'Honey',
    'Nightlife',
    'Breakfast',
    'Berry',
    'Spoon',
  ];

  const tagsWithRrelevantTag = [
    'Avocado',
    'Fruit',
    'Cereal',
    'Honey',
    'Breakfast',
    'Berry',
    'Spoon',
  ];

  const tagsWithNewTag = [
    'Avocado',
    'Fruit',
    'Cereal',
    'Honey',
    'Breakfast',
    'Berry',
    'Spoon',
    'Cherries',
  ];

  const highlightIrrelevantTag =
    showVerifyImagePageWalkthrough &&
    walkthroughCurrentStep &&
    walkthroughCurrentStep === 4;

  const showTagInput =
    showVerifyImagePageWalkthrough &&
    walkthroughCurrentStep &&
    walkthroughCurrentStep === 7;

  const tags =
    ((showVerifyImagePageWalkthrough &&
    (walkthroughCurrentStep || walkthroughCurrentStep === 0) &&
    walkthroughCurrentStep === 8
      ? tagsWithNewTag
      : walkthroughCurrentStep > 4
      ? tagsWithRrelevantTag
      : tagsWithIrrelevantTag): []) || tagsWithIrrelevantTag;

  const IRRELEVANT_TAG_INDEX = 4;

  const handleBackButtonClick = () => {
    dispatch({
      type: actions.EXIT_WALKTHROUGH,
    });

    navigation.goBack();
  
  }

  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Progress.Bar
          height={8}
          width={150}
          progress={0.2}
          borderWidth={0}
          color={theme.COLORS.DARK_BLUE}
          unfilledColor={theme.COLORS.MID_GREY}
        />
      </View>
      <View style={styles.swipeContainer}>
        <Image
          resizeMode="stretch"
          style={styles.leftBar}
          source={require('../assets/left.png')}
        />
        <SwipeCards
          cards={['.']}
          renderCard={() => (
            <View style={styles.swipeCard}>
              <Image
                resizeMode="stretch"
                style={styles.swipeCardthumbnail}
                source={require('../assets/verify_walkthrough.png')}
              />
            </View>
          )}
        />
        <Image
          resizeMode="stretch"
          style={styles.rightBar}
          source={require('../assets/right.png')}
        />
      </View>
      <View style={styles.divider} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        {showTagInput ? (
          <TextInput value={'CHERRIES'} style={styles.tagInput} />
        ) : (
          <View style={styles.tagsContainer}>
            <View style={styles.addButtonContainer}>
              <View style={styles.addButton}>
                <AntIcon name="plus" size={18} color={theme.COLORS.WHITE} />
              </View>
            </View>
            {tags &&
              tags.length > 0 &&
              tags.map((tag, index) => (
                <Chip
                  title={tag}
                  textStyle={styles.tagText}
                  style={[
                    styles.tag,
                    {
                      backgroundColor:
                        highlightIrrelevantTag && index === IRRELEVANT_TAG_INDEX
                          ? theme.COLORS.LIGHT_RED_OPACITY_71P
                          : theme.APP_COLOR_2,
                    },
                  ]}>
                  {tag}
                </Chip>
              ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.divider} />
      <View style={styles.actionsContainer}>
        <View style={styles.dropDownContainer}>
          <View style={styles.dropDownBounty}>
            <MultiSelectDropDown
              options={[]}
              placeholder="CHOOSE BOUNTIES"
              textColor={theme.COLORS.WHITE}
              selectedIndices={[]}
              onSelect={() => {}}
              color={theme.COLORS.DARK_BLUE}
            />
          </View>
          <View style={styles.dropDownPii}>
            <MultiSelectDropDown
              options={[]}
              placeholder="PII"
              textColor={theme.COLORS.WHITE}
              selectedIndices={[]}
              onSelect={() => {}}
              color={theme.COLORS.DARK_BLUE}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default VerifyImageWalkthrough;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK_OPACITY_90P,
  },
  progressContainer: {
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeContainer: {
    marginVertical: 15,
    height: Dimensions.get('window').height * 0.35,
  },
  divider: {
    height: 2,
    marginVertical: 1,
    backgroundColor: theme.APP_COLOR_2,
  },
  leftBar: {
    top: 0,
    left: 0,
    bottom: 0,
    height: '100%',
    position: 'absolute',
  },
  rightBar: {
    top: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    position: 'absolute',
  },
  swipeCard: {
    borderRadius: 40,
    overflow: 'hidden',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.35,
    elevation: 1,
  },
  swipeCardthumbnail: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.35,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  scrollContentContainer: {
    paddingBottom: 10,
  },
  tagInput: {
    height: 40,
    width: '30%',
    marginTop: 10,
    color: 'white',
    borderRadius: 50,
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#25262B',
  },
  tagsContainer: {
    marginTop: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDownBounty: {
    width: '70%',
  },
  dropDownPii: {
    width: '25%',
  },
  addButtonContainer: {
    left: Platform.OS === 'ios' ? '4.4%' : '4.7%',
  },
  addButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 30,
    backgroundColor: theme.APP_COLOR_2,
  },
  tag: {
    height: 40,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 30,
    color: theme.COLORS.WHITE,
  },
  tagText: {
    fontSize: 15,
    color: '#ffffff',
    fontFamily: 'Moon-Light',
    textTransform: 'uppercase',
  },
});
