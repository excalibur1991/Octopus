/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-charts-wrapper';
import {
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
  processColor,
  FlatList,
} from 'react-native';

import Button from '../components/Button';
import {useStateValue} from '../services/State/State';
import {styles} from '../styles/stats';

const UploadIcon = require('../assets/uploads.png');
import {updateChart, fetchOverall} from '../functions/stats';
import {withTranslation} from 'react-i18next';

import OctIcon from 'react-native-vector-icons/Octicons';
import {theme} from '../services/Common/theme';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

var _arr_date = [];
var _arr_uploads = [];
var _arr_tag_annotations = [];
var _arr_text_annotations = [];
var _arr_verifications = [];

const Stats = ({t, navigation}) => {
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
      setCurCumuChartdata,
    );
  }, []);

  const [annotations, setAnnotations] = useState(0);
  const [uploads, setUploads] = useState(0);
  const [verifications, setVerifications] = useState(0);

  const [uploadsQuicrra, setUploadsQuicrra] = useState(0);
  const [annotationsQuicrra, setAnnotationsQuicrra] = useState(0);
  const [verificationsQuicrra, setVerificationsQuicrra] = useState(0);
  const [cumuQuicrra, setCumuQuicrra] = useState(0);

  const [graphTitle, setGraphTitle] = useState(t('stats.upload'));
  const [chartDate, setChartDate] = useState(['2020', '2021']);
  const [CumuChartDate, setCumuChartDate] = useState(['2020', '2021']);
  const [curChartState, setCurChartState] = useState('uploads');

  const [curChartdata_new, setCurChartdataNew] = useState({});
  const [curCumuChartdata, setCurCumuChartdata] = useState({});

  //authToken
  const [, dispatch] = useStateValue();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Stats</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Wallet')}>
          <View style={styles.headerActionContainer}>
            <OctIcon size={15} name="settings" color={theme.COLORS.WHITE} />
            <Text style={styles.headerActionText}>Settings</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.statsGraphContainer}>
        <View style={styles.statsContainer}>
          <View style={styles.topContainer}>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Image
                  resizeMode="stretch"
                  source={UploadIcon}
                  style={styles.imageIcon}
                />
                <Text style={styles.itemTitle}>{t('stats.uploads')}</Text>
                <Text style={styles.itemValue}>{uploads}</Text>
              </View>
              <View style={styles.boxMini}>
                <Text style={styles.miniBoxValue}>{uploadsQuicrra}</Text>
                <Text style={styles.miniBoxFooter}>{t('stats.datatoken')}</Text>
              </View>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Image
                  resizeMode="stretch"
                  source={require('../assets/annotations.png')}
                  style={styles.imageIcon}
                />
                <Text style={styles.itemTitle}>{t('stats.annotations')}</Text>
                <Text style={styles.itemValue}>{annotations}</Text>
              </View>
              <View style={styles.boxMini}>
                <Text style={styles.miniBoxValue}>{annotationsQuicrra}</Text>
                <Text style={styles.miniBoxFooter}>{t('stats.datatoken')}</Text>
              </View>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Image
                  resizeMode="stretch"
                  source={require('../assets/verifications.png')}
                  style={styles.imageIcon}
                />
                <Text style={styles.itemTitle}>{t('stats.verifications')}</Text>
                <Text style={styles.itemValue}>{verifications}</Text>
              </View>
              <View style={styles.boxMini}>
                <Text style={styles.miniBoxValue}>{verificationsQuicrra}</Text>
                <Text style={styles.miniBoxFooter}>{t('stats.datatoken')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.fullWidthBox}>
            <Text style={styles.fullWidthBoxValue}>{cumuQuicrra}</Text>
            <Text style={styles.fullWidthBoxFooter}>
              {t('stats.datatoken')}
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          nestedScrollEnabled
          style={styles.bottomContainer}>
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>
              {t('stats.cumulative')} {t('stats.count')}
            </Text>
            <LineChart
              data={curChartdata_new}
              chartDescription={{text: ''}}
              legend={{form: 'CIRCLE', textColor: processColor('white')}}
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
                drawGridLines: false,
                textColor: processColor('white'),
              }}
              yAxis={{
                left: {axisMinimum: 0, textColor: processColor('white')},
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
              width={Dimensions.get('screen').width * 0.9}
              height={240}
              dragDecelerationEnabled={true}
              dragDecelerationFrictionCoef={0.99}
              keepPositionOnRotation={false}
              noDataText={t('stats.noChartDataAvailable')}
            />
          </View>
          <View style={{...styles.graphContainer, ...styles.marginRight10}}>
            <Text style={styles.graphTitle}>
              {t('stats.cumulativeEarnings')}
            </Text>
            <Text style={styles.miniBoxFooter}>{t('stats.datatoken')}</Text>
            <LineChart
              data={curCumuChartdata}
              chartDescription={{text: ''}}
              legend={{form: 'CIRCLE', textColor: processColor('white')}}
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
                drawGridLines: false,
                textColor: processColor('white'),
              }}
              yAxis={{
                left: {axisMinimum: 0, textColor: processColor('white')},
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
              width={Dimensions.get('screen').width * 0.9}
              height={230}
              dragDecelerationEnabled={true}
              dragDecelerationFrictionCoef={0.99}
              keepPositionOnRotation={false}
              noDataText={t('stats.noChartDataAvailable')}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default withTranslation()(Stats);
