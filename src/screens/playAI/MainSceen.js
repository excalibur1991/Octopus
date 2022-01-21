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
import {MissionComplete} from './MissionComplete';
import Intro from "./Intro";
import PlayAI from "./PlayAI";
import {withTranslation} from 'react-i18next';

const MainScreen = (props) => {
    const {navigation, route} = props || {};

    const [curPage, setCurPage] = useState('intro');
    const [tocChecked, setTocChecked] = useState(false);
 
    return (
        <>
        {curPage === 'mission' && (
            <Mission {...props} 
                onNext={()=>{
                    navigation.navigate('PlayAI', {isTutorial: false, onComplete: (ret)=>{setCurPage('mission_completed')}});
                }} 
                onTutorial={()=>{
                    navigation.navigate('PlayAITutorial', {isTutorial: true, onExitTutorial: (ret)=>{setCurPage('mission');}});
                }}
            />
        )}
        {curPage === 'mission_completed' &&
            <MissionComplete {...props} />
        }
        {curPage === 'intro' && (
            <Intro {...props} onNext={()=>{setCurPage('mission');}} />
        )}
        </>
    );
};

export default withTranslation()(MainScreen);