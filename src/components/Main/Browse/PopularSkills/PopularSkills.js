import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import ImageButton from '../../../Common/ImageButton';
import SkillButton from './SkillButton';

const PopularSkills = (props) => {
  //TODO
  const data = [1, 2, 3, 4];

  const ImageButtons = ({ buttons }) => (
    buttons.map(item => (
      <View key={item} style={styles.imageButton}>
        <ImageButton
          title={'Content'}
          height={80}
          width={160}
          image={require('assets/images/mockup/software-development.png')}
          onPress={() => {}}
        />
        <ImageButton
          title={'Content'}
          height={80}
          width={160}
          image={require('assets/images/mockup/software-development.png')}
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
      <View style={styles.skillsContainer}>
        <SkillButton title={'React'} isChecked={true} />
        <SkillButton title={'Swift'} isChecked={false} />
        <SkillButton title={'.NET'} isChecked={false} />
        <SkillButton title={'Java'} isChecked={false} />
        <SkillButton title={'Android'} isChecked={false} />
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
  skillsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  imageButton: {
    marginRight: 10
  }
});
