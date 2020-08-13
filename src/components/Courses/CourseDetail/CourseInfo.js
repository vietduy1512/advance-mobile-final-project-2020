import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import moment from "moment";

const CourseInfo = (props) => {
  const filledStarImage = require("assets/images/star_filled.png");
  const emptyStarImage = require("assets/images/star_corner.png");

  const renderStars = (contentPoint) => {
    let stars = [];
    contentPoint = Math.floor(contentPoint);
    for (let index = 0; index < contentPoint; index++) {
      stars.push(
        <Image source={filledStarImage} key={index} style={styles.ratingStar} />
      );
    }
    for (let index = contentPoint; index < 5; index++) {
      stars.push(
        <Image source={emptyStarImage} key={index} style={styles.ratingStar} />
      );
    }
    return stars;
  };

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.darkText}>{`${moment(props.course.updatedAt).format(
        "MM/DD/YYYY"
      )} - ${props.courseProcess ? `${props.courseProcess} / ` : ''}${
        props.course.totalHours
      } hours`}</Text>
      <View style={styles.ratingStarContainer}>
        {renderStars(props.course.contentPoint)}
      </View>
    </View>
  );
};

export default CourseInfo;

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
  },
  darkText: {
    color: "gray",
    fontSize: 16,
  },
  ratingStarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  ratingStar: {
    height: 15,
    width: 15,
    marginRight: 2,
  },
});
