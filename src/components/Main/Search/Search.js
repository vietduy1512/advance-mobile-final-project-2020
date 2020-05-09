import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import SearchListCourses from './ListCourses/SearchListCourses';
import SectionPaths from '../../Courses/SectionPaths/SectionPathsContent';
import { searchListCourses } from '../../../constants/database';
import { sectionPaths } from '../../../constants/database';


const Search = () => {
  return (
    <View style={styles.container}>
      <SearchListCourses courses={searchListCourses}/>
      <SectionPaths title={'Paths'} paths={sectionPaths} />
    </View>
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
