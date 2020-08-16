import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "config/context";
import { useTranslation } from "react-i18next";

const Item = ({ title, onPress }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        paddingVertical: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "lightgrey",
        flexDirection: "row",
      }}
      onPress={onPress}
    >
      <Text style={{ ...styles.text, color: theme.textColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

const ThemeSettings = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <Item
        title="English"
        onPress={() => {
          i18n.changeLanguage('en');
          navigation.goBack();
        }}
      />
      <Item
        title="Tiếng Việt"
        onPress={() => {
          i18n.changeLanguage('vi');
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default ThemeSettings;

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
