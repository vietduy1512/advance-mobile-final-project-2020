import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemeContext } from "config/context";
import { Screens } from "constants";
import { NavigationContext } from "@react-navigation/core";

const ListPathsItem = (props) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useContext(NavigationContext);

  const openPath = () => {
    navigation.navigate(Screens.PATH_COURSES, {
      categoryId: props.item.id,
      categoryName: props.item.name,
    });
  };

  return (
    <TouchableOpacity style={styles.item} onPress={openPath}>
      <View style={{ margin: 10 }}>
        <Text style={{ color: theme.textColor }}>{props.item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListPathsItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 5,
  },
});
