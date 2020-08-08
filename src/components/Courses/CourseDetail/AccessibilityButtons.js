import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { likeCourses, getCourseLikeStatus } from "core/services/coursesService";
import { bookmark, unbookmark } from "core/actions/bookmarkAction";
import { connect } from "react-redux";

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
        <Text style={{ fontSize: 12, color: props.theme.textColor }}>Unbookmark</Text>
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
        <Text style={{ fontSize: 12, color: props.theme.textColor }}>Bookmark</Text>
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
  return (
    <TouchableOpacity style={styles.accessibilityButton} onPress={() => {}}>
      <View style={styles.accessibilityImageContainer}>
        <View style={styles.accessibilityImageSize}>
          <Image
            source={require("assets/images/download.png")}
            style={styles.accessibilityImage}
          />
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 12, color: props.theme.textColor }}>Download</Text>
      </View>
    </TouchableOpacity>
  );
};

const AccessibilityButtons = (props) => {
  return (
    <View style={styles.accessibilityContainer}>
      <BookmarkButton {...props} />
      <ChannelAdd {...props} />
      <DownloadButton {...props} />
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
