import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import SectionCoursesItem from './SectionCoursesItem';
import { Content } from 'constants';

const SectionCoursesContent = (props) => {
  const Courses = ({ courses }) => (
    courses.map(item => <SectionCoursesItem key={item.id} item={item} />)
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
        <TouchableOpacity style={styles.expandContainer}>
          <Text style={styles.expandText}>{Content.SEE_ALL}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Courses courses={props.courses}/>
      </ScrollView>
    </View>
  );
}

export default SectionCoursesContent;


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
