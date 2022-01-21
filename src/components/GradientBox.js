import React from 'react';
import {View} from 'react-native';
import Svg, {Rect, Defs, LinearGradient, Stop,} from 'react-native-svg';
export const GradientBox = (props) => {
    const {
        width=100,
        height=100,
        stroke=3,
        children,
        ...settings
    } = props;
    return (
        <View width={width} height={height} {...settings}>
            <Svg  viewBox={`0 0 ${width} ${height}`} width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
                <Rect x={stroke} y={stroke} width={width-stroke*2} height={height-stroke*2} stroke="url(#paint0_linear_511:1222)" strokeWidth={stroke}/>
                <Defs>
                <LinearGradient id="paint0_linear_511:1222" x1="0" y1="0" x2={width} y2={height} gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#A737C1"/>
                    <Stop offset="1" stopColor="#72B5CB"/>
                </LinearGradient>
                </Defs>
            </Svg>
            <View style={{position: 'absolute'}}>
                {children}
            </View>
        </View>

    );
}