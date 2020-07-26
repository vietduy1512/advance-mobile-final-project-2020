import React, {useContext} from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import {ThemeContext} from 'context';
import { NavigationContext } from '@react-navigation/core';
import moment from 'moment';

const ListCoursesItem = (props) => {
  const navigation = useContext(NavigationContext);
  const {theme} = useContext(ThemeContext);

  const filledStarImage = require('assets/images/star_filled.png');
  const emptyStarImage = require('assets/images/star_corner.png');

  const renderStars = () => {
    let stars = [];

    for (let index = 0; index < props.item.ratedNumber; index++) {
      stars.push(<Image source={filledStarImage} key={index} style={styles.ratingStar} />);
    }
    for (let index = props.item.ratedNumber; index < 5; index++) {
      stars.push(<Image source={emptyStarImage} key={index} style={styles.ratingStar} />);
    }
    return stars;
  }

  const openCourse = () => {
    navigation.navigate('CourseDetail', {
      courseId: props.item.id
    })
  }

  return (
    <TouchableOpacity style={styles.item} onPress={openCourse}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.item.imageUrl }} style={styles.image} />
      </View>
      <View style={{margin: 10}}>
        <Text style={{
          color: theme.textColor
        }}>{props.item.title}</Text>
        <Text style={{
          ...styles.darkText,
          color: theme.textColor
        }}>{props.item['instructor.user.name']}</Text>
        <Text style={{
          ...styles.darkText,
          color: theme.textColor
        }}>{moment(props.item.updatedAt).format("MM/DD/YYYY")}</Text>
        <View style={styles.ratingStarContainer}>
          {renderStars()}
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
});
