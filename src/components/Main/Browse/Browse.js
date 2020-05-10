import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import ImageButton from '../../Common/ImageButton';
import SectionPaths from '../../Courses/SectionPaths/SectionPathsContent';
import { sectionPaths } from '../../../constants/database';
import { Titles } from '../../../constants'

const Search = () => {
  return (
    <View style={styles.container}>
      <ImageButton title={Titles.NEW_RELEASES} onPress={() => {}}/>
      <SectionPaths title={Titles.PATHS} paths={sectionPaths} />
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
