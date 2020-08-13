import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

const AuthorButton = ({ author }) => {
  return (
    <TouchableOpacity style={styles.expandContainer}>
      <View style={styles.authorContainer}>
        <Image source={{ uri: author.avatar }} style={styles.author} />
      </View>
      <Text>{author.name}</Text>
    </TouchableOpacity>
  );
};

export default AuthorButton;

const styles = StyleSheet.create({
  expandContainer: {
    height: 30,
    width: 120,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    margin: 15,
  },
  authorContainer: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  author: {
    flex: 1,
    borderRadius: 30,
    height: undefined,
    width: undefined,
  },
});
