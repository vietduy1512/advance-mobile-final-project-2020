import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ListCoursesContent from '../../../Courses/ListCourses/ListCoursesContent';
import { Titles } from 'constants';
import {ThemeContext} from 'context';

const BookmarkListCourses = (props) => {
  const {theme} = useContext(ThemeContext);

  const renderBookmarkHeader = () => (
    <View style={styles.header}>
      <Text style={{...styles.title, color: theme.textColor}}>{props.title}</Text>
      <TouchableOpacity style={styles.removeAllBtnContainer}>
        <Text style={styles.removeAllBtn}>Remove all</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ListCoursesContent
      {...props}
      title={Titles.BOOKMARKS}
      renderHeader={renderBookmarkHeader}
    />
  );
}

export default BookmarkListCourses;

const styles = StyleSheet.create({
  title: {
    fontSize: 17
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20
  },
  removeAllBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeAllBtn: {
    color: 'red',
    fontSize: 11
  }
});
