import React, { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { theme } from '../../services/Common/theme';
import { fetchOverall } from './AddLiquidity';
import { useStateValue } from '../../services/State/State';
import { styles } from '../../styles/wallet';
import FormSwap from '../Trade/FormSwap';

const renderScene = SceneMap({
  first: FormSwap,
 // second: FormRemoveLiquidity,
});

export default function TradeTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Swap Ocean and Datatoken' },
   // { key: 'second', title: 'SwapOut' },
  ]);

  useEffect(() => {
    fetchOverall(
      dispatch,
      setUserInfo,
      setEthBal,
      setTokenBal,
      setOceanBal,
      setOceanAddress,
      setDtAddress,
      setSymbolList,
      setUserLiquidity,
      setUserLiquidity_,
      setTotalTokens,
      setTotalPoolTokens,
      setWeightDt,
      setWeightOcean,
      setSwapFee,
      setDtReserve,
      setOceanReserve

    );
  }, []);

  const [ethBal, setEthBal] = useState('');
  const [tokenBal, setTokenBal] = useState('');
  const [oceanBal, setOceanBal] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [newAccount, setNewAccount] = useState('')
  const [ocean, setOcean] = useState('')
  const [oceanAddress, setOceanAddress] = useState('')
  const [dtAddress, setDtAddress] = useState('')
  const [symbolList, setSymbolList] = useState([])
  const [, dispatch] = useStateValue();
  const [coinSymbol, setCoinSymbol] = useState([])
  const [liquidityHash, setLiquidityHash] = useState('')
  const [liquidityError, setLiquidityError] = useState('')
  const [loading, setLoading] = useState(false);
  const [amountMaxBuy, setAmountMaxBuy] = useState('0')
  const [amountMaxBuyPool, setAmountMaxBuyPool] = useState('0')
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
      <View style={styles.quicraContainer}>
        <Text style={styles.oceanText}>{ethBal} <Text style={styles.percentText}> {'ETH'}</Text></Text>
        <Text style={styles.oceanText}>{tokenBal} <Text style={styles.percentText}> {'PHECOR-0'}</Text></Text>
        <View style={styles.oceanPortfolioContainer}>
          <Text style={styles.oceanText}>{oceanBal} <Text style={styles.percentText}> {'OCEAN'}</Text></Text>
          <View>
            <Text style={styles.portfolioText}>24h Portfolio</Text>
            <Text style={styles.percentText}>(+15.53%)</Text>
          </View>
        </View>
      </View>
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: theme.APP_COLOR_2 }}
        onTabPress={({ route }) => {
        }} />
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