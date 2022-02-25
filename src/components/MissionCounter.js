import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';
import AntIcon from 'react-native-vector-icons/AntDesign';


export const MissionCounter = (props) => {
    const {
        remainTime
    } = props;

    const minutes = (remainTime / 60 % 60).toFixed(0);
    const hours = (remainTime / 3600 % 24).toFixed(0);
    const days = (remainTime / 3600  / 24).toFixed(0);


    return (
        <View style={styles.countdownContainer}>
          <AntIcon name="clockcircleo" size={22} color={theme.COLORS.WHITE} />
          <View style={styles.countdownItem}>
            <Text style={styles.countdownLabel}>Days</Text>
            <Text style={styles.countdownvalue}>{("0" + days).slice(-2)}</Text>
          </View>
          <View>
            <Text style={styles.countdownLabel}></Text>
            <Text style={styles.countdownvalue}>:</Text>
          </View>
          <View style={styles.countdownItem}>
            <Text style={styles.countdownLabel}>Hours</Text>
            <Text style={styles.countdownvalue}>{("0" + hours).slice(-2)}</Text>
          </View>
          <View>
            <Text style={styles.countdownLabel}></Text>
            <Text style={styles.countdownvalue}>:</Text>
          </View>
          <View style={styles.countdownItem}>
            <Text style={styles.countdownLabel}>Minutes</Text>
            <Text style={styles.countdownvalue}>{("0" + minutes).slice(-2)}</Text>
          </View>
        </View>
    );

}


const styles = StyleSheet.create({

    countdownContainer: {
        left: 0,
        right: 0,
        top: '32%',
        borderRadius: 60,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        paddingHorizontal: 28,
        marginHorizontal: '10%',
        justifyContent: 'center',
        backgroundColor: theme.APP_COLOR_1,
      },
      countdownItem: {
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'center',
      },
      countdownLabel: {
        fontSize: 12,
        lineHeight: 14,
        fontFamily: 'Moon-Bold',
        color: theme.COLORS.WHITE,
        textTransform: 'uppercase',
      },
      countdownvalue: {
        fontSize: 32,
        lineHeight: 40,
        fontFamily: 'Moon-Bold',
        color: theme.COLORS.WHITE,
        textTransform: 'uppercase',
      },
});