import React from 'react';
import Ripple from './Ripple';

const CircleButton = (props) => {
    const {
        backgroundColor= '#25262B',
        onPress = ()=>{},
        width = 60,
        height = 60,
        borderRadius = width / 2,
        children
    } = props || {};

    return (
        <Ripple
            onPress={onPress}
            outerStyle={{
                borderRadius: borderRadius,
                backgroundColor: backgroundColor,
                width: width,
                height: height,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            innerStyle={{
                height: width,
                width: height,
                justifyContent: 'center',
                alignItems: 'center',
    
            }}>
                {children}
        </Ripple>
    );
}

export default CircleButton;