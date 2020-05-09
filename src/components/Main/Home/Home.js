import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
import SectionCourses from './SectionCourses/SectionCourses';
import SectionPaths from './SectionPaths/HomeSectionPaths';
import Channels from './Channels/Channels';

const Home = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <SectionCourses title={'Continue Learning'} />
      <SectionPaths title={'Paths'} />
      <Channels />
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
