import React, {useContext} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
import SearchListCourses from './ListCourses/SearchListCourses';
import SearchListPaths from './ListPaths/SearchListPaths';
import SearchListAuthors from './ListAuthors/SearchListAuthors';
import { Titles } from 'constants'
import {MockupDataContext} from 'context';

const Search = () => {
  const {courses, paths, authors} = useContext(MockupDataContext);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <SearchListCourses title={Titles.COURSES} courses={courses} />
      <SearchListPaths title={Titles.PATHS} paths={paths} />
      <SearchListAuthors title={Titles.AUTHORS} authors={authors} />
    </ScrollView>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
});
