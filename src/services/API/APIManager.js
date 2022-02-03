import {
  getData,
  getFile,
  postData,
  getUserData,
  postUserData,
} from './CoreAPICalls';
import {settings as s} from './Settings';

export const getAllImages = async () => {
  try {
    const response = await getUserData(s.taxonomy.getImages);
    return response;
  } catch (err) {
    return null;
  }
};

export const getOverall = async (start, end) => {
  try {
    const response = await getData(
      s.taxonomy.overall
        .replace('$[start_date]', start)
        .replace('$[end_date]', end),
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const getUserStats = async (start, end) => {
  try {
    const response = await getUserData(
      s.taxonomy.userStats
        .replace('$[start_date]', start)
        .replace('$[end_date]', end),
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const getImage = async (imageId) => {
  try {
    const response = await getFile(
      s.taxonomy.getImage.replace('$[image_id]', imageId),
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const getLabelImage = async (label) => {
  try {
    const response = await getFile(
      s.taxonomy.getLabelImage.replace('$[label_id]', label),
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const storeUserResponse = async (data) => {
  try {
    const response = await postUserData(s.taxonomy.storeUserResponse, data);
    return response;
  } catch (err) {
    return null;
  }
};

export const userLogin = async (public_address, signature) => {
  try {
    let data = {public_address: public_address, signature: signature};
    const response = await postData(s.auth.login, data);
    return response;
  } catch (err) {
    return null;
  }
};

export const userRegister = async (public_address) => {
  try {
    let data = {public_address: public_address};
    const response = await postData(s.auth.register, data);
    return response;
  } catch (err) {
    return null;
  }
};

export const userLogout = async () => {
  try {
    const response = await getData(s.auth.logout);
    return response;
  } catch (err) {
    return null;
  }
};

/**
 * Verification APIs
 */
/**
 * queryMetadata
 * @param {*} page
 * @param {*} type (optional) BoundingBox, TextTag, Anonymization
 * @param {*} tags (optional) ["birdhouse"]
 * @param {*} fields (optional) ["image_id","descriptions","tags"],
 *
 * @returns
 *
 */
//{"page":1,"page_size":100,"result":[{"descriptions":[],"image_id":"df970b07070d3800","tag_data":["meme bounty"]},{"descriptions":[],"image_id":"ff0f004440fffb04","tag_data":["nft+art bounty"]},{"descriptions":[],"image_id":"e0f0f0e0f8fcfedf","tag_data":["nft+art bounty"]},{"descriptions":[],"image_id":"20f8f86cf8f86600","tag_data":["nft+art bounty"]},}]}
export const queryMetadata = async (data) => {
  //const data = {page: page, status: status, fields: fields, type: type};
  //check if tags empty, then what result?

  try {
    const response = await postUserData(s.metadata.queryMetadata, data);
    return response;
  } catch (err) {
    return null;
  }
};

export const getImageById = async (imageId) => {
  try {
    const response = await getFile(
      s.metadata.getImageById.replace('$[image_id]', imageId),
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const getNounce = async (public_address) => {
  try {
    const response = await getData(
      s.auth.get_nounce.replace('$[public_address]', public_address),
    );
    return response;
  } catch (err) {
    return null;
  }
};

/**
 * {annotation: {tags: [], description: ""}
 * image_id: "003c3c7c7c7c3c3c"
 * verification: {tags: {up_votes: [], down_votes: []}, descriptions: {up_votes: ["Peonies flower"], down_votes: []}}}
 */
export const verifyImage = async (image_id, annotation, verification) => {
  const data = {
    image_id: image_id,
    annotation: annotation,
    verification: verification,
  };
  try {
    const response = await postUserData(s.metadata.verifyImage, data);
    return response;
  } catch (err) {
    return null;
  }
};

export const uploadImage = async (data) => {
  try {
    const response = await postUserData(s.taxonomy.uploadImage, data, true);
    return response;
  } catch (err) {
    return null;
  }
};

export const annotateImage = async (data) => {
  try {
    const response = await postUserData(s.taxonomy.annotateImage, data);
    return response;
  } catch (err) {
    return null;
  }
};

/**
 * POST
 * {photos: [{photo_id: "fffff1000010787c"}]}
 */
export const reportImages = async (photos) => {
  const data = {photos: [...photos]};
  try {
    const response = await postUserData(s.metadata.reportImages, data);
    return response;
  } catch (err) {
    return null;
  }
};

export const GetWords = async (word_type) => {
  try {
    const response = await getData(
      s.metadata.getTags.replace('$[word_type]', word_type),
    );
    return response;
  } catch (err) {
    return null;
  }
};

/**
 *
 * {
 *  image_id:"f7f080000080f8fc",
 *  annotations: [{type: "box", tag: "food bounty", x: 0.017901029601219743, y: 0.245839636913767, width: 0.9639395801815431,height: 0.3282904689863842}, ...]
 * }
 */
export const annotate = async (data) => {
  try {
    const response = await postUserData(s.metadata.annotate, data);
    return response;
  } catch (err) {}
  return null;
};

export const getUsageFlag = async () => {
  try {
    const response = await getUserData(s.auth.usageFlag);
    return response;
  } catch (err) {
    return null;
  }
};

export const saveUsageFlag = async (data) => {
  try {
    const response = await postUserData(s.auth.usageFlag, data);
    return response;
  } catch (err) {
    return null;
  }
};

export const getRomanNumberStats = async () => {
  try {
    const response = await getUserData(s.taxonomy.getRomanNumberStats);
    return response;
  } catch (err) {
    return null;
  }
};

export const getNfts = async (owner) => {
  try {
    const config = {
      method: 'get',
    };
    const response = await fetch(
      s.alchemy.getNfts.replace('$[owner]', owner),
      config,
    );
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
};

export const getNftMetadata = async (contractAddress, tokenId) => {
  try {
    const config = {
      method: 'get',
    };
    const response = await fetch(
      s.alchemy.getNFTMetadata
        .replace('$[contractAddress]', contractAddress)
        .replace('$[tokenId]', tokenId),
      config,
    );
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
};

export const pinFileToIPFS = async (file) => {
  const req = new FormData();
  req.append('file', file);
  const config = {
    method: 'post',
    headers: {
      pinata_api_key: s.pinata.key,
      pinata_secret_api_key: s.pinata.secret,
      'Content-Type': 'multipart/form-data',
    },
    body: req,
  };
  try {
    const response = await fetch(s.pinata.pinFileToIPFS, config)
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return null;
  }
};

export const pinJSONToIPFS = async (data) => {
  const config = {
    method: 'post',
    headers: {
      pinata_api_key: s.pinata.key,
      pinata_secret_api_key: s.pinata.secret,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(s.pinata.pinJSONToIPFS, config)
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return null;
  }
};

// export const pinJSONToIPFS = async (JSONBody) => {
//   const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
//   return axios
//     .post(url, JSONBody, {
//       headers: {
//         pinata_api_key: key,
//         pinata_secret_api_key: secret,
//       },
//     })
//     .then(function (response) {
//       return {
//         success: true,
//         pinataUrl:
//           'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
//       };
//     })
//     .catch(function (error) {
//       console.log(error);
//       return {
//         success: false,
//         message: error.message,
//       };
//     });
// };
