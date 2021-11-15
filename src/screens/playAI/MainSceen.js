import React, {useState} from "react";

import {
    ImageBackground,    
    Image,
    View,
    Text
} from 'react-native';
import { Avatar, Chip, Divider, ListItem } from "react-native-elements";

import { CommonStyles } from "../../services/Common/styles";
import RoundButton from "../../components/RoundButton";
import { NavigationContainer } from "@react-navigation/native";
import Tag from "../../components/Tag";
import CircleCheckBox from 'react-native-circle-checkbox';
import { Mission } from "./Mission";

export const MainScreen = ({navigation}) => {

    const [curPage, setCurPage] = useState('');
    const [tocChecked, setTocChecked] = useState(false);
 
    return (
        <>
        {curPage === 'mission' ? (
            <Mission />
        ) : (
            <View style={{
                flex: 1, 
                width: '100%', 
                height: '100%',
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
                
                <View style={{
                    backgroundColor: '#121212',
                    marginTop: -30,
                    flex: 0.5,
                    width: '100%',
                    bottom: 0,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                }}>
    
                    <View style={{
                        paddingVertical: 40,
                        paddingHorizontal: 34,
                        justifyContent: 'center',
                    }}>
                        {(curPage == 'toc') ? (
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
                        ) : (
                            <ListItem containerStyle={{
                                backgroundColor: 'transparent',
                                padding: 0,
                            }}>
                                <Avatar
                                    style={{width: 80, height: 80}}
                                    //size={'large'}
                                    title={'abc'}
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
                                        <Tag title={'common2'} isGradient={true} />
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                            
                        )}
                    </View>
                    <Divider />
                    <View style={{
                        paddingVertical: 40,
                        paddingHorizontal: 34,
                    }}>
                    {curPage === '' && (
                        <>
                        <RoundButton
                            title={'ABOUT MISSION'}
                            type={'secondary'}
                            icon={
                                <Image source={require('../../assets/ico_list.png')} />}
                            onPress={()=>{navigation.navigate('Mission')}}
                        />
                        <RoundButton
                            title={'CLAIM MISSION'}
                            type={'primary'}
                            onPress={()=>{
                            //    navigation.navigate('')
                                setCurPage('toc');
                            }}
                        />
                        </>
                    )}
                    {curPage === 'toc' && (
                        <>
                        <CircleCheckBox 
                            outerColor='#61636E'
                            filterColor='#25262B'
                            innerColor='#61636E'
                            styleLabel={{color: '#FFF'}}
                            label={'BY CHECKING THIS BOX I AGREE TO DATA UNION\'S TERMS & CONDITIONS'}
                            checked={tocChecked}
                            onToggle={()=>{
                                setTocChecked(!tocChecked);
                            }}
                        />
                        <View style={{height: 44}}></View>
                        <RoundButton
                            title={'CONTINUE'}
                            disabled={!tocChecked}
                            type={tocChecked ? 'primary': 'secondary'}
                            onPress={()=>{
                                //navigation.navigate('Mission');
                                setCurPage('mission');
                            }}
                        />
                        </>
                    )}
                        
                    </View>
                </View>
            </View>
        )}
        </>
    );
};