import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import BookmarkListCourses from './ListCourses/BookmarkListCourses';
import { Titles } from 'constants';
import {ThemeContext} from 'context';
import {MockupDataContext} from 'context';
import {connect} from 'react-redux';

const Bookmark = (props) => {
  const {theme} = useContext(ThemeContext);
  const {courses} = useContext(MockupDataContext);
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    let bookmarks = courses.filter(course => props.bookmarkIds.includes(course.id))
    setBookmarks(bookmarks);
  }, [props.bookmarkIds])

  return (
    <View 
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor
      }}>
      <BookmarkListCourses title={Titles.BOOKMARKS} courses={bookmarks}/>
    </View>
  );
}

const mapStateToProps = state => ({
  bookmarkIds: state.bookmark.bookmarkIds,
});

export default connect(
  mapStateToProps,
  null,
)(Bookmark);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 16
  },
});
