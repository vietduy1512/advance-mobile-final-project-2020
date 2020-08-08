import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const Relevants = () => {
  return (
    <View style={styles.relevantsContainer}>
      <TouchableOpacity style={styles.relevantsButton} onPress={() => {}}>
        <Entypo name="archive" size={20} />
        <Text style={{ fontSize: 12, marginLeft: 5 }}>
          Related paths & courses
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.relevantsButton} onPress={() => {}}>
        <MaterialCommunityIcons
          name="checkbox-multiple-marked-circle-outline"
          size={20}
        />
        <Text style={{ fontSize: 12, marginLeft: 5 }}>
          Take a learning check
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Relevants;

const styles = StyleSheet.create({
  relevantsButton: {
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
    height: 35,
    flexDirection: "row",
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
  relevantsContainer: {
    marginBottom: 30,
  },
});
