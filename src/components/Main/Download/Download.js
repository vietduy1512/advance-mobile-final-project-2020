import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import DownloadListCourses from './ListCourses/DownloadListCourses';
import { downloadListCourses } from '../../../constants/database'
import { Titles } from '../../../constants'


const Search = () => {
  return (
    <View style={styles.container}>
      <DownloadListCourses title={Titles.DOWNLOADS} courses={downloadListCourses}/>
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
