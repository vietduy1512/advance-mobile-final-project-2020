import React, {useContext} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
import SectionCourses from '../../Courses/SectionCourses/SectionCoursesContent';
import SectionPaths from '../../Courses/SectionPaths/SectionPathsContent';
import Channels from './Channels/Channels';
import { Titles } from 'constants';
import {MockupDataContext} from 'context';

const Home = () => {
  const {courses, paths} = useContext(MockupDataContext);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <SectionCourses title={Titles.CONTINUE_LEARNING} courses={courses} />
      <SectionPaths title={Titles.PATHS} paths={paths} />
      <Channels />
      <SectionCourses title={Titles.BOOKMARKS} courses={courses} />
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
