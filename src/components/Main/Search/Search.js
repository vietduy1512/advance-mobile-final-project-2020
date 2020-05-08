import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import ListCourses from '../../Courses/ListCourses/ListCourses';

const Home = () => {
  const onPressNewReleases = () => {
    console.log('Donothing')
  }

  return (
    <View style={styles.container} onPress={onPressNewReleases}>
      <ListCourses title={'Continue Learning'} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
});
