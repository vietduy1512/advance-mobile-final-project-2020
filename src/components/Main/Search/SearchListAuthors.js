import React, {useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ListAuthorsContent from 'components/Authors/ListAuthors/ListAuthorsContent';
import { MaterialIcons } from '@expo/vector-icons';
import {ThemeContext} from 'config/context';

const SearchListAuthors = (props) => {
  const {theme} = useContext(ThemeContext);
  
  const renderSearchSectionHeader = () => (
    <View style={styles.header}>
      <Text style={{...styles.title, color: theme.textColor}}>{props.authors.length} Results</Text>
      <TouchableOpacity style={styles.expandContainer}>
        <MaterialIcons name="filter-list" size={20} color={theme.textColor} />
      </TouchableOpacity>
    </View>
  )

  const renderSearchHeader = () => (
    <View style={styles.header}>
      <Text style={{...styles.title, color: theme.textColor}}>{props.title}</Text>
      <TouchableOpacity style={styles.expandContainer}>
        <Text style={{...styles.expandText, color: theme.textColor}}>{props.authors.length} results &gt;</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ListAuthorsContent
      {...props}
      renderHeader={props.isRenderSection ? renderSearchSectionHeader : renderSearchHeader}
    />
  );
}

export default SearchListAuthors;

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
