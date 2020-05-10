import React from 'react';
import { View, ScrollView } from 'react-native';
import ListCoursesItem from './ListCoursesItem';

const ListCoursesContent = (props) => {
  const Courses = ({ courses }) => (
    courses.map(item => <ListCoursesItem key={item.id} item={item} />)
  );

  return (
    <View>
      {props.renderHeader()}
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Courses courses={props.courses}/>
      </ScrollView>
    </View>
  );
}

export default ListCoursesContent;
