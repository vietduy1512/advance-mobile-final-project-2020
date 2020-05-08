import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import SectionCoursesItem from '../SectionCoursesItem/SectionCoursesItem';
import {sectionCourses} from '../../../../constants/database';

const SectionCourses = (props) => {
  
  
  const Courses = ({ courses }) => (
    courses.map(item => <SectionCoursesItem key={item.id} item={item} />)
  );

  return (
    <View>
      <View>
        <Text>{props.title}</Text>
      </View>
      <ScrollView horizontal={true}>
        <Courses courses={sectionCourses}/>
      </ScrollView>
    </View>
  );
}

export default SectionCourses;
