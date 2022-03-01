import React, {useState} from 'react';
import {Text, View, ScrollView, TextInput, Dimensions} from 'react-native';
import Button from '../components/Button';
import CopyTextBox from '../components/CopyTextBox';
import {theme} from '../services/Common/theme';
import CButton from '../components/CButton';
//import sendOnlyone from '../components/SendTokens'
import ApproveLiquidity from '../components/ApproveLiquidity';
import AddDTLiquidity from '../components/AddDTLiquidity';
import getCurrentTokens from '../components/AddDTLiquidity';
import Joinswap from '../components/Joinswap';
import JoinswapExternAmountIn from '../components/JoinswapExternAmountIn';
import * as StakesUtil from '../components/AddDTLiquidity';
import {contracts, web3} from '../web3/utils';
import {OceanPool} from '../components/OceanPool';
import {styles} from '../styles/wallet';
import {withTranslation} from 'react-i18next';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const portfolioOptions = [
  {
    portfolio: '24h Portfolio',
    percentValue: '(+15.53%)',
  },
  {
    portfolio: '1w Portfolio ',
    percentValue: '(+9.22%)',
  },
  {
    portfolio: '1m Portfolio',
    percentValue: '(+11.74%)',
  },
  {
    portfolio: '3m Portfolio ',
    percentValue: '(-1.61%)',
    danger: true,
  },
];

const Wallet = ({t}) => {
  const [selectedPortfolio, setSelectedPortfolio] = useState(
    portfolioOptions[0],
  );

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
    } catch (error) {}
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
    } catch (error) {}
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.quicraContainer}>
        <Text style={styles.orthcoinText}>115 Orthcoin</Text>
        <View style={styles.oceanPortfolioContainer}>
          <View>
            <Text style={styles.oceanText}>460 Ocean</Text>
            <Text style={styles.usdText}>=460 USD</Text>
          </View>
          <View>
            <Menu renderer={renderers.ContextMenu}>
              <MenuTrigger
                customStyles={{
                  triggerOuterWrapper: styles.menuTriggerContainer,
                }}>
                <View style={styles.menuTrigger}>
                  <View style={styles.portfolioContainer}>
                    <Text style={styles.portfolioText}>
                      {selectedPortfolio.portfolio}
                    </Text>
                    <Text
                      style={
                        selectedPortfolio.danger
                          ? styles.percentTextDanger
                          : styles.percentText
                      }>
                      {selectedPortfolio.percentValue}
                    </Text>
                  </View>
                  <EntypoIcon
                    size={20}
                    name="chevron-small-down"
                    color={theme.COLORS.WHITE}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions
                customStyles={{optionsContainer: styles.menuOptionsContainer}}>
                {portfolioOptions &&
                  portfolioOptions.length > 0 &&
                  portfolioOptions.map((item, index) => (
                    <>
                      <MenuOption
                        style={styles.menuOption}
                        onSelect={() => setSelectedPortfolio(item)}>
                        <View>
                          <Text style={styles.portfolioText}>
                            {item.portfolio}
                          </Text>
                          <Text
                            style={
                              item.danger
                                ? styles.percentTextDanger
                                : styles.percentText
                            }>
                            {item.percentValue}
                          </Text>
                        </View>
                      </MenuOption>
                      {index < portfolioOptions.length - 1 && (
                        <View style={styles.menuOptionDivider} />
                      )}
                    </>
                  ))}
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </View>
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
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          selectable={true}
          style={styles.input}
          selectTextOnFocus={true}
          placeholderTextColor={theme.COLORS.WHITE}
          placeholder={t('walletActions.amountToSend')}
        />
        <Text style={styles.sendAmountDollarText}>= 12 USD</Text>
      </View>
      <Button
        height={55}
        title="Send"
        onPress={() => {}}
        color={theme.APP_COLOR_2}
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonStyle}
      />
      <View style={styles.mainDivider} />
      <View style={styles.stakeUnstakeContainer}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          selectable={true}
          style={styles.input}
          placeholder="Amount"
          selectTextOnFocus={true}
          placeholderTextColor={theme.COLORS.WHITE}
        />
        <Text style={styles.stakeAmountDollarText}>= 15 USD</Text>
      </View>
      <View style={styles.stakeUnstakeButtons}>
        <Button
          height={55}
          title="UnStake"
          onPress={() => UnStakeDT()}
          color={theme.APP_COLOR_2}
          textStyle={styles.unstakeButtonText}
          buttonStyle={styles.stakeUnstakeButtonStyle}
        />
        <Button
          height={55}
          title="Stake"
          onPress={() => StakeDT()}
          color={theme.APP_COLOR_2}
          textStyle={styles.stakeButtonText}
          buttonStyle={styles.stakeUnstakeButtonStyle}
        />
      </View>
    </ScrollView>
  );
};

export default withTranslation()(Wallet);
