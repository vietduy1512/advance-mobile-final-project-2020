import React from 'react';
import { View, SectionList } from 'react-native';
import ListPathsItem from './ListPathsItem';

const ListPathsContent = (props) => {
  return (
    <View>
      <SectionList
        sections={[{title: props.title, data: props.paths}]}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ListPathsItem item={item} />}
        renderSectionHeader={props.renderHeader}
      />
    </View>
  );
}

export default ListPathsContent;
