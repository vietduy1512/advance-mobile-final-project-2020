import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import SectionCoursesItem from '../SectionCoursesItem/SectionCoursesItem';

const SectionCourses = (props) => {
  const courses = [
    {
      id: 1,
      title: 'React Native',
      author: 'Duy Le',
      level: 'Advance',
      released: 'May 6, 2020',
      duration: '30 hours'
    },
    {
      id: 2,
      title: 'Android',
      author: 'Thao Luu',
      level: 'Beginner',
      released: 'May 6, 2020',
      duration: '30 hours'
    },
    {
      id: 3,
      title: 'iOS',
      author: 'Thao Luu',
      level: 'Beginner',
      released: 'May 6, 2020',
      duration: '30 hours'
    },
  ];
  
  const Courses = ({ courses }) => (
    courses.map(item => <SectionCoursesItem key={item.id} item={item} />)
  );

  return (
    <View>
      <View>
        <Text>{props.title}</Text>
      </View>
      <ScrollView horizontal={true}>
        <Courses courses={courses}/>
      </ScrollView>
    </View>
  );
}

export default SectionCourses;
