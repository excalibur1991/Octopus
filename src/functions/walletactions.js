import { OceanPool } from '../components/OceanPool';
import { STORAGE_KEY } from './walletsettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFairGasPrice } from '../utils'

export const handleSendSignedTx = async (
  amount,
  web3,
  newAccount,
  destination,
  newPKey,
  tokenBal,
) => {
  const nonce = await web3.eth.getTransactionCount(newAccount, 'latest'); // nonce starts counting from 0

  const transaction = {
    to: destination, // faucet address to return eth
    value: web3.utils.toWei('0.5', 'ether'), // 1 ETH = 1000000000000000000 wei
    gas: 1000000,
    nonce: nonce,
    // optional data field to send message or execute smart contract
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    newPKey,
  );
  //console.log({
  //  signedTx: signedTx,
  //  nonce: nonce,
  //  tokenBal: tokenBal,
  //  destination: destination,
  //  PKey: newPKey,
  //});

  web3.eth.sendSignedTransaction(
    signedTx.rawTransaction,
    function (error, hash) {
      //this.hash = hash
      if (!error) {
        //console.log(
        //  '🎉 The hash of your transaction is: ',
        //  hash,
        // "\n Check Alchemy's Mempool to view the status of your transaction!",
        //);
        //console.log('SignedTx: m', signedTx);
      } else {
        //console.log(
        //  '❗Something went wrong while submitting your transaction:',
        //  error,
        //);
      }
    },
  );
};

export const calculateTokenBal = async (contract, address) => {
  const tokenBal = contract.methods
    .balanceOf(address)
    .call((error, balance) => balance);

  return tokenBal;
}

export const sendSignedTransaction = async (
  private_Key,
  web3,
  fromAddress,
  gasLimit,
  tranx,
  toAddress,

) => {

  try {

    let Tx = require('ethereumjs-tx').Transaction;
    let privateKey = Buffer.from(private_Key, 'hex');
    let count = await web3.eth.getTransactionCount(fromAddress);

    let rawTransaction = {
      "from": fromAddress,
      // "gasPrice": web3.utils.toHex(1050000034),
      "gasPrice": web3.utils.toHex (await getFairGasPrice(web3)),
      "gasLimit": web3.utils.toHex(gasLimit + 1),
      "to": toAddress,
      // "data": token.methods.approve(spender, amount).encodeABI(),
      "data": tranx.encodeABI(),
      "nonce": web3.utils.toHex(count)
    };

    let transaction = new Tx(rawTransaction, { 'chain': 'rinkeby' }); //defaults to mainnet without specifying chain
    transaction.sign(privateKey)
    console.log('sending transaction...')
    let result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));

    return result;
  }
  catch (e) {
    console.log(`ERRPR: Transaction Failed: ${e.message}`)
  }

}

export const getMaxPercentRemove = async (
  ocean,
  poolAddress,
  poolTokens
) => {
  const amountMaxOcean = await ocean.getOceanMaxRemoveLiquidity(
    poolAddress
  )

  const amountMaxPoolShares = await ocean.getPoolSharesRequiredToRemoveOcean(
    poolAddress,
    amountMaxOcean
  )

  let amountMaxPercent = `${Math.floor(
    (Number(amountMaxPoolShares) / Number(poolTokens)) * 100
  )}`
  if (Number(amountMaxPercent) > 100) {
    amountMaxPercent = '100'
  }

  return amountMaxPercent
}

export const oceanHelper = () => {
  let ocean = new OceanPool();
  return ocean;
}

export const retrievedCurrTokens = async (poolAddress) => {
  if (!oceanHelper) return;
  const currTokens = await oceanHelper().getCurrentTokens(poolAddress)
  const tokenList = {
    oceanAddress: currTokens[1],
    tokenAddress: currTokens[0]
  }
  return tokenList;
}

export const retrievedContracts = async (web3, abi, poolAddress) => {
  let tokens = await retrievedCurrTokens(poolAddress)
  if (!tokens) return;

  const tokenInstance = new web3.eth.Contract(abi, tokens.tokenAddress);
  const oceanInstance = new web3.eth.Contract(abi, tokens.oceanAddress);
  const contractList = {
    tokenContract: tokenInstance,
    oceanContract: oceanInstance
  }

  return contractList
}

export const retrievedCoins = async (web3, abi, poolAddress) => {
  let contractList = await retrievedContracts(web3, abi, poolAddress)
  if (!contractList) return;

  const oceanSymbol = await contractList.oceanContract.methods.symbol().call()
  const tokenSymbol = await contractList.tokenContract.methods.symbol().call()
  const symbolList = {
    oceanSymbol:oceanSymbol,
    tokenSymbol:tokenSymbol
  }

  return symbolList;
}

export const currWalletBals = async (web3, abi, poolAddress) => {
  const userInfo = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
  let contractList = await retrievedContracts(web3, abi, poolAddress)
  if (!contractList) return;

  const ethBal = await web3.eth.getBalance(userInfo.publicKey).then((bal) =>
    Number(web3.utils.fromWei(bal, 'ether')).toFixed(2));

  const tokenBal = await calculateTokenBal(contractList.tokenContract, userInfo.publicKey)
  const tokenBalance = Number(web3.utils.fromWei(tokenBal)).toFixed(2)

  const oceanBal = await calculateTokenBal(contractList.oceanContract, userInfo.publicKey)
  const oceanBalance = Number(web3.utils.fromWei(oceanBal)).toFixed(2)
  const balanceList = {
    ethBal: ethBal,
    tokenBal: tokenBalance,
    oceanBal: oceanBalance
  }

  return balanceList;

}

export const calcSharesBal = async (poolAddress) => {
  const userInfo = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
  const userShares = await oceanHelper().sharesBalance(
    userInfo.publicKey, // accountId,
    poolAddress //price.address
  )
  return Number(userShares).toFixed(2);
}
