import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';

const SectionCoursesItem = (props) => {
  const filledStarImage = require('assets/images/star_filled.png');
  const emptyStarImage = require('assets/images/star_corner.png');

  const renderStars = () => {
    const filledStarCount = props.item.rating;
    const emptyStarCount = 5 - props.item.rating;
    let stars = [];

    for (let index = 0; index < filledStarCount; index++) {
      stars.push(<Image source={filledStarImage} style={styles.ratingStar} />);
    }
    for (let index = 0; index < emptyStarCount; index++) {
      stars.push(<Image source={emptyStarImage} style={styles.ratingStar} />);
    }
    return stars;
  }
  
  const openCourse = () => {
    Alert.alert('Course clicked!');
  }

  return (
    <TouchableOpacity style={styles.item} onPress={openCourse}>
      <View style={styles.imageContainer}>
        <Image source={props.item.image} style={styles.image} />
      </View>
      <View style={{margin: 10}}>
        <Text>{props.item.title}</Text>
        <Text style={styles.darkText}>{props.item.author}</Text>
        <Text style={styles.darkText}>{`${props.item.level} - ${props.item.released} - ${props.item.duration}`}</Text>
        <View style={styles.ratingStarContainer}>
          {renderStars()}
          <Text style={styles.reviewText}>{`(${props.item.reviews})`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default SectionCoursesItem;

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    marginRight: 15,
    width: 200,
    height: 200,
    backgroundColor: '#dcdeef',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  imageContainer: {
    height: 100,
    width: 200
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  darkText: {
    color: 'darkgray',
    fontSize: 11
  },
  ratingStarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  ratingStar: {
    height: 10,
    width: 10,
    marginRight: 2
  },
  reviewText: {
    color: 'darkgray',
    fontSize: 10,
    marginLeft: 3
  }
});
