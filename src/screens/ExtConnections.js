//import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
import { useWalletConnect, withWalletConnect } from '../extConnect/WalletConnectLib';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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


//import { scheme } from 'expo';
//const {  scheme } = require('expo');



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



    const connectWallet = useCallback(async () => {
        let result = await connector.connect()
        console.log({ result })
        console.log({ desc: result.peerMeta.description, name: result.peerMeta.name, url: result.peerMeta.url })
        if (result) {
            setAddress(result.accounts[0])
            setMessage(`Connected to ${result.peerMeta.name}`)

        }

        return connector.connect();
    }, [connector]);
    /** 
        {
          "result": {
            "accounts": ["0x18346dd0864eE8211bF9996b729a05b1D20A3D5F"],
            "chainId": 1,
            "peerId": "29c5e9e2-4fd5-417d-b796-1e1f65bb4c31",
            "peerMeta": {
              "description": "MetaMask Mobile app", 
              "icons": [Array], 
              "name": "MetaMask",
               "ssl": true, 
               "url": "https://metamask.io"
              }
            }
        }
    */
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


        <View style={styles.container}>
            {
                connector.connected ?
                    (<><>
                    <View>
                        <View>
                            <Text style={styles.textBoxValue}>Connected to {connector.peerMeta.name}!</Text>
                        </View>
                        <ReadOnlyBox
                            value={connector.accounts[0]}
                            title={'Public Addresss'} />
                    </View>
                    </>
                        <View>
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
                                buttonStyle={styles.buttonStyle}
                            />
                        </View></>
                        ) :
                        (<View>
                            <Button
                                height={60}
                                onPress={() => connectWallet()}
                                title="WalletConnect"
                                color={theme.APP_COLOR_2}
                                textStyle={styles.buttonText}
                                buttonStyle={styles.buttonStyle}
                            />
                        </View>
                        )
            }
        </View>


    )

}    