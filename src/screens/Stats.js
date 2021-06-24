/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Image, ScrollView, Text, View, Dimensions} from 'react-native';
import Button from '../components/Button';
import {useStateValue} from '../services/State/State';
import {styles} from '../styles/stats';
const UploadIcon = require('../assets/uploads.png');
import {updateChart, fetchOverall} from '../functions/stats';

const Stats = () => {
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
    );
  }, []);

  const [annotations, setAnnotations] = useState(0);
  const [uploads, setUploads] = useState(0);
  const [verifications, setVerifications] = useState(0);

  const [uploadsQuicrra, setUploadsQuicrra] = useState(0);
  const [annotationsQuicrra, setAnnotationsQuicrra] = useState(0);
  const [verificationsQuicrra, setVerificationsQuicrra] = useState(0);
  const [cumuQuicrra, setCumuQuicrra] = useState(0);

  const [graphTitle, setGraphTitle] = useState('UPLOAD');
  const [curChartState, setCurChartState] = useState('uploads');

  const curYear = Number(
    new Date().toISOString().replace(/T.*/, '').split('-')[0],
  );

  const [curChartdata, setCurChartdata] = useState({
    labels: [(curYear - 1).toString(), curYear.toString()],
    datasets: [
      {
        strokeWidth: 1,
        withDots: false,
        data: [0],
      },
    ],
  });

  const [curCumuChartdata, setCurCumuChartdata] = useState({
    labels: [(curYear - 1).toString(), curYear.toString()],
    datasets: [
      {
        strokeWidth: 1,
        withDots: false,
        data: [0],
      },
    ],
  });

  //authToken
  const [, dispatch] = useStateValue();

  var _arr_date = [];
  var _arr_uploads = [];
  var _arr_tag_annotations = [];
  var _arr_text_annotations = [];
  var _arr_verifications = [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Image
                resizeMode="stretch"
                source={UploadIcon}
                style={styles.imageIcon}
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
                style={styles.imageIcon}
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
                style={styles.imageIcon}
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
              fromZero
              transparent
              height={200}
              yAxisSuffix=""
              style={styles.graph}
              withVerticalLines={false}
              width={Dimensions.get('window').width}
              data={curChartdata}
              chartConfig={{
                decimalPlaces: 0,
                fillShadowGradientOpacity: 1,
                fillShadowGradient: '#a5c4f8',
                //formatYLabel: (value) => Math.round(value / 1000),
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            {curChartState !== 'uploads' && (
              <View style={styles.buttonInnerContainer}>
                <Button
                  color="#F5F6FC"
                  title="UPLOADS"
                  buttonStyle={styles.button}
                  onPress={() =>
                    updateChart(
                      'uploads',
                      setGraphTitle,
                      curChartdata,
                      setCurChartdata,
                      setCurChartState,
                      _arr_date,
                      _arr_uploads,
                      _arr_tag_annotations,
                      _arr_text_annotations,
                      _arr_verifications,
                    )
                  }
                  textStyle={styles.buttonText}
                />
              </View>
            )}
            {curChartState !== 'annotations' && (
              <View style={styles.buttonInnerContainer}>
                <Button
                  color="#F5F6FC"
                  title="ANNOTATIONS"
                  buttonStyle={styles.button}
                  onPress={() =>
                    updateChart(
                      'annotations',
                      setGraphTitle,
                      curChartdata,
                      setCurChartdata,
                      setCurChartState,
                      _arr_date,
                      _arr_uploads,
                      _arr_tag_annotations,
                      _arr_text_annotations,
                      _arr_verifications,
                    )
                  }
                  textStyle={styles.buttonText}
                />
              </View>
            )}
            {curChartState !== 'verifications' && (
              <View style={styles.buttonInnerContainer}>
                <Button
                  color="#F5F6FC"
                  title="VERIFICATIONS"
                  buttonStyle={styles.button}
                  onPress={() =>
                    updateChart(
                      'verifications',
                      setGraphTitle,
                      curChartdata,
                      setCurChartdata,
                      setCurChartState,
                      _arr_date,
                      _arr_uploads,
                      _arr_tag_annotations,
                      _arr_text_annotations,
                      _arr_verifications,
                    )
                  }
                  textStyle={styles.buttonText}
                />
              </View>
            )}
          </View>
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>CUMULATIVE EARNINGS</Text>
            <Text style={styles.miniBoxFooter}>QUICRRA-0</Text>
            <LineChart
              fromZero
              transparent
              height={200}
              yAxisSuffix=""
              style={styles.graph}
              withVerticalLines={false}
              width={Dimensions.get('window').width}
              data={curCumuChartdata}
              chartConfig={{
                decimalPlaces: 0,
                fillShadowGradientOpacity: 1,
                fillShadowGradient: '#a5c4f8',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Stats;
