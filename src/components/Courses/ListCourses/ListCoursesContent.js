import React from 'react';
import { View, SectionList } from 'react-native';
import ListCoursesItem from './ListCoursesItem';

const ListCoursesContent = (props) => {
  return (
    <View>
      <SectionList
        sections={[{title: props.title, data: props.courses}]}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ListCoursesItem item={item} />}
        renderSectionHeader={props.renderHeader}
      />
    </View>
  );
}

export default ListCoursesContent;
