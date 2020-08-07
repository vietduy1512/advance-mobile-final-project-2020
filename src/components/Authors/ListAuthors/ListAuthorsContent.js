import React, {useContext} from 'react';
import { View, ScrollView } from 'react-native';
import ListAuthorsItem from './ListAuthorsItem';
import {ThemeContext} from 'config/context';

const ListAuthorsContent = (props) => {
  const {theme} = useContext(ThemeContext);

  const Authors = ({ authors }) => (
    authors.map(item => <ListAuthorsItem key={item.id} item={item} />)
  );

  return (
    <View style={{color: theme.textColor}}>
      {props.renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Authors authors={props.authors}/>
      </ScrollView>
    </View>
  );
}

export default ListAuthorsContent;
