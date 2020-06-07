import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';

const ListAuthorsItem = (props) => {
  const openCourse = () => {
    Alert.alert('Not implement yet!');
  }

  return (
    <TouchableOpacity style={styles.item} onPress={openCourse}>
      <View style={styles.imageContainer}>
        <Image source={props.item.image} style={styles.image} />
      </View>
      <View style={{margin: 10}}>
        <Text>{props.item.name}</Text>
        <Text style={styles.darkText}>{props.item.coursesAmount}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ListAuthorsItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    margin: 5 ,
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 5
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
  darkText: {
    color: 'darkgray',
    fontSize: 11
  }
});
