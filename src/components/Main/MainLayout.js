/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Screens} from 'constants';
import Home from './Home/Home';
import Browse from './Browse/Browse';
import Download from './Download/Download';
import Search from './Search/Search';

const Tab = createBottomTabNavigator();

const MainLayout = () => {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
      switch (route.name) {
        case Screens.HOME:
          iconName = 'ios-home';
          break;
        case Screens.DOWNLOAD:
          iconName = 'ios-download';
          break;
        case Screens.BROWSE:
          iconName = 'ios-albums';
          break;
        case Screens.SEARCH:
          iconName = 'ios-search';
          break;
        default:
          break;
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    }
  });

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen name={Screens.HOME} component={Home} />
      <Tab.Screen name={Screens.DOWNLOAD} component={Download} />
      <Tab.Screen name={Screens.BROWSE} component={Browse} />
      <Tab.Screen name={Screens.SEARCH} component={Search} />
    </Tab.Navigator>
  );
}

export default MainLayout;
