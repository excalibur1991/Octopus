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
                <ListItem containerStyle={{
                    backgroundColor: 'transparent'
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
                            <Chip title={'common'} />
                            <Chip title={'common2'} />
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <Divider />
                <View style={}>
                    <RoundButton
                        onPress={()=>{navigation.navigate('Mission')}}
                    >ABOUT MISSION</RoundButton>
                    <RoundButton
                        onPress={()=>{navigation.navigate('')}}
                    >CLAIM MISSION</RoundButton>
                </View>
            </View>
        </View>
    );
};