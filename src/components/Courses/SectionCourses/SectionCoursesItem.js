import React, {useContext} from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/core';
import moment from 'moment';

const SectionCoursesItem = (props) => {
  const navigation = useContext(NavigationContext);

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
        <Image source={{
          uri: props.item.imageUrl
        }} style={styles.image} />
      </View>
      <View style={{margin: 10}}>
        <Text>{props.item.title}</Text>
        <Text style={styles.darkText}>{props.item['instructor.user.name']}</Text>
        <Text style={styles.darkText}>{`${moment(props.item.updatedAt).format("MM/DD/YYYY")} - ${props.item.totalHours} hours`}</Text>
        <View style={styles.ratingStarContainer}>
          {renderStars()}
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
    height: 210,
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
});
