/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import {actions} from '../services/State/Reducer';
import {
  getAllImages,
  getImage,
  getLabelImage,
  storeUserResponse,
} from '../services/API/APIManager';

export const fetchImages = async (
  dispatch,
  images,
  setImages,
  setCurrentIndex,
  setMainImage,
  setCutoutImage,
) => {
  try {
    dispatch({
      type: actions.SET_PROGRESS_SETTINGS,
      show: true,
    });
    const response = await getAllImages();
    if (response && response.result && response.result.length > 0) {
      if (images && images.length > 0) {
        setImages([...images, ...response.result]);
      } else {
        setImages(response.result);
        setCurrentIndex(0);
        fetchLabelImage(response.result[0].label, setMainImage);
        fetchImage(
          setMainImage,
          setCutoutImage,
          response.result[0].image_id,
          false,
        );
      }
    }
  } catch (error) {
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
    dispatch({
      type: actions.SET_PROGRESS_SETTINGS,
      show: false,
    });
  }
};

export const fetchImage = async (
  setMainImage,
  setCutoutImage,
  imageId,
  isMainImage = true,
) => {
  const result = await getImage(imageId);
  const fileReaderInstance = new FileReader();
  fileReaderInstance.readAsDataURL(result);
  fileReaderInstance.onload = () => {
    if (isMainImage) {
      setMainImage(fileReaderInstance.result);
    } else {
      setCutoutImage(fileReaderInstance.result);
    }
  };
};

export const fetchLabelImage = async (label, setMainImage) => {
  const result = await getLabelImage(label);
  const fileReaderInstance = new FileReader();
  fileReaderInstance.readAsDataURL(result);
  fileReaderInstance.onload = () => {
    setMainImage(fileReaderInstance.result);
  };
};

export const onSwipe = async (
  userResponse,
  dispatch,
  images,
  setImages,
  currentIndex,
  setCurrentIndex,
  setMainImage,
  setCutoutImage,
) => {
  try {
    dispatch({
      type: actions.SET_PROGRESS_SETTINGS,
      show: true,
    });
    const reqBody = {
      response: userResponse,
      image_id: images[currentIndex].image_id,
    };
    const response = await storeUserResponse(reqBody);
    console.log('abcde', response);
    if (response && response.status && response.status === 'success') {
      if (userResponse === 'YES') {
        next(
          dispatch,
          images,
          setImages,
          currentIndex,
          setCurrentIndex,
          setMainImage,
          setCutoutImage,
        );
      } else if (userResponse === 'NO') {
        prev(
          dispatch,
          images,
          setImages,
          currentIndex,
          setCurrentIndex,
          setMainImage,
          setCutoutImage,
        );
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
  } catch (error) {
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
    dispatch({
      type: actions.SET_PROGRESS_SETTINGS,
      show: false,
    });
  }
};

export const next = async (
  dispatch,
  images,
  setImages,
  currentIndex,
  setCurrentIndex,
  setMainImage,
  setCutoutImage,
  keepIndex = false,
) => {
  try {
    dispatch({
      type: actions.SET_PROGRESS_SETTINGS,
      show: true,
    });
    let allImages = images.slice();
    if (keepIndex) {
      allImages = images.filter(
        (img) => img.image_id !== images[currentIndex].image_id,
      );
      // allImages = images.filter((img, index) => index !== currentIndex);
      setImages(allImages);
    }
    const index = keepIndex ? currentIndex : currentIndex + 1;
    if (allImages && allImages.length > 0) {
      if (index < allImages.length) {
        setCurrentIndex(index);
        await fetchLabelImage(allImages[index].label, setMainImage);
        await fetchImage(
          setMainImage,
          setCutoutImage,
          allImages[index].image_id,
          false,
        );
      } else {
        const index = allImages.length - 1;
        setCurrentIndex(index);
        await fetchLabelImage(allImages[index].label, setMainImage);
        await fetchImage(
          setMainImage,
          setCutoutImage,
          allImages[index].image_id,
          false,
        );
      }
      if (allImages.length <= 5) {
        fetchImages();
      }
    } else {
      setCurrentIndex(0);
      setMainImage(null);
      setCutoutImage(null);
      fetchImages();
    }
  } catch (error) {
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
    dispatch({
      type: actions.SET_PROGRESS_SETTINGS,
      show: false,
    });
  }
};

export const prev = async (
  dispatch,
  images,
  setImages,
  currentIndex,
  setCurrentIndex,
  setMainImage,
  setCutoutImage,
  keepIndex = false,
) => {
  try {
    dispatch({
      type: actions.SET_PROGRESS_SETTINGS,
      show: true,
    });
    let allImages = images.slice();
    if (keepIndex) {
      const allImages = images.filter(
        (img) => img.image_id !== images[currentIndex].image_id,
      );
      // allImages = images.filter((img, index) => index !== currentIndex);
      setImages(allImages);
    }
    const index = keepIndex ? currentIndex : currentIndex - 1;
    if (allImages && allImages.length > 0) {
      if (index >= 0) {
        setCurrentIndex(index);
        await fetchLabelImage(allImages[index].label, setMainImage);
        await fetchImage(
          setMainImage,
          setCutoutImage,
          allImages[index].image_id,
          false,
        );
      } else {
        const index = allImages.length - 1;
        setCurrentIndex(index);
        await fetchLabelImage(allImages[index].label, setMainImage);
        await fetchImage(
          setMainImage,
          setCutoutImage,
          allImages[index].image_id,
          false,
        );
      }
      if (allImages.length <= 5) {
        fetchImages();
      }
    } else {
      setCurrentIndex(0);
      setMainImage(null);
      setCutoutImage(null);
      fetchImages();
    }
  } catch (error) {
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
    dispatch({
      type: actions.SET_PROGRESS_SETTINGS,
      show: false,
    });
  }
};
