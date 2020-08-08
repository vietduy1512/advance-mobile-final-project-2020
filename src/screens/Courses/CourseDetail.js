import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { NavigationRouteContext } from "@react-navigation/core";
import { ThemeContext } from "config/context";
import { AuthenticationContext } from "config/context";
import {
  getCourseDetail,
  getCourseDetailSummary,
} from "core/services/coursesService";
import { getAuthorDetail } from "core/services/authorsService";
import { LoadingContext } from "config/context";
import AccessibilityButtons from "components/Courses/CourseDetail/AccessibilityButtons";
import Summary from "components/Courses/CourseDetail/Summary";
import Relevants from "components/Courses/CourseDetail/Relevants";
import CourseBody from "components/Courses/CourseDetail/Body/CourseBody";
import CourseInfo from "components/Courses/CourseDetail/CourseInfo";
import AuthorButton from "components/Courses/CourseDetail/AuthorButton";
import VideoViewer from "components/Courses/CourseDetail/VideoViewer";
import { alertError } from "core/helpers/alertHelper";

const CourseDetail = () => {
  const { theme } = useContext(ThemeContext);
  const authContext = useContext(AuthenticationContext);
  const { setLoading } = useContext(LoadingContext);

  const [course, setCourse] = useState({});
  const [author, setAuthor] = useState({});
  const route = useContext(NavigationRouteContext);
  const { courseId } = route.params;

  useEffect(() => {
    setLoading(true);
    getCourseDetail(courseId)
      .then(initData)
      .catch((error) => {
        alertError(error);
        if (error.response.status == 400) {
          getCourseDetailSummary(courseId, authContext.state.userInfo.id).then(
            initData
          );
        }
      });
  }, []);

  const initData = (response) => {
    setCourse(response.data.payload);
    getAuthorDetail(response.data.payload.instructorId).then((response) => {
      setAuthor(response.data.payload);
      setLoading(false);
    });
  };

  return (
    <>
      <ScrollView
        style={{
          ...styles.container,
          backgroundColor: theme.backgroundColor,
        }}
        showsVerticalScrollIndicator={false}
      >
        <VideoViewer course={course} theme={theme} />
        <AuthorButton author={author} />
        <CourseInfo course={course} />
        <AccessibilityButtons courseId={courseId} theme={theme} />
        <Summary course={course} />
        <Relevants />
        <CourseBody course={course} theme={theme} />
      </ScrollView>
    </>
  );
};

export default CourseDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
