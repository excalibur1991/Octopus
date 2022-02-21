/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {LineChart, PieChart} from 'react-native-charts-wrapper';
import {
  Image,
  ScrollView,
  Text,
  View,
  processColor,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useStateValue} from '../services/State/State';
import {styles} from '../styles/stats';
import {fetchOverall as fetchOverallGlobalStats} from '../functions/stats';
import {fetchOverall as fetchOverallMyStats} from '../functions/mystats';
import {withTranslation} from 'react-i18next';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import * as Progress from 'react-native-progress';

const UploadIcon = require('../assets/uploads.png');
const VerificationIcon = require('../assets/verification_white.png');

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
          {tab === 'GlobalStats' && (
            <>
              <View style={styles.uavItem}>
                <View style={styles.uavContentContainer}>
                  <View>
                    <Text style={styles.uavItemTitle}>
                      {t('stats.uploads')}
                    </Text>
                    <Text style={styles.uavItemValue}>{uploads}</Text>
                  </View>
                  <Image
                    resizeMode="stretch"
                    source={UploadIcon}
                    style={styles.imageIcon}
                  />
                </View>
                <PieChart
                  width={'100%'}
                  height={Dimensions.get('screen').width * 0.25}
                  data={{
                    dataSets: [
                      {
                        config: {
                          colors: [
                            processColor(theme.COLORS.TULIP_TREE),
                            processColor(theme.COLORS.WELL_READ),
                          ],
                          valueLineWidth: 0,
                          valueTextSize: 12,
                          valueFormatter: "'%'#.#",
                          valueLinePart1Length: 0.9,
                          yValuePosition: 'OUTSIDE_SLICE',
                          valueLineColor: processColor('transparent'),
                          valueTextColor: processColor(theme.COLORS.WELL_READ),
                        },
                        values: [
                          {value: 47, label: 'SH'},
                          {value: 53, label: 'KN'},
                        ],
                      },
                    ],
                  }}
                  chartDescription={{text: ''}}
                  legend={{enabled: false}}
                  touchEnabled={false}
                  entryLabelTextSize={12}
                  entryLabelColor={processColor('black')}
                  entryLabelFontFamily={'Moon-Bold'}
                  holeRadius={0}
                  transparentCircleRadius={0}
                  maxAngle={360}
                  rotationAngle={230}
                  rotationEnabled
                />
              </View>

              <View style={styles.uavItemDivider} />
            </>
          )}

          <View style={styles.uavItem}>
            <View style={styles.uavContentContainer}>
              <View>
                <Text style={styles.uavItemTitle}>Classifications</Text>
                <Text style={styles.uavItemValue}>{verifications}</Text>
              </View>
              <Image
                resizeMode="stretch"
                style={styles.imageIcon}
                source={VerificationIcon}
              />
            </View>
            <PieChart
              width={'100%'}
              height={Dimensions.get('screen').width * 0.25}
              data={{
                dataSets: [
                  {
                    config: {
                      colors: [
                        processColor(theme.COLORS.TULIP_TREE),
                        processColor(theme.COLORS.WELL_READ),
                      ],
                      valueLineWidth: 0,
                      valueTextSize: 12,
                      valueFormatter: "'%'#.#",
                      valueLinePart1Length: 0.9,
                      yValuePosition: 'OUTSIDE_SLICE',
                      valueLineColor: processColor('transparent'),
                      valueTextColor: processColor(theme.COLORS.WELL_READ),
                    },
                    values: [
                      {value: 39, label: 'SH'},
                      {value: 61, label: 'KN'},
                    ],
                  },
                ],
              }}
              chartDescription={{text: ''}}
              legend={{enabled: false}}
              touchEnabled={false}
              entryLabelTextSize={12}
              entryLabelColor={processColor('black')}
              entryLabelFontFamily={'Moon-Bold'}
              holeRadius={0}
              transparentCircleRadius={0}
              maxAngle={360}
              rotationAngle={230}
              rotationEnabled
            />
          </View>
          {tab === 'MyStats' && (
            <>
              <View style={styles.uavItemDivider} />
              <View style={styles.uavItemSRs}>
                <Text style={styles.uavItemHeading}>Success rates</Text>
                <View style={styles.uavSRProgressContainer}>
                  <View style={styles.uavSRContentContainer}>
                    <Text style={styles.uavItemSRTitle}>Knee: 200</Text>
                    <Text style={styles.uavItemSRValue}>92%</Text>
                  </View>
                  <Progress.Bar
                    height={5}
                    progress={0.92}
                    borderWidth={2}
                    borderRadius={10}
                    color={theme.COLORS.TULIP_TREE}
                    borderColor={theme.COLORS.BLACK}
                    unfilledColor={theme.COLORS.BLACK}
                    width={Dimensions.get('window').width * 0.375}
                  />
                </View>
                <View style={styles.uavSRProgressContainer}>
                  <View style={styles.uavSRContentContainer}>
                    <Text style={styles.uavItemSRTitle}>Shoulder: 150</Text>
                    <Text style={styles.uavItemSRValue}>88%</Text>
                  </View>
                  <Progress.Bar
                    height={5}
                    progress={0.88}
                    borderWidth={2}
                    borderRadius={10}
                    color={theme.COLORS.TULIP_TREE}
                    borderColor={theme.COLORS.BLACK}
                    unfilledColor={theme.COLORS.BLACK}
                    width={Dimensions.get('window').width * 0.375}
                  />
                </View>
              </View>
            </>
          )}
        </View>
        <View style={styles.uavStatsDivider} />
        <View style={styles.successContainer}>
          <View style={styles.successTextValueContainer}>
            <Text style={styles.successText}>Total success rate</Text>
            <Text style={styles.successValue}>83%</Text>
          </View>
          <Progress.Bar
            height={14}
            progress={0.7}
            borderWidth={3}
            borderRadius={15}
            color={theme.COLORS.TULIP_TREE}
            borderColor={theme.COLORS.BLACK}
            unfilledColor={theme.COLORS.BLACK}
            width={Dimensions.get('window').width * 0.8}
          />
        </View>
      </View>
      <View style={styles.mainDivider} />
      <Text style={styles.graph}>Graphs</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {tab === 'GlobalStats' && (
          <>
            <View style={styles.graphContainer}>
              <Text style={styles.graphTitle}>Total Locked Value</Text>
              <LineChart
                data={curChartdata_new}
                chartDescription={{text: ''}}
                legend={{
                  form: 'CIRCLE',
                  fontFamily: 'Moon-Bold',
                  textColor: processColor('white'),
                }}
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
                  fontFamily: 'Moon-Bold',
                }}
                yAxis={{
                  left: {
                    axisMinimum: 0,
                    textColor: processColor('white'),
                    fontFamily: 'Moon-Bold',
                  },
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
              <Text style={styles.graphTitle}>Upload Count</Text>
              <LineChart
                data={
                  (curChartdata_new &&
                    curChartdata_new.dataSets &&
                    curChartdata_new.dataSets.length > 0 && {
                      dataSets: [
                        curChartdata_new.dataSets.find(
                          (ds) =>
                            ds.label && ds.label.toLowerCase() === 'uploads',
                        ),
                      ],
                    }) ||
                  {}
                }
                chartDescription={{text: ''}}
                legend={{
                  form: 'CIRCLE',
                  fontFamily: 'Moon-Bold',
                  textColor: processColor('white'),
                }}
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
                  fontFamily: 'Moon-Bold',
                }}
                yAxis={{
                  left: {
                    axisMinimum: 0,
                    textColor: processColor('white'),
                    fontFamily: 'Moon-Bold',
                  },
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
              <Text style={styles.graphTitle}>Classification Count</Text>
              <LineChart
                data={
                  (curChartdata_new &&
                    curChartdata_new.dataSets &&
                    curChartdata_new.dataSets.length > 0 && {
                      dataSets: [
                        curChartdata_new.dataSets.find(
                          (ds) =>
                            ds.label &&
                            ds.label.toLowerCase() === 'verifications',
                        ),
                      ],
                    }) ||
                  {}
                }
                chartDescription={{text: ''}}
                legend={{
                  form: 'CIRCLE',
                  fontFamily: 'Moon-Bold',
                  textColor: processColor('white'),
                }}
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
                  fontFamily: 'Moon-Bold',
                }}
                yAxis={{
                  left: {
                    axisMinimum: 0,
                    textColor: processColor('white'),
                    fontFamily: 'Moon-Bold',
                  },
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
          </>
        )}

        {tab === 'MyStats' && (
          <>
            <View style={styles.graphContainer}>
              <Text style={styles.graphTitle}>Earnings</Text>
              <Text style={styles.graphQuicra}>115 Orthcoin</Text>
              <LineChart
                style={styles.chart}
                data={curCumuChartdata}
                chartDescription={{text: ''}}
                legend={{
                  form: 'CIRCLE',
                  textColor: processColor('white'),
                  fontFamily: 'Moon-Bold',
                }}
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
                  fontFamily: 'Moon-Bold',
                }}
                yAxis={{
                  left: {
                    axisMinimum: 0,
                    textColor: processColor('white'),
                    fontFamily: 'Moon-Bold',
                  },
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
            <View style={styles.graphContainer}>
              <Text style={styles.graphTitle}>Classification Count</Text>
              <LineChart
                data={
                  (curChartdata_new &&
                    curChartdata_new.dataSets &&
                    curChartdata_new.dataSets.length > 0 && {
                      dataSets: [
                        curChartdata_new.dataSets.find(
                          (ds) =>
                            ds.label &&
                            ds.label.toLowerCase() === 'verifications',
                        ),
                      ],
                    }) ||
                  {}
                }
                chartDescription={{text: ''}}
                legend={{
                  form: 'CIRCLE',
                  fontFamily: 'Moon-Bold',
                  textColor: processColor('white'),
                }}
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
                  fontFamily: 'Moon-Bold',
                }}
                yAxis={{
                  left: {
                    axisMinimum: 0,
                    textColor: processColor('white'),
                    fontFamily: 'Moon-Bold',
                  },
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
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default withTranslation()(Stats);
