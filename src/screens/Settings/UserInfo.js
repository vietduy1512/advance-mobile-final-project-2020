import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { ThemeContext } from "config/context";
import { getUserInfo } from "core/services/usersService";
import { LoadingContext } from "config/context";
import { SettingScreens } from "constants";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Item = ({ title, content }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        justifyContent: "center",
        paddingVertical: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "lightgrey",
        flexDirection: "row",
      }}
    >
      <Text style={{ flex: 1, fontWeight: "bold", color: theme.textColor }}>
        {title}
      </Text>
      <Text style={{ flex: 3, color: theme.textColor }}>{content}</Text>
    </View>
  );
};

const UserInfo = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { setLoading } = useContext(LoadingContext);
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getUserInfo()
        .then((response) => {
          setUserInfo(response.data.payload);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [])
  );

  const navigateUpdate = () => {
    navigation.navigate(SettingScreens.UPDATE_USER_INFO, {
      name: userInfo.name,
      avatar: userInfo.avatar,
      phone: userInfo.phone,
    });
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: userInfo.avatar }} style={styles.image} />
      </View>
      <Item title={t("authentication.email")} content={userInfo.email} />
      <Item title={t("authentication.username")} content={userInfo.name} />
      <Item title={t("authentication.phone")} content={userInfo.phone} />
      <Item title={t("authentication.usertype")} content={userInfo.type} />
      <Button title={t("authentication.update")} onPress={navigateUpdate} />
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 15,
  },
  imageContainer: {
    height: 150,
    width: 150,
    marginVertical: 20,
  },
  image: {
    flex: 1,
    borderRadius: 150,
    height: undefined,
    width: undefined,
  },
});
