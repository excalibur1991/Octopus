/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Image, ScrollView, Text, View, Dimensions} from 'react-native';
import Button from '../components/Button';
import {useStateValue} from '../services/State/State';
import {styles} from '../styles/mystats';
import {sumCumuData, updateChart, fetchOverall} from '../functions/mystats';
import {withTranslation} from 'react-i18next';

const MyStats = ({t}) => {
  useEffect(() => {
    fetchOverall(
      dispatch,
      setAnnotations,
      setUploads,
      setVerifications,
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

  const [graphTitle, setGraphTitle] = useState(t('myStats.upload'));
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
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            {curChartState !== 'uploads' && (
              <View style={styles.buttonInnerContainer}>
                <Button
                  color="#F5F6FC"
                  title={t('myStats.uploads').toUpperCase()}
                  buttonStyle={styles.button}
                  onPress={() =>
                    updateChart(
                      'uploads',
                      setGraphTitle,
                      curChartdata,
                      setCurChartdata,
                      setCurChartState,
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
                  title={t('myStats.annotations').toUpperCase()}
                  buttonStyle={styles.button}
                  onPress={() =>
                    updateChart(
                      'annotations',
                      setGraphTitle,
                      curChartdata,
                      setCurChartdata,
                      setCurChartState,
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
                  title={t('myStats.verifications').toUpperCase()}
                  buttonStyle={styles.button}
                  onPress={() =>
                    updateChart(
                      'verifications',
                      setGraphTitle,
                      curChartdata,
                      setCurChartdata,
                      setCurChartState,
                    )
                  }
                  textStyle={styles.buttonText}
                />
              </View>
            )}
          </View>
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>
              {t('myStats.cumulativeEarnings')}
            </Text>
            <Text style={styles.miniBoxFooter}>{t('myStats.quicrra')}</Text>
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

export default withTranslation()(MyStats);
