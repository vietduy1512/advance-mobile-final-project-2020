/* eslint-disable no-undef */
import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';

const ListCoursesItem = (props) => {
  const openCourse = () => {
    Alert.alert('Course clicked!');
  }

  return (
    <TouchableOpacity style={styles.item} onPress={openCourse}>
      <View style={styles.imageContainer}>
        <Image source={require('assets/course-example.jpg')} style={styles.image} />
      </View>
      <View style={{margin: 10}}>
        <Text>{props.item.title}</Text>
        <Text style={styles.darkText}>{props.item.author}</Text>
        <Text style={styles.darkText}>{`${props.item.level} - ${props.item.released} - ${props.item.duration}`}</Text>
        <View style={styles.ratingStarContainer}>
          <Image source={require('assets/star_filled.png')} style={styles.ratingStar} />
          <Image source={require('assets/star_filled.png')} style={styles.ratingStar} />
          <Image source={require('assets/star_filled.png')} style={styles.ratingStar} />
          <Image source={require('assets/star_filled.png')} style={styles.ratingStar} />
          <Image source={require('assets/star_filled.png')} style={styles.ratingStar} />
          <Text style={styles.reviewText}>{`(${props.item.reviews})`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ListCoursesItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  imageContainer: {
    height: 60,
    width: 100
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
