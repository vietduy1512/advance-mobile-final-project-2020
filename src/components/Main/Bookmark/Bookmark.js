import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Constants from "expo-constants";
import BookmarkListCourses from './ListCourses/BookmarkListCourses';
import { Titles } from 'constants';
import {ThemeContext} from 'context';
import {themes} from 'constants/context';
import {MockupDataContext} from 'context';
import {connect} from 'react-redux';

// TODO: Remove button change theme
const Bookmark = (props) => {
  const {theme, setTheme} = useContext(ThemeContext);
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
      <Button
        title="Change theme"
        onPress={() => {
          setTheme(themes.dark);
        }}
      >
      </Button>
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
