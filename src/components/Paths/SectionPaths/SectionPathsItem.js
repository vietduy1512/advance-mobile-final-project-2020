import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

const SectionPathsItem = (props) => {
  const openCourse = () => {
    Alert.alert("Not implement yet!");
  };

  return (
    <TouchableOpacity style={styles.item} onPress={openCourse}>
      {/* TODO */}
      {/* <View style={styles.imageContainer}>
        <Image source={{ uri:props.item.image }} style={styles.image} />
      </View> */}
      <View style={{ margin: 10 }}>
        <Text>{props.item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SectionPathsItem;

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    marginRight: 15,
    width: 100,
    height: 70,
    //height: 140,
    backgroundColor: "#dcdeef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  // imageContainer: {
  //   height: 80,
  //   width: 100,
  //   backgroundColor: 'white'
  // },
  // image: {
  //   flex: 1,
  //   height: undefined,
  //   width: undefined
  // },
});
