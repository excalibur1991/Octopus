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
import { Intro } from "./Intro";
import PlayAI from "./PlayAI";

export const MainScreen = (props) => {
    const {navigation} = props || {};

    const [curPage, setCurPage] = useState('intro');
    const [tocChecked, setTocChecked] = useState(false);
 
    return (
        <>
        {curPage === 'mission' && (
            <Mission {...props} 
                onNext={()=>{setCurPage('playai');}} 
                onTutorial={()=>{setCurPage('playai_tut')}}
            />
        )}
        {curPage === 'mission_completed' &&
            <MissionComplete {...props} />
        }
        {curPage === 'playai' &&
            <PlayAI {...props} />
        }
        {curPage === 'playai_tut' &&
            <PlayAI isTutorial={true} {...props} />
        }
        {curPage === 'intro' && (
            <Intro {...props} onNext={()=>{setCurPage('mission');}} />
        )}
        </>
    );
};