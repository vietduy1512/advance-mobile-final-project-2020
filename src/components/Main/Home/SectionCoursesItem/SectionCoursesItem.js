/* eslint-disable no-undef */
import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

const Home = (props) => {
  return (
    <View style={styles.item}>
      <View style={{height: 100}}>
        <Image source={require('assets/course-example.jpg')} style={styles.image} />
      </View>
      <View style={{margin: 5}}>
        <Text>{props.item.title}</Text>
        <Text style={styles.darkText}>{props.item.author}</Text>
        <Text style={styles.darkText}>{props.item.level}</Text>
        <Text style={styles.darkText}>{`${props.item.released} - ${props.item.duration}`}</Text>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  item: {
    margin: 5,
    width: 200,
    height: 200,
    backgroundColor: 'lightgray'
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
