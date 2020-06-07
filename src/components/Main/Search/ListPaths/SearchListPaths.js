import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ListPathsContent from '../../../Courses/ListPaths/ListPathsContent';
import { MaterialIcons } from '@expo/vector-icons';

const SearchListPaths = (props) => {
  const renderSearchSectionHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>{props.paths.length} Results</Text>
      <TouchableOpacity style={styles.expandContainer}>
        <MaterialIcons name="filter-list" size={20} color="black" />
      </TouchableOpacity>
    </View>
  )

  const renderSearchHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableOpacity style={styles.expandContainer}>
        <Text style={styles.expandText}>{props.paths.length} results &gt;</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ListPathsContent
      {...props}
      renderHeader={props.isRenderSection ? renderSearchSectionHeader : renderSearchHeader}
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
