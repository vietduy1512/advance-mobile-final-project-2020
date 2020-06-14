import React, {useContext} from 'react';
import { View, ScrollView } from 'react-native';
import ListPathsItem from './ListPathsItem';
import {ThemeContext} from 'context';

const ListPathsContent = (props) => {
  const {theme} = useContext(ThemeContext);

  const Paths = ({ paths }) => (
    paths.map(item => <ListPathsItem key={item.id} item={item} />)
  );

  return (
    <View style={{flex: 1, color: theme.textColor}}>
      {props.renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Paths paths={props.paths}/>
      </ScrollView>
    </View>
  );
}

export default ListPathsContent;
