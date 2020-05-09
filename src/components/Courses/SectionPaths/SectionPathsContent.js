import React from 'react';
import { View, ScrollView } from 'react-native';
import SectionPathsItem from './SectionPathsItem';

const SectionPathsContent = (props) => {
  const Paths = ({ paths }) => (
    paths.map(item => <SectionPathsItem key={item.id} item={item} />)
  );

  return (
    <View>
      {props.renderHeader()}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Paths paths={props.paths}/>
      </ScrollView>
    </View>
  );
}

export default SectionPathsContent;
