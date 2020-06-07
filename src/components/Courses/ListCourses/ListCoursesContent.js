import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import ListCoursesItem from './ListCoursesItem';

const ListCoursesContent = (props) => {
  const Courses = ({ courses }) => (
    courses.map(item => <ListCoursesItem key={item.id} item={item} />)
  );

  return (
    <View style={{flex: 1}}>
      {props.renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
      {
          props.courses.length !== 0 ? 
          <Courses courses={props.courses}/> :
          <Text style={{color: 'gray'}}>There are no items yet!</Text>
        }
      </ScrollView>
    </View>
  );
}

export default ListCoursesContent;
