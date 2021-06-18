import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from '../styles/about';

const About = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Kickstart the new data economy</Text>
        <Text style={styles.text}>
          Data is the new oil in the 21st century and big cooperations have
          already realised that to their advantage. In this project we are
          giving the power and profit of data back to the people that create it.
        </Text>
        <Text style={styles.text}>
          By using a reward system based on datatokens the contributors become
          immediate co-owners in data unions. Our first Data Vault is for
          images. It is available on the Ocean Protocol marketplace. The
          contributors upload images, annotate them and then these contributons
          are verified. They are rewarded with datatokens so they become
          co-owners of the dataset.
        </Text>
        <Text style={styles.text}>
          This combination of mechanics creates an intrinsic motivation to
          contribute positively. We want to give everyone the ability to use
          their data for a better future and their own profit. The project is
          powered by Ocean Protocol. They enable us, with their grants from the
          OceanDAO, to work on the project but without their technology we could
          never realise our project.
        </Text>
        <Text style={styles.text}>
          The main technological advantages that they created are datastokens
          which we use as the economy and price discovery for our data. And
          compute-to-data which we use to sell our collected dataset to buyers
          for algorithm training without the risk of our data being copied.
        </Text>
        <Text style={styles.text}>For</Text>
      </ScrollView>
    </View>
  );
};

export default About;
