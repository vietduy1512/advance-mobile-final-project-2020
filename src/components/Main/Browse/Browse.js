import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
import ImageButton from '../../Common/ImageButton';
import SectionPaths from '../../Courses/SectionPaths/SectionPathsContent';
import SectionAuthors from '../../Courses/SectionAuthors/SectionAuthorsContent';
import PopularSkills from './PopularSkills/PopularSkills';
import { sectionPaths } from '../../../constants/database';
import { authors } from '../../../constants/database';
import { Titles } from '../../../constants';

const Search = () => {
  return (
    <ScrollView style={styles.container}>
      <ImageButton title={Titles.NEW_RELEASES} onPress={() => {}}/>
      <ImageButton title={Titles.RECOMMENDED} onPress={() => {}}/>
      <PopularSkills title={Titles.POPULAR_SKILLS} />
      <SectionPaths title={Titles.PATHS} paths={sectionPaths} />
      <SectionAuthors title={Titles.TOP_AUTHORS} authors={authors} />
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
