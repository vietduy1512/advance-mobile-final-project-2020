import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import ListCourses from '../../Courses/ListCourses/ListCourses';

const Search = () => {
  return (
    <View style={styles.container}>
      <ListCourses title={'Continue Learning'} />
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
});
