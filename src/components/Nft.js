/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {theme} from '../services/Common/theme';
// import {getWalletData} from '../services/DataManager';
import {getNfts, getNftMetadata} from '../services/API/APIManager';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import MintNft from './MintNft';
import Ripple from './Ripple';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const DataUnionLogo = require('../assets/app-logo.png');

const CONTRACT_ADDRESS = '0x597f9060cfa09788642a047f6f4ccd4a1d7197e6';
// const CONTRACT_ADDRESS = '0xA4FaF4049d96e819b54603Cc18F38a4739341C59';

const walletInfo = {
  privateKey:
    '16458caa670d74c96af045464654014d6b5eb4d19610b259fe05ac44648b564b',
  publicKey: '0xCDCc8fbDFa5c8d398c362694704eAB5fEabc5006',
  seedPhrase:
    'wonder decline culture ostrich debris cook differ rely drift label used ask',
  password: 'Pass#1234',
};

// const walletInfo = {
//   privateKey:
//     '0x0b0a88e70555ed53cea19f98cd8ba2dea19088eb2572c1d6d4ce468917ec0e99',
//   publicKey: '0xAE8d331c13d53F74051E7949af521B98aCc2656d',
//   seedPhrase:
//     'inform stone people riot autumn leisure friend lazy claw market cycle festival',
//   password: 'osJEmtC9JV',
// };

const Nft = () => {
  const [wallet, setWallet] = useState(walletInfo);
  const [contractAddress, setContractAddress] = useState(CONTRACT_ADDRESS);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [nftMetadata, setNftMetadata] = useState(null);

  const [openMintNft, setOpenMintNft] = useState(false);

  // const getWalletInfo = async () => {
  //   const res = await getWalletData();
  //   setWallet(res);
  // };

  const fetchNfts = async (isFirst = false) => {
    setLoading(true);
    const res = await getNfts(wallet.publicKey);
    if (res && res.ownedNfts && res.ownedNfts.length > 0) {
      setNfts(res.ownedNfts);
      if (isFirst) {
        fetchNftMetadata(
          res.ownedNfts[0].contract.address,
          res.ownedNfts[0].id.tokenId,
        );
      }
    }
    setLoading(false);
  };

  const fetchNftMetadata = async (contractAddress, tokenId) => {
    setLoadingMetadata(true);
    setNftMetadata(null);
    const res = await getNftMetadata(contractAddress, tokenId);
    if (res && res.metadata) {
      setNftMetadata(res);
    }
    setLoadingMetadata(false);
  };

  const handleOpenMintNft = () => {
    setOpenMintNft(true);
  };

  const handleCloseMintNft = () => {
    setOpenMintNft(false);
  };

  useEffect(() => {
    fetchNfts(true);
  }, []);

  return (
    <>
      <MintNft
        wallet={wallet}
        open={openMintNft}
        onClose={handleCloseMintNft}
        contractAddress={contractAddress}
      />
      {/* <View style={styles.tcCloseButtonContainer}>
        <Ripple
          disabled={loading}
          onPress={() => fetchNfts()}
          style={styles.tcCloseButton}>
          {!loading ? (
            <FontAwesome size={10} name="refresh" color={theme.COLORS.WHITE} />
          ) : (
            <ActivityIndicator color={theme.COLORS.WHITE} size="small" />
          )}
        </Ripple>
      </View> */}
      {loadingMetadata ? (
        <ActivityIndicator color={theme.COLORS.WHITE} size="large" />
      ) : (
        <Menu renderer={renderers.SlideInMenu}>
          <MenuTrigger
            // onAlternativeAction={handleOpenMintNft}
            customStyles={{
              triggerOuterWrapper: {
                borderRadius: 60,
                overflow: 'hidden',
              },
            }}>
            <Image
              borderRadius={100}
              resizeMode="stretch"
              style={styles.image}
              source={
                nftMetadata &&
                nftMetadata.metadata &&
                nftMetadata.metadata.image
                  ? {uri: nftMetadata.metadata.image}
                  : DataUnionLogo
              }
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsWrapper: {
                width: '95%',
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 10,
                paddingHorizontal: 10,
                borderColor: theme.COLORS.WHITE,
                backgroundColor: theme.APP_COLOR_2,
              },
              optionsContainer: {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
              },
            }}>
            {nfts &&
              nfts.length > 0 &&
              nfts.map((nft, index) => (
                <MenuOption
                  onSelect={() =>
                    fetchNftMetadata(nft.contract.address, nft.id.tokenId)
                  }
                  customStyles={{
                    optionWrapper: {
                      borderBottomWidth: index !== nfts.length - 1 ? 1 : 0,
                      borderBottomColor: theme.COLORS.WHITE,
                    },
                  }}>
                  <Text style={styles.optionText}>
                    {(nft.id &&
                      nft.id.tokenId &&
                      `${parseInt(nft.id.tokenId, 16)}`) ||
                      ''}
                  </Text>
                </MenuOption>
              ))}
          </MenuOptions>
        </Menu>
      )}
    </>
  );
};

export default Nft;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 160,
    width: 160,
  },
  button: {
    elevation: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.APP_COLOR_2,
    shadowOffset: {width: 0, height: 4},
  },
  buttonText: {
    color: theme.COLORS.WHITE,
  },
  optionDivider: {
    height: 1,
    marginVertical: 5,
    backgroundColor: theme.COLORS.WHITE,
  },
  optionText: {
    textAlign: 'center',
    color: theme.COLORS.WHITE,
  },
  tcCloseButtonContainer: {
    left: 0,
    right: 0,
    zIndex: 1,
    bottom: 10,
    position: 'absolute',
    alignItems: 'center',
  },
  tcCloseButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.APP_COLOR_1,
  },
});
