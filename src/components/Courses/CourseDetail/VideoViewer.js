import React, { useContext } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContext } from "@react-navigation/core";

const VideoViewer = ({ course, theme }) => {
  const navigation = useContext(NavigationContext);

  return (
    <View style={styles.videoContainer}>
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          top: 5,
          left: 5,
          position: "absolute",
          zIndex: 1,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <MaterialCommunityIcons name="close" size={26} color="white" />
      </TouchableOpacity>
      <Image source={{ uri: course.imageUrl }} style={styles.video} />
      <Text style={{ ...styles.courseTitle, color: theme.textColor }}>
        {course.title}
      </Text>
    </View>
  );
};

export default VideoViewer;

const styles = StyleSheet.create({
  videoContainer: {
    height: 250,
    width: undefined,
  },
  video: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 15,
  },
});
