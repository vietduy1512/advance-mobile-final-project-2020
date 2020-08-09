import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import SectionCourses from "components/Courses/SectionCourses/SectionCoursesContent";
import SectionPaths from "components/Paths/SectionPaths/SectionPathsContent";
import Channels from "components/Main/Home/Channels";
import { Titles } from "constants";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { Screens } from "constants";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Settings from "../Settings/Settings";
import { ThemeContext } from "config/context";
import {
  getRecommendCourses,
  getProcessCourses,
  getTopSellCourses,
  getTopNewCourses,
  getTopRateCourses,
} from "core/services/coursesService";
import { getAllCategories } from "core/services/categoriesService";
import { getFavoriteCourses } from "core/services/coursesService";
import { LoadingContext } from "config/context";
import { AuthenticationContext } from "config/context";

const HomeStack = createStackNavigator();

const Home = () => {
  const { setLoading } = useContext(LoadingContext);
  const { theme } = useContext(ThemeContext);
  const authContext = useContext(AuthenticationContext);
  const [processCourses, setProcessCourses] = useState([]);
  const [recommendCourses, setRecommendCourses] = useState([]);
  const [topSellCourses, setTopSellCourses] = useState([]);
  const [topNewCourses, setTopNewCourses] = useState([]);
  const [topRateCourses, setTopRateCourses] = useState([]);
  const [paths, setPaths] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getRecommendCourses(authContext.state.userInfo.id),
      getProcessCourses(),
      getTopSellCourses(),
      getTopNewCourses(),
      getTopRateCourses(),
      getAllCategories(),
      getFavoriteCourses(),
    ])
      .then(
        ([
          recommendRes,
          processRes,
          topSellRes,
          topNewRes,
          topRateRes,
          categoriesRes,
          favoriteRes,
        ]) => {
          setRecommendCourses(recommendRes.data.payload);
          setProcessCourses(processRes.data.payload);
          setTopSellCourses(topSellRes.data.payload);
          setTopNewCourses(topNewRes.data.payload);
          setTopRateCourses(topRateRes.data.payload);
          setPaths(categoriesRes.data.payload);

          const data = favoriteRes.data.payload;
          const model = data.map((item) => ({
            id: item.id,
            contentPoint: item.courseContentPoint,
            imageUrl: item.courseImage,
            title: item.courseTitle,
            "instructor.user.name": item.instructorName,
          }));
          // TODO: Use Redux instead
          setBookmarks(model);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor,
      }}
      showsVerticalScrollIndicator={false}
    >
      <SectionCourses
        title={Titles.CONTINUE_LEARNING}
        courses={processCourses}
      />
      <SectionCourses
        title={Titles.RECOMMEND_COURSES}
        courses={recommendCourses}
      />
      <SectionCourses
        title={Titles.TOP_SELL_COURSES}
        courses={topSellCourses}
      />
      <SectionCourses title={Titles.TOP_NEW_COURSES} courses={topNewCourses} />
      <SectionCourses
        title={Titles.TOP_RATE_COURSES}
        courses={topRateCourses}
      />
      <SectionPaths title={Titles.PATHS} paths={paths} />
      <Channels />
      <SectionCourses title={Titles.BOOKMARKS} courses={bookmarks} />
    </ScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  const authContext = useContext(AuthenticationContext);

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout ?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            authContext.logout();
            navigation.navigate(Screens.LOGIN);
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <HomeStack.Navigator mode="modal">
      <HomeStack.Screen
        name={Screens.HOME}
        component={HomeWrapper}
        options={{
          headerTitle: <Text>{Screens.HOME}</Text>,
          headerLeftContainerStyle: { marginLeft: 10 },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(Screens.SETTINGS)}
            >
              <AntDesign name="setting" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: { marginRight: 10 },
          headerRight: () => (
            <TouchableOpacity onPress={logout}>
              <FontAwesome name="power-off" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen name={Screens.SETTINGS} component={Settings} />
    </HomeStack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  bookmarkIds: state.bookmark.bookmarkIds,
});

const HomeWrapper = connect(mapStateToProps, null)(Home);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
