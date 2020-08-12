import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import ListCoursesContent from "components/Courses/ListCourses/ListCoursesContent";
import { Titles } from "constants";
import { ThemeContext } from "config/context";
import { LoadingContext } from "config/context";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";

const Download = () => {
  const { setLoading } = useContext(LoadingContext);
  const { theme } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
      .then((courses) => {
        setCourses(
          courses.map((name) => ({
            name: name,
            path: FileSystem.documentDirectory + name,
          }))
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor,
      }}
    >
      <View style={styles.header}>
        <Text style={{ ...styles.title, color: theme.textColor }}>
          {Titles.DOWNLOAD}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {courses.map((course, index) => (
          <View key={index} style={{ marginTop: 20, borderWidth: 1 }}>
            <Video
              source={{ uri: course.path }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={Video.RESIZE_MODE_COVER}
              useNativeControls
              isLooping
              style={{ width: "100%", height: 220 }}
            />
            <Text style={{ marginVertical: 5, alignSelf: "center" }}>
              {course.name}
            </Text>
          </View>
        ))}
      </ScrollView>
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
  title: {
    fontSize: 17,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
});
