import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
import SectionCourses from '../../Courses/SectionCourses/SectionCoursesContent';
import SectionPaths from '../../Courses/SectionPaths/SectionPathsContent';
import Channels from './Channels/Channels';
import { sectionCourses } from 'constants/database';
import { sectionPaths } from 'constants/database';
import { Titles } from 'constants';


const Home = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <SectionCourses title={Titles.CONTINUE_LEARNING} courses={sectionCourses} />
      <SectionPaths title={Titles.PATHS} paths={sectionPaths} />
      <Channels />
      <SectionCourses title={Titles.BOOKMARKS} courses={sectionCourses} />
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
