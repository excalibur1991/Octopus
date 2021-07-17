import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-charts-wrapper';
import {
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
  processColor,
} from 'react-native';

import Button from '../components/Button';
import {useStateValue} from '../services/State/State';
import {styles} from '../styles/mystats';
import {sumCumuData, updateChart, fetchOverall} from '../functions/mystats';
import {withTranslation} from 'react-i18next';

const UploadIcon = require('../assets/uploads.png');

var _arr_date = [];
var _arr_uploads = [];
var _arr_tag_annotations = [];
var _arr_text_annotations = [];
var _arr_verifications = [];

const MyStats = ({t}) => {
  useEffect(() => {
    fetchOverall(
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
    );
  }, []);

  const [annotations, setAnnotations] = useState(0);
  const [uploads, setUploads] = useState(0);
  const [verifications, setVerifications] = useState(0);

  const [uploadsQuicrra, setUploadsQuicrra] = useState(0);
  const [annotationsQuicrra, setAnnotationsQuicrra] = useState(0);
  const [verificationsQuicrra, setVerificationsQuicrra] = useState(0);
  const [cumuQuicrra, setCumuQuicrra] = useState(0);

  const [graphTitle, setGraphTitle] = useState(t('myStats.upload'));
  const [chartDate, setChartDate] = useState(['2020', '2021']); 
  const [CumuChartDate, setCumuChartDate] = useState(['2020', '2021']); 
  const [curChartState, setCurChartState] = useState('uploads');

  const [curChartdata, setCurChartdata] = useState({});
  const [curChartdata_new, setCurChartdataNew] = useState({});
  const [curCumuChartdata, setCurCumuChartdata] = useState({});

  //authToken
  const [, dispatch] = useStateValue();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Image
                resizeMode="stretch"
                source={require('../assets/uploads.png')}
                style={styles.imageIcon}
              />
              <Text style={styles.itemTitle}>{t('myStats.uploads')}</Text>
              <Text style={styles.itemValue}>{uploads}</Text>
            </View>
            <View style={styles.boxMini}>
              <Text style={styles.miniBoxValue}>{uploadsQuicrra}</Text>
              <Text style={styles.miniBoxFooter}>{t('myStats.quicrra')}</Text>
            </View>
          </View>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Image
                resizeMode="stretch"
                source={require('../assets/annotations.png')}
                style={styles.imageIcon}
              />
              <Text style={styles.itemTitle}>{t('myStats.annotations')}</Text>
              <Text style={styles.itemValue}>{annotations}</Text>
            </View>
            <View style={styles.boxMini}>
              <Text style={styles.miniBoxValue}>{annotationsQuicrra}</Text>
              <Text style={styles.miniBoxFooter}>{t('myStats.quicrra')}</Text>
            </View>
          </View>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Image
                resizeMode="stretch"
                source={require('../assets/verifications.png')}
                style={styles.imageIcon}
              />
              <Text style={styles.itemTitle}>{t('myStats.verifications')}</Text>
              <Text style={styles.itemValue}>{verifications}</Text>
            </View>
            <View style={styles.boxMini}>
              <Text style={styles.miniBoxValue}>{verificationsQuicrra}</Text>
              <Text style={styles.miniBoxFooter}>{t('myStats.quicrra')}</Text>
            </View>
          </View>
        </View>
        <View style={styles.fullWidthBox}>
          <Text style={styles.fullWidthBoxValue}>{cumuQuicrra}</Text>
          <Text style={styles.miniBoxFooter}>{t('myStats.quicrra')}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>
              {t('myStats.cumulative')} {graphTitle} {t('myStats.count')}
            </Text>
            <LineChart
              style={styles.chart}
              data={curChartdata_new}
              chartDescription={{text: ''}}
              legend={{}}
              marker={{
                enabled: true,
                backgroundTint: processColor('black'),
                markerColor: processColor('#80cccccc'),
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
              borderWidth={0}
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
              noDataText={t('myStats.noChartDataAvailable')}
            />
          </View>
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>
              {t('myStats.cumulativeEarnings')}
            </Text>
            <Text style={styles.miniBoxFooter}>{t('myStats.quicrra')}</Text>
            <LineChart
              style={styles.chart}
              data={curCumuChartdata}
              chartDescription={{text: ''}}
              legend={{}}
              marker={{
                enabled: true,
                backgroundTint: processColor('black'),
                markerColor: processColor('#80cccccc'),
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
              borderWidth={0}
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
              noDataText={t('myStats.noChartDataAvailable')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default withTranslation()(MyStats);
