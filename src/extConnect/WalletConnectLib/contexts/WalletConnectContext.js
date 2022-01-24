import * as React from "react";
const defaultValue = Object.freeze({
    bridge: "https://bridge.walletconnect.org/",
    clientMeta: {
        description: "Connect to DataUnion with WalletConnect",
       // url: "https://walletconnect.org",
        url: "https://www.dataunion.app",
        icons: ["https://walletconnect.org/walletconnect-logo.png"],
        //name: "WalletConnect",
        name: "DataUnion" // Custom
    },
    storageOptions: {
        rootStorageKey: "@walletconnect/qrcode-modal-react-native",
    },
    connectToWalletService: async (walletService, uri) => Promise.reject(new Error("[WalletConnect]: It looks like you have forgotten to wrap your application with a <WalletConnectProvider />.")),
    walletServices: [],
});
export default React.createContext(defaultValue);
