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
import Tag from "../../components/Tag";



const styles = StyleSheet.create({
    AvatarTitle: {

    },
    AvatarSubTitle: {

    }
});


export const Mission = (props) => {
    const {onNext, onTutorial} = props || {};
    return (
        <View style={{
            flex: 1, 
            width: '100%', 
            height: '100%',
            backgroundColor: '#121212',
            paddingTop: 80,
            }}>
                <View style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#121212'
                    }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        
                    <Avatar
                        title={'aasdf'}
                        rounded={true}
                        size={'xlarge'}
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
                <Divider style={{marginTop: 20}} />
                <View style={{
                        flex: 1,
                        paddingVertical: 40,
                        paddingHorizontal: 34,
                        alignItems: 'center',

                    }}>
                        <Text style={{...CommonStyles.h3, color: '#FFF', marginTop: 20 }}>LET'S BEGIN</Text>
                        <Text style={{...CommonStyles.large_bold_text, color: '#FFF', marginTop: 20, textAlign: 'center' }}>YOU ARE ABOUT TO COMPLETE 1 IMAGE FOR THIS IMAGE</Text>
                        <View style={{marginTop: 60}}>
                            <RoundButton
                                title='START'
                                type='primary'
                                onPress={
                                    ()=>{
                                        onNext();
                                    }
                                }
                            />
                            <RoundButton
                                title='TUTORIAL (1 MIN)'
                                type='secondary'
                                icon={<Image source={require('../../assets/ico_video.png')} />}
                                onPress={()=>{
                                    onTutorial();
                                }}
                            />
                        </View>
                </View>
        </View>
    );
};