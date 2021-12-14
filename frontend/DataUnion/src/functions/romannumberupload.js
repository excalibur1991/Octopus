import {actions} from '../services/State/Reducer';
import {uploadImage, annotateImage} from '../services/API/APIManager';
import DocumentPicker from 'react-native-document-picker';

export const onPickFile = async (setFile = () => {}) => {
  try {
    const pickedFile = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    if (pickedFile && pickedFile.uri) {
      setFile(pickedFile);
    }
  } catch (err) {}
};

export const clearAll = (
  setFile = () => {},
  canvasRef = null,
  setLoading = () => {},
  setProgress = () => {},
  setSelectedNumberIndex = () => {},
) => {
  setFile(null);
  if (canvasRef && canvasRef.current) {
    canvasRef.current.clear();
  }
  setLoading(false);
  setProgress(0);
  setSelectedNumberIndex(0);
};

export const next = (
  romanNumbers = [],
  selectedNumberIndex = 0,
  setSelectedNumberIndex = () => {},
) => {
  if (selectedNumberIndex || selectedNumberIndex === 0) {
    if (selectedNumberIndex + 1 < romanNumbers.length) {
      setSelectedNumberIndex(selectedNumberIndex + 1);
    } else {
      setSelectedNumberIndex(0);
    }
  }
};

export const saveCanvasImage = (canvasRef = null) => {
  try {
    if (canvasRef && canvasRef.current) {
      canvasRef.current.save(
        'jpg',
        true,
        '',
        'RomanNumberImage',
        false,
        false,
        false,
      );
    }
  } catch (err) {
    console.log('SaveCanvasError:' , err)
  }
};

export const uploadRomanNumber = async (
  file = null,
  tags = [],
  dispatch = () => {},
  setLoading = () => {},
  navigation = () => {},
  setProgress = () => {},
) => {
  try {
    setProgress(0);
    setTimeout(() => setProgress(0.8), 1000);
    setLoading(true);
    const res = await uploadSingleFile(file);
    if (res) {
      if (res.id) {
        const tagRes = await submitSingleImageTags(res.id, '', tags);
        if (tagRes) {
          setProgress(1);
        }
      } else if (
        res.message ||
        (res.status &&
          res.status === 'failed' &&
          res.messages &&
          res.messages.length > 0)
      ) {
        setProgress(0);
        dispatch({
          type: actions.SET_ALERT_SETTINGS,
          alertSettings: {
            show: true,
            type: 'error',
            title: 'Error Occured',
            message: res.message || res.messages.join(', '),
            showConfirmButton: true,
            confirmText: 'Ok',
          },
        });
      }
    }
  } catch (err) {
    setProgress(0);
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
