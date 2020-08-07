import React, {useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ListPathsContent from 'components/Paths/ListPaths/ListPathsContent';
import { MaterialIcons } from '@expo/vector-icons';
import {ThemeContext} from 'config/context';

const SearchListPaths = (props) => {
  const {theme} = useContext(ThemeContext);

  const renderSearchSectionHeader = () => (
    <View style={styles.header}>
      <Text style={{...styles.title, color: theme.textColor}}>{props.paths.length} Results</Text>
      <TouchableOpacity style={styles.expandContainer}>
        <MaterialIcons name="filter-list" size={20} color={theme.textColor} />
      </TouchableOpacity>
    </View>
  )

  const renderSearchHeader = () => (
    <View style={styles.header}>
      <Text style={{...styles.title, color: theme.textColor}}>{props.title}</Text>
      <TouchableOpacity style={styles.expandContainer}>
        <Text style={{...styles.expandText, color: theme.textColor}}>{props.paths.length} results &gt;</Text>
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
