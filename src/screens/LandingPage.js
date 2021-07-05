import React from 'react';
import Ripple from '../components/Ripple';
import {theme} from '../services/Common/theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Text, View, FlatList} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/landingpage';

const LandingPage = ({navigation}) => {
  const options = [
    {
      title: 'Verify',
      screen: 'MyStats',
      icon: 'search',
      Icon: IonIcon,
    },    
    {
      title: 'My Stats',
      screen: 'MyStats',
      icon: 'analytics-sharp',
      Icon: IonIcon,
    },
    {
      title: 'Learn',
      screen: 'Learn',
      icon: 'subscriptions',
      Icon: MaterialIcon,
    },
    {
      title: 'Stats',
      screen: 'Stats',
      icon: 'analytics',
      Icon: MaterialIcon,
    },
    {
      icon: 'info',
      title: 'Info',
      screen: 'About',
      Icon: MaterialIcon,
    },
    {
      title: 'Wallet',
      screen: 'Wallet',
      icon: 'account-balance-wallet',
      Icon: MaterialIcon,
    },
  ];

  return (
    <View style={styles.container}>
      <Ripple
        outerStyle={styles.swipeAiOuter}
        innerStyle={styles.swipeAiInner}
        onPress={() => navigation.navigate('SwipeAI')}>
        <View style={styles.swipeAiIcon}>
          <MaterialIcon size={50} name="cloud-upload" color={theme.APP_COLOR} />
        </View>
        <Text style={styles.buttonText}>Upload</Text>
      </Ripple>
      <FlatList
        style={styles.Container}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        data={options}
        renderItem={({item}) => (
          <Ripple
            onPress={() => navigation.navigate(item.screen)}
            key={item.id}
            outerStyle={styles.listItemOuter}
            innerStyle={styles.listItemInner}>
            <item.Icon
              style={styles.icon}
              name={item.icon}
              size={39}
              color={theme.APP_COLOR}
            />
            <Text style={styles.itemTitle}>{item.title}</Text>
          </Ripple>
        )}
        numColumns={2}
      />
    </View>
  );
};

export default LandingPage;
