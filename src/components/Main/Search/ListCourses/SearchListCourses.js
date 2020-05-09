import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ListCoursesContent from '../../../Courses/ListCourses/ListCoursesContent';

const SearchListCourses = (props) => {
  const renderSearchHeader = ({section: {title}}) => (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.expandContainer}>
        <Text style={styles.expandText}>x results &gt;</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ListCoursesContent
      {...props}
      renderHeader={renderSearchHeader}
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
