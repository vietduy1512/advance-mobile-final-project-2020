import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';

const SectionPathsItem = (props) => {
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
        <Text style={styles.darkText}>{props.item.coursesAmount}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default SectionPathsItem;

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    marginRight: 15,
    width: 180,
    height: 140,
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
    height: 80,
    width: 180
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  darkText: {
    color: 'darkgray',
    fontSize: 11
  }
});
