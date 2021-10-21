import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {theme} from '../services/Common/theme';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Ripple from './Ripple';
import {useNavigation} from '@react-navigation/native';

const TabBar = () => {
  const tabs = [
    {name: 'About', iconComponent: MaterialIcon, iconName: 'info'},
    {
      name: 'Verification',
      iconComponent: MaterialIcon,
      iconName: 'fingerprint',
    },
    {name: 'MyStats', iconComponent: IonIcon, iconName: 'analytics-sharp'},
    {name: 'Stats', iconComponent: MaterialIcon, iconName: 'analytics'},
    {
      name: 'Wallet',
      iconComponent: MaterialIcon,
      iconName: 'account-balance-wallet',
    },
    {name: 'Legal', iconComponent: MaterialIcon, iconName: 'privacy-tip'},
  ];

  const navigation = useNavigation();
  const [focusedRoute, setFocusedRoute] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      if (
        e.data &&
        e.data.state &&
        e.data.state.routes &&
        e.data.state.routes.length > 0 &&
        e.data.state.routes[0].state
      ) {
        const {index, routeNames} = e.data.state.routes[0].state || {};
        setFocusedRoute(routeNames[index]);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        {tabs.map((route) => (
          <Ripple
            outerStyle={styles.tabOuterStyle}
            innerStyle={styles.tabInnerStyle}
            onPress={() => navigation.navigate(route.name)}>
            <route.iconComponent
              size={24}
              name={route.iconName}
              color={
                route.name === focusedRoute
                  ? theme.COLORS.TAB_BAR_ICON_FOCUSED
                  : theme.COLORS.TAB_BAR_ICON_NOT_FOCUSED
              }
            />
          </Ripple>
        ))}
      </ScrollView>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    borderTopWidth: 8,
    backgroundColor: theme.APP_COLOR_2,
    borderTopColor: theme.APP_COLOR_1,
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tabOuterStyle: {
    borderRadius: 5,
    marginVertical: 5,
  },
  tabInnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
