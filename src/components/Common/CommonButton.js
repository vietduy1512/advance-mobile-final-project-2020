import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CommonButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.expandContainer} onPress={onPress}>
      <Text style={styles.expandText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  expandContainer: {
    width: 100,
    height: 50,
    backgroundColor: "#dcdeef",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  expandText: {
    fontSize: 17,
  },
});
