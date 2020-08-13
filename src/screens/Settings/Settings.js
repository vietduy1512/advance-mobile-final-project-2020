import React, { useContext } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "config/context";
import { NavigationContext } from "@react-navigation/core";
import { Screens, SettingScreens } from "constants";

const SettingItem = ({ item, index }) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useContext(NavigationContext);
  return (
    <TouchableOpacity
      key={index}
      style={{
        justifyContent: "center",
        paddingVertical: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "lightgrey",
        flexDirection: "row",
      }}
      onPress={() => (item.onPress ? item.onPress({ navigation }) : null)}
    >
      <Text style={{ ...styles.text, color: theme.textColor }}>
        {item.title}
      </Text>
      {item.itemRight ? item.itemRight() : null}
    </TouchableOpacity>
  );
};

const defaultItem = () => (
  <Ionicons name="ios-arrow-forward" size={20} color="grey" />
);

const themeItem = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: "grey", marginRight: 5 }}>{theme.title}</Text>
      <Ionicons name="ios-arrow-forward" size={20} color="grey" />
    </View>
  );
};

const appVersion = () => {
  const { theme } = useContext(ThemeContext);
  return <Text style={{ color: theme.textColor }}>1.0.1</Text>;
};

const SettingsMain = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <ScrollView>
        {data.map((item, index) => SettingItem({ item, index }))}
        <Button
          title="Sign out"
          onPress={() => navigation.navigate(Screens.LOGIN)}
        />
      </ScrollView>
    </View>
  );
};

export default SettingsMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    flex: 1,
    alignItems: "flex-start",
  },
});

const data = [
  {
    title: "Account",
    itemRight: defaultItem,
    onPress: ({ navigation }) => {
      navigation.navigate(SettingScreens.USER_INFO);
    },
  },
  // {
  //   title: "Subscription",
  //   itemRight: defaultItem,
  // },
  // {
  //   title: "Communication Preferences",
  //   itemRight: defaultItem,
  // },
  {
    title: "Theme",
    itemRight: themeItem,
    onPress: ({ navigation }) => {
      navigation.navigate(SettingScreens.THEME);
    },
  },
  // {
  //   title: "Require Wi-Fi for streaming",
  //   itemRight: defaultItem,
  // },
  // {
  //   title: "Require Wi-Fi for downloading",
  //   itemRight: defaultItem,
  // },
  // {
  //   title: "Send feedback",
  //   itemRight: defaultItem,
  // },
  {
    title: "Favorite courses",
    itemRight: defaultItem,
    onPress: ({ navigation }) => {
      navigation.navigate(Screens.BOOKMARK);
    },
  },
  {
    title: "App Version",
    itemRight: appVersion,
  },
];
