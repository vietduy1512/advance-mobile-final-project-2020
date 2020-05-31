import React from 'react';
import { View, ScrollView } from 'react-native';
import ListCoursesItem from './ListCoursesItem';

const ListCoursesContent = (props) => {
  const Courses = ({ courses }) => (
    courses.map(item => <ListCoursesItem key={item.id} item={item} />)
  );

  return (
    <View style={{flex: 1}}>
      {props.renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Courses courses={props.courses}/>
      </ScrollView>
    </View>
  );
}

export default ListCoursesContent;
