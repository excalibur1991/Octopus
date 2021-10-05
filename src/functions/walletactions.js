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
