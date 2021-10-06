//import onlyone from '../abis/onlyone-abi.json'
import jsonpoolABI from '@oceanprotocol/contracts/artifacts/BPool.json'
//import {web3} from '../web3/utils'
import Web3 from 'web3'
import {allowance} from './AddDTLiquidity'
import {getFairGasPrice} from './AddDTLiquidity'
import Decimal from 'decimal.js'
import BigNumber from 'bignumber.js'
import ApproveLiquidity from '../components/ApproveLiquidity'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import {web3} from '../web3/utils'
import {PRIVATE_KEY, INFURA_KEY} from '../../env'

async function JoinswapExternAmountIn (
  account,
  poolAddress,
  tokenIn,
  tokenAmountIn,
  minPoolAmountOut ) {


    let Tx = require('ethereumjs-tx').Transaction;
    let privateKey = Buffer.from(PRIVATE_KEY, 'hex');
    const contractInstance = new web3.eth.Contract(jsonpoolABI.abi, poolAddress, {from: account})
    const tx = contractInstance.methods.joinswapExternAmountIn(tokenIn,web3.utils.toWei(tokenAmountIn),web3.utils.toWei(minPoolAmountOut))
    const encodedABI = tx.encodeABI();
    let count = await web3.eth.getTransactionCount(account);

      web3.eth.getBlock("latest").then(res => {
        //console.log('gasLimit:', res.gasLimit)
      });

      //console.log({account: account, poolAddress:poolAddress, tokenIn:tokenIn,
      //   encodedABI: encodedABI,tokenAmountIn:tokenAmountIn, minPoolAmountOut:minPoolAmountOut})

         contractInstance.handleRevert


  /** 

         // using the promise
       tx.estimateGas({from: account})
        .then(function(gasAmount){
            console.log('gasAmount:', gasAmount)
        })
        .catch(function(error){
            console.log('error:', error)
        });
         
         // Gas estimation
    contractInstance.deploy({
      data: encodedABI,
      handleRevert: true
    })
    .estimateGas(function(err, gas){
      console.log('gas:', gas);
      console.log('error:', err)
    });
    

ApproveLiquidity(account, poolAddress, tokenIn, tokenAmountIn).then(receipt => {
  if (receipt.status == true) {
    //result = receipt.hash
    console.log({approval: receipt})
  }
   else {
    console.log('ERROR: DT approve failed')
     return null
  }
})


    let rawTransaction = {
        "from":account,
        "gasPrice":web3.utils.toHex(5000000000),
        "gasLimit":web3.utils.toHex(210000),
        "to":tokenIn,
        "data":encodedABI,
        "nonce":web3.utils.toHex(count)
    };

    let transaction = new Tx(rawTransaction, {'chain': 'rinkeby'}); //defaults to mainnet without specifying chain
    transaction.sign(privateKey)

    let result
     (web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))).then(receipt =>{
      //   if (receipt.status !== true) {
       //     console.log(`ERROR: Failed to pay tokens in order to join the pool: ${e.message}`)
        // }
        // result = receipt
        console.log("receipt:", receipt)
     })
    //console.log({TxStatus: result})
    return result;
 */

  }


export default JoinswapExternAmountIn;