import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';

const SkillButton = (props) => {
  return (
    <TouchableOpacity style={styles.expandContainer}>
      {props.isChecked ? (
        <View style={styles.imageContainer} >
          <Image source={require('assets/images/check.png')} style={styles.image} />
        </View>
      ): null}
      <Text style={styles.expandText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default SkillButton;

const styles = StyleSheet.create({
  expandContainer: {
    height: 20,
    width: 60,
    backgroundColor: '#dcdeef',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 5,
  },
  expandText: {
    fontSize: 12
  },
  imageContainer: {
    height: 15,
    width: 15,
    marginRight: 2
  },
  image: {
    flex: 1,
    borderRadius: 30,
    height: undefined,
    width: undefined
  },
});
