//import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
import { useWalletConnect, withWalletConnect } from '../extConnect/WalletConnectLib';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Web3 from 'web3';
import { Platform, LogBox } from 'react-native';
//import Hello from '../artifacts/contracts/Hello.sol/Hello.json';
import { default as AsyncStorage } from '@react-native-async-storage/async-storage';
import { styles } from '../styles/walletsettings';
import CButton from '../components/CButton';
import Button from '../components/Button'
import {
    requestTxSig,
    waitForSignedTxs,
    requestAccountAddress,
    waitForAccountAuth,
    FeeCurrency
} from '@celo/dappkit'
import { celoWeb3, kit } from '../extConnect/celo.config'
import { toTxResult } from "@celo/connect"
import { getWalletData } from '../services/DataManager';
import * as Utils from '../web3/utils'
import BigNumber from 'bignumber.js';
import * as Linking from 'expo-linking'
import { ReadOnlyBox } from './WalletSettings';
import { theme } from '../services/Common/theme';
import { color } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';


export default withWalletConnect(ExtConnections, {

    redirectUrl: Platform.OS === 'web' ? window.location.origin : `{scheme}://`,
    storageOptions: {
        asyncStorage: AsyncStorage,
    },
})


export function ExtConnections({ t, ...props }) {
    const connector = useWalletConnect();

    const [ethAddress, setEthAddress] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [Address, setAddress] = useState('Not Logged In')
    const [celoAddress, setCeloAddress] = useState('Not Logged In')
    const [cUSDBalance, setUSDBalance] = useState('Not Logged In')
    const [celoBalance, setCeloBalance] = useState('Not Logged In')
    const [ethBalance, setEthBalance] = useState('0')
    const [phoneNumber, setPhoneNumber] = useState('Not Logged In')
    const [helloWorldContract, setHelloWorldContract] = useState(null)
    const [contractName, setContractName] = useState('')
    const [textInput, setTextInput] = useState('')
    const [message, setMessage] = useState('Loading...');

    const [data, setData] = React.useState({
        secureTextEntry: true,
    });

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const connectWallet = useCallback(async () => {
        let result = await connector.connect()
        if (result )  {
            setAddress(result.accounts[0])
            setMessage(`Connected to ${result.peerMeta.name}`)

        }

        return connector.connect();
    }, [connector]);

    const signTransaction = useCallback(async () => {
        try {
            await connector.signTransaction({
                data: '0x',
                from: '0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3',
                gas: '0x9c40',
                gasPrice: '0x02540be400',
                nonce: '0x0114',
                to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
                value: '0x00',
            });
        } catch (e) {
            console.error(e);
        }
    }, [connector]);

    const killSession = useCallback(() => {
        //setIsLoading(true)
        setMessage(`Loading...`)
        return connector.killSession();
    }, [connector]);

    return (
  
        <>
        <View style={styles.container}>
                {connector.connected ?
                    (<>
                        <View>
                            <View>
                                <Text style={styles.textBoxTitle}>Connected to {connector.peerMeta.name}!</Text>
                            </View>
                            <ReadOnlyBox
                             title='Pubic Address'
                             value={connector.accounts[0]}
                            />
                            <Button
                                height={60}
                                onPress={() => killSession()}
                                title="Disconnect"
                                color={theme.APP_COLOR_2}
                                textStyle={styles.buttonText}
                                buttonStyle={styles.buttonStyle} 
                             />
                            <Button
                                height={60}
                                onPress={() => signTransaction()}
                                title="Sign a Transaction"
                                color={theme.APP_COLOR_2}
                                textStyle={styles.buttonText}
                                buttonStyle={styles.buttonStyle} />
                        </View></>
                    ) :
                    (<View>
                        <Button
                            height={60}
                            onPress={() => connectWallet()}
                            title="WalletConnect"
                            color={theme.APP_COLOR_2}
                            textStyle={styles.buttonText}
                            buttonStyle={styles.buttonStyle} />
                    </View>
                    )}
            </View></>


    )

}   
