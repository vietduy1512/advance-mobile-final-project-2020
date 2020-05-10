import React from 'react';
import { View, ScrollView } from 'react-native';
import ListPathsItem from './ListPathsItem';

const ListPathsContent = (props) => {
  const Paths = ({ paths }) => (
    paths.map(item => <ListPathsItem key={item.id} item={item} />)
  );

  return (
    <View>
      {props.renderHeader()}
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Paths paths={props.paths}/>
      </ScrollView>
    </View>
  );
}

export default ListPathsContent;
