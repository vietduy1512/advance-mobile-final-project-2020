import React, {useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ListCoursesContent from '../../../Courses/ListCourses/ListCoursesContent';
import { Titles } from 'constants';
import { MaterialIcons } from '@expo/vector-icons';
import {ThemeContext} from 'context';

const SearchListCourses = (props) => {
  const {theme} = useContext(ThemeContext);

  const renderSearchSectionHeader = () => (
    <View style={styles.header}>
      <Text style={{...styles.title, color: theme.textColor}}>{props.courses.length} Results</Text>
      <TouchableOpacity style={styles.expandContainer}>
        <MaterialIcons name="filter-list" size={20} color={theme.textColor} />
      </TouchableOpacity>
    </View>
  )

  const renderSearchHeader = () => (
    <View style={styles.header}>
      <Text style={{...styles.title, color: theme.textColor}}>{props.title}</Text>
      <TouchableOpacity style={styles.expandContainer}>
        <Text style={{...styles.expandText, color: theme.textColor}}>{props.courses.length} results &gt;</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ListCoursesContent
      {...props}
      title={Titles.SEARCH}
      renderHeader={props.isRenderSection ? renderSearchSectionHeader : renderSearchHeader}
    />
  );
}

export default SearchListCourses;

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
  expandContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  expandText: {
    fontSize: 11
  }
});
