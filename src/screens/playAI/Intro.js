import React, {useState} from "react";

import {
    ImageBackground,    
    Image,
    View,
    Text,
    Dimensions
} from 'react-native';
import { Avatar, Chip, Divider, ListItem } from "react-native-elements";
import {useStateValue} from '../../services/State/State';
import {actions} from '../../services/State/Reducer';
import {getDataUsageFlag, setDataUsageFlag} from '../../services/DataManager';
import { CommonStyles } from "../../services/Common/styles";
import RoundButton from "../../components/RoundButton";
import { NavigationContainer } from "@react-navigation/native";
import Tag from "../../components/Tag";
import CircleCheckBox from 'react-native-circle-checkbox';
import BottomSheet from '../../components/BottomSheet';
import RNFadedScrollView from 'rn-faded-scrollview';
import {styles} from '../../styles/intro';
import {withTranslation} from 'react-i18next';
import { theme, dark_theme } from "../../services/Common/theme";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ripple from "../../components/Ripple";
const Intro = (props)=>{
    const {t, navigation, onNext} = props || {};
    const [curPage, setCurPage] = useState('');
    const [tocChecked, setTocChecked] = useState(false);

    const [{dataUsageSettings }, dispatch] = useStateValue();


    const TocSheetHeader = (props) => {
        return (
            <ListItem containerStyle={{
                backgroundColor: 'transparent',
                padding: 0,
            }}>
                <ListItem.Content style={{
                    alignItems: 'center'
                    }}>
                    <ListItem.Title
                    style={{...CommonStyles.large_bold_text, color: '#FFF'}}
                    >{'TERMS & CONDITIONS'}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    }

    const IntroSheetHeader = (props) => {
        return (
            <ListItem containerStyle={{
                backgroundColor: 'transparent',
                padding: 0,
            }}>
                <Avatar
                    style={{width: 80, height: 80}}
                    //size={'large'}
                    source={require('../../assets/companyIcon.png')}
                />
                <ListItem.Content>
                    <ListItem.Title
                    style={{...CommonStyles.large_bold_text, color: '#FFF'}}
                    >{'Company Name Here\nButterfly Images'}</ListItem.Title>
                    <ListItem.Subtitle style={{
                        paddingTop: 10,
                        width: '100%', 
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 8,
                        justifyContent: 'center',
                    }}>
                        <Tag title={'PLAYAI'} isGradient={true} />
                        <View style={{width: 10}}></View>
                        <Tag title={'common2'} isGradient={true} />
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }

    const TocCheckSheetContent = (props) => {
        return (
            <>
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                <CircleCheckBox 
                    style={{marginHorizontal: 10}}
                    outerColor='#61636E'
                    filterColor='#25262B'
                    innerColor='#61636E'
                    styleLabel={{color: '#FFF'}}
                    checked={dataUsageSettings}
                    onToggle={()=>{
                        dispatch({
                            type: actions.SET_DATAUSAGE,
                            dataUsageSettings: !dataUsageSettings
                          });
                        //setTocChecked(!tocChecked);
                    }}
                />
                <Text style={{color: '#FFF', marginLeft: 10}}>BY CHECKING THIS BOX I AGREE TO DATA UNION'S <Text onPress={()=>{
                    setCurPage('toc_content');
                }} style={{ textDecorationLine:'underline', color: '#3B6BD0' }} >TERMS & CONDITIONS</Text>
                </Text>
                </View>
                <View style={{height: 44}}></View>
                <RoundButton
                    title={'CONTINUE'}
                    disabled={!dataUsageSettings}
                    type={dataUsageSettings ? 'primary': 'secondary'}
                    onPress={()=>{
                        if(dataUsageSettings){
                            setDataUsageFlag();
                            onNext();
                        }
                    }}
                />
            </>
        );
    }

    const IntroSheetContent = (props) => {
        return (
            <View>
                <RoundButton
                    title={'ABOUT MISSION'}
                    type={'secondary'}
                    icon={<Image source={require('../../assets/ico_list.png')} />}
                    onPress={()=>{navigation.navigate('Mission')}}
                />
                <RoundButton
                    title={'CLAIM MISSION'}
                    type={'primary'}
                    onPress={()=>{
                        if(dataUsageSettings){
                            onNext();
                        }
                        else {
                            setCurPage('toc');
                        }
                    }}
                />
            </View>
        );
    }

    const TocSheetContent = (props) => {
        const {t} = props || {};
        return (
            <>
                <RNFadedScrollView 
                    fadeSize={100}
                    height={Dimensions.get('window').height * .9 * .7}
                    fadeColors={['rgba(18, 18, 18, 0.18)', 'rgba(18, 18, 18, 0.6)', 'rgba(18, 18, 18, 0.9)']}
                    horizontal={false}
                    allowEndFade={true}
                    flexDirection={'column'}
                    > 
                    <View style={{paddingBottom: 40}}>
                        <Text style={styles.body}>
                            {t('tos.body')}
                        </Text>
                        <Text style={styles.contactHeader}>
                            {t('tos.contactHeader')}
                        </Text>
                        <Text onPress={() => { Linking.openURL('mailto:copyright@dataunion.app') }}
                            style={styles.contactMail}>
                            {t('tos.copyrightMail')}
                        </Text>

                    </View>
                </RNFadedScrollView>
                <View style={{width: '100%', alignItems:'center', marginTop: -20}}>

                    <Ripple
                        onPress={() => setCurPage('toc')}
                        outerStyle={{
                            width: 44,
                            height: 44,
                            borderRadius: 22,
                            alignItems:'center',
                            backgroundColor: dark_theme.COLORS.BG_GREY
                        }}
                        innerStyle={{
                            padding: 10
                        }}>
                            <MaterialIcon
                            name="close"
                            size={24}
                            color={theme.COLORS.BOTTOM_TAB_NOT_ICON_FOCUSED}
                        />
                    </Ripple>
                </View>

            </>
        );
    }

    return (
        <View style={{
            flex: 1, 
            width: '100%', 
            height: '100%',
            backgroundColor: '#121212'
            }}>
                <View style={{
                    width: '100%',
                    flex: 0.5,
                }}>
                    <ImageBackground
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        source={require('../../assets/bg_playai.png')}>
                    </ImageBackground>
                </View>
            <BottomSheet 
                panelHeight={(curPage === 'toc_content') ? Dimensions.get('window').height * .9 : Dimensions.get('window').height * .6}
            >
            <View style={{
                    paddingVertical: 40,
                    paddingHorizontal: 34,
                    justifyContent: 'center',
                }}
                >
                {(curPage === '') && (
                    <IntroSheetHeader {...props} />
                )}
                {(curPage === 'toc') && (
                    <TocSheetHeader {...props} />
                )}
                {(curPage === 'toc_content') && (
                    <TocSheetHeader {...props} />
                )}
                </View>
                <Divider />
                <View style={{
                    paddingVertical: 40,
                    paddingHorizontal: 34,
                }}>
                {curPage === '' && (
                    <IntroSheetContent {...props} />
                )}
                {curPage === 'toc' && (
                    <TocCheckSheetContent {...props} />
                )}
                {curPage === 'toc_content' && (
                    <TocSheetContent {...props} />
                )}
                    
                </View>
            </BottomSheet>
           
        </View>
    );
}

export default withTranslation()(Intro);