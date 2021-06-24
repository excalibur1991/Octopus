import {actions} from '../services/State/Reducer';
import {getUserStats} from '../services/API/APIManager';
import {
  calcUploadsCumu,
  calcAnnoDescCumu,
  calcAnnoTagCumu,
  calcVeriCumu,
} from '../services/Common/CommonFunctions';
import i18n from '../languages/i18n';

var _arr_date = [];
var _arr_uploads = [];
var _arr_tag_annotations = [];
var _arr_text_annotations = [];
var _arr_verifications = [];

//Get uploads/annotations/verification cumulative points per date
export const sumCumuData = (
  response,
  curCumuChartdata,
  setCurCumuChartdata,
) => {
  var curCumuValue = 0;
  let _chartDataX = [];
  let _chartDataY = [];
  //calc uploads per day cumu
  response.result.dates.map((value, index) => {
    let upload = response.result.uploads[index];
    let tag_annotation = response.result.tag_annotations[index];
    let text_annotation = response.result.text_annotations[index];
    let verifcation = response.result.verifications[index];
    curCumuValue +=
      calcUploadsCumu(upload) +
      calcVeriCumu(verifcation) +
      calcAnnoTagCumu(tag_annotation) +
      calcAnnoDescCumu(text_annotation);
    _chartDataY.push(curCumuValue);
    _chartDataX.push(value.split('-')[2] || '');
  });

  //remove duplicate date
  _chartDataX.push(
    (Number(_chartDataX[_chartDataX.length - 1]) + 1).toString(),
  );
  let xData = [];
  _chartDataX.map((value, index) => {
    if (index == 0) {
      xData.push(value);
    } else if (index == _chartDataX.length - 1) {
      xData.push(value);
    } else {
      if (_chartDataX.indexOf(value) === index) {
        xData.push(value);
      } else {
        xData.push('');
      }
    }
  });

  //chart dataset
  const chartDataClone = {...curCumuChartdata};
  chartDataClone.datasets[0].data = _chartDataY;
  chartDataClone.labels = xData;
  setCurCumuChartdata(chartDataClone);
};

// uploads | annotation | verifcation chart
export const updateChart = (
  chartType,
  setGraphTitle,
  curChartdata,
  setCurChartdata,
  setCurChartState,
) => {
  let _chartDataX = [];
  let _chartDataY = [];
  _arr_date.map((value) => {
    _chartDataX.push(value.split('-')[2]);
  });
  var curValue = 0;

  if (chartType == 'uploads') {
    _charDataY = [..._arr_uploads];
    curValue = 0;
    _arr_uploads.map((value, index) => {
      curValue += value;
      _chartDataY.push(curValue);
    });
    setGraphTitle(i18n.t('myStats.upload'));
  } else if (chartType == 'annotations') {
    curValue = 0;
    _arr_tag_annotations.map((value, index) => {
      curValue += value;
      _chartDataY.push(curValue);
    });

    curValue = 0;
    _arr_text_annotations.map((value, index) => {
      curValue += value;
      _chartDataY[index] = curValue;
    });
    setGraphTitle(i18n.t('myStats.annotation'));
  } else if (chartType == 'verifications') {
    curValue = 0;
    _arr_verifications.map((value, index) => {
      curValue += value;
      _chartDataY[index] = curValue;
    });
    setGraphTitle(i18n.t('myStats.verification'));
  }
  _chartDataX.push(
    (Number(_chartDataX[_chartDataX.length - 1]) + 1).toString(),
  );
  let xData = [];
  _chartDataX.map((value, index) => {
    if (index == 0) {
      xData.push(value);
    } else if (index == _chartDataX.length - 1) {
      xData.push(value);
    } else {
      if (_chartDataX.indexOf(value) === index) {
        xData.push(value);
      } else {
        xData.push('');
      }
    }
  });

  //chart dataset
  const chartDataClone = {...curChartdata};
  chartDataClone.datasets[0].data = _chartDataY.length == 0 ? [0] : _chartDataY;
  chartDataClone.labels = xData;
  setCurChartdata(chartDataClone);
  setCurChartState(chartType);
};

export const fetchOverall = async (
  dispatch,
  setAnnotations,
  setUploads,
  setVerifications,
  setUploadsQuicrra,
  setAnnotationsQuicrra,
  setVerificationsQuicrra,
  setCumuQuicrra,
) => {
  try {
    dispatch({
      type: actions.SET_OVERALL,
    });
    const date = new Date();

    const end = date
      .toISOString()
      .replace(/T.*/, '')
      .split('-')
      .reverse()
      .join('-');
    date.setFullYear(date.getFullYear() - 1);
    //const start = date.toISOString().replace(/T.*/, '').split('-').reverse().join('-');
    const start = '14-05-2021';
    const response = await getUserStats(start, end);
    if (response && response.result) {
      let sum_anno_description = 0;
      let sum_anno_tags = 0;
      let sum_anno = 0;
      _arr_date = [];
      _arr_uploads = [];
      _arr_tag_annotations = [];
      _arr_text_annotations = [];
      _arr_verifications = [];

      _arr_date = [...response.result.dates];

      //retrieve total sumup
      sum_anno_tags += response.result.tag_annotations.reduce(
        (total, item) => total + Number(item),
        0,
      );
      sum_anno_description += response.result.text_annotations.reduce(
        (total, item) => total + Number(item),
        0,
      );
      sum_anno = sum_anno_tags + sum_anno_description;
      let sum_upload = 0;
      sum_upload += response.result.uploads.reduce(
        (total, item) => total + Number(item),
        0,
      );
      let sum_verification = 0;
      sum_verification += response.result.verifications.reduce(
        (total, item) => total + Number(item),
        0,
      );

      //collect chart data
      _arr_uploads = [...response.result.uploads];
      _arr_verifications = [...response.result.verifications];
      _arr_tag_annotations = [...response.result.tag_annotations];
      _arr_text_annotations = [...response.result.text_annotations];

      setAnnotations(sum_anno);
      setUploads(sum_upload);
      setVerifications(sum_verification);

      let upload_rra = calcUploadsCumu(sum_upload);
      let anno_rra =
        calcAnnoDescCumu(sum_anno_description) + calcAnnoTagCumu(sum_anno_tags);
      let veri_rra = calcVeriCumu(sum_verification);

      setUploadsQuicrra(Number(upload_rra.toFixed(8)));
      setAnnotationsQuicrra(Number(anno_rra.toFixed(8)));
      setVerificationsQuicrra(Number(veri_rra.toFixed(8)));
      setCumuQuicrra(Number((upload_rra + anno_rra + veri_rra).toFixed(8)));

      updateChart('uploads');
      sumCumuData(response);
    }
  } catch (error) {
    dispatch({
      type: actions.SET_ALERT_SETTINGS,
      alertSettings: {
        show: true,
        type: 'error',
        title: i18n.t('messages.errorOccured'),
        message: i18n.t('messages.tryAgainLater'),
        showConfirmButton: true,
        confirmText: 'Ok',
      },
    });
  } finally {
    dispatch({
      type: actions.SET_OVERALL,
      start_date: '01-01-2018',
      end_date: new Date()
        .toISOString()
        .replace(/T.*/, '')
        .split('-')
        .reverse()
        .join('-'),
    });
  }
};
