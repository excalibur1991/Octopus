import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-charts-wrapper';
import {
  Image,
  ScrollView,
  Text,
  View,
  processColor,
  StyleSheet,
} from 'react-native';
import {useStateValue} from '../services/State/State';
import {styles} from '../styles/stats';
const UploadIcon = require('../assets/uploads.png');
const AnnotationIcon = require('../assets/annotations.png');
const VerificationIcon = require('../assets/verifications.png');
import {fetchOverall as fetchOverallGlobalStats} from '../functions/stats';
import {fetchOverall as fetchOverallMyStats} from '../functions/mystats';
import {withTranslation} from 'react-i18next';
import Ripple from '../components/Ripple';

var _arr_date = [];
var _arr_uploads = [];
var _arr_tag_annotations = [];
var _arr_text_annotations = [];
var _arr_verifications = [];

const Tab = ({title, value, isSelected, setTab}) => {
  return (
    <Ripple
      style={StyleSheet.flatten([
        styles.tab,
        isSelected ? styles.tabActive : {},
      ])}
      onPress={() => setTab(value, title)}>
      <Text style={[styles.tabText, isSelected ? styles.tabTextActive : {}]}>
        {title}
      </Text>
    </Ripple>
  );
};

const Stats = ({t, navigation}) => {
  useEffect(() => {
    fetchOverallGlobalStats(
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
  const [, dispatch] = useStateValue();
  const [tab, setTab] = useState('GlobalStats');

  const onTabChange = (tabVale, tabTitle) => {
    setTab(tabVale);
    navigation.setOptions({title: tabTitle});
    setAnnotations(0);
    setUploads(0);
    setVerifications(0);
    setUploadsQuicrra(0);
    setAnnotationsQuicrra(0);
    setCumuQuicrra(0);
    setChartDate(['2020', '2021']);
    setCumuChartDate(['2020', '2021']);
    setCurChartState('uploads');
    setCurChartdataNew({});
    setCurCumuChartdata({});

    if (tabVale === 'GlobalStats') {
      setGraphTitle(t('stats.upload'));
      fetchOverallGlobalStats(
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
    } else {
      setGraphTitle(t('myStats.upload'));
      fetchOverallMyStats(
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
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Tab
          setTab={onTabChange}
          value="GlobalStats"
          title="Global Stats"
          isSelected={tab === 'GlobalStats'}
        />
        <Tab
          setTab={onTabChange}
          value="MyStats"
          title="My Stats"
          isSelected={tab === 'MyStats'}
        />
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.uavContainer}>
          <View style={styles.uavItem}>
            <Image
              resizeMode="stretch"
              source={UploadIcon}
              style={styles.imageIcon}
            />
            <Text style={styles.uavItemTitle}>{t('stats.uploads')}</Text>
            <Text style={styles.uavItemValue}>{uploads}</Text>
            <Text style={styles.uavItemQuicraValue}>{uploadsQuicrra}</Text>
            <Text style={styles.uavItemQuicra}>{t('stats.datatoken')}</Text>
          </View>
          <View style={styles.uavItemDivider} />
          <View style={styles.uavCenterItem}>
            <Image
              resizeMode="stretch"
              source={AnnotationIcon}
              style={styles.imageIcon}
            />
            <Text style={styles.uavItemTitle}>{t('stats.annotations')}</Text>
            <Text style={styles.uavItemValue}>{annotations}</Text>
            <Text style={styles.uavItemQuicraValue}>{annotationsQuicrra}</Text>
            <Text style={styles.uavItemQuicra}>{t('stats.datatoken')}</Text>
          </View>
          <View style={styles.uavItemDivider} />
          <View style={styles.uavItem}>
            <Image
              resizeMode="stretch"
              source={VerificationIcon}
              style={styles.imageIcon}
            />
            <Text style={styles.uavItemTitle}>{t('stats.verifications')}</Text>
            <Text style={styles.uavItemValue}>{verifications}</Text>
            <Text style={styles.uavItemQuicraValue}>
              {verificationsQuicrra}
            </Text>
            <Text style={styles.uavItemQuicra}>{t('stats.datatoken')}</Text>
          </View>
        </View>
        <View style={styles.uavStatsDivider} />
        <View style={styles.quicraContainer}>
          <Text style={styles.quicraValue}>{cumuQuicrra}</Text>
          <Text style={styles.quicra}>{t('stats.datatoken')}</Text>
        </View>
      </View>
      <View style={styles.mainDivider} />
      <Text style={styles.graph}>Graphs</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>
            {t('stats.cumulative')} {graphTitle} {t('stats.count')}
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
            width={'100%'}
            height={220}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            keepPositionOnRotation={false}
            noDataText={t('stats.noChartDataAvailable')}
          />
        </View>

        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>{t('stats.cumulativeEarnings')}</Text>
          <Text style={styles.graphQuicra}>({t('stats.datatoken')})</Text>
          <LineChart
            style={styles.chart}
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
            width={'100%'}
            height={220}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            keepPositionOnRotation={false}
            noDataText={t('stats.noChartDataAvailable')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default withTranslation()(Stats);
