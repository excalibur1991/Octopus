/* eslint-disable no-unused-vars */
import {
  View,
  StyleSheet,
  Text,
  Linking,
  Dimensions,
  VirtualizedList,
  useNavigation,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import {theme} from '../services/Common/theme';
import {withTranslation} from 'react-i18next';
import HTML from 'react-native-render-html';
import MultiSelect from '../components/Multiselect';

const Bounty = ({navigation, t}) => {
  const [, dispatch] = useStateValue();
  const [listView, setListView] = useState(null);
  const [bountyPlaceholder, setBountyPlaceholder] = useState('Bounties');
  const [selectedBounties, setSelectedBounties] = useState([]);

  const bounty_tags = [
    {
      tag: 'header',
      content: t('bountyTag.mainHeader.content'),
    },
    {
      tag: 'Information',
      header: t('bountyTag.Information.header'),
      content: t('bountyTag.Information.content'),
    },
    {
      tag: 'Anonymization Bounty',
      header: t('bountyTag.AnonymizationBounty.header'),
      content: t('bountyTag.AnonymizationBounty.content'),
    },
    {
      tag: 'Traffic Signs Bounty',
      header: t('bountyTag.TrafficSignsBounty.header'),
      content: t('bountyTag.TrafficSignsBounty.content'),
    },
    {
      tag: 'Food Bounty',
      header: t('bountyTag.FoodBounty.header'),
      content: t('bountyTag.FoodBounty.content'),
    },
    {
      tag: 'project.bb Bounty(Cigarette Butts)',
      header: t('bountyTag.ProjectBBBounty.header'),
      content: t('bountyTag.ProjectBBBounty.content'),
    },
    {
      tag: 'NFT + Art Bounty(photos of NFTs + Art)',
      header: t('bountyTag.NFTArtBounty.header'),
      content: t('bountyTag.NFTArtBounty.content'),
    },
    {
      tag: 'Optical Character Recognition Bounty (OCR)',
      header: t('bountyTag.OpticalCharacterRecognitionBounty.header'),
      content: t('bountyTag.OpticalCharacterRecognitionBounty.content'),
    },
    {
      tag: 'Meme Bounty',
      header: t('bountyTag.MemeBounty.header'),
      content: t('bountyTag.MemeBounty.content'),
    },
    {
      tag: 'Products Bounty',
      header: t('bountyTag.ProductsBounty.header'),
      content: t('bountyTag.ProductsBounty.content'),
    },
  ];

  const handleBountySelection = (items) => {
    var index = 0;
    for (var i = 0; i < bounty_tags.length; i++) {
      if (bounty_tags[i].tag === items[0]) {
        index = i;
        break;
      }
    }
    listView.scrollToIndex({index: index});
    setSelectedBounties(items);
  };

  useEffect(() => {}, []);

  const classesStyles = {
    headerContent: {
      textAlign: 'center',
    },
  };

  const tagsStyles = {
    h1: {
      color: theme.COLORS.WHITE,
      textAlign: 'center',
      marginBottom: 10,
    },
    h4: {
      color: theme.COLORS.WHITE,
      fontSize: 16,
    },
    img: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20,
      width: Dimensions.get('window').width * 0.75,
      backgroundColor: 'red',
    },
    label: {
      color: '#41474E',
    },
    b: {
      color: theme.COLORS.WHITE,
    },
    a: {
      color: theme.COLORS.LIGHT_RED,
    },
    p: {
      color: theme.COLORS.WHITE,
      textAlign: 'justify',
    },
  };

  const renderersProps = {
    a: {
      onPress(event, url, htmlAttribs, target) {
        // Do stuff
        if (url.indexOf('/image_categorization') !== -1) {
          //const navigation = useNavigation();
          navigation.navigate('ImageCategorization');
        } else {
          Linking.openURL(url);
        }
      },
    },
  };

  return (
    <VirtualizedList
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      ref={(view) => {
        setListView(view);
      }}
      data={bounty_tags}
      keyExtractor={(_, index) => index}
      renderItem={(item) => {
        if (item.item.tag === 'header') {
          return (
            <HTML
              source={{html: item.item.content}}
              imagesMaxWidth={Dimensions.get('window').width * 0.9}
              staticContentMaxWidth={Dimensions.get('window').width * 0.9}
              tagsStyles={tagsStyles}
              classesStyles={classesStyles}
              renderersProps={renderersProps}
            />
          );
        } else {
          return (
            <>
              <View style={styles.headerContainer}>
                <HTML
                  source={{html: item.item.header}}
                  imagesMaxWidth={Dimensions.get('window').width * 0.9}
                  staticContentMaxWidth={Dimensions.get('window').width * 0.9}
                  tagsStyles={tagsStyles}
                  classesStyles={classesStyles}
                  renderersProps={renderersProps}
                  contentWidth={Dimensions.get('window').width * 0.9}
                />
              </View>
              <View style={styles.contentContainer}>
                <HTML
                  source={{html: item.item.content}}
                  imagesMaxWidth={Dimensions.get('window').width * 0.9}
                  staticContentMaxWidth={Dimensions.get('window').width * 0.9}
                  tagsStyles={tagsStyles}
                  classesStyles={classesStyles}
                  renderersProps={renderersProps}
                />
              </View>
            </>
          );
        }
      }}
      getItem={(data, index) => data[index]}
      getItemCount={() => bounty_tags.length}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    marginTop: '2.2%',
    paddingHorizontal: 25,
    backgroundColor: theme.APP_COLOR_2,
  },
  scrollContainer: {
    paddingBottom: '25%',
  },
  headerContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    justifyContent: 'center',
    borderTopRightRadius: 15,
    backgroundColor: theme.COLORS.LIGHT_GREY,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: theme.APP_COLOR_1,
  },
});

export default withTranslation()(Bounty);
