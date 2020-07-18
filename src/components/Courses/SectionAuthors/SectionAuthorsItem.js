import React, {useContext} from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';
import {ThemeContext} from 'context';

const SectionAuthorsItem = (props) => {
  const {theme} = useContext(ThemeContext);

  const openCourse = () => {
    Alert.alert('Not implement yet!');
  }

  return (
    <TouchableOpacity style={styles.item} onPress={openCourse}>
      <View style={styles.imageContainer}>
        <Image source={{ uri:props.item['user.avatar'] }} style={styles.image} />
      </View>
      <Text style={{color: theme.textColor}}>{props.item['user.name']}</Text>
    </TouchableOpacity>
  );
}

export default SectionAuthorsItem;

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    marginRight: 15,
    width: 60,
    height: 120,
    alignItems: 'center'
  },
  imageContainer: {
    height: 60,
    width: 60,
  },
  image: {
    flex: 1,
    borderRadius: 30,
    height: undefined,
    width: undefined
  },
});
