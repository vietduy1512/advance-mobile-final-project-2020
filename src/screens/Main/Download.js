import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import ListCoursesContent from "components/Courses/ListCourses/ListCoursesContent";
import { Titles } from "constants";
import { ThemeContext } from "config/context";
import { LoadingContext } from "config/context";
import * as FileSystem from "expo-file-system";

const Download = () => {
  const { setLoading } = useContext(LoadingContext);
  const { theme } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
      .then((courses) => {
        setCourses(courses);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      cleanup;
    };
  }, []);

  const renderBookmarkHeader = () => (
    <View style={styles.header}>
      <Text style={{ ...styles.title, color: theme.textColor }}>
        {props.title}
      </Text>
    </View>
  );

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor,
      }}
    >
      {courses.map((x) => (
        <Text key={x}>{x}</Text>
      ))}
      {/* <ListCoursesContent
        {...props}
        title={Titles.DOWNLOAD}
        courses={bookmarks}
        renderHeader={renderBookmarkHeader}
      /> */}
    </View>
  );
};

export default Download;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
});
