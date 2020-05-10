import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import ImageButton from '../../../Common/ImageButton';
import { Titles } from '../../../../constants';

const PopularSkills = (props) => {
  //TODO
  const data = [1, 2, 3, 4];

  const ImageButtons = ({ buttons }) => (
    buttons.map(item => (
      <View key={item} style={styles.imageButton}>
        <ImageButton
          title={Titles.NEW_RELEASES}
          onPress={() => {}}
        />
      </View>
    ))
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ImageButtons buttons={data} />
      </ScrollView>
    </View>
  );
}

export default PopularSkills;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    marginTop: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  imageButton: {
    margin: 10
  }
});
