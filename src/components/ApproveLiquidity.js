//import onlyone from '../abis/onlyone-abi.json'
import jsonpoolABI from '@oceanprotocol/contracts/artifacts/BPool.json'
//import {web3} from '../web3/utils'
import Web3 from 'web3'
import {allowance} from '../components/AddDTLiquidity'
import {getFairGasPrice} from '../components/AddDTLiquidity'
import Decimal from 'decimal.js'
import BigNumber from 'bignumber.js'
import {web3} from '../web3/utils'
import {PRIVATE_KEY, INFURA_KEY} from '../../env'


async function ApproveLiquidity(
    account, 
    tokenAddress,
    spender,
    amount,
    force = false // if true, will overwrite any previous allowence. Else, will check if allowance is enough and will not send a transaction if it's not needed
    ) {
  
  //    const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/48f3dfa7944f442980a90c625e2f2921");
  // require('dotenv').config();
   //const { PRIVATE_KEY } = process.env; 
   //let myWallet1PKey = "84d8bd3e50eddf675f37227e40df9c395f48367548ea3f9ca4d2ff33a473fe16"
    let Tx = require('ethereumjs-tx').Transaction;
   // amount = web3.utils.toHex(5);
    let privateKey = Buffer.from(PRIVATE_KEY, 'hex');
    let contractInstance = new web3.eth.Contract(jsonpoolABI.abi, tokenAddress, {from: account});
    let count = await web3.eth.getTransactionCount(account);

    if (!force) {
        const currentAllowance = await allowance(tokenAddress, account, spender)
        if (new Decimal(currentAllowance).greaterThanOrEqualTo(amount)) {
          // we have enough
          return null
        }
      }

      web3.eth.getBlock("latest").then(res => {console.log('gasLimit:', res.gasLimit)});

      web3.eth.estimateGas({
        from: account,
        to: tokenAddress,
        'gasLimit': web3.utils.toHex(210000),
        'gasPrice': web3.utils.toHex(5000000000),
        'nonce': web3.utils.toHex(count),
        'data': contractInstance.methods.approve(spender, amount).encodeABI() 
    })
    .then(res => {console.log('gasEst:', res)});

    let rawTransaction = {
        "from":account,
        "gasPrice":web3.utils.toHex(5000000000),
        "gasLimit":web3.utils.toHex(210000),
        "to":tokenAddress,
        "data":contractInstance.methods.approve(spender, amount).encodeABI(),
        "nonce":web3.utils.toHex(count)
    };

    let transaction = new Tx(rawTransaction, {'chain': 'rinkeby'}); //defaults to mainnet without specifying chain
    transaction.sign(privateKey)

    let result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
    console.log({Approval: result.status})
    return result;
}

export default ApproveLiquidity;