import React, {useState, useEffect} from 'react';
import {BarChart} from 'react-native-charts-wrapper';
import {View, Text, processColor} from 'react-native';
import Button from '../components/Button';
import styles from '../styles/romannumberstats';
import {fetchRomanNumberStats} from '../functions/romannumberstats';
import {theme} from '../services/Common/theme';

const RomanNumberStats = ({navigation}) => {
  useEffect(() => {
    fetchRomanNumberStats(setStats);
  }, []);

  const [stats, setStats] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Stats</Text>
      <BarChart
        style={styles.chart}
        width={'100%'}
        height={'85%'}
        data={{
          dataSets:
            stats && stats.length > 0
              ? [
                  {
                    values: [
                      ...stats.map((stat) => ({y: parseInt(stat.count, 10)})),
                    ],
                    label: 'Number of Uploads',
                  },
                ]
              : null,
          config: {barWidth: 0.4, barColor: '#72b5cb'},
        }}
        xAxis={{
          labelCount: stats && stats.length ? stats.length : 0,
          granularity: 1,
          position: 'BOTTOM',
          drawGridLines: false,
          granularityEnabled: true,
          valueFormatter:
            stats && stats.length > 0
              ? [...stats.map((stat) => stat.tag.toUpperCase())]
              : null,
          axisLineWidth: 2,
          axisLineColor: '#3a506b',
        }}
        yAxis={{
          left: {
            drawLabels: false,
            axisLineWidth: 2,
            axisLineColor: '#3a506b',
            drawGridLines: false,
          },
          right: {enabled: false},
        }}
        animation={{durationX: 1000}}
        legend={{
          enabled: true,
          textSize: 14,
          form: 'EMPTY',
          formSize: 0,
          formToTextSpace: -7,
          horizontalAlignment: 'LEFT',
          verticalAlignment: 'TOP',
          orientation: 'HORIZONTAL',
        }}
        gridBackgroundColor={processColor('#ffffff')}
        drawBarShadow={false}
        drawValueAboveBar={true}
        drawHighlightArrow={true}
        chartDescription={{text: ''}}
        marker={{
          enabled: true,
          backgroundTint: processColor('black'),
          markerColor: processColor('#80cccccc'),
          textColor: processColor('white'),
        }}
        drawGridBackground={false}
        borderColor={processColor('#F0C0FF8C')}
        borderWidth={0}
        drawBorders={false}
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
        dragDecelerationEnabled={true}
        dragDecelerationFrictionCoef={0.99}
        keepPositionOnRotation={false}
        noDataText={'No chart data available.'}
      />
      <Button
        title="Back"
        color={theme.APP_COLOR}
        style={styles.width30p}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default RomanNumberStats;
