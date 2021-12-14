import Web3 from 'web3';
import { newKitFromWeb3 } from "@celo/contractkit";

 const provider = "https://alfajores-forno.celo-testnet.org"
// export const provider = 'https://forno.celo.org' // or 'wss://forno.celo.org/ws' (for websocket support)

export const celoWeb3 = new Web3(provider);
export const kit = newKitFromWeb3(celoWeb3)

//export default { provider, celoWeb3, kit }

// 1. Import contractkit
//import { newKit } from '@celo/contractkit'

// 2. Init a new kit, connected to the alfajores testnet
//const kit = newKit('https://alfajores-forno.celo-testnet.org')

// 3. Get the Gold Token contract
//let goldtoken = await kit.contracts.getGoldToken()

// 4. Address to look up
//let anAddress = '0xD86518b29BB52a5DAC5991eACf09481CE4B0710d'

// 5. Get Gold Token balance
//let balance = await goldtoken.balanceOf(anAddress)

// Print balance
//console.log(`${anAddress} balance: ${balance.toString()}`)