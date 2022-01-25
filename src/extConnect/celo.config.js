import Web3 from 'web3';
import { newKitFromWeb3 } from "@celo/contractkit";

const provider = "https://alfajores-forno.celo-testnet.org"

export const celoWeb3 = new Web3(provider);
export const kit = newKitFromWeb3(celoWeb3)
