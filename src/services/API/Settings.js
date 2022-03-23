export const settings = {
  // development
  baseUrl: 'https://crab.dev.dataunion.app',
  // production
  // baseUrl: 'https://crab.dataunion.app/',
  taxonomy: {
    getImages: '/api/v1/taxonomy/data',
    storeUserResponse: '/api/v1/taxonomy/store',
    getImage: '/api/v1/taxonomy/image?image_id=$[image_id]',
    getLabelImage: '/api/v1/taxonomy/label?label_id=$[label_id]',
    overall:
      '/api/v1/stats/overall-graph?end_date=$[end_date]&start_date=$[start_date]',
    userStats:
      '/api/v1/stats/user-graph?start_date=$[start_date]&end_date=$[end_date]',
    uploadImage: 'api/v1/upload-file',
    annotateImage: 'api/v1/annotate',
    getRomanNumberStats: '/api/v1/stats/tags?bounty=roman-letter-bounty',
  },

  metadata: {
    queryMetadata: '/api/v1/query-metadata',
    getImageById: '/api/v1/get-image-by-id?id=$[image_id]',
    queryTags: '/api/v1/query-tags',
    annotate: '/api/v1/annotate',
    reportImages: '/api/v1/report-images',
    verifyImage: '/api/v1/verify-image',
    myMetadata: '/api/get/my-metadata',
    getTags: '/staticdata/tags?type=$[word_type]',
    uploadImage: '/api/v1/upload-file',
    annotateImage: '/api/v1/annotate',
    getPlayAIAnnotation: '/api/v1/get_playai_annotate',
    setPlayAIAnnotation: '/api/v1/set_playai_annotate',
    query: '/api/v1/metadata/query',
  },

  rewards: {
    rewardsAmount: '/api/v1/rewards/?entity_type=$[entity_type]',
    rewardsList: '/api/v1/rewards/list?entity_type=$[entity_type]&page=$[page]',
    totalRewards: '/api/v1/rewards/total-rewards',
    claimRewards: '/api/v1/rewards/claim',
  },
  //Authentification
  auth: {
    refreshToken: '/refresh',
    login: '/login',
    logout: '/logout',
    get_nounce: '/get-nonce?public_address=$[public_address]',
    register: '/register',
    usageFlag: '/usage-flag',
  },

  alchemy: {
    key: 'https://eth-ropsten.alchemyapi.io/v2/z5z5j5QhacIsJ9zlbpsOxTBR_TAvIcn2',
    getNfts: 'https://eth-ropsten.g.alchemy.com/demo/v1/getNFTs?owner=$[owner]',
    getNFTMetadata:
      'https://eth-ropsten.g.alchemy.com/demo/v1/getNFTMetadata?contractAddress=$[contractAddress]&tokenId=$[tokenId]&tokenType=erc721&refreshCache=true',
  },
  pinata: {
    key: '819593f12b19ebc0c341',
    secret: 'e2176bd2a3549588cfc624d36742003c81e1bf9dc80cab59a67dbc509df9fcaa',
    pinFileToIPFS: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    pinJSONToIPFS: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
  },
  missions: {
    info: '/api/v1/missions/info?page=$[page_number]',
  },
};
