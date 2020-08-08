import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

// TODO: Add expand button
const Summary = (props) => {
  return (
    <View style={styles.summaryContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 16, color: "gray" }}>
          {props.course.description}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  summaryContainer: {
    height: 70,
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    marginVertical: 10,
    paddingTop: 10,
  },
});
