import React, {useContext} from 'react';
import { View, ScrollView, Text } from 'react-native';
import ListCoursesItem from './ListCoursesItem';
import {ThemeContext} from 'context';

const ListCoursesContent = (props) => {
  const {theme} = useContext(ThemeContext);

  const Courses = ({ courses }) => (
    courses.map(item => <ListCoursesItem key={item.id} item={item} />)
  );

  return (
    <View style={{color: theme.textColor}}>
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
