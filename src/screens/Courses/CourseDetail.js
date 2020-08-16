import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { NavigationRouteContext } from "@react-navigation/core";
import { ThemeContext } from "config/context";
import { AuthenticationContext } from "config/context";
import {
  getCourseDetail,
  getCourseDetailSummary,
  getCourseInfo,
  getCourseProcess,
  getCategoryCourses,
} from "core/services/coursesService";
import { getAuthorDetail } from "core/services/authorsService";
import { LoadingContext } from "config/context";
import { Titles } from "constants";
import SectionCourses from "components/Courses/SectionCourses/SectionCoursesContent";
import AccessibilityButtons from "components/Courses/CourseDetail/AccessibilityButtons";
import Summary from "components/Courses/CourseDetail/Summary";
import Relevants from "components/Courses/CourseDetail/Relevants";
import CourseBody from "components/Courses/CourseDetail/Body/CourseBody";
import CourseInfo from "components/Courses/CourseDetail/CourseInfo";
import AuthorButton from "components/Courses/CourseDetail/AuthorButton";
import VideoViewer from "components/Courses/CourseDetail/VideoViewer";
import Ratings from "components/Courses/CourseDetail/Ratings";
import RateCourseInput from "components/Courses/CourseDetail/RateCourseInput";
import { useTranslation } from "react-i18next";

const CourseDetail = () => {
  const { theme } = useContext(ThemeContext);
  const authContext = useContext(AuthenticationContext);
  const { setLoading } = useContext(LoadingContext);

  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [author, setAuthor] = useState({});
  const [isRegistered, setIsRegistered] = useState(true);
  const [courseProcess, setCourseProcess] = useState("");
  const [relevantCourses, setRelevantCourses] = useState([]);
  const [currentLessonUrl, setCurrentLessonUrl] = useState("");
  const [currentLessonName, setCurrentLessonName] = useState("");
  const [currentSelectedId, setCurrentSelectedId] = useState("");
  const { t } = useTranslation();
  const route = useContext(NavigationRouteContext);
  const { courseId } = route.params;

  useEffect(() => {
    setLoading(true);
    getCourseDetailSummary(courseId, authContext.state.userInfo.id)
      .then((summaryRes) => {
        initData(summaryRes);
        getCourseDetail(courseId)
          .then((response) => {
            setCourse({
              ...summaryRes.data.payload,
              section: response.data.payload.section,
            });
          })
          .catch(() => {
            setIsRegistered(false);
          });
      })
      .finally(() => {
        setLoading(false);
        setIsLoading(false);
      });
  }, []);

  const initData = (response) => {
    const course = response.data.payload;
    setCourse(course);
    if (
      course.section[0] &&
      course.section[0].lesson[0] &&
      course.section[0].lesson[0].videoUrl
    ) {
      setCurrentLessonUrl(course.section[0].lesson[0].videoUrl);
      setCurrentLessonName(course.section[0].lesson[0].videoName);
      setCurrentSelectedId(course.section[0].lesson[0].id);
    }
    getAuthorDetail(course.instructorId).then((response) => {
      setAuthor(response.data.payload);
    });
    getCourseInfo(course.id).then((res) => {
      getCategoryCourses(res.data.payload.categoryIds[0], 1).then(
        (response) => {
          const courses = response.data.payload.rows;
          setRelevantCourses(courses);
        }
      );
    });
    getCourseProcess(courseId).then((response) => {
      setCourseProcess(response.data.payload);
    });
  };

  return isLoading ? null : (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor,
      }}
      showsVerticalScrollIndicator={false}
    >
      <VideoViewer course={course} videoUrl={currentLessonUrl} theme={theme} />
      <AuthorButton author={author} />
      <CourseInfo course={course} courseProcess={courseProcess} />
      <AccessibilityButtons
        courseId={courseId}
        isRegistered={isRegistered}
        theme={theme}
        currentLessonName={currentLessonName}
        currentLessonUrl={currentLessonUrl}
        updateRegister={() => setIsRegistered(true)}
      />
      <Summary course={course} />
      <Relevants />
      <CourseBody
        course={course}
        theme={theme}
        currentSelectedId={currentSelectedId}
        setCurrentLessonUrl={setCurrentLessonUrl}
        setCurrentLessonName={setCurrentLessonName}
      />
      <View style={{ marginTop: 30, marginHorizontal: 15 }}>
        <SectionCourses
          title={t(Titles.RELEVANT_COURSES)}
          courses={relevantCourses}
          isHideHeader={true}
        />
      </View>
      <Ratings ratings={course.ratings} theme={theme} />
      <RateCourseInput course={course} theme={theme} />
    </ScrollView>
  );
};

export default CourseDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
