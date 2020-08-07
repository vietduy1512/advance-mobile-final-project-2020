import React, { useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import BookmarkListCourses from 'components/Main/Bookmark/BookmarkListCourses';
import { Titles } from 'constants';
import {ThemeContext} from 'config/context';
import {connect} from 'react-redux';
import {getFavoriteCourses} from 'core/services/coursesService';
import {LoadingContext} from 'config/context';

const Bookmark = () => {
  const {setLoading} = useContext(LoadingContext);
  const {theme} = useContext(ThemeContext);
  const [bookmarks, setBookmarks] = useState([])

  // TODO: Use Redux instead
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getFavoriteCourses().then(response => {
        const data = response.data.payload;
        const model = data.map(item => ({
          id: item.id,
          ratedNumber: item.courseContentPoint,
          imageUrl: item.courseImage,
          title: item.courseTitle,
          'instructor.user.name': item.instructorName,
        }));
        setBookmarks(model);
        setLoading(false);
      });
    }, [])
  );
  

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
