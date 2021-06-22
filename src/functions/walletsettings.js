import * as Utils from '../web3/utils';
import lightwallet from 'eth-lightwallet';
import bip39 from 'react-native-bip39';
import {hdPathString, localStorageKey} from '../web3/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rinkebyConnect} from '../web3/getWeb3';
import {ropstenConnect} from '../web3/getWeb3';
import {kovanConnect} from '../web3/getWeb3';
import {mainConnect} from '../web3/getWeb3';
import {rinkeby} from '../web3/constants';
import {ropsten} from '../web3/constants';
import {web3} from '../web3/getWeb3';
import Web3 from 'web3';
import minABI from '../abis/minABI.json';
import DaiToken from '../abis/DaiToken.json';
import erc20 from '../abis/erc20.json';

export const chkNetwork = async (context, checkNetwork) => {
  try {
    context.setState({
      networktype: await rinkebyConnect().eth.net.getNetworkType(),
    });
    context.setState({
      networktype: await kovanConnect().eth.net.getNetworkType(),
    });
    context.setState({
      networktype: await ropstenConnect().eth.net.getNetworkType(),
    });
    context.setState({
      networktype: await mainConnect().eth.net.getNetworkType(),
    });
    // context.rinkebynet =  await rinkebyConnect().eth.net.getNetworkType()
    //  context.kovannet = await kovanConnect().eth.net.getNetworkType()
    //  context.ropstennet = await ropstenConnect().eth.net.getNetworkType()
    //  context.mainnnet = await mainConnect().eth.net.getNetworkType()
    context.rinkebyCheck = await rinkebyConnect().eth.net.isListening();
    context.ropstenCheck = await ropstenConnect().eth.net.isListening();
    context.kovannetCheck = await kovanConnect().eth.net.isListening();
    context.mainnetCheck = await mainConnect().eth.net.isListening();
  } catch (error) {
    console.error('error:', error);
  }

  if (
    context.rinkebyCheck == true ||
    context.ropstenCheck == true ||
    context.kovannetCheck == true ||
    context.mainnetCheck == true
  ) {
    context.setState({isConnected: true});
    //console.log("CONNECTED!")
  }
  //rinkebynet = await rinkebyConnect().eth.net.getNetworkType()
  //context.setState({ rinkebynet: await rinkebyConnect().eth.net.getNetworkType()})
  clearInterval(checkNetwork);
};

export const webThreeReturned = async (context, web3Returned) => {
  if (context.props.web3 != null) {
    clearInterval(web3Returned);
    context.web3 = context.props.web3.web3Instance;
    // console.log("web3 result:", context.web3)
    Utils.checkNetwork(context.web3).then((res) => {
      console.log('Network:', res);
      // context.networktype = res
      context.setState({networktype: res});
      if (
        res == 'local' ||
        res == 'rinkeby' ||
        res == 'kovan' ||
        res == 'ropsten' ||
        res == 'main'
      ) {
        context.setState({isConnected: true});
      }
    });
    try {
      console.log('check account');
      Utils.checkAccount(context.web3, context.props.STPupdateAccounts);
    } catch (err) {
      console.error('error', err);
    }
  }
};

export const createNewAccts = async (context) => {
  let allWallets = [];
  const entropy = await Utils.getRandom(16);
  try {
    allWallets = await web3(
      context.state.networktype,
    ).eth.accounts.wallet.create(1, entropy);
    //console.log({allWallets: allWallets[0]})
  } catch (error) {
    console.log(error);
  }
  return allWallets[0].address
    ? allWallets[0].address
    : allWallets[0].privateKey
    ? allWallets[0].privateKey
    : '';
};

export const handleNewWallet = async (context) => {
  let allWallets = [];
  let allEthBal = ' ';
  let oceanrinkeby,
    oceanropsten,
    oceanmainnet = '';
  let daiToken,
    daiTokenBalance = ' ';
  let phec0rinkeby = '';
  const entropy = await Utils.getRandom(16);
  //console.log({DaiToken: DaiToken, DappToken: DappToken, minABI: minABI, TokenFarm: TokenFarm})
  let oceanRinkebyContract = '0x8967BCF84170c91B0d24D4302C2376283b0B3a07'; //rinkeby ocean
  let walletAddress = '0x5D363EC1EF55005C39c0e36C50b06242aeb3C3D4'; // wallet
  let oceanRopstenContract = '0x5e8DCB2AfA23844bcc311B00Ad1A0C30025aADE9'; // ropsten ocean
  let oceanMainnetContract = '0x967da4048cD07aB37855c090aAF366e4ce1b9F48'; // ocean mainnet
  let polygonMainnetContract = '0x282d8efCe846A88B159800bd4130ad77443Fa1A1'; // Polygon Mainnet (previously Matic)
  let DaiMainnetContract = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
  let DaiKovanContract = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa';
  let mDaiRinkebyContract = '0x6f5390A8CD02d83B23C5f1d594bFFB9050Eb4Ca3';
  let erc20RinkebyContract = '0xCC4d8eCFa6a5c1a84853EC5c0c08Cc54Cb177a6A';
  let erc20LiqExchContract = '0x416F1Ac032D1eEE743b18296aB958743B1E61E81';
  let erc20WalletAddress = '0x0E364EB0Ad6EB5a4fC30FC3D2C2aE8EBe75F245c';
  let uniswapExchangeContract = '0xf5d915570bc477f9b8d6c0e980aa81757a3aac36';
  let quicra0LiqPoolContract = '0xAAB9EaBa1AA2653c1Dda9846334700b9F5e14E44';
  let quicra0TokenContract = '0x7Bce67697eD2858d0683c631DdE7Af823b7eea38';
  let phecor0RinkebyTokenContract =
    '0xe793a47892854260b42449291953dadbddb4226d';

  try {
    allWallets = await web3(
      context.state.networktype,
    ).eth.accounts.wallet.create(1, entropy);
    allEthBal = await web3(context.state.networktype)
      .eth.getBalance(allWallets[0].address)
      .then((bal) =>
        web3(context.state.networktype).utils.fromWei(bal, 'ether'),
      );
    context.state.isConnected
      ? context.setState({ethTokenBal: allEthBal})
      : context.setState({ethTokenBal: ' '});
    context.state.isConnected
      ? context.setState({wallet: allWallets})
      : context.setState({wallet: ''});
    context.state.isConnected
      ? context.setState({publicKey: allWallets[0].address})
      : context.setState({publicKey: ''});
    context.state.isConnected
      ? context.setState({privateKey: allWallets[0].privateKey})
      : context.setState({privateKey: ' '});

    // saving..

    console.log({allWallets: allWallets[0], allEthBal: allEthBal});
    console.log({
      ethTokenBal: context.state.ethTokenBal,
      wallet: context.state.wallet,
      publicKey: context.state.publicKey,
      privateKey: context.state.privateKey,
    });
  } catch (error) {
    console.log(error);
  }
  //DaiToken...
  const networkId = await web3(context.state.networktype).eth.net.getId();
  const daiTokenData = DaiToken.networks[5777];

  //ERC Balances...
  if (context.state.isConnected && context.state.networktype == 'rinkeby') {
    oceanrinkeby = new (web3(context.state.networktype).eth.Contract)(
      minABI,
      oceanRinkebyContract,
    );
    phec0rinkeby = new (web3(context.state.networktype).eth.Contract)(
      erc20,
      phecor0RinkebyTokenContract,
    );

    //console.log('destination:', address.rinkeby.DTFactory)

    phec0rinkeby.methods.balanceOf(walletAddress).call((error, balance) => {
      let formatted = new Web3(rinkeby).utils.fromWei(balance);
      console.log('formatted:', formatted);
      let rounded = Math.round(formatted * 100) / 100;
      context.setState({phec0ERC20TokenBal: rounded});
      console.log({
        pheco0erc20balance: balance,
        formattedBalance: context.state.phec0ERC20TokenBal,
      });
    });
    //console.log({oceanrinkeby: oceanrinkeby, erc20Token: erc20Token, ExchContract: ExchContract});
    //  console.log({ tx: tx, encodeABI: encodedABI})

    oceanrinkeby.methods.balanceOf(walletAddress).call((error, balance) => {
      context.setState({
        oceanERC20TokenBal: new Web3(rinkeby).utils.fromWei(balance),
      });
      console.log({
        oceanbalance: balance,
        formattedBalance: context.state.oceanERC20TokenBal,
      });
    });
  } else if (
    context.state.isConnected &&
    context.state.networktype == 'ropsten'
  ) {
    oceanropsten = new (web3(context.state.networktype).eth.Contract)(
      minABI,
      oceanRopstenContract,
    );
    oceanropsten.methods.balanceOf(walletAddress).call((error, balance) => {
      context.setState({
        oceanERC20TokenBal: new Web3(ropsten).utils.fromWei(balance),
      });
      console.log({
        oceanbalance: balance,
        formattedBalance: context.state.oceanERC20TokenBal,
      });
    });
  } else if (
    context.state.isConnected &&
    context.state.networktype == 'kovan'
  ) {
    console.log('Kovan selected');
  } else {
    oceanmainnet = new (web3(context.state.networktype).eth.Contract)(
      minABI,
      oceanMainnetContract,
    );
    oceanmainnet.methods.balanceOf(walletAddress).call((error, balance) => {
      context.setState({
        oceanERC20TokenBal: new Web3(ropsten).utils.fromWei(balance),
      });
      console.log({
        oceanbalance: balance,
        formattedBalance: context.state.oceanERC20TokenBal,
      });
    });
  }

  console.log({
    networktype: context.state.networktype,
    Address: context.state.wallet[0].address,
  });

  let sKeys = {};
  let storeKeys = {};
  let salt = 'salt';
  let seedPhrase = '';
  let ks = {};
  const saveWallet = async (walletdump) => {
    console.log('saving Wallet...');
    await AsyncStorage.setItem(localStorageKey, JSON.stringify(walletdump));
  };

  try {
    bip39.generateMnemonic(128).then((phrase) => {
      console.log('phrase:', phrase);
      context.setState({mnemonics: phrase});
      //seedPhrase = phrase
      // Utils.updateSeedPhrase(seedPhrase, context.props.STPupdateSeedPhrase)
    });

    let arr = new Uint8Array(20);
    crypto.getRandomValues(arr);

    let password = btoa(String.fromCharCode(...arr))
      .split('')
      .filter((value) => {
        return !['+', '/', '='].includes(value);
      })
      .slice(0, 10)
      .join('');

    context.setState({pword: password});

    sKeys = {
      password: context.state.pword,
      seedPhrase: context.state.mnemonics,
      publicKey: context.state.publicKey,
      privateKey: context.state.privateKey,
      ethBal: context.state.ethTokenBal,
      oceanBal: context.state.oceanERC20TokenBal,
      phecorBal: context.state.phec0ERC20TokenBal,
    };
    context.storeKeys = sKeys;

    saveWallet();

    // context.password = password;
    //context.seedPhrase = seedPhrase;
    /**
      const opt = { password, seedPhrase, hdPathString, salt };

    lightwallet.keystore.createVault(opt, (err, data) => {
      if (err)
      console.log("keystore:", data)
        console.warn(err)
      ks = data
      const walletdump = { ver: '1', ks: ks.serialize(), }
      saveWallet(walletdump)
    })
   */
  } catch (err) {
    console.log(err);
  }
};

export const handleNewWallet_ = async (context) => {
  const entropy = await Utils.getRandom(16);
  try {
    while (context.state.isConnected) {
      switch (context.state.networktype) {
        case 'mainnet':
          return mainConnect()
            .eth.accounts.create(entropy)
            .then((res) => {
              context.wallet = res;
            });
        case 'rinkeby':
          return rinkebyConnect()
            .eth.accounts.create(entropy)
            .then((res) => {
              context.wallet = res;
            });
        case 'ropsten':
          return ropstenConnect()
            .eth.accounts.create(entropy)
            .then((res) => {
              context.wallet = res;
            });
        case 'kovan':
          return kovanConnect()
            .eth.accounts.create(entropy)
            .then((res) => {
              context.wallet = res;
            });
        default:
          return 'local';
      }
    }
  } catch (err) {
    console.warn('No connection!');
    return 'none';
  }
};

export const handleNewAccount_ = async (context) => {
  if (context.state.isConnected && context.state.networktype == 'kovan') {
    //let web33 = await rinkebyConnect()
    Utils.createAccFunc(context.web3, context.props.STPupdateAccounts).then(
      (res) => {
        console.log('res:', res);
        context.wallet = res;
        console.log('connected?:', context.state.isConnected);
        console.log('networktype:', context.state.networktype);
        // console.log("rinkebyConnect:", web33)
      },
    );
  }

  let salt = 'salt';
  let seedPhrase = '';
  let ks = {};

  const saveWallet = async (walletdump) => {
    console.log('saving Wallet...');
    await AsyncStorage.setItem(localStorageKey, JSON.stringify(walletdump));
  };

  try {
    bip39.generateMnemonic(128).then((mnemonic) => {
      seedPhrase = mnemonic;
      Utils.updateSeedPhrase(seedPhrase, context.props.STPupdateSeedPhrase);
    });

    let arr = new Uint8Array(20);
    crypto.getRandomValues(arr);
    let password = btoa(String.fromCharCode(...arr))
      .split('')
      .filter((value) => {
        return !['+', '/', '='].includes(value);
      })
      .slice(0, 10)
      .join('');

    context.password = password;
    const opt = {password, seedPhrase, hdPathString, salt};

    lightwallet.keystore.createVault(opt, (err, data) => {
      if (err) {
        console.warn(err);
      }
      ks = data;
      const walletdump = {ver: '1', ks: ks.serialize()};
      saveWallet(walletdump);
    });
  } catch (err) {
    console.log(err);
  }
  console.log({
    seedphrase: seedPhrase,
    ksvault: ks,
    cryptopass: context.password,
  });
  return context.wallet;
};

export const checkERC20Bal = async () => {
  let oceanRinkebyContract = '0x8967BCF84170c91B0d24D4302C2376283b0B3a07'; //rinkeby ocean
  let walletAddress = '0x5D363EC1EF55005C39c0e36C50b06242aeb3C3D4'; // wallet
  let oceanRopstenContract = '0x5e8DCB2AfA23844bcc311B00Ad1A0C30025aADE9'; // ropsten ocean
  let oceanMainnetContract = '0x967da4048cD07aB37855c090aAF366e4ce1b9F48'; // ocean mainnet
  let polygonMainnetContract = '0x282d8efCe846A88B159800bd4130ad77443Fa1A1'; // Polygon Mainnet (previously Matic)
};

export const saveData = async (context) => {
  try {
    await AsyncStorage.setItem(context.STORAGE_KEY, context.state.age);
    alert('Data successfully saved');
  } catch (e) {
    alert('Failed to save the data to the storage');
  }
};

export const readData = async (context) => {
  try {
    //checkNetwork();
    //initWallet();
    const userAge = await AsyncStorage.getItem(context.STORAGE_KEY);

    if (userAge !== null) {
      //setAge(userAge)
      context.setState({age: userAge});
    }
  } catch (e) {
    alert('Failed to fetch the data from storage');
  }
};

export const saveWallet = async (context) => {
  try {
    console.log('Saving Data...', context.storeKeys);

    await AsyncStorage.setItem(
      context.STORAGE_KEY,
      JSON.stringify(context.storeKeys),
    );
    // await AsyncStorage.multiSet(multiSet)

    alert('Data successfully saved');
  } catch (e) {
    alert('Failed to save the data to the storage');
  }
};

export const readStoredWallet = async (context) => {
  try {
    const userInfo = JSON.parse(
      await AsyncStorage.getItem(context.STORAGE_KEY),
    );
    //AsyncStorage.getItem('name').then((value) => context.setState({ 'name': value }))

    console.log({
      userInfo: userInfo,
      address: userInfo.publicKey,
      privateKey: userInfo.privateKey,
      seedphrase: userInfo.seedPhrase,
      password: userInfo.password,
      oceanBal: userInfo.oceanBal,
      ethBal: userInfo.ethBal,
      phecorBal: userInfo.phecorBal,
    });

    if (userInfo !== null) {
      console.log('retrieving saved data...');
      //setAge(userAge)
      context.setState({wallet: userInfo});
      context.setState({publicKey: userInfo.publicKey});
      context.setState({privateKey: userInfo.privateKey});
      context.setState({mnemonics: userInfo.seedphrase});
      context.setState({pword: userInfo.password});
      context.setState({oceanERC20TokenBal: userInfo.oceanBal});
      context.setState({ethTokenBal: userInfo.ethBal});
      context.setState({phec0ERC20TokenBal: userInfo.phecorBal});

      console.log({
        restoredWallet: context.state.wallet,
        publicKey: context.state.publicKey,
        privateKey: context.state.privateKey,
      });
    }
  } catch (e) {
    alert('Failed to fetch the data from storage');
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    alert('Storage successfully cleared!');
  } catch (e) {
    alert('Failed to clear the async storage.');
  }
};

export const onChangeText = (userAge, context) => {
  //setAge(userAge)
  context.setState({age: userAge});
};

export const onSubmitEditing = (context) => {
  if (!context.state.age) {
    return;
  }

  context.saveData(age);
  // setAge('')
  context.setState({age: ' '});
};
