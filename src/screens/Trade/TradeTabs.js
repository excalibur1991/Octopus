import React, { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions, ActivityIndicator } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { theme } from '../../services/Common/theme';
import { getAllAddCalcs } from '../Pool/AddLiquidity';
import { useStateValue } from '../../services/State/State';
import { styles } from '../../styles/wallet';
import FormSwap from './FormSwap';
import { BalanceBox } from '../../components/BalanceBox';
import { getWalletBalances } from '../Pool/AddLiquidity';
import { useIsFocused } from '@react-navigation/native';

const renderScene = SceneMap({
  first: FormSwap,
});

export default function TradeTabs() {
  const layout = useWindowDimensions();
  const isFocused = useIsFocused();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Swap Ocean and Datatoken' },
  ]);

  useEffect(() => {
    getAllAddCalcs(
      dispatch,
      setUserInfo,
      setOceanAddress,
      setDtAddress,
      setSymbolList,
      setTotalPoolTokens,
    
    );
  }, [isFocused]);

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
  const [userInfo, setUserInfo] = useState('');
  const [oceanAddress, setOceanAddress] = useState('')
  const [dtAddress, setDtAddress] = useState('')
  const [symbolList, setSymbolList] = useState([])
  const [, dispatch] = useStateValue();
  const [userLiquidity, setUserLiquidity] = useState('0')
  const [userLiquidity_, setUserLiquidity_] = useState('0')
  const [totalTokens, setTotalTokens] = useState('0')
  const [totalPoolTokens, setTotalPoolTokens] = useState('0')
  const [weightDt, setWeightDt] = useState('0')
  const [weightOcean, setWeightOcean] = useState('0')
  const [swapFee, setSwapFee] = useState('0')
  const [dtReserve, setDtReserve] = useState('0')
  const [oceanReserve, setOceanReserve] = useState('0')


  const renderTabBar = props => (
    <View>
      < BalanceBox
        ethTitle={'ETH'}
        ethValue={ethBal}
        oceanTitle={'OCEAN'}
        oceanValue={oceanBal}
        tokenTitle={'PHECOR-0'}
        tokenValue={tokenBal}
      />
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
        {/* <Text style={styles.liquidityHText}>{'Your Liquidity'}</Text>
        <Text style={styles.oceanText}>{Number(userLiquidity).toFixed(2)}<Text style={styles.liquidityText}>   pool shares</Text></Text>
        <Text style={styles.liquidityHText}>{'Pool Liquidity'}</Text>
        <Text style={styles.oceanText}>{Number(totalPoolTokens).toFixed(2)}<Text style={styles.liquidityText}>  pool shares</Text></Text>
        <Text style={styles.oceanText}>{Number(swapFee).toFixed(2)} <Text style={styles.liquidityText}>  % swap fee</Text></Text> */}
        {/* <Text style={styles.oceanText}>{Number(oceanReserve).toFixed(2)} <Text style={styles.oceanPoolText}>  OCEAN</Text></Text>
        <Text style={styles.oceanText}>{Number(dtReserve).toFixed(2)} <Text style={styles.oceanPoolText}>  PHECOR-0</Text></Text> */}
      </View>

    </>

  );
}