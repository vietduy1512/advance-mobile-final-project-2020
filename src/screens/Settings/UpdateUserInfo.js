import React, { useState, useContext } from "react";
import {
  Text,
  Button,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { SettingScreens } from "constants";
import { updateUserInfo } from "core/services/usersService";
import { LoadingContext } from "config/context";
import validator from "validator";
import InputField from "components/Common/InputField";
import { alertSuccess } from "core/helpers/alertHelper";
import { NavigationRouteContext } from "@react-navigation/core";

const UpdateUserInfo = ({ navigation }) => {
  const route = useContext(NavigationRouteContext);
  const { name, avatar, phone } = route.params;
  const [form, setForm] = useState({
    username: name || "",
    phone: phone,
  });
  const [dirty, setDirty] = useState({
    username: false,
    phone: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoading } = useContext(LoadingContext);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
    setDirty({
      ...dirty,
      [name]: true,
    });
  };

  const updateInfo = () => {
    if (!form.username || !form.phone) {
      setErrorMessage("Please fill all input above!");
      return;
    }

    setLoading(true);
    updateUserInfo(form.username, avatar, form.phone)
      .then(() => {
        navigation.navigate(SettingScreens.USER_INFO);
        alertSuccess("Update successfully!");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Something went wrong!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isValidUsername = () => {
    return validator.isAlphanumeric(form.username);
  };

  const isValidPhone = () => {
    return validator.isNumeric(form.phone);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: avatar }} style={styles.image} />
      </View>
      <SafeAreaView>
        <InputField
          title="Username"
          error="Username is invalid"
          dirty={dirty.username}
          validation={isValidUsername}
          value={form.username}
          onChangeText={(value) => handleChange("username", value)}
        />
        <InputField
          title="Phone"
          error="Only number is required"
          dirty={dirty.phone}
          validation={isValidPhone}
          value={form.phone}
          onChangeText={(value) => handleChange("phone", value)}
        />
      </SafeAreaView>
      <View style={styles.submit}>
        <Button title="Submit" onPress={updateInfo} />
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SettingScreens.USER_INFO);
          }}
        >
          <Text style={{ color: "blue" }}>{`Back to user`}</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: 20,
          marginHorizontal: 40,
          color: "red",
          fontSize: 16,
          alignSelf: "center",
        }}
      >
        {errorMessage}
      </Text>
    </View>
  );
};

export default UpdateUserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  submit: {
    width: 100,
    alignSelf: "center",
  },
  navigation: {
    marginTop: 20,
    alignSelf: "center",
  },
  imageContainer: {
    height: 150,
    width: 150,
    marginVertical: 20,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    borderRadius: 150,
    height: undefined,
    width: undefined,
  },
});