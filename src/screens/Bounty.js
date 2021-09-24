import {
    View,
    StyleSheet,
    Text,
    Linking,
    Dimensions,
    VirtualizedList,
    useNavigation
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import {theme} from '../services/Common/theme';
import {withTranslation} from 'react-i18next';
import HTML from 'react-native-render-html';

import MultiSelect from '../components/Multiselect'



const Bounty = ({navigation, t}) => {

    const [, dispatch] = useStateValue();
    const [listView, setListView] = useState(null);
    const [bountyPlaceholder, setBountyPlaceholder] = useState("Bounties");
    const [selectedBounties, setSelectedBounties] = useState([]);



    const bounty_tags = [
        {
            tag: 'header',
            content: t('bountyTag.mainHeader.content')
        },
        {
            tag: 'Information',
            header: t('bountyTag.Information.header'),
            content: t('bountyTag.Information.content')
        },
        {
            tag: 'Anonymization Bounty',
            header: t('bountyTag.AnonymizationBounty.header'),
            content: t('bountyTag.AnonymizationBounty.content')
        },
        {
            tag: 'Traffic Signs Bounty',
            header: t('bountyTag.TrafficSignsBounty.header'),
            content: t('bountyTag.TrafficSignsBounty.content')
        },
        {
            tag: 'Food Bounty',
            header: t('bountyTag.FoodBounty.header'),
            content: t('bountyTag.FoodBounty.content')
        },
        {
            tag: 'project.bb Bounty(Cigarette Butts)',
            header: t('bountyTag.ProjectBBBounty.header'),
            content:t('bountyTag.ProjectBBBounty.content')
        },
        {
            tag: 'NFT + Art Bounty(photos of NFTs + Art)',
            header: t('bountyTag.NFTArtBounty.header'),
            content: t('bountyTag.NFTArtBounty.content')
        },
        {
            tag: 'Optical Character Recognition Bounty (OCR)',
            header: t('bountyTag.OpticalCharacterRecognitionBounty.header'),
            content: t('bountyTag.OpticalCharacterRecognitionBounty.content')
        },
        {
            tag: 'Meme Bounty',
            header: t('bountyTag.MemeBounty.header'),
            content: t('bountyTag.MemeBounty.content')
        },
        {
            tag: 'Products Bounty',
            header: t('bountyTag.ProductsBounty.header'),
            content: t('bountyTag.ProductsBounty.content')
        }
    ];


    const handleBountySelection = (items)=>{
        var index  = 0;
        for(var i = 0; i < bounty_tags.length; i++){
            if(bounty_tags[i].tag === items[0]){
                index = i;
                break;
            }
        }
        listView.scrollToIndex({index: index});
        setSelectedBounties(items);
      };

    useEffect(()=>{

    }, []);

    const classesStyles = {
        headerContent: {
            textAlign: 'center'
        }
    };
      
    const tagsStyles = {
        h1: {
            color: '#6C6C6C',
            textAlign: 'center',
            marginBottom: 10,
        },
        h4: {
            color: '#1b1d1e',
            fontSize: 16,
        },
        img: {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 20,
            width: Dimensions.get('window').width * .75,
            backgroundColor: 'red'
        },
        label: {
            color: '#41474E',
        },
        b: {
            color: '#000000'
        },
        a: {
            color: '#ff4092'
        },
        p: {
            textAlign: 'justify',
            color: '#4a4a4a',
        }
    };

    

    const renderersProps = {
        a: {
          onPress(event, url, htmlAttribs, target) {
            // Do stuff
            if(url.indexOf('/image_categorization') != -1){
                //const navigation = useNavigation();
                navigation.navigate('ImageCategorization');
            }else{
                Linking.openURL(url)
            }
          }
        }
      }

     
    return (
        <View style={styles.container}>
            
            <VirtualizedList 
            showsVerticalScrollIndicator={false}
            ref={(view)=>{setListView(view)}}
            data={bounty_tags}
            keyExtractor={(item, index) => index}
            renderItem={(item ) => {
                    if(item.item.tag == 'header'){
                        return (
                            <HTML 
                            source={{html: item.item.content}} 
                            imagesMaxWidth={Dimensions.get('window').width * .9 } 
                            staticContentMaxWidth={Dimensions.get('window').width * .9 }
                            tagsStyles={tagsStyles}
                            classesStyles={classesStyles}
                            renderersProps={renderersProps}
                            
                        />
                        )
                    }else{
                        return (
                            <>
                            <View
                            style={{
                                borderTopLeftRadius: 15,
                                borderTopRightRadius: 15,
                                backgroundColor: theme.SCREEN_BACK_COLOR_2,
                                paddingHorizontal: 20,
                                marginTop: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            >
                                <HTML 
                                    source={{html: item.item.header}} 
                                    imagesMaxWidth={Dimensions.get('window').width * .9 } 
                                    staticContentMaxWidth={Dimensions.get('window').width * .9 }
                                    tagsStyles={tagsStyles}
                                    classesStyles={classesStyles}
                                    renderersProps={renderersProps}
                                    contentWidth={Dimensions.get('window').width * .9}
                                />
                            </View>
                            <View 
                            style={{
                                backgroundColor: '#6C6C6C',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                            }}>
                                <HTML 
                                    source={{html: item.item.content}} 
                                    imagesMaxWidth={Dimensions.get('window').width * .9 } 
                                    staticContentMaxWidth={Dimensions.get('window').width * .9 }
                                    tagsStyles={tagsStyles}
                                    classesStyles={classesStyles}
                                    renderersProps={renderersProps}
                                />
                            </View>
                        </>
                        )
                    }

            }}
            getItem={(data, index)=>(data[index])}
            getItemCount={()=>bounty_tags.length}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      marginTop: '2%',
      paddingTop: '5%',
      paddingHorizontal: 25,
      alignItems: 'center',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: theme.SCREEN_BACK_COLOR_1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold'

    },
    column: {
        width: '100%', 
         flex: 1,
         height: 100
    },
    headerLink: {
        color:'#ff4092'
    },
    bodyLink: {
        color:'#ff4092'
    },
    styleDropdownMenuSubsection: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DADADA',
        paddingLeft: 10
      },
      styleInputGroup: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DADADA',
        paddingLeft: 10
      },
});


export default withTranslation()(Bounty);