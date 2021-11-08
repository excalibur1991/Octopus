import React from "react";

import {
    ImageBackground,    
    Image,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Avatar, Chip, Divider, ListItem } from "react-native-elements";

import { CommonStyles } from "../../services/Common/styles";
import RoundButton from "../../components/RoundButton";
import { NavigationContainer } from "@react-navigation/native";



const styles = StyleSheet.create({
    AvatarTitle: {

    },
    AvatarSubTitle: {

    }
});

export const Mission = ({navigation}) => {
    return (
        <View style={{
            flex: 1, 
            width: '100%', 
            height: '100%',
            }}>
            <View style={{
                backgroundColor: '#121212',
                flex: 1,
                width: '100%',
                bottom: 0,
            }}>
                <Avatar
                    style={{width: 80, height: 80}}
                    //size={'large'}
                    title={'abc'}
                    source={require('../../assets/companyIcon.png')}
                />
                <Text style={CommonStyles.large_bold_text}>PEOPLE IMAGES</Text>
                <Text style={CommonStyles.normal_text}>FACEBOOK</Text>
                <Chip>{'0/1'}</Chip>
                <Divider />
                <Text style={CommonStyles.title}>LETS BEGIN</Text>
                <Text >YOU ARE ABOUT TO COMPLETE 1 IMAGE FOR THIS MISSION</Text>
                <RoundButton
                    onPress={
                        ()=>{navigation.navigate('playAI')}
                    }
                >START</RoundButton>
                <RoundButton
                    onPress={
                        ()=>{navigation.navigate({name: 'playAI', params: {mode: 'tutorial'})}
                    }
                >TUTORIAL (1 MIN)</RoundButton>
            </View>
        </View>
    );
};