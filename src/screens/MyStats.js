import React, { useState, useEffect } from 'react';
import {theme} from '../services/Common/theme';
import {LineChart} from 'react-native-charts-wrapper';
import {
  Image,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  processColor,

} from 'react-native';
import Button from '../components/Button';
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';
import {
  getUserStats
} from '../services/API/APIManager';

import {
  calcUploadsCumu,
  calcAnnoDescCumu,
  calcAnnoTagCumu,
  calcVeriCumu
} from '../services/Common/CommonFunctions';

var _arr_date = [];
var _arr_uploads = [];
var _arr_tag_annotations = [];
var _arr_text_annotations = [];
var _arr_verifications = [];

const MyStats = () => {
  useEffect(() => {
    fetchOverall(); 
  }, []);

  const [annotations, setAnnotations] = useState(0);
  const [uploads, setUploads] = useState(0);
  const [verifications, setVerifications] = useState(0);

  const [uploadsQuicrra, setUploadsQuicrra] = useState(0);
  const [annotationsQuicrra, setAnnotationsQuicrra] = useState(0);
  const [verificationsQuicrra, setVerificationsQuicrra] = useState(0);
  const [cumuQuicrra, setCumuQuicrra] = useState(0);

  const [chartDate, setChartDate] = useState(['2020', '2021']); 
  const [CumuChartDate, setCumuChartDate] = useState(['2020', '2021']); 
  const [graphTitle, setGraphTitle] = useState('');
  const [curChartState, setCurChartState] = useState('uploads');

  const curYear = Number(
    new Date().toISOString().replace(/T.*/, '').split('-')[0],
  );

  const initialChartData = {
    dataSets: [
      {
        values: [],
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
       values: [],
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
        values: [
        ],
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
    ],
  };

  const initialCumuChartData = {
    dataSets: [
      {
        values: [],
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
  };

  const [curChartdata_new, setCurChartdataNew] = useState({});
  const [curCumuChartdata, setCurCumuChartdata] = useState({});

  
  //authToken
  const [, dispatch] = useStateValue();

  //Get uploads/annotations/verification cumulative points per date
  const sumCumuData = (response) => {
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
      _chartDataY.push({x:index, y:curCumuValue}); 
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
    const chartDataClone = {...initialCumuChartData};
    chartDataClone.dataSets[0].values = [..._chartDataY];
    setCurCumuChartdata(chartDataClone);
    setCumuChartDate(_chartDataX);

  };

  const getChartData = (chartType) => {
    //let _chartDataX = [];
    //let _chartDataY = [];
    let _chartData = [];
    var curValue = 0;

    if (chartType == 'uploads') {
      curValue = 0;
      _arr_uploads.map((value, index) => {
        curValue += value;
        _chartData.push({x:index, y:curValue});
      });
      //setGraphTitle('UPLOAD');
    } else if (chartType == 'annotations') {
      curValue = 0;
      _arr_tag_annotations.map((value, index) => {
        curValue += value + _arr_text_annotations[index];
        _chartData.push({x:index, y:curValue});
      });

      //setGraphTitle('ANNOTATION');
    } else if (chartType == 'verifications') {
      curValue = 0;
      _arr_verifications.map((value, index) => {
        curValue += value;
        _chartData.push({x:index, y:curValue});
      });
      //setGraphTitle('VERIFICATION');
    }

    return _chartData;
  };

  // uploads | annotation | verifcation chart
  const updateChart_ = (chartType) => {
    let uploadChart = getChartData('uploads');
    let annotationChart = getChartData('annotations');
    let verficationChart = getChartData('verifications');

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
    let chartDataClone = {...initialChartData};
    chartDataClone.dataSets[0].values = [...uploadChart];
    chartDataClone.dataSets[1].values = [...annotationChart];
    chartDataClone.dataSets[2].values = [...verficationChart];

    setCurChartdataNew(chartDataClone);
    setCurChartState(chartType);
    setChartDate(_chartDate);
  }
  catch(err){
    console.log(err);
  }


  };

  const fetchOverall = async () => {
    try {
      dispatch({
        type: actions.SET_OVERALL
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
      const start = "14-05-2021";
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
          calcAnnoDescCumu(sum_anno_description) +
          calcAnnoTagCumu(sum_anno_tags);
          let veri_rra = calcVeriCumu(sum_verification);

        setUploadsQuicrra(Number(upload_rra.toFixed(8)));
        setAnnotationsQuicrra(Number(anno_rra.toFixed(8)));
        setVerificationsQuicrra(Number(veri_rra.toFixed(8)));
        setCumuQuicrra(Number((upload_rra + anno_rra + veri_rra).toFixed(8)));

        updateChart_('uploads');
        sumCumuData(response);
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Image
                resizeMode="stretch"
                source={require('../assets/uploads.png')}
                style={{height: 20, width: 30}}
              />
              <Text style={styles.itemTitle}>Uploads</Text>
              <Text style={styles.itemValue}>{uploads}</Text>
            </View>
            <View style={styles.boxMini}>
              <Text style={styles.miniBoxValue}>{uploadsQuicrra}</Text>
              <Text style={styles.miniBoxFooter}>QUICRRA-0</Text>
            </View>
          </View>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Image
                resizeMode="stretch"
                source={require('../assets/annotations.png')}
                style={{height: 20, width: 30}}
              />
              <Text style={styles.itemTitle}>Annotations</Text>
              <Text style={styles.itemValue}>{annotations}</Text>
            </View>
            <View style={styles.boxMini}>
              <Text style={styles.miniBoxValue}>{annotationsQuicrra}</Text>
              <Text style={styles.miniBoxFooter}>QUICRRA-0</Text>
            </View>
          </View>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Image
                resizeMode="stretch"
                source={require('../assets/verifications.png')}
                style={{height: 20, width: 30}}
              />
              <Text style={styles.itemTitle}>Verifications</Text>
              <Text style={styles.itemValue}>{verifications}</Text>
            </View>
            <View style={styles.boxMini}>
              <Text style={styles.miniBoxValue}>{verificationsQuicrra}</Text>
              <Text style={styles.miniBoxFooter}>QUICRRA-0</Text>
            </View>
          </View>
        </View>
        <View style={styles.fullWidthBox}>
          <Text style={styles.fullWidthBoxValue}>{cumuQuicrra}</Text>
          <Text style={styles.miniBoxFooter}>QUICRRA-0</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>CUMULATIVE {graphTitle} COUNT</Text>
            <LineChart
              style={styles.chart}
              data={curChartdata_new}
              chartDescription={{text: ''}}
              legend={{}}
              marker={{
                enabled: true,
                backgroundTint: processColor('teal'),
                markerColor: processColor('#F0C0FF8C'),
                textColor: processColor('white'),
                    }}
                    xAxis={{
                      granularityEnabled: true,
                      granularity: 1,
                      position: 'BOTTOM',
                      valueFormatter: chartDate,
                      drawGridLines:false
                    }}
                    yAxis={{
                      left:{axisMinimum:0},
                       right: {enabled: false},
                       drawGridLines: false,
                      }}
              drawGridBackground={false}
              borderColor={processColor('#F0C0FF8C')}
              borderWidth={1}
              drawBorders={true}
              autoScaleMinMaxEnabled={true}
              touchEnabled={true}
              dragEnabled={true}
              scaleEnabled={true}
              scaleXEnabled={true}
              scaleYEnabled={false}
              pinchZoom={true}
              doubleTapToZoomEnabled={true}
              highlightPerTapEnabled={true}
              highlightPerDragEnabled={false}
              width={350}
              height={300}
              dragDecelerationEnabled={true}
              dragDecelerationFrictionCoef={0.99}
              keepPositionOnRotation={false}
             />
          </View>
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>CUMULATIVE EARNINGS</Text>
            <Text style={styles.miniBoxFooter}>QUICRRA-0</Text>
            <LineChart
              style={styles.chart}
              data={curCumuChartdata}
              chartDescription={{text: ''}}
              legend={{}}
              marker={{
                enabled: true,
                backgroundTint: processColor('teal'),
                markerColor: processColor('#F0C0FF8C'),
                textColor: processColor('white'),
              }}
              xAxis={{
                granularityEnabled: true,
                granularity: 1,
                position: 'BOTTOM',
                valueFormatter: CumuChartDate,
                drawGridLines:false
              }}
              yAxis={{
                left:{axisMinimum:0},
                 right: {enabled: false},
                 drawGridLines: false,
                }}
              drawGridBackground={false}
              borderColor={processColor('#F0C0FF8C')}
              borderWidth={1}
              drawBorders={true}
              autoScaleMinMaxEnabled={true}
              touchEnabled={true}
              dragEnabled={true}
              scaleEnabled={false}
              scaleXEnabled={true}
              scaleYEnabled={false}
              pinchZoom={true}
              doubleTapToZoomEnabled={true}
              highlightPerTapEnabled={true}
              highlightPerDragEnabled={false}
              width={350}
              height={300}
              dragDecelerationEnabled={true}
              dragDecelerationFrictionCoef={0.99}
              keepPositionOnRotation={false}
                          />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    paddingTop: '6%',
    paddingHorizontal: '4%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.COLORS.WHITE,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomContainer: {
    marginTop: '8%',
  },
  boxContainer: {
    flex: 0.333,
    margin: '1%',
  },
  graphContainer: {
    marginBottom: '10%',
    alignItems: 'center',
  },
  box: {
    paddingTop: '20%',
    borderRadius: 25,
    paddingBottom: '25%',
    alignItems: 'center',
    backgroundColor: '#F5F6FC',
  },
  boxMini: {
    marginTop: '10%',
    borderRadius: 25,
    alignItems: 'center',
    paddingVertical: '3%',
    backgroundColor: '#F5F6FC',
  },
  fullWidthBox: {
    marginTop: '2%',
    borderRadius: 25,
    alignItems: 'center',
    paddingVertical: '2%',
    backgroundColor: '#F5F6FC',
  },
  itemTitle: {
    fontSize: 10,
    marginTop: '5%',
    color: '#41474E',
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
  },
  miniBoxValue: {
    fontSize: 9,
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
  },
  miniBoxFooter: {
    fontSize: 6,
    fontWeight: '300',
    fontFamily: 'Inter-Regular',
  },
  fullWidthBoxValue: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
  },
  itemValue: {
    fontSize: 17,
    marginTop: '20%',
    color: '#41474E',
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
  },
  graphTitle: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
  },
  graph: {
    marginTop: '5%',
  },
  buttonContainer: {
    marginBottom: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonInnerContainer: {
  },

});
