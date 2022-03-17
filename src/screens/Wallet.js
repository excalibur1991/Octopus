import React, { useState, useEffect} from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import Button from '../components/Button';
import CopyTextBox from '../components/CopyTextBox';
import { theme } from '../services/Common/theme';
import CButton from '../components/CButton';
//import sendOnlyone from '../components/SendTokens'
import ApproveLiquidity from '../components/ApproveLiquidity';
import AddDTLiquidity from '../components/AddDTLiquidity';
import getCurrentTokens from '../components/AddDTLiquidity';
import Joinswap from '../components/Joinswap';
import JoinswapExternAmountIn from '../components/JoinswapExternAmountIn';
import * as StakesUtil from '../components/AddDTLiquidity';
import { contracts, web3 } from '../web3/utils';
import { OceanPool } from '../components/OceanPool';
import { styles } from '../styles/wallet';
import { withTranslation } from 'react-i18next';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { BalanceBox } from '../components/BalanceBox';
import { getWalletBalances } from './Pool/AddLiquidity';
import { useStateValue } from '../services/State/State';
import { ethers } from 'ethers'

const Wallet = ({ t, navigation }) => {
  const isFocused = useIsFocused();
  
  useEffect(() => {
    getWalletBalances(
      dispatch,
      setEthBal,
      setTokenBal,
      setOceanBal,
    );
  }, [isFocused]);

  const [ethBal, setEthBal] = useState('0');
  const [tokenBal, setTokenBal] = useState('0');
  const [oceanBal, setOceanBal] = useState('0');
  const [, dispatch] = useStateValue();

  const credentials = [
    {
      oneLine: false,
      label: 'Memoric Phrase',
      value:
        'following guitar strings colors rainbow cranial nerves planets hello twitter follow kiss',
    },
  ];

  const UnStakeDT = async () => {
    try {
      const ocean = new OceanPool();
      //console.log('Instance:',
      await ocean.removeDTLiquidity(
        contracts.walletAddress,
        contracts.newPool2,
        '20',
        '0.5',
      );
    } catch (error) { }
  };

  const StakeDT = async () => {
    try {
      //StakesUtil.AddDTLiquidity(contracts.walletAddress, contracts.oceanRinkeby, web3.utils.toHex(1e18))
      // StakesUtil.getCurrentTokens(contracts.oceanRinkeby) // get pool tokens (walletAddress is not accepted)
      // StakesUtil.getDTAddress(contracts.oceanRinkeby)
      // StakesUtil.getReserve( contracts.oceanRinkeby, contracts.phecorRinkeby )
      // StakesUtil.getMaxAddLiquidity(contracts.oceanRinkeby, contracts.phecorRinkeby)
      // StakesUtil.joinswapExternAmountIn(contracts.wallet,contracts.oceanRinkeby,contracts.phecorRinkeby,
      //   web3.Utils.toHex(5e18), web3.Utils.toHex(1e18))

      //  JoinswapExternAmountIn(contracts.walletAddress,contracts.oceanRinkeby,contracts.phecorRinkeby,
      //  web3.utils.toBN(40), web3.utils.toBN(5))

      //AddDTLiquidity(contracts.walletAddress, contracts.oceanRinkeby, web3.utils.toHex(1e18))
      // Joinswap(contracts.walletAddress, contracts.oceanRinkeby,contracts.phecorRinkeby,
      //  '50000000000000000000' , '0')
      // ApproveLiquidity(contracts.walletAddress,contracts.oceanRinkeby,contracts.phecorRinkeby,web3.utils.toHex(1e18))

      /**
       * //invalid pool addresses:
       * 1. contracts.phecorRinkeby: 0xe793...
       * 2. contracts.quicraLiqPool: 0xAAB9...
       * 3. contracts.oceanRinkeby: 0x8967...
       *
       * //valid pool addresses
       * 1. 0xAa5226ACc808112E84249eD625cEB96b45AFD2Ac (pool contract created by newBPool() function)
       * 2: 0xc1d3b57309a066fae7aa170e94c501a4793d01ffe503c437e4a712d719c3483a
       */
      const ocean = new OceanPool();
      //console.log('Instance:',
      await ocean.addDTLiquidity(
        contracts.walletAddress,
        contracts.newPool2,
        '50',
      );
      //)
    } catch (error) { }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      < BalanceBox
        ethTitle={'ETH'}
        ethValue={ethBal}
        oceanTitle={'OCEAN'}
        oceanValue={oceanBal}
        tokenTitle={'PHECOR-0'}
        tokenValue={tokenBal}
      />
      {/* <View style={styles.quicraContainer}>
        <Text style={styles.quicraText}>1.2 QUICRA-0</Text>
        <View style={styles.oceanPortfolioContainer}>
          <Text style={styles.oceanText}>7.2 Ocean</Text>
          <View>
            <Text style={styles.portfolioText}>24h Portfolio</Text>
            <Text style={styles.percentText}>(+15.53%)</Text>
          </View>
        </View>
      </View> */}
      <View style={styles.sendAmountInputContainer}>
        <Text style={styles.inputLabel}>{t('walletActions.sendTo')}</Text>
        <TextInput
          selectable={true}
          style={styles.input}
          selectTextOnFocus={true}
          placeholderTextColor={theme.COLORS.WHITE}
          placeholder={t('walletActions.destinationAddress')}
        />
        <View style={styles.inputDivider} />
        <Text style={styles.inputLabel}>{t('walletActions.amountEth')}</Text>
        <TextInput
          selectable={true}
          style={styles.input}
          selectTextOnFocus={true}
          placeholderTextColor={theme.COLORS.WHITE}
          placeholder={t('walletActions.amountToSend')}
        />
      </View>
      <Button
        height={55}
        title="Send"
        onPress={() => { }}
        color={theme.APP_COLOR_2}
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonStyle}
      />
      <View style={styles.mainDivider} />
      {/* <View style={styles.stakeUnstakeContainer}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          selectable={true}
          style={styles.input}
          placeholder="Amount"
          selectTextOnFocus={true}
          placeholderTextColor={theme.COLORS.WHITE}
        />
      </View> */}
      <View style={styles.stakeUnstakeButtons}>
        <Button
          height={55}
          // title="UnStake"
          // onPress={() => UnStakeDT()}
          title="Trade"
          onPress={() => navigation.navigate('Trade')}
          color={theme.APP_COLOR_2}
          textStyle={styles.stakeButtonText}
          buttonStyle={styles.stakeUnstakeButtonStyle}
        />
        <Button
          height={55}
          // title="Stake"
          // onPress={() => StakeDT()}
          title="Pool"
          onPress={() => navigation.navigate('Pool')}
          color={theme.APP_COLOR_2}
          textStyle={styles.stakeButtonText}
          buttonStyle={styles.stakeUnstakeButtonStyle}
        />
      </View>
    </ScrollView>
  );
};

export default withTranslation()(Wallet);
