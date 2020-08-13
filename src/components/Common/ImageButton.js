import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";

const ImageButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        height: props.height || 100,
        width: props.width || undefined,
        marginTop: 10,
        backgroundColor: "black",
      }}
      onPress={props.onPress}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
      <ImageBackground style={styles.background} source={props.image} />
    </TouchableOpacity>
  );
};

export default ImageButton;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    opacity: 0.4,
  },
  textContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
