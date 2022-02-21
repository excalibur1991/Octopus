/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import Ripple from '../components/Ripple';
import {styles} from '../styles/classifyimage';
import {theme} from '../services/Common/theme';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {View, Image, Text} from 'react-native';

const Knee = require('../assets/Knee2.png');
const Shoulder = require('../assets/Shoulder1.png');

const ClassifyImage = ({navigation}) => {
  const [questions, setQuestions] = useState([
    {
      image: Knee,
      correctOption: 'Knee',
    },
    {
      image: Shoulder,
      correctOption: 'Shoulder',
    },
    {
      image: Knee,
      correctOption: 'Knee',
    },
    {
      image: Shoulder,
      correctOption: 'Shoulder',
    },
    {
      image: Shoulder,
      correctOption: 'Shoulder',
    },
    {
      image: Knee,
      correctOption: 'Knee',
    },
    {
      image: Shoulder,
      correctOption: 'Shoulder',
    },
    {
      image: Knee,
      correctOption: 'Knee',
    },
  ]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responseIndex, setResponseIndex] = useState(null);
  const [correct, setCorrect] = useState(false);

  const submitResponse = (questionIndex, response) => {
    setResponseIndex(questionIndex);
    if (
      questions[questionIndex].correctOption.toLowerCase() ===
      response.toLowerCase()
    ) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    setTimeout(() => {
      setResponseIndex(null);
      setCorrect(false);
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((index) => index + 1);
      } else {
        setQuestionIndex(0);
        navigation.navigate('ClassifyImageReward');
      }
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={questions[questionIndex].image} style={styles.image} />
        {(responseIndex || responseIndex === 0) && (
          <View style={styles.resultContainer}>
            {correct ? (
              <>
                <Text style={styles.resultText}>Correct</Text>
                <AntIcon
                  name="checkcircle"
                  color={theme.COLORS.WHITE}
                  size={56}
                />
              </>
            ) : (
              <>
                <Text style={styles.resultText}>Incorrect</Text>
                <AntIcon
                  name="closecircle"
                  color={theme.COLORS.WHITE}
                  size={56}
                />
              </>
            )}
          </View>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        {!responseIndex && (
          <>
            <Ripple
              onPress={() => submitResponse(questionIndex, 'Knee')}
              style={styles.kneeButton}>
              <Text style={styles.buttonText}>Knee</Text>
            </Ripple>
            <Ripple
              onPress={() => submitResponse(questionIndex, 'Shoulder')}
              style={styles.shoulderButton}>
              <Text style={styles.buttonText}>Shoulder</Text>
            </Ripple>
          </>
        )}
      </View>
    </View>
  );
};

export default ClassifyImage;
