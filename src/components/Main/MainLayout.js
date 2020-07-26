/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Screens } from 'constants';
import Home from './Home/Home';
import Browse from './Browse/Browse';
import Bookmark from './Bookmark/Bookmark';
import Search from './Search/Search';
import CourseDetail from '../Courses/CourseDetail/CourseDetail';
import Login from './Authenticate/Login'
import Register from './Authenticate/Register'
import { createStackNavigator } from '@react-navigation/stack';
import LayoutSpinner from 'components/Common/LayoutSpinner';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const TabLayout = () => {
  return (
    <>
      <LayoutSpinner />
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
        name={Screens.REGISTER}
        component={Register}
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
