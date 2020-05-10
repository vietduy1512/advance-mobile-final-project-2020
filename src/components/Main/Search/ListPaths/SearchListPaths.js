import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ListPathsContent from '../../../Courses/ListPaths/ListPathsContent';

const SearchListPaths = (props) => {
  const renderSearchHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableOpacity style={styles.expandContainer}>
        <Text style={styles.expandText}>x results &gt;</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ListPathsContent
      {...props}
      renderHeader={renderSearchHeader}
    />
  );
}

export default SearchListPaths;

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
