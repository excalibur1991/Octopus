
export const handleSendSignedTx = async (
  // amount,
  web3,
  newAccount,
  destination,
  newPKey,
  //  tokenBal,
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
  PRIVATE_KEY,
  web3,
  account,
  //getFairGasPrice = (web3) => {},
  estGas,
  spender,
  tokenAddress,
  amount,
  token

) => {

  let Tx = require('ethereumjs-tx').Transaction;
  let privateKey = Buffer.from(PRIVATE_KEY, 'hex');
  let count = await web3.eth.getTransactionCount(account);

  let rawTransaction = {
    "from": account,
    "gasPrice": web3.utils.toHex(1050000034),
    //  "gasPrice": web3.utils.toHex(await getFairGasPrice(web3)),
    "gasLimit": web3.utils.toHex(estGas + 1),
    "to": tokenAddress,
    "data": token.methods.approve(spender, amount).encodeABI(),
    "nonce": web3.utils.toHex(count)
  };

  let transaction = new Tx(rawTransaction, { 'chain': 'rinkeby' }); //defaults to mainnet without specifying chain
  transaction.sign(privateKey)
  console.log('getting approval...')
  result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
  console.log('Success!!. You request to join the liquidity pool has been APPROVED....')
  console.log({ ApprovalStatus: result.status, ApprovalReceipt: result })

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
