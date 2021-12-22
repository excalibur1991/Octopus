import React from 'react';
import {Appbar} from 'react-native-paper';
const AppBar = (props) => {

    const {
        navigation,
        showBackAction = true,
        backAction = ()=>{},
        showTitle = true,
        title=''

    } = props || {};

    return (
        <Appbar.Header style={{ backgroundColor: 'transparent'}}>
            <Appbar.BackAction onPressIn={()=>{backAction();}} />
            <Appbar.Content title={title}  />
        </Appbar.Header>
    );
}


export default AppBar;