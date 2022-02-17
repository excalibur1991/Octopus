import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';



export const Reward = ({
    exp = 0,
    rewardAmount = 0,
    ...props}) => {


    return (
        <View style={styles.rewardContainer}>
            <Text style={styles.rewardTitle}>Rewards</Text>
            <View style={styles.rewardItem}>
                <View style={styles.rewardItemTitle}>
                <View style={styles.exp}>
                    <Text style={styles.expText}>Exp</Text>
                </View>
                <Text style={styles.x}>x</Text>
                </View>
                <Text style={styles.rewardTitle}>{exp}</Text>
            </View>
            <View style={styles.rewardItem}>
                <View style={styles.rewardItemTitle}>
                <View style={styles.rewardSign}>
                    <Text style={styles.rewardSignText}>$</Text>
                </View>
                <Text style={styles.x}>x</Text>
                </View>
                <Text style={styles.rewardTitle}>{rewardAmount}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rewardContainer: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        justifyContent: 'center',
      },
      rewardTitle: {
          flex: 0.5,
        fontSize: 16,
        lineHeight: 14,
        fontFamily: 'Moon-Bold',
        color: theme.COLORS.WHITE,
        textTransform: 'uppercase',
      },
      rewardItem: {
        flexWrap: 'wrap',
        marginTop: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      exp: {
        borderRadius: 30,
        paddingVertical: 1,
        paddingHorizontal: 9,
        backgroundColor: theme.APP_COLOR_2,
      },
      expText: {
        fontSize: 16,
        fontFamily: 'Moon-Bold',
        color: theme.COLORS.WHITE,
        textTransform: 'uppercase',
      },
      rewardItemTitle: {
        flexDirection: 'row',
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'center'
    
      },
      x: {
        fontSize: 10,
        lineHeight: 9.2,
        marginHorizontal: 10,
        fontFamily: 'Moon-Bold',
        color: theme.COLORS.WHITE,
        textTransform: 'uppercase',
      },
      rewardSign: {
        width: 20,
        height: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.COLORS.YELLOW,
      },
      rewardSignText: {
        fontSize: 16,
        fontFamily: 'Moon-Bold',
        color: theme.APP_COLOR_1,
        textTransform: 'uppercase',
      },

});