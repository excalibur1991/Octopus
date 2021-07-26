export const settings = {
  // development
  baseUrl: 'https://dev.dataunion.app:8082/',
  //production
  // baseUrl: 'https://alpha.dataunion.app:4430',
  taxonomy: {
    getImages: '/api/v1/taxonomy/data',
    storeUserResponse: '/api/v1/taxonomy/store',
    getImage: '/api/v1/taxonomy/image?image_id=$[image_id]',
    getLabelImage: '/api/v1/taxonomy/label?label_id=$[label_id]',
    //overall: '/api/v1/stats/overall?start_date=$[start_date]&end_date=$[end_date]',
    overall:
      '/api/v1/stats/overall-graph?end_date=$[end_date]&start_date=$[start_date]',
    //userStats: '/api/v1/stats/user?start_date=$[start_date]&end_date=$[end_date]',
    userStats:
      '/api/v1/stats/user-graph?start_date=$[start_date]&end_date=$[end_date]',
    uploadImage: 'api/v1/upload-file',
    annotateImage: 'api/v1/annotate',
  },

  metadata: {
    queryMetadata: '/api/v1/query-metadata',
    getImageById: '/api/v1/get-image-by-id?id=$[image_id]',
    queryTags: '/api/v1/query-tags',
    annotate: '/api/v1/annotate',
    reportImages: '/api/v1/report-images',
    verifyImage: '/api/v1/verify-image',
    myMetadata: '/api/get/my-metadata',
    getTags: '/staticdata/tags?type=$[word_type]'
  },


  //Authentification
  auth: {
    refreshToken: '/refresh',
    login: '/login',
    logout: '/logout',
    get_nounce: '/get-nonce?public_address=$[public_address]',
    register: '/register',
  },
};
