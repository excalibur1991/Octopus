import React from "react";
import { Text, View, RefreshControl, ScrollView, StyleSheet  } from "react-native";
import { styles } from "../styles/wallet";
import { theme } from "../services/Common/theme";
import { TabBar } from "react-native-tab-view";


export const BalanceBox = ({ ethTitle, ethValue, oceanTitle, oceanValue, tokenTitle, tokenValue, value, title }) => {


    return (
        <><ScrollView>
            <View style={styles.quicraContainer}>
                <Text style={styles.oceanText}>{value} <Text style={styles.percentText}> {title}</Text></Text>
                <Text style={styles.oceanText}>{ethValue} <Text style={styles.percentText}> {ethTitle}</Text></Text>
                <Text style={styles.oceanText}>{oceanValue} <Text style={styles.percentText}> {oceanTitle}</Text></Text>
                <View style={styles.oceanPortfolioContainer}>
                    <Text style={styles.oceanText}>{tokenValue} <Text style={styles.percentText}> {tokenTitle}</Text></Text>
                    <View>
                        <Text style={styles.portfolioText}>24h Portfolio</Text>
                        <Text style={styles.percentText}>(+15.53%)</Text>
                    </View>
                </View>
            </View>
            </ScrollView>
        </>

    );
};
