import React from "react";

import {
    ImageBackground,    
    Image,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Avatar, Chip, Divider, ListItem } from "react-native-elements";

import { CommonStyles } from "../../services/Common/styles";
import RoundButton from "../../components/RoundButton";
import { NavigationContainer } from "@react-navigation/native";
import Tag from "../../components/Tag";
import { theme, dark_theme } from "../../services/Common/theme";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ripple from '../../components/Ripple';



const styles = StyleSheet.create({
    AvatarTitle: {

    },
    AvatarSubTitle: {

    }
});


export const MissionComplete = ({navigation}) => {
    return (
        <View style={{
            flex: 1, 
            width: '100%', 
            height: '100%',
            backgroundColor: '#121212',
            paddingTop: 80
            }}>
                <View style={{
                        width: '100%',
                        flex: 0.4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent'
                    }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                    <Avatar
                        title={'aasdf'}
                        rounded={true}
                        size={'large'}
                        title={'abc'}
                        source={require('../../assets/bg_playai.png')}
                    />
                    <Text
                        style={{
                            position: 'absolute',
                            top: 10,
                            color: '#FFF',
                            borderRadius: 20,
                            backgroundColor: '#25262B',
                            paddingVertical: 3,
                            paddingHorizontal: 10,
                            fontSize: 10
                        }}
                    >Lvl 3</Text>
                    </View>
                    <Text style={{...CommonStyles.large_bold_text, color: '#FFF', marginTop: 20 }}>PEOPLE IMAGES</Text>
                    <Text style={{...CommonStyles.normal_text, color: '#FFF', marginTop: 10}}>FACEBOOK</Text>
                    <View style={{
                        marginTop: 20,
                        width: '40%'
                    }}>
                        <Tag
                            isGradient={true}
                            title={'0/1'}
                        />
                    </View>
                </View>
                <Divider />
                <View style={{
                        flex: 0.6,
                        paddingVertical: 40,
                        paddingHorizontal: 34,
                        alignItems: 'center',

                    }}>
                        <Text style={{...CommonStyles.h3, color: '#FFF', marginTop: 20}}>MISSION COMPLETED!</Text>
                        <Text style={{...CommonStyles.normal_bold_text, color: '#FFF', marginTop: 20, textAlign: 'center' }}>COLLECT REWARDS ON 'MY MISSIONS>COMPLETED' ONCE YOUR MISSION HAS BEEN APPROVED.</Text>
                        <View style={{marginTop: 60, alignItems: 'center'}}>
                            <RoundButton
                                title='MY MISSIONS'
                                type='primary'
                                onPress={
                                    ()=>{
                                        navigation.navigate('playAI', {isTutorial: true})
                                    }
                                }
                                icon={<Image source={require('../../assets/ico_location.png')} />}
                            />
                            <RoundButton
                                title='ABOUT MISSION'
                                type='secondary'
                                icon={<Image source={require('../../assets/ico_video.png')} />}
                                onPress={
                                    ()=>{
                                        navigation.navigate('playAI', {isTutorial: true})
                                    }
                                }
                            />
                            <View style={{marginTop: 28}}>
                                <Ripple
                                    onPress={() =>{
                                        navigation.goBack();
                                    }}
                                    outerStyle={{
                                        borderRadius: 30,
                                        backgroundColor: dark_theme.COLORS.BG_GREY,
                                        width: 60,
                                        height: 60,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    innerStyle={{
                                        height: 60,
                                        width: 60,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Image source={require('../../assets/ico_close.png')} />
                                </Ripple>
                            </View>
                        </View>
                </View>
        </View>
    );
};