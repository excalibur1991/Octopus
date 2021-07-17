import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

export const onPickFile = async (
  files = [],
  setFiles = () => {},
  setProgress = () => {},
  append = false,
) => {
  try {
    const pickedFiles = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.images],
    });
    if (pickedFiles && pickedFiles.length > 0) {
      if (append) {
        const allFiles = files.slice();
        pickedFiles.forEach((file) => allFiles.push(file));
        setFiles(allFiles);
      } else {
        setFiles(pickedFiles);
        uploadFile(pickedFiles[0], setProgress);
      }
    }
  } catch (err) {}
};

export const uploadFile = async (file, setProgress) => {
  const config = {
    onUploadProgress: function (progressEvent) {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      setProgress(percentCompleted > 95 ? 95 : percentCompleted);
    },
  };
  let data = new FormData();
  data.append('AttachmentDoc', file);
  axios
    .post('http://192.168.10.48:5200/api/Public/SaveFile', data, config)
    .then((res) => {
      setProgress(100);
      console.log('Result: ', res);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
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
