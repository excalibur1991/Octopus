import React from 'react';
import {Linking, ScrollView, Text, View} from 'react-native';
import {styles} from '../styles/about';
import {withTranslation} from 'react-i18next';
import { chdir } from 'process';
import { NavigationContainer } from '@react-navigation/native';


const Panel = ({header, children})=>{
  return (
    <>
      <View
        style={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: '#8b98a9',
            paddingHorizontal: '4%',
            paddingVertical: '3%',
            marginTop: '4%',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
          {header}
        </View>
        <View 
        style={{
            backgroundColor: '#f2f2f2',
            paddingHorizontal: '4%',
            paddingVertical: '2%',
        }}>
          {children}
        </View>
        </>
  )
}


const About = ({navigation, t}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          /**
           *         
          <Text style={styles.header}>{t('about.heading')}</Text>
          <Text style={styles.text}>{t('about.para1')}</Text>
          <Text style={styles.text}>{t('about.para2')}</Text>
          <Text style={styles.text}>{t('about.para3')}</Text>
          <Text style={styles.text}>{t('about.para4')}</Text>
          <Text style={styles.text}>{t('about.para5')}</Text>
           */
        }
        <Text style={styles.header}>Tutorials & FAQ</Text>
        <Text style={styles.text}>For people who are new to cryptocurrency, unsure how our site works, or simply curious.</Text>
        <Panel 
        header={
          <Text>Why are we rewarding you to upload photos?</Text>
        } >
          <Text>Data is valuable because it allows data scientists to build machine learning algorithms that solve big and small problems. Photos are a type of data. The more detailed and organized data is, the more valuable it becomes. And especially if there is a lot of it. This is why DataUnion.app rewards you not just for uploading images, but for annotating and verifying them as well.
Some examples of problems you can help solve by contributing data:{'\n'}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>{'\u2022'}</Text>
            <Text style={{flex: 1, paddingLeft: 5}}>Fixing bias in facial-recognition algorithms </Text>
            <Text style={styles.link} onPress={()=>Linking.openURL('https://ai.facebook.com/blog/how-were-using-fairness-flow-to-help-build-ai-that-works-better-for-everyone')}>[x]</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>{'\u2022'}</Text>
            <Text style={{flex: 1, paddingLeft: 5}}>Fixing bias in other algorithms </Text>
            <Text style={styles.link} onPress={()=>Linking.openURL('https://www.ajl.org/')}>[x]</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>{'\u2022'}</Text>
            <Text style={{flex: 1, paddingLeft: 5}}>Self-driving vehicles </Text>
            <Text style={styles.link} onPress={()=>Linking.openURL('https://evotegra.de/')}>[x]</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>{'\u2022'}</Text>
            <Text style={{flex: 1, paddingLeft: 5}}>Litter collection </Text>
            <Text style={styles.link} onPress={()=>Linking.openURL('https://project.bb/')}>[x]</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>{'\u2022'}</Text>
            <Text style={{flex: 1, paddingLeft: 5}}>Improving the Food Supply Chain </Text>
            <Text style={styles.link} onPress={()=>Linking.openURL('https://apfoodonline.com/industry/food-thought-machine-vision-revolutionising-food-beverage-industry/')}>[x]</Text>
          </View>
          <Text>{'\n'}To read more about DataUnion.app's mission and technical goals, visit <Text style={styles.link} onPress={()=>Linking.openURL('https://dataunion.app/')}>our website.</Text> </Text>
        </Panel>
        <Panel
          header={
            <Text>Where are your photos, annotations and verifications going?</Text>
          }
        >
          <Text>Your photos, annotations and verifications are contributing to the <Text style={styles.link} onPress={()=>Linking.openURL('https://market.oceanprotocol.com/asset/did:op:7Bce67697eD2858d0683c631DdE7Af823b7eea38')}>DataUnion.app Image Data Vault</Text> which is being sold on the Ocean Marketplace.{'\n'}</Text>
          <Text>QUICRA-0 Tokens (short for Quiescient Crab Tokens) The QUICRA-0 datatokens you earn for contributing, are shares in this dataset. These can either be traded for Ocean Protocol tokens ($OCEAN) and from there to many other tokens. They can be also staked in the liquidity pool and generate rewards for the usage of the dataset that you contributed to.{'\n\n'}</Text>
          <Text>To read more about DataUnion.app's mission and technical goals, visit <Text style={styles.link} onPress={()=>Linking.openURL('https://dataunion.app/')} >our website.</Text></Text>
        </Panel>
        <Panel
          header={
            <Text>What are you supposed to do to get rewards?</Text>
          }
        >
          <Text><Text style={styles.bold}>Uploading Images:</Text> The first option to gain rewards is to upload images. This is called <Text style={styles.italic}>Images Uploaded</Text> in the statistics. Uploading images is straightforward except you are not allowed to upload similar images - your image is checked on the server for duplicates (hence why uploads take time). Uploading Images gives the most rewards. You can do this in the <Text style={styles.link} onPress={()=>{navigation.navigate('Upload')}}>upload section.</Text></Text>
          <Text><Text style={styles.bold}>Annotating Images:</Text> The second option is to add descriptions and tags - collectively known as <Text style={styles.italic} >Annotations</Text> - to the images. Annotations let us group similar images together and they increase the usefulness of algorithms trained on the dataset. When buyers of the data later look for images they are interested in, they will search for the tags. Individual tags and descriptions give the second highest amount of rewards, as adding a tag or description is easier than finding images. You can annotate images whilst <Text style={styles.link} onPress={()=>{navigation.navigate('Upload')}}>uploading</Text> or <Text style={styles.link} onPress={()=>navigation.navigate('Verification')}>verifying</Text> images.</Text>
          <Text><Text style={styles.bold}>Verifying Images:</Text> The third option is to verify the descriptions - this is called <Text style={styles.italic}>Verifications</Text> in the statistics - and tags that other people added to images as well as to filter out images that should not be in the dataset. This is done by up or downvoting the descriptions and tags. This is rewarded the least amount as it is the easiest way to contribute. You can do this in the <Text style={styles.link} onPress={()=>navigation.navigate('Verification')}>verification section.</Text></Text>
        </Panel>
        <Panel
          header={
            <Text>Uploading your first image</Text>
          }
        >
          <Text style={styles.bold}>Uploading your first image</Text>
          <Text>If you wonder how to Upload your first image - this video is the answer.</Text>
        </Panel>
        <Panel
          header={
            <Text>Verifying Image</Text>
          }
        >
          <Text style={styles.bold}>Verifying Images</Text>
          <Text>How do you verify your first image? Check out this video!</Text>
        </Panel>
        <Panel
          header={
            <Text>What is QUICRA-0?</Text>
          }
        >
          <Text style={styles.bold}>What is QUICRA-0?</Text>
          <Text>This video explains what the QUICRA-0 token is, where it derives its value, and how you can transfer it into real money.</Text>
        </Panel>
      </ScrollView>
    </View>
  );
};

export default withTranslation()(About);
