import React, { useContext } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Constants from "expo-constants";
import DownloadListCourses from './ListCourses/DownloadListCourses';
import { downloadListCourses } from 'constants/database';
import { Titles } from 'constants';
import {ThemeContext} from 'context';
import {themes} from 'constants/context';

// TODO: Remove button change theme
const Download = () => {
  const {theme, setTheme} = useContext(ThemeContext);

  return (
    <View 
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor
      }}>
      <DownloadListCourses title={Titles.DOWNLOADS} courses={downloadListCourses}/>
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

export default Download;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 16
  },
});
