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
import { Screens } from "constants";
import { apiRegister } from "core/services/authenticationService";
import { LoadingContext } from "config/context";
import validator from "validator";
import InputField from "components/Common/InputField";
import { alertSuccess } from "core/helpers/alertHelper";

const Register = ({ navigation }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [dirty, setDirty] = useState({
    username: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
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

  const register = () => {
    if (!form.username || !form.email || !form.phone || !form.password) {
      setErrorMessage("Please fill all input above!");
      return;
    }

    setLoading(true);
    apiRegister(form)
      .then(() => {
        navigation.navigate(Screens.LOGIN);
        alertSuccess("Register successfully!");
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

  const isValidEmail = () => {
    return validator.isEmail(form.email);
  };

  const isValidPhone = () => {
    return validator.isNumeric(form.phone);
  };

  const isValidPassword = () => {
    return validator.isLength(form.password, { min: 4 });
  };

  const isValidConfirmPassword = () => {
    return !!form.confirmPassword && form.confirmPassword === form.password;
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoIconContainer}>
        <Image
          source={require("assets/images/e-learning-logo.jpg")}
          style={styles.logoIcon}
        />
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
          title="Email"
          error="Email is invalid"
          dirty={dirty.email}
          validation={isValidEmail}
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
        />
        <InputField
          title="Phone"
          error="Only number is required"
          dirty={dirty.phone}
          validation={isValidPhone}
          value={form.phone}
          onChangeText={(value) => handleChange("phone", value)}
        />
        <InputField
          title="Password"
          error="Password at least 4 characters"
          dirty={dirty.password}
          validation={isValidPassword}
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry={true}
        />
        <InputField
          title="Confirm password"
          error="Confirm password is not matched"
          dirty={dirty.confirmPassword}
          validation={isValidConfirmPassword}
          value={form.confirmPassword}
          onChangeText={(value) => handleChange("confirmPassword", value)}
          secureTextEntry={true}
        />
      </SafeAreaView>
      <View style={styles.submit}>
        <Button title="Register" onPress={register} />
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Screens.LOGIN);
          }}
        >
          <Text style={{ color: "blue" }}>{`Back to Login`}</Text>
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

export default Register;

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
  logoIconContainer: {
    height: 100,
    width: 200,
    alignSelf: "center",
  },
  logoIcon: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});
