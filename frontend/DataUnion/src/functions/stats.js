import {  processColor } from 'react-native'
import {actions} from '../services/State/Reducer';

import {getOverall} from '../services/API/APIManager';
import {
  calcUploadsCumu,
  calcAnnoDescCumu,
  calcAnnoTagCumu,
  calcVeriCumu,
} from '../services/Common/CommonFunctions';
import i18n from '../languages/i18n';
import update from 'immutability-helper';


//Get uploads/annotations/verification cumulative points per date
const sumCumuData = (  
  response,
  setCurCumuChartdata,
  setCumuChartDate,
  _arr_date,
  _arr_uploads,
  _arr_tag_annotations,
  _arr_text_annotations,
  _arr_verifications
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
    _chartDataY.push({x:index, y:curCumuValue, marker: `${value}\r\nEarnings:${curCumuValue.toFixed(4)}`}); 
    _chartDataX.push(value.split('-')[2] || '');
  });

  _chartDataX.map((value, index) => {
    if (index == 0) {
    } else if (index == _chartDataX.length - 1) {
    } else {
      if (_chartDataX.indexOf(value) === index) {
      } else {
        _chartDataX[index] = '';
      }
    }
  });

  //chart dataset
  let chartDataClone = {};
  const arr = update(chartDataClone, {
    $set: {
      dataSets: [
        {
          values: _chartDataY,
          label: 'Earnings',
          config: {
            lineWidth: 1,
            drawFilled: true,
            fillAlpha: 35,
            color: processColor('#28a745'),
            mode: 'LINEAR',
            drawValues: false,
            axisDependency: 'RIGHT',
            fillColor: processColor('#28a745'),
            circleRadius: 1,
            circleColor: processColor('#28a745'),
            highlightLineWidth: 1,
            highlightColor: processColor('#28a745'),
            drawCircleHole: false,
          },
        }
      ],
    }
    
  });


//  chartDataClone.dataSets[0].values = [..._chartDataY];
  setCurCumuChartdata(arr);
  setCumuChartDate(_chartDataX);

};

const getChartData = (
  chartType,
  _arr_date,
  _arr_uploads,
  _arr_tag_annotations,
  _arr_text_annotations,
  _arr_verifications
  ) => {
  //let _chartDataX = [];
    //let _chartDataY = [];
    let _chartData = [];
    var curValue = 0;

    if (chartType == 'uploads') {
      curValue = 0;
      _arr_uploads.map((value, index) => {
        curValue += value;
        _chartData.push({x:index, y:curValue, marker: `${_arr_date[index]}\r\nUploads:${curValue}`});
      });
      //setGraphTitle('UPLOAD');
    } else if (chartType == 'annotations') {
      curValue = 0;
      _arr_tag_annotations.map((value, index) => {
        curValue += value + _arr_text_annotations[index];
        _chartData.push({x:index, y:curValue, marker:`${_arr_date[index]}\r\nAnnotations:${curValue}`});
      });

      //setGraphTitle('ANNOTATION');
    } else if (chartType == 'verifications') {
      curValue = 0;
      _arr_verifications.map((value, index) => {
        curValue += value;
        _chartData.push({x:index, y:curValue, marker:`${_arr_date[index]}\r\nVerifications:${curValue}`});
      });
      //setGraphTitle('VERIFICATION');
    }

    return _chartData;
};

// uploads | annotation | verifcation chart
const updateChart = (
  chartType,
  setCurChartdataNew,
  setCurChartState,
  _arr_date,
  _arr_uploads,
  _arr_tag_annotations,
  _arr_text_annotations,
  _arr_verifications,
  setChartDate
  ) => {

  let uploadChart = getChartData(
    'uploads',
    _arr_date,
    _arr_uploads,
    _arr_tag_annotations,
    _arr_text_annotations,
    _arr_verifications
);
  let annotationChart = getChartData(
    'annotations',  
    _arr_date,
    _arr_uploads,
    _arr_tag_annotations,
    _arr_text_annotations,
    _arr_verifications
);
  let verficationChart = getChartData(
    'verifications',
    _arr_date,
    _arr_uploads,
    _arr_tag_annotations,
    _arr_text_annotations,
    _arr_verifications
);

  let _chartDate = [];
  _arr_date.map((value)=>{
    _chartDate.push(value.split('-')[2]);
  });


  _chartDate.map((value, index) => {
    if (index == 0) {
    } else if (index == _chartDate.length - 1) {
    } else {
      if (_chartDate.indexOf(value) === index) {
      } else {
        _chartDate[index] = '';
      }
    }
  });

  try{
      //chart dataset
    let chartDataClone = {};
    const arr = update(chartDataClone, {
      $set:{
        dataSets: [
          {
            values:uploadChart,
            label: 'Uploads',
            config: {
              lineWidth: 1,
              drawFilled: true,
              fillAlpha: 35,
              color: processColor('#28a745'),
              mode: 'LINEAR',
              drawValues: false,
              axisDependency: 'RIGHT',
              fillColor: processColor('#28a745'),
              circleRadius: 1,
              circleColor: processColor('#28a745'),
              highlightLineWidth: 1,
              highlightColor: processColor('#28a745'),
              drawCircleHole: false,
            },
          },
          {
           values: annotationChart,
            label: 'Annotations',
            config: {
              lineWidth: 1,
              drawFilled: true,
              fillAlpha: 35,
              color: processColor('#dc3545'),
              mode: 'LINEAR',
              drawValues: false,
              axisDependency: 'RIGHT',
              circleRadius: 1,
              circleColor: processColor('#dc3545'),
              fillColor: processColor('#dc3545'),
              highlightLineWidth: 1,
              highlightColor: processColor('#dc3545'),
              drawCircleHole: false,
            },
          },
          {
            values: verficationChart,
            label: 'Verifications',
             config: {
              lineWidth: 1,
              drawFilled: true,
              fillAlpha: 35,
              color: processColor('#170000'),
              mode: 'LINEAR',
              drawValues: false,
              axisDependency: 'RIGHT',
              circleRadius: 1,
              circleColor: processColor('#dc3545'),
              fillColor: processColor('#170000'),
              highlightLineWidth: 1,
              highlightColor: processColor('#dc3545'),
              drawCircleHole: false,
            },
          },
        ]
     
      }


    });
//    update(chartDataClone.dataSets[1].values, annotationChart);
//    update(chartDataClone.dataSets[2].values, verficationChart);
//    chartDataClone.dataSets[0].values = [...uploadChart];
//    chartDataClone.dataSets[1].values = [...annotationChart];
//    chartDataClone.dataSets[2].values = [...verficationChart];

    setCurChartdataNew(arr);
    setCurChartState(chartType);
    setChartDate(_chartDate);
  }
  catch(err){
  }


};

export const fetchOverall = async (
  dispatch,
  setAnnotations,
  setUploads,
  setVerifications,
  _arr_date,
  _arr_uploads,
  _arr_tag_annotations,
  _arr_text_annotations,
  _arr_verifications,
  setUploadsQuicrra,
  setAnnotationsQuicrra,
  setVerificationsQuicrra,
  setCumuQuicrra,
  setChartDate,
  setCumuChartDate,
  setCurChartState,
  setCurChartdataNew,
  setCurCumuChartdata
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
    const response = await getOverall(start, end);
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
        calcAnnoDescCumu(sum_anno_description) +
        calcAnnoTagCumu(sum_anno_tags);
      let veri_rra = calcVeriCumu(sum_verification);

      setUploadsQuicrra(Number(upload_rra.toFixed(8)));
      setAnnotationsQuicrra(Number(anno_rra.toFixed(8)));
      setVerificationsQuicrra(Number(veri_rra.toFixed(8)));
      setCumuQuicrra(Number((upload_rra + anno_rra + veri_rra).toFixed(8)));

      updateChart(
        'uploads',
        setCurChartdataNew,
        setCurChartState,
        _arr_date,
        _arr_uploads,
        _arr_tag_annotations,
        _arr_text_annotations,
        _arr_verifications,
        setChartDate
        );
      sumCumuData(
        response,
        setCurCumuChartdata,
        setCumuChartDate,
        _arr_date,
        _arr_uploads,
        _arr_tag_annotations,
        _arr_text_annotations,
        _arr_verifications
        );
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
        confirmText: i18n.t('messages.ok'),
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