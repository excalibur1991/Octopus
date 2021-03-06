/* Default HD path string for key generation from seed */
export const hdPathString = `m/44'/60'/0'/0`
/* keystore will be saved to local storage under this key */
export const localStorageKey = 'key'

export const ganachehost = 'http://localhost:7545'

//export const rinkeby = "https://rinkeby.infura.io/v3/2cdeb2ee72bb4c6caebd580bacc16769"

//export const rinkeby = "https://eth-rinkeby.alchemyapi.io/v2/J1LeelYCWPBCv5auJWmbH4gNTWuYP1OI"

export const rinkeby = "https://rinkeby.infura.io/v3/48f3dfa7944f442980a90c625e2f2921"
export const kovan = "https://kovan.infura.io/v3/48f3dfa7944f442980a90c625e2f2921" 
export const ropsten = "https://ropsten.infura.io/v3/48f3dfa7944f442980a90c625e2f2921"
export const mainnet = "https://mainnet.infura.io/v3/48f3dfa7944f442980a90c625e2f2921"
/*usage: convert amount to wei
const sendAmount = new BigNumber(amount).times(Ether);
*/
export const Ether = (1.0e18).toString()
export const Gwei = (1.0e9).toString()
