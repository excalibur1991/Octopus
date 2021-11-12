import React from "react";

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

export const MainScreeen = ({navigation}) => {
    return (
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

                }}>
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
                            <ListItem.Subtitle>
                                <Chip title={'common'}/>
                                <Chip title={'common2'} containerStyle={{marginLeft: 12, }} />
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
                <Divider />
                <View style={{
                    paddingVertical: 40,
                    paddingHorizontal: 34,
                }}>
                    <RoundButton
                        title={'ABOUT MISSION'}
                        onPress={()=>{navigation.navigate('Mission')}}
                    />
                    <RoundButton
                        title={'CLAIM MISSION'}
                        onPress={()=>{navigation.navigate('')}}
                    />
                </View>
            </View>
        </View>
    );
};