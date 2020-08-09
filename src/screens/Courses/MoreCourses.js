import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import PagingListCourses from "components/Courses/ListCourses/PagingListCourses";
import { ThemeContext } from "config/context";
import { LoadingContext } from "config/context";
import { NavigationRouteContext } from "@react-navigation/core";

const MoreCourses = () => {
  const { setLoading } = useContext(LoadingContext);
  const { theme } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const route = useContext(NavigationRouteContext);
  const { title, fetchCourses } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = (fetchPage) => {
    setLoading(true);
    fetchCourses(fetchPage)
      .then((response) => {
        const courses = response.data.payload;
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
        title={title}
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

export default MoreCourses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
});
