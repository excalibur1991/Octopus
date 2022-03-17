import React, { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { theme } from '../../services/Common/theme';
import FormAddLiquidity from './FormAddLiquidity';
import FormRemoveLiquidity from './FormRemoveLiquidity';
import { getAllCalculations } from './AddLiquidity';
import { useStateValue } from '../../services/State/State';
import { styles } from '../../styles/wallet';
import { BalanceBox } from '../../components/BalanceBox';
import { getWalletBalances } from './AddLiquidity';
import { retrievedCoins } from '../../functions/walletactions';
import { POOL_ADDRESS } from '../../../env';
import {  useIsFocused } from '@react-navigation/native';


const renderScene = SceneMap({
  first: FormAddLiquidity,
  second: FormRemoveLiquidity,
});

export default function PoolTabs({ ...props }) {
  const layout = useWindowDimensions();
  const isFocused = useIsFocused();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Add Liquidity' },
    { key: 'second', title: 'Remove Liquidity' },
  ]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getWalletBalances(
      dispatch,
      setEthBal,
      setTokenBal,
      setOceanBal,
      setUserLiquidity
    )
  }, [isFocused])

  const [ethBal, setEthBal] = useState('0');
  const [tokenBal, setTokenBal] = useState('0');
  const [oceanBal, setOceanBal] = useState('0');
  const [, dispatch] = useStateValue();
  const [userLiquidity, setUserLiquidity] = useState('0');


  // console.log({ mmyOceanBal: oceanBal, })
  // console.log({ PTuserLiquidity: userLiquidity })
  // console.log({ PTethBal: ethBal, PTtokenBal:tokenBal, PToceanBal:oceanBal })

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getWalletBalances(
      dispatch,
      setEthBal,
      setTokenBal,
      setOceanBal,
      setUserLiquidity
    )
    wait(9000).then(() => setRefreshing(false));
  }, [isFocused]);


  const renderTabBar = props => (
    <View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        < BalanceBox
          ethTitle={'ETH'}
          ethValue={ethBal}
          oceanTitle={'OCEAN'}
          oceanValue={oceanBal}
          tokenTitle={'PHECOR-0'}
          tokenValue={tokenBal}
        />
      </ScrollView>
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: theme.APP_COLOR_2 }}
      />
    </View>
  );


  return (

    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />

      <View style={styles.liquidityContainer}>

        <View style={styles.inputDivider} />
        <Text style={styles.liquidityHText}>{'Your Liquidity'}</Text>
        <Text style={styles.oceanText}>{userLiquidity}<Text style={styles.liquidityText}>   pool shares</Text></Text>
        <View style={styles.inputDivider} />
        {/* <Text style={styles.liquidityHText}>{'Pool Liquidity'}</Text>
        <Text style={styles.oceanText}>{Number(totalPoolTokens).toFixed(2)}<Text style={styles.liquidityText}>  pool shares</Text></Text>
        <Text style={styles.oceanText}>{Number(swapFee).toFixed(2)} <Text style={styles.liquidityText}>  % swap fee</Text></Text>
        <View style={styles.inputDivider} />  */}

        {/* <Text style={styles.oceanText}>{Number(oceanReserve).toFixed(2)} <Text style={styles.oceanPoolText}>  OCEAN</Text></Text>
        <Text style={styles.oceanText}>{Number(dtReserve).toFixed(2)} <Text style={styles.oceanPoolText}>  PHECOR-0</Text></Text> */}
      </View>

    </>

  );
}

const styles_ = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});