import {actions} from '../services/State/Reducer';
import {uploadImage, annotateImage} from '../services/API/APIManager';
import DocumentPicker from 'react-native-document-picker';

export const onPickFile = async (
  dispatch = () => {},
  files = [],
  setFiles = () => {},
  fileUploadResponses = [],
  setFileUploadResponses = () => {},
  setUploadingImageIndex = () => {},
  setProgress = () => {},
  setSuccess = () => {},
  setError = () => {},
  setErrorText = () => {},
  setImageId = () => {},
  append = false,
) => {
  try {
    setProgress(0);
    setSuccess(false);
    setError(false);
    setErrorText('');
    const pickedFiles = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.images],
    });
    if (pickedFiles && pickedFiles.length > 0) {
      if (append) {
        const allFiles = files.slice();
        pickedFiles.forEach((file) => allFiles.push(file));
        setFiles(allFiles);
        uploadMultipleFiles(
          allFiles,
          pickedFiles,
          fileUploadResponses,
          setFileUploadResponses,
          setUploadingImageIndex,
        );
      } else {
        setFiles(pickedFiles);
        if (pickedFiles && pickedFiles.length === 1) {
          uploadFile(
            dispatch,
            pickedFiles[0],
            setProgress,
            setSuccess,
            setError,
            setErrorText,
            setImageId,
          );
        } else {
          const allFiles = files.slice();
          uploadMultipleFiles(
            allFiles,
            pickedFiles,
            fileUploadResponses,
            setFileUploadResponses,
            setUploadingImageIndex,
          );
        }
      }
    }
  } catch (err) {}
};

export const uploadFile = async (
  dispatch = () => {},
  file = {},
  setProgress = () => {},
  setSuccess = () => {},
  setError = () => {},
  setErrorText = () => {},
  setImageId = () => {},
) => {
  try {
    setProgress(0.8);
    const filedata = new FormData();
    filedata.append('file', file);
    const result = await uploadImage(filedata);
    if (result) {
      if (result.id) {
        setImageId(result.id);
        setProgress(1);
        setSuccess(true);
      } else if (result.message) {
        setError(true);
        setErrorText(result.message);
      } else if (
        result.status &&
        result.status === 'failed' &&
        result.messages &&
        result.messages.length > 0
      ) {
        setError(true);
        setErrorText(result.messages.join(', '));
      }
    } else {
      dispatch({
        type: actions.SET_ALERT_SETTINGS,
        alertSettings: {
          show: true,
          type: 'error',
          title: 'Error Occured',
          message:
            'This Operation Could Not Be Completed. Please Try Again Later.',
          showConfirmButton: true,
          confirmText: 'Ok',
        },
      });
    }
  } catch (err) {
    dispatch({
      type: actions.SET_ALERT_SETTINGS,
      alertSettings: {
        show: true,
        type: 'error',
        title: 'Error Occured',
        message:
          'This Operation Could Not Be Completed. Please Try Again Later.',
        showConfirmButton: true,
        confirmText: 'Ok',
      },
    });
  }
};

export const submitTags = async (
  dispatch = () => {},
  setLoading = () => {},
  navigation = {},
  imageId = '',
  description = '',
  tags = [],
) => {
  try {
    setLoading(true);
    const req = {
      image_id: imageId,
      description: description,
      tags: tags,
    };
    const result = await annotateImage(req);
    if (result && result.status && result.status === 'success') {
      dispatch({
        type: actions.SET_ALERT_SETTINGS,
        alertSettings: {
          show: true,
          type: 'success',
          title: 'Success!',
          message: 'Description & Tags Submitted',
          showConfirmButton: true,
          confirmText: 'Ok',
        },
      });
      navigation.navigate('LandingPage');
    } else {
      dispatch({
        type: actions.SET_ALERT_SETTINGS,
        alertSettings: {
          show: true,
          type: 'error',
          title: 'Error Occured',
          message:
            'This Operation Could Not Be Completed. Please Try Again Later.',
          showConfirmButton: true,
          confirmText: 'Ok',
        },
      });
    }
  } catch (err) {
    dispatch({
      type: actions.SET_ALERT_SETTINGS,
      alertSettings: {
        show: true,
        type: 'error',
        title: 'Error Occured',
        message:
          'This Operation Could Not Be Completed. Please Try Again Later.',
        showConfirmButton: true,
        confirmText: 'Ok',
      },
    });
  } finally {
    setLoading(false);
  }
};

export const handlePiiSelect = (index, pii, setPii) => {
  var allSelectedOptions = pii.slice();
  if (allSelectedOptions.includes(index)) {
    allSelectedOptions = allSelectedOptions.filter((o) => o !== index);
  } else {
    allSelectedOptions.push(index);
  }
  setPii(allSelectedOptions);
};

export const handleBountySelect = (index, bounties, setBounties) => {
  var allSelectedOptions = bounties.slice();
  if (allSelectedOptions.includes(index)) {
    allSelectedOptions = allSelectedOptions.filter((o) => o !== index);
  } else {
    allSelectedOptions.push(index);
  }
  setBounties(allSelectedOptions);
};

export const verifyFields = (
  dispatch = () => {},
  description = '',
  tags = [],
) => {
  let message = '';
  if (!description) {
    message += 'Description';
  }
  if (!(tags && tags.length > 0)) {
    if (message) {
      message += '\n';
    }
    message += 'Tags (atleast one)';
  }
  if (message) {
    dispatch({
      type: actions.SET_ALERT_SETTINGS,
      alertSettings: {
        show: true,
        type: 'error',
        title: 'Fields Required',
        message: message,
        showConfirmButton: true,
        confirmText: 'Ok',
      },
    });
    return false;
  }
  return true;
};

const uploadMultipleFiles = async (
  allFiles = [],
  pickedFiles = [],
  fileUploadResponses = [],
  setFileUploadResponses = () => {},
  setUploadingImageIndex = () => {},
) => {
  try {
    if (pickedFiles && pickedFiles.length > 0) {
      const allFileUploadResponses = fileUploadResponses.slice();
      for (const [index, file] of pickedFiles.entries()) {
        setUploadingImageIndex(
          fileUploadResponses && fileUploadResponses.length > 0
            ? fileUploadResponses.length + index
            : index,
        );
        const res = await uploadSingleFile(file);
        allFileUploadResponses.push(res);
        setFileUploadResponses(allFileUploadResponses);
      }
      setUploadingImageIndex(null);
    }
  } catch (err) {}
};

export const uploadSingleFile = async (file = {}) => {
  try {
    const filedata = new FormData();
    filedata.append('file', file);
    const result = await uploadImage(filedata);
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

export const getSuccess = (fileUploadResponses = [], index = 0) => {
  if (fileUploadResponses && fileUploadResponses[index]) {
    if (fileUploadResponses[index].id) {
      return true;
    } else if (fileUploadResponses[index].message) {
      return false;
    } else if (
      fileUploadResponses[index].status &&
      fileUploadResponses[index].status === 'failed' &&
      fileUploadResponses[index].messages &&
      fileUploadResponses[index].messages.length > 0
    ) {
      return false;
    }
  } else {
    return false;
  }
};

export const getError = (fileUploadResponses = [], index = 0) => {
  if (fileUploadResponses && fileUploadResponses[index]) {
    if (fileUploadResponses[index].id) {
      return '';
    } else if (fileUploadResponses[index].message) {
      return fileUploadResponses[index].message;
    } else if (
      fileUploadResponses[index].status &&
      fileUploadResponses[index].status === 'failed' &&
      fileUploadResponses[index].messages &&
      fileUploadResponses[index].messages.length > 0
    ) {
      return fileUploadResponses[index].messages.join(', ');
    }
  } else {
    return '';
  }
};

export const onRemove = (
  files = [],
  setFiles = () => {},
  fileUploadResponses = [],
  setFileUploadResponses = () => {},
  itemIndexToRemove = -1,
) => {
  try {
    let allFiles = files.slice();
    let allFileUploadResponses = fileUploadResponses.slice();
    allFiles = allFiles.filter((_, index) => index !== itemIndexToRemove);
    allFileUploadResponses = allFileUploadResponses.filter(
      (_, index) => index !== itemIndexToRemove,
    );
    setFiles(allFiles);
    setFileUploadResponses(allFileUploadResponses);
  } catch (err) {}
};

export const canProceed = (fileUploadResponses = []) => {
  try {
    for (const fileUploadResponse of fileUploadResponses) {
      if (fileUploadResponse.id) {
        return true;
      }
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const submitMultipleImageTags = async (
  dispatch = () => {},
  setLoading = () => {},
  fileUploadResponses = [],
  navigation = {},
  description = '',
  tags = [],
) => {
  try {
    setLoading(true);
    if (fileUploadResponses && fileUploadResponses.length > 0) {
      for (const fileUploadResponse of fileUploadResponses) {
        if (fileUploadResponse && fileUploadResponse.id) {
          const res = await submitSingleImageTags(
            fileUploadResponse.id,
            description,
            tags,
          );
          if (!res) {
            dispatch({
              type: actions.SET_ALERT_SETTINGS,
              alertSettings: {
                show: true,
                type: 'error',
                title: 'Error Occured',
                message:
                  'This Operation Could Not Be Completed. Please Try Again Later.',
                showConfirmButton: true,
                confirmText: 'Ok',
              },
            });
            return;
          }
        }
      }
      dispatch({
        type: actions.SET_ALERT_SETTINGS,
        alertSettings: {
          show: true,
          type: 'success',
          title: 'Success!',
          message: 'Description & Tags Submitted',
          showConfirmButton: true,
          confirmText: 'Ok',
        },
      });
      navigation.navigate('LandingPage');
    }
  } catch (err) {
    dispatch({
      type: actions.SET_ALERT_SETTINGS,
      alertSettings: {
        show: true,
        type: 'error',
        title: 'Error Occured',
        message:
          'This Operation Could Not Be Completed. Please Try Again Later.',
        showConfirmButton: true,
        confirmText: 'Ok',
      },
    });
  } finally {
    setLoading(false);
  }
};

export const submitSingleImageTags = async (
  imageId = '',
  description = '',
  tags = [],
) => {
  try {
    const req = {
      image_id: imageId,
      description: description,
      tags: tags,
    };
    const result = await annotateImage(req);
    if (result && result.status && result.status === 'success') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
