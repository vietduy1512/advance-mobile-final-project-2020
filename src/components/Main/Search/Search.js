import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
import SearchListCourses from './ListCourses/SearchListCourses';
import SearchListPaths from './ListPaths/SearchListPaths';
import SearchListAuthors from './ListAuthors/SearchListAuthors';
import { Titles } from '../../../constants'
import { searchListCourses } from '../../../constants/database';
import { searchListPaths } from '../../../constants/database';


const Search = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <SearchListCourses title={Titles.COURSES} courses={searchListCourses} />
      <SearchListPaths title={Titles.PATHS} paths={searchListPaths} />
      <SearchListAuthors title={Titles.AUTHORS} authors={searchListPaths} />
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
