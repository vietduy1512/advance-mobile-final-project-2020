import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
import SectionCourses from '../../Courses/SectionCourses/SectionCoursesContent';
import SectionPaths from '../../Courses/SectionPaths/SectionPathsContent';
import Channels from './Channels/Channels';
import { Titles } from 'constants';
import {MockupDataContext} from 'context';
import {connect} from 'react-redux';

const Home = (props) => {
  const {courses, paths} = useContext(MockupDataContext);
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    let bookmarks = courses.filter(course => props.bookmarkIds.includes(course.id))
    setBookmarks(bookmarks);
  }, [props.bookmarkIds])

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <SectionCourses title={Titles.CONTINUE_LEARNING} courses={courses} />
      <SectionPaths title={Titles.PATHS} paths={paths} />
      <Channels />
      <SectionCourses title={Titles.BOOKMARKS} courses={bookmarks} />
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  bookmarkIds: state.bookmark.bookmarkIds,
});

export default connect(
  mapStateToProps,
  null,
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
});
