import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Screens } from "constants";
import Home from "./Main/Home";
import Browse from "./Main/Browse";
import Bookmark from "./Main/Bookmark";
import Download from "./Main/Download";
import Search from "./Main/Search";
import CourseDetail from "./Courses/CourseDetail";
import MoreCourses from "./Courses/MoreCourses";
import PathCourses from "./Paths/PathCourses";
import Login from "./Authenticate/Login";
import Register from "./Authenticate/Register";
import ForgotPassword from "./Authenticate/ForgotPassword";
import { createStackNavigator } from "@react-navigation/stack";
import LayoutSpinner from "components/Common/LayoutSpinner";

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const TabLayout = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={screenOptions}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name={Screens.HOME} component={Home} />
        <Tab.Screen name={Screens.DOWNLOAD} component={Download} />
        <Tab.Screen name={Screens.BROWSE} component={Browse} />
        <Tab.Screen name={Screens.SEARCH} component={Search} />
      </Tab.Navigator>
    </>
  );
};

const MainLayout = () => {
  return (
    <>
      <LayoutSpinner />
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
          name={Screens.FORGOT_PASSWORD}
          component={ForgotPassword}
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
        <RootStack.Screen
          name={Screens.PATH_COURSES}
          component={PathCourses}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={Screens.MORE_COURSES}
          component={MoreCourses}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={Screens.BOOKMARK}
          component={Bookmark}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </>
  );
};

export default MainLayout;

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    switch (route.name) {
      case Screens.HOME:
        iconName = "ios-home";
        break;
      case Screens.DOWNLOAD:
        iconName = "ios-download";
        break;
      case Screens.BROWSE:
        iconName = "ios-albums";
        break;
      case Screens.SEARCH:
        iconName = "ios-search";
        break;
      default:
        break;
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});
