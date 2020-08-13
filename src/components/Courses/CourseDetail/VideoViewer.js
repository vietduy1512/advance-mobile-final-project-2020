import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContext } from "@react-navigation/core";
import { Video } from "expo-av";

const VideoViewer = ({ course, videoUrl, theme }) => {
  const navigation = useContext(NavigationContext);

  return (
    <>
      <View style={styles.videoContainer}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            top: 25,
            left: 10,
            position: "absolute",
            zIndex: 1,
          }}
          onPress={() => {
            navigation.goBack();
          }}
          onError={(error) => console.log(error)}
        >
          <AntDesign name="closecircle" size={28} color="white" />
        </TouchableOpacity>
        <Video
          source={videoUrl ? { uri: videoUrl } : null}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          useNativeControls
          isLooping
          style={{ width: "100%", height: 250 }}
        />
        <Text style={{ ...styles.courseTitle, color: theme.textColor }}>
          {course.title}
        </Text>
      </View>
    </>
  );
};

export default VideoViewer;

const styles = StyleSheet.create({
  videoContainer: {
    height: 300,
    width: "100%",
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
