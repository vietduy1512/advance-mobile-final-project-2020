import React, {useContext} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
import ImageButton from '../../Common/ImageButton';
import SectionPaths from '../../Courses/SectionPaths/SectionPathsContent';
import SectionAuthors from '../../Courses/SectionAuthors/SectionAuthorsContent';
import PopularSkills from './PopularSkills/PopularSkills';
import { Titles } from 'constants';
import {MockupDataContext} from 'context';

const Search = () => {
  const {paths, authors} = useContext(MockupDataContext);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageButton
        title={Titles.NEW_RELEASES}
        image={require('assets/images/mockup/react-js-getting-started-v2.png')}
        onPress={() => {}}
      />
      <ImageButton
        title={Titles.RECOMMENDED}
        image={require('assets/images/mockup/ios-collection-views-getting-started-v1.png')}
        onPress={() => {}}
      />
      <PopularSkills title={Titles.POPULAR_SKILLS} />
      <SectionPaths title={Titles.PATHS} paths={paths} />
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
