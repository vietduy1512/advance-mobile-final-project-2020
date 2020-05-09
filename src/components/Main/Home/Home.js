import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
import SectionCourses from './SectionCourses/SectionCourses';
import SectionPaths from '../../Courses/SectionPaths/SectionPathsContent';
import Channels from './Channels/Channels';
import { sectionCourses } from '../../../constants/database';
import { sectionPaths } from '../../../constants/database';


const Home = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <SectionCourses title={'Continue Learning'} courses={sectionCourses} />
      <SectionPaths title={'Paths'} paths={sectionPaths} />
      <Channels />
      <SectionCourses title={'Bookmarks'} courses={sectionCourses} />
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
