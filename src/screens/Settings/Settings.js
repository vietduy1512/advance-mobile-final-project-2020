import React, { useContext } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "config/context";
import { NavigationContext } from "@react-navigation/core";
import { Screens, SettingScreens } from "constants";
import { useTranslation } from "react-i18next";
import CommonButton from "components/Common/CommonButton";

const SettingItem = ({ item, index }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
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
        {t(item.title)}
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

const languageItem = () => {
  const { i18n } = useTranslation();
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: "grey", marginRight: 5 }}>
        {i18n.language === "en" ? "English" : "Tiếng Việt"}
      </Text>
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
  const { t } = useTranslation();
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <ScrollView>
        {data.map((item, index) => SettingItem({ item, index }))}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <CommonButton
            title={t("authentication.logout")}
            onPress={() => navigation.navigate(Screens.LOGIN)}
          />
        </View>
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
    title: "settings.account",
    itemRight: defaultItem,
    onPress: ({ navigation }) => {
      navigation.navigate(SettingScreens.USER_INFO);
    },
  },
  {
    title: "settings.theme",
    itemRight: themeItem,
    onPress: ({ navigation }) => {
      navigation.navigate(SettingScreens.THEME);
    },
  },
  {
    title: "settings.language",
    itemRight: languageItem,
    onPress: ({ navigation }) => {
      navigation.navigate(SettingScreens.LANGUAGE);
    },
  },
  {
    title: "settings.favorites",
    itemRight: defaultItem,
    onPress: ({ navigation }) => {
      navigation.navigate(Screens.BOOKMARK);
    },
  },
  {
    title: "settings.appVersion",
    itemRight: appVersion,
  },
];
