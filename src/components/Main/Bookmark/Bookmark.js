import React, { useContext } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Constants from "expo-constants";
import BookmarkListCourses from './ListCourses/BookmarkListCourses';
import { Titles } from 'constants';
import {ThemeContext} from 'context';
import {themes} from 'constants/context';
import {MockupDataContext} from 'context';

// TODO: Remove button change theme
const Bookmark = () => {
  const {theme, setTheme} = useContext(ThemeContext);
  const {bookmarkListCourses} = useContext(MockupDataContext);

  return (
    <View 
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor
      }}>
      <BookmarkListCourses title={Titles.BOOKMARKS} courses={bookmarkListCourses}/>
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

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 16
  },
});
