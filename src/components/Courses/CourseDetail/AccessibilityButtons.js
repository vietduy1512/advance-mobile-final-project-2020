import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  likeCourses,
  getCourseLikeStatus,
  registerFreeCourse,
} from "core/services/coursesService";
import { bookmark, unbookmark } from "core/actions/bookmarkAction";
import { connect } from "react-redux";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Progress from "react-native-progress";

const BookmarkButton = (props) => {
  const bookmarkCourse = () => {
    likeCourses(props.courseId).then((res) => {
      setIsBookmarked(res.data.likeStatus);
    });
  };
  const unbookmarkCourse = () => {
    likeCourses(props.courseId).then((res) => {
      setIsBookmarked(res.data.likeStatus);
    });
  };
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    getCourseLikeStatus(props.courseId).then((res) => {
      setIsBookmarked(res.data.likeStatus);
    });
  }, [props.bookmarkIds]);

  return isBookmarked ? (
    <TouchableOpacity
      style={styles.accessibilityButton}
      onPress={unbookmarkCourse}
    >
      <View style={styles.accessibilityImageContainer}>
        <View style={styles.accessibilityImageSize}>
          <Image
            source={require("assets/images/bookmark.png")}
            style={styles.accessibilityImage}
          />
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 12, color: props.theme.textColor }}>
          Unbookmark
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={styles.accessibilityButton}
      onPress={bookmarkCourse}
    >
      <View style={styles.accessibilityImageContainer}>
        <View style={styles.accessibilityImageSize}>
          <Image
            source={require("assets/images/bookmark.png")}
            style={styles.accessibilityImage}
          />
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 12, color: props.theme.textColor }}>
          Bookmark
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ChannelAdd = (props) => {
  return (
    <TouchableOpacity style={styles.accessibilityButton} onPress={() => {}}>
      <View style={styles.accessibilityImageContainer}>
        <View style={styles.accessibilityImageSize}>
          <Image
            source={require("assets/images/channel-add.png")}
            style={styles.accessibilityImage}
          />
        </View>
      </View>
      <View style={{ margin: 10, width: 100, alignItems: "center" }}>
        <Text style={{ fontSize: 12, color: props.theme.textColor }}>
          Add to channel
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const DownloadButton = (props) => {
  const [downloadProgress, setDownloadProgress] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    FileSystem.getInfoAsync(
      FileSystem.documentDirectory + props.currentLessonName
    ).then((result) => {
      if (result.exists) {
        setIsDownloaded(true);
      } else {
        setIsDownloaded(false);
      }
    });
  }, [props.currentLessonName]);

  const download = async () => {
    const callback = (downloadProgress) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      setDownloadProgress(progress);
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      props.currentLessonUrl,
      FileSystem.documentDirectory + props.currentLessonName,
      {},
      callback
    );

    try {
      setIsDownloading(true);
      await downloadResumable.downloadAsync();
      setIsDownloaded(true);
      setIsDownloading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isDownloaded ? (
        <View style={styles.accessibilityButton}>
          <View
            style={{
              ...styles.accessibilityImageContainer,
              opacity: 0.4,
              backgroundColor: "blue",
            }}
          >
            <View style={styles.accessibilityImageSize}>
              <MaterialCommunityIcons
                name="folder-download"
                size={30}
                color="black"
              />
            </View>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 12, color: props.theme.textColor }}>
              Downloaded
            </Text>
          </View>
        </View>
      ) : isDownloading ? (
        <View
          style={{
            marginHorizontal: 15,
            alignItems: "center",
          }}
        >
          <Progress.Bar progress={downloadProgress} width={70} />
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 12, color: props.theme.textColor }}>
              Downloading
            </Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.accessibilityButton} onPress={download}>
          <View style={styles.accessibilityImageContainer}>
            <View style={styles.accessibilityImageSize}>
              <Image
                source={require("assets/images/download.png")}
                style={styles.accessibilityImage}
              />
            </View>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 12, color: props.theme.textColor }}>
              Download
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const RegisterCourseButton = (props) => {
  const registerCourse = () => {
    registerFreeCourse(props.courseId).then(() => {
      props.updateRegister();
    });
  };

  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "red", fontSize: 18 }}>
          This course is not bought or registered.
        </Text>
        <Text style={{ color: "red", fontSize: 18, marginBottom: 15 }}>
          Please register the course!
        </Text>
        <TouchableOpacity
          style={styles.accessibilityButton}
          onPress={registerCourse}
        >
          <View style={styles.accessibilityImageContainer}>
            <View style={styles.accessibilityImageSize}>
              <MaterialIcons name="payment" size={30} color="black" />
            </View>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 12, color: props.theme.textColor }}>
              Register
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const AccessibilityButtons = (props) => {
  return (
    <View style={styles.accessibilityContainer}>
      {props.isRegistered ? (
        <>
          <BookmarkButton {...props} />
          <ChannelAdd {...props} />
          <DownloadButton {...props} />
        </>
      ) : (
        <RegisterCourseButton {...props} />
      )}
    </View>
  );
};

const AccessibilityButtonsWraper = connect(mapStateToProps, {
  bookmark,
  unbookmark,
})(AccessibilityButtons);

const mapStateToProps = (state) => ({
  bookmarkIds: state.bookmark.bookmarkIds,
});

export default AccessibilityButtonsWraper;

const styles = StyleSheet.create({
  accessibilityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  accessibilityButton: {
    marginHorizontal: 15,
    alignItems: "center",
  },
  accessibilityImageContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
  },
  accessibilityImageSize: {
    height: 30,
    width: 30,
  },
  accessibilityImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});
