import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Screens } from "constants";
import { NavigationContext } from "@react-navigation/core";

const SectionPathsItem = (props) => {
  const navigation = useContext(NavigationContext);

  const openPath = () => {
    navigation.navigate(Screens.PATH_COURSES, {
      categoryId: props.item.id,
      categoryName: props.item.name,
    });
  };

  return (
    <TouchableOpacity style={styles.item} onPress={openPath}>
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
