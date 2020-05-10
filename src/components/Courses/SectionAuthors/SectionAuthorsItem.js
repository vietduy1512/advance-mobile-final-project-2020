/* eslint-disable no-undef */
import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';

const SectionAuthorsItem = (props) => {
  const openCourse = () => {
    Alert.alert('Course clicked!');
  }

  return (
    <TouchableOpacity style={styles.item} onPress={openCourse}>
      <View style={styles.imageContainer}>
        <Image source={require('assets/course-example.jpg')} style={styles.image} />
      </View>
      <Text>{props.item.title}</Text>
    </TouchableOpacity>
  );
}

export default SectionAuthorsItem;

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    marginRight: 15,
    width: 60,
    height: 120,
    alignItems: 'center'
  },
  imageContainer: {
    height: 60,
    width: 60,
  },
  image: {
    flex: 1,
    borderRadius: 30,
    height: undefined,
    width: undefined
  },
});
