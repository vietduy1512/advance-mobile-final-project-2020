import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import SectionAuthorsItem from './SectionAuthorsItem';

const SectionAuthorsContent = (props) => {
  const Authors = ({ authors }) => (
    authors.map(item => <SectionAuthorsItem key={item.id} item={item} />)
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
        <TouchableOpacity style={styles.expandContainer}>
          <Text style={styles.expandText}>See all &gt;</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Authors authors={props.authors}/>
      </ScrollView>
    </View>
  );
}

export default SectionAuthorsContent;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    marginVertical: 10
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  expandContainer: {
    width: 60,
    backgroundColor: '#dcdeef',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  expandText: {
    fontSize: 11
  }
});
