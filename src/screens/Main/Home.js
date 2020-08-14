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
import SettingsLayout from "../SettingsLayout";
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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
          setTopSellCourses(topSellRes.data.payload);
          setTopNewCourses(topNewRes.data.payload);
          setTopRateCourses(topRateRes.data.payload);
          setPaths(categoriesRes.data.payload);

          let processModel = processRes.data.payload.map(course => ({
            id: course.id,
            title: course.courseTitle,
            instructorId: course.instructorId,
            instructorName: course.instructorName,
            latestLearnTime: course.latestLearnTime,
            imageUrl: course.courseImage,
          }));
          setProcessCourses(processModel);

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
        title={t(Titles.CONTINUE_LEARNING)}
        courses={processCourses}
        fetchCourses={getProcessCourses}
      />
      <SectionCourses
        title={t(Titles.RECOMMEND_COURSES)}
        courses={recommendCourses}
        fetchCourses={(page) =>
          getRecommendCourses(authContext.state.userInfo.id, page)
        }
      />
      <SectionCourses
        title={t(Titles.TOP_SELL_COURSES)}
        courses={topSellCourses}
        fetchCourses={getTopSellCourses}
      />
      <SectionCourses
        title={t(Titles.TOP_NEW_COURSES)}
        courses={topNewCourses}
        fetchCourses={getTopNewCourses}
      />
      <SectionCourses
        title={t(Titles.TOP_RATE_COURSES)}
        courses={topRateCourses}
        fetchCourses={getTopRateCourses}
      />
      <SectionPaths title={t(Titles.PATHS)} paths={paths} />
      <Channels />
      <SectionCourses title={t(Titles.BOOKMARKS)} courses={bookmarks} />
    </ScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  const authContext = useContext(AuthenticationContext);
  const { t } = useTranslation();

  const logout = () => {
    Alert.alert(
      t("authentication.logout"),
      t("authentication.confirmLogout"),
      [
        {
          text: t("common.no"),
          style: "cancel",
        },
        {
          text: t("common.yes"),
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
      <HomeStack.Screen name={Screens.SETTINGS} component={SettingsLayout} />
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
