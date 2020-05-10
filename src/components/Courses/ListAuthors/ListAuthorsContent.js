import React from 'react';
import { View, ScrollView } from 'react-native';
import ListAuthorsItem from './ListAuthorsItem';

const ListAuthorsContent = (props) => {
  const Authors = ({ authors }) => (
    authors.map(item => <ListAuthorsItem key={item.id} item={item} />)
  );

  return (
    <View>
      {props.renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Authors authors={props.authors}/>
      </ScrollView>
    </View>
  );
}

export default ListAuthorsContent;
