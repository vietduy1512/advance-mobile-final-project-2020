import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
import SectionCourses from './SectionCourses/SectionCourses';
import ImageButton from '../../Common/ImageButton'

const Home = () => {
  const onPressNewReleases = () => {
    console.log('Donothing')
  }

  return (
    <ScrollView style={styles.container}>
      <ImageButton title={'NEW RELEASES'} onPress={onPressNewReleases} />
      <SectionCourses title={'Continue Learning'} />
      <SectionCourses title={'Path'} />
      <SectionCourses title={'Channel'} />
      <SectionCourses title={'Bookmarks'} />
    </ScrollView>
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
