
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


const DottedProgressBar = ({progress, duration, hideLabel, selectedColor, unselectedColor, label, show, containerStyle, progressStyle, circleStyle, labelStyle})=> {
    const [prevProgress, setPrevProgress] = useState(0);
    const [timer, setTimer] = useState(null);

    useEffect(()=>{
        if(timer){
        }

    }, [progress]);

    return (
        <View style={{...styles.container}}>
            <View style={styles.progress}>
                {Array(10).fill(1).map((el, i) =>(
                    <LinearGradient  key={i} style={styles.circle} colors={(progress * 10 >= i + 1) ? selectedColor : unselectedColor}>
                    </LinearGradient>
                ))}
            </View>
            {/*<Text style={styles.whiteText}>{label}</Text>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-end'
    },
    progress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circle: {
        width: 12,
        height: 12,
        backgroundColor: 'red',
        borderRadius: 6,
        marginHorizontal: 3
    },
    whiteText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Inter',
        textAlign: 'right',
        marginTop: 18
    },
});

DottedProgressBar.defaultProps = {
    progress: 0,
    duration: 300,
    selectedColor: ['#72B5CB', '#A737C1'],
    unselectedColor: ['#374768', '#422B65'],
    label: '',
    containerStyle: null, 
    progressStyle: null, 
    circleStyle: null, 
    labelStyle: null,
    show: false,
    hideLabel: false
};

DottedProgressBar.propTypes = {
    progress: PropTypes.number,
    duration: PropTypes.number,
    selectedColor: PropTypes.arrayOf(PropTypes.string),
    unselectedColor:PropTypes.arrayOf(PropTypes.string),
    containerStyle: PropTypes.any, 
    progressStyle: PropTypes.any, 
    circleStyle: PropTypes.any, 
    labelStyle: PropTypes.any,
    show: PropTypes.bool,
};

export default DottedProgressBar;