import React from 'react';
import { View, SectionList } from 'react-native';
import ListCoursesItem from './ListCoursesItem';

const ListCoursesBody = (props) => {
  return (
    <View>
      <SectionList
        sections={props.courses}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ListCoursesItem item={item} />}
        renderSectionHeader={props.renderHeader}
      />
    </View>
  );
}

export default ListCoursesBody;
