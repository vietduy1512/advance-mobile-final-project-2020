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
      <View style={{margin: 5}}>
        <Text>{props.item.title}</Text>
        <Text style={styles.darkText}>{props.item.author}</Text>
        <Text style={styles.darkText}>{props.item.level}</Text>
        <Text style={styles.darkText}>{`${props.item.released} - ${props.item.duration}`}</Text>
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
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  imageContainer: {
    height: 75,
    width: 150
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  darkText: {
    color: 'darkgray'
  }
});
