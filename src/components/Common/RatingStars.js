import React from "react";
import { View, StyleSheet, Image } from "react-native";

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

const RatingStars = ({ contentPoint }) => (
  <View style={styles.ratingStarContainer}>{renderStars(contentPoint)}</View>
);

export default RatingStars;

const styles = StyleSheet.create({
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
