import React, {useContext} from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';
import {ThemeContext} from 'context';

const ListCoursesItem = (props) => {
  const {theme} = useContext(ThemeContext);

  const starImage = require('assets/images/star_filled.png');

  const openCourse = () => {
    Alert.alert('Course clicked!');
  }

  return (
    <TouchableOpacity style={styles.item} onPress={openCourse}>
      <View style={styles.imageContainer}>
        <Image source={props.item.image} style={styles.image} />
      </View>
      <View style={{margin: 10}}>
        <Text style={{
          color: theme.textColor
        }}>{props.item.title}</Text>
        <Text style={{
          ...styles.darkText,
          color: theme.textColor
        }}>{props.item.author}</Text>
        <Text style={{
          ...styles.darkText,
          color: theme.textColor
        }}>{`${props.item.level} - ${props.item.released} - ${props.item.duration}`}</Text>
        <View style={styles.ratingStarContainer}>
          <Image source={starImage} style={styles.ratingStar} />
          <Image source={starImage} style={styles.ratingStar} />
          <Image source={starImage} style={styles.ratingStar} />
          <Image source={starImage} style={styles.ratingStar} />
          <Image source={starImage} style={styles.ratingStar} />
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
