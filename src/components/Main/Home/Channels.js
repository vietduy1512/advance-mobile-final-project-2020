import React, { useContext } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { ThemeContext } from "config/context";

const Channels = () => {
  const { theme } = useContext(ThemeContext);

  const text =
    "Use channels to save, organize, and share content to accomplish your learning objectives";

  return (
    <View>
      <View style={styles.header}>
        <Text style={{ ...styles.title, color: theme.textColor }}>
          Channels
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.channelsIconContainer}>
          <Image
            source={require("assets/images/channels.png")}
            style={styles.channelsIcon}
          />
        </View>
        <Text style={styles.channelsText}>{text}</Text>
      </View>
    </View>
  );
};

export default Channels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    marginVertical: 10,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  channelsIconContainer: {
    height: 50,
    width: 50,
    marginTop: 20,
    marginBottom: 10,
  },
  channelsIcon: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  channelsText: {
    color: "gray",
    textAlign: "center",
  },
});
