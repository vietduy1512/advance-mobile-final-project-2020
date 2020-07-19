/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Screens } from 'constants';
import Home from './Home/Home';
import Browse from './Browse/Browse';
import Bookmark from './Bookmark/Bookmark';
import Search from './Search/Search';
import CourseDetail from '../Courses/CourseDetail/CourseDetail';
import Login from './Authenticate/Login'
import { createStackNavigator } from '@react-navigation/stack';
import { Spinner } from 'native-base';
import { View, StyleSheet } from 'react-native';
import {LoadingContext} from 'context';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const LayoutSpinner = ({ loading }) =>
  loading
    ? (<>
      <View style={styles.backgroundSpinner}></View>
      <Spinner size={100} style={styles.spinner} />
    </>)
    : null;

const TabLayout = () => {
  const {loading} = useContext(LoadingContext);
  return (
    <>
      <LayoutSpinner loading={loading} />
      <Tab.Navigator
        screenOptions={screenOptions}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen name={Screens.HOME} component={Home} />
        <Tab.Screen name={Screens.BOOKMARK} component={Bookmark} />
        <Tab.Screen name={Screens.BROWSE} component={Browse} />
        <Tab.Screen name={Screens.SEARCH} component={Search} />
      </Tab.Navigator>
    </>
  );
}

const MainLayout = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name={Screens.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={Screens.LAYOUT}
        component={TabLayout}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={Screens.COURSE_DETAIL}
        component={CourseDetail}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

export default MainLayout;

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    switch (route.name) {
      case Screens.HOME:
        iconName = 'ios-home';
        break;
      case Screens.BOOKMARK:
        iconName = 'ios-bookmark';
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

const styles = StyleSheet.create({
  backgroundSpinner: {
    position: 'absolute',
    zIndex: 1,
    opacity: 0.3,
    backgroundColor: 'grey',
    width: '100%',
    height: '100%'
  },
  spinner: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%'
  }
});
