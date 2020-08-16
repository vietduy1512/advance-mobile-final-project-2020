import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import RatingStars from "components/Common/RatingStars";

const Rating = ({ user, averagePoint, content }) => (
  <View
    style={{
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "lightgrey",
      paddingVertical: 20,
    }}
  >
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.avatar }} style={styles.image} />
      </View>
      <Text
        style={{
          width: 100,
          textAlign: "center",
        }}
      >
        {user.name || "Anonymous"}
      </Text>
    </View>
    <View style={{ flex: 3 }}>
      <RatingStars contentPoint={averagePoint} />
      <Text style={{ fontSize: 16, marginLeft: 20, marginTop: 10 }}>
        {content}
      </Text>
    </View>
  </View>
);

const Ratings = ({ ratings }) => {
  return ratings && ratings.ratingList ? (
    <View style={styles.summaryContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {ratings.ratingList.map((rating, index) => (
          <Rating
            key={index}
            user={rating.user}
            averagePoint={rating.averagePoint}
            content={rating.content}
          />
        ))}
      </ScrollView>
    </View>
  ) : null;
};

export default Ratings;

const styles = StyleSheet.create({
  summaryContainer: {
    flex: 1,
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    marginVertical: 10,
    paddingTop: 10,
  },
  imageContainer: {
    height: 50,
    width: 50,
  },
  image: {
    flex: 1,
    borderRadius: 150,
    height: undefined,
    width: undefined,
  },
});
