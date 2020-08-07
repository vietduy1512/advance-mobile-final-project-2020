import React, {useContext} from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import ImageButton from 'components/Common/ImageButton';
import SkillButton from './SkillButton';
import {MockupDataContext} from 'config/context';
import {ThemeContext} from 'config/context';

const PopularSkills = (props) => {
  const {theme} = useContext(ThemeContext);
  const {skills, imageButtons} = useContext(MockupDataContext);

  const ImageButtons = ({ buttons }) => {
    let imageButtonTuples = buttons.reduce(function (result, item, index) {
      if (index % 2) {
        result[result.length - 1].push(item);
      } else {
        result.push([item]);
      }
      return result;
    }, []);

    return (
      imageButtonTuples.map((item, index) => (
        <View key={index} style={styles.imageButton}>
          <ImageButton
            title={item[0].title}
            height={80}
            width={160}
            image={item[0].image}
            onPress={() => {}}
          />
          <ImageButton
            title={item[1].title}
            height={80}
            width={160}
            image={item[1].image}
            onPress={() => {}}
          />
        </View>
      ))
    )
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={{...styles.title, color: theme.textColor}}>{props.title}</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.skillsContainer}>
        {skills.map((skill, index) => <SkillButton key={index} title={skill.name} isChecked={skill.isChecked} />)}
      </ScrollView>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ImageButtons buttons={imageButtons} />
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
    flexDirection: 'row',
    marginTop: 10
  },
  skillsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  imageButton: {
    marginRight: 10
  }
});
