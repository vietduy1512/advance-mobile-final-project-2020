import React from 'react';
import { Text, View, SectionList } from 'react-native';
import ListCoursesItem from '../ListCoursesItem/ListCoursesItem';
import { listCourses } from '../../../constants/database'

const ListCourses = () => {
  return (
    <View>
      <SectionList
        sections={listCourses}
        renderItem={({item}) => <ListCoursesItem item={item} />}
        renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
      />
    </View>
  );
}

export default ListCourses;
