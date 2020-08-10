import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { NavigationRouteContext } from "@react-navigation/core";
import { ThemeContext } from "config/context";
import { AuthenticationContext } from "config/context";
import { getCourseDetailSummary } from "core/services/coursesService";
import { getAuthorDetail } from "core/services/authorsService";
import { LoadingContext } from "config/context";
import AccessibilityButtons from "components/Courses/CourseDetail/AccessibilityButtons";
import Summary from "components/Courses/CourseDetail/Summary";
import Relevants from "components/Courses/CourseDetail/Relevants";
import CourseBody from "components/Courses/CourseDetail/Body/CourseBody";
import CourseInfo from "components/Courses/CourseDetail/CourseInfo";
import AuthorButton from "components/Courses/CourseDetail/AuthorButton";
import VideoViewer from "components/Courses/CourseDetail/VideoViewer";

const CourseDetail = () => {
  const { theme } = useContext(ThemeContext);
  const authContext = useContext(AuthenticationContext);
  const { setLoading } = useContext(LoadingContext);

  const [course, setCourse] = useState({});
  const [author, setAuthor] = useState({});
  const [currentLessonUrl, setCurrentLessonUrl] = useState("");
  const [currentSelectedId, setCurrentSelectedId] = useState("");
  const route = useContext(NavigationRouteContext);
  const { courseId } = route.params;

  useEffect(() => {
    setLoading(true);
    // TODO:
    // getCourseDetail(courseId)
    //   .then(initData)
    //   .catch((error) => {
    //     alertError(error);
    //     if (error.response.status == 400) {
    //       getCourseDetailSummary(courseId, authContext.state.userInfo.id).then(
    //         initData
    //       );
    //     }
    //   });
    getCourseDetailSummary(courseId, authContext.state.userInfo.id)
      .then(initData)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const initData = (response) => {
    setCourse(response.data.payload);
    if (
      response.data.payload.section[0] &&
      response.data.payload.section[0].lesson[0]
    ) {
      setCurrentLessonUrl(response.data.payload.section[0].lesson[0].videoUrl);
      setCurrentSelectedId(response.data.payload.section[0].lesson[0].id);
    }
    getAuthorDetail(response.data.payload.instructorId).then((response) => {
      setAuthor(response.data.payload);
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
        <VideoViewer
          course={course}
          videoUrl={currentLessonUrl}
          theme={theme}
        />
        <AuthorButton author={author} />
        <CourseInfo course={course} />
        <AccessibilityButtons courseId={courseId} theme={theme} />
        <Summary course={course} />
        <Relevants />
        <CourseBody
          course={course}
          theme={theme}
          currentSelectedId={currentSelectedId}
          setCurrentLessonUrl={setCurrentLessonUrl}
        />
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
