import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import PagingListCourses from "components/Courses/ListCourses/PagingListCourses";
import { ThemeContext } from "config/context";
import { getCategoryCourses } from "core/services/coursesService";
import { LoadingContext } from "config/context";
import { NavigationRouteContext } from "@react-navigation/core";

const PathCourses = () => {
  const { setLoading } = useContext(LoadingContext);
  const { theme } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const route = useContext(NavigationRouteContext);
  const { categoryId, categoryName } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      fetchCourses();
    }, [])
  );

  const fetchCourses = (fetchPage) => {
    setLoading(true);
    getCategoryCourses(categoryId, fetchPage)
      .then((response) => {
        const courses = response.data.payload.rows;
        setCourses(courses);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchCourses(page - 1);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
    fetchCourses(page + 1);
  };

  const isLeftDisabled = page <= 1;
  const isRightDisabled =  courses.length < 5;

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor,
      }}
    >
      <PagingListCourses
        title={categoryName}
        courses={courses}
        page={page}
        onLeftPress={previousPage}
        onRightPress={nextPage}
        isLeftDisabled={isLeftDisabled}
        isRightDisabled={isRightDisabled}
      />
    </View>
  );
};

export default PathCourses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
});
